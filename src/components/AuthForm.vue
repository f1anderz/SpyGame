<template>
  <div class="auth-form">
    <div class="auth-form-error" v-if="message">{{ message }}</div>
    <input class="auth-form-input" type="text" placeholder="Login..." v-model="login">
    <input class="auth-form-input" type="text" placeholder="Username..." v-model="username" v-if="registration">
    <input class="auth-form-input" type="text" placeholder="Password..." v-model="password">
    <button class="auth-form-button" @click="loginUser">
      <span v-if="registration">Sign Up</span>
      <span v-else>Sign In</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AuthForm'
}
</script>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {inject, ref} from "vue";

const store = useStore();
const router = useRouter();

const cookies = inject('$cookies');

const registration = ref(false);

const login = ref('');
const username = ref('');
const password = ref('');
const message = ref('');

function loginUser(event) {
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

</style>