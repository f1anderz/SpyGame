<template>
  <div class="auth">
    <div class="auth-header">
      <span v-if="registration">Sign Up</span>
      <span v-else>Sign In</span>
      to <span class="auth-header-highlight">SpyGame</span> now
    </div>
    <div class="auth-form">
      <div class="auth-form-error" v-if="message">{{ message }}</div>
      <spy-input :spy-placeholder="'Login...'" @dataInput="(value)=>{login = value}"/>
      <spy-input :spy-placeholder="'Username...'" @dataInput="(value)=>{username = value}"
                 v-if="registration"/>
      <password-input :spy-placeholder="'Password...'" @dataInput="(value)=>{password = value}"/>
      <div class="auth-form-quest">
        <switch-button v-if="registration" :switch-target="'signin'" :prompt="['Already have an account?','Sign In']"
                       @switch-click="registration = !registration"/>
        <switch-button v-else :switch-target="'signup'" :prompt="['Don`t have an account?','Sign Up']"
                       @switch-click="registration = !registration"/>
      </div>
      <adaptive-button :adapt-property="registration" :adapt-value="['Sign Up','Sign In']" @adaptive-click="loginUser"/>
    </div>
  </div>
</template>

<script>
import SpyInput from "@/components/UI/SpyInput.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";

export default {
  name: 'AuthForm',
  components: {SpyInput, PasswordInput}
}
</script>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {inject, ref} from "vue";
import SwitchButton from "@/components/UI/SwitchButton.vue";
import AdaptiveButton from "@/components/UI/AdaptiveButton.vue";

const store = useStore();
const router = useRouter();

const cookies = inject('$cookies');

const registration = ref(false);

const login = ref('');
const username = ref('');
const password = ref('');
const message = ref('');

function loginUser() {
  store.dispatch('user/loginUser', {
    login: login.value,
    password: password.value
  }).then((response) => {
    cookies.set('userID', response.data.userID, "30d");
    store.dispatch('user/setUser', response.data.userID);
    message.value = '';
    router.push('/SpyGame/');
  }).catch((err) => {
    message.value = err.response.data.error.message;
  });
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.auth {
  height: 100vh;
  width: 100%;
  background: style.$background-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25vh;
  gap: 1rem;

  &-header {
    font-size: 1.5rem;
    color: style.$text-color;
    font-family: style.$font-body;

    &-highlight {
      font-family: style.$font-header;
    }
  }

  &-form {
    display: flex;
    flex-direction: column;
    background: style.$secondary-background-color;
    border-radius: 1rem;

    @include style.breakpoint(xs) {
      width: 90%;
      padding: .5rem;
      gap: .5rem;
    }

    @include style.breakpoint(s) {
      width: 55%;
      padding: 1rem;
      gap: .6rem;
    }

    @include style.breakpoint(m) {

    }

    @include style.breakpoint(l) {
      width: 42%;
      padding: .8rem;
      gap: .6rem;
    }

    @include style.breakpoint(xl) {

    }

    @include style.breakpoint(xxl) {
      width: 30%;
      padding: 1.2rem;
      gap: .7rem;
    }

    &-quest {
      color: style.$text-color;
      font-family: style.$font-body;
      margin-left: auto;
      margin-right: .5rem;
    }

    &-error {
      padding-left: .5rem;
      color: red;
      font-family: style.$font-body;
    }
  }
}
</style>