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
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {ref} from 'vue';

export default {
  name: 'AuthForm',
  setup() {
    const store = useStore();
    const router = useRouter();

    let registration = ref(false);

    let login = ref('');
    let username = ref('');
    let password = ref('');
    let message = ref('');

    function loginUser(event) {
      store.dispatch('user/loginUser', {
        login: login.value,
        password: password.value
      }).then((response) => {
        store.dispatch('user/setUser', response.data.userID);
        this.message = '';
        router.push('/SpyGame');
      }).catch((err) => {
        this.message = err.response.data.error.message;
      });
    }

    return {
      store,
      loginUser,
      registration,
      login,
      username,
      password,
      message,
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

</style>