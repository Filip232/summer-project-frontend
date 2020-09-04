<template>
  <div>
    <Header :title="locale.loginTitle"></Header>
    <validation-observer ref="loginform" class="d-f-c p-t-35">
      <form novalidate="true" @submit.prevent="onSubmit" class="d-f--c-c">
        <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-5">
          <label for="name" class="font-12 color-transparent"
                 :class="{ 'color-8e8e8e' : visiblename }">{{ locale.loginLogin }}</label>
          <input type="text" :placeholder="nameInputPlaceholder" id="name" v-model="login"
                 @focus="focusName"
                 @blur="inputCheckerName"
                 class="login-input bg-f8f8f8 font-16" :class="{'m-b-10' : !errors[0]}">
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-30">
          <label for="password" class="font-12 color-transparent"
                 :class="{'color-8e8e8e' : visiblepassword}">{{ locale.loginPassword }}</label>
          <input type="password" :placeholder="passwordInputPlaceholder" id="password" v-model="password"
                 @focus="focusPassword" @blur="inputCheckerPassword"
                 class="login-input bg-f8f8f8 font-16" :class="{'m-b-10' : !errors[0]}">
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <div>
          <router-link to="" class="font-12 color-8e8e8e">{{ locale.loginForgotPassword }}</router-link>
          <button type="submit" value="Submit" id="submit"
                  class="bg-fcc833 font-20 color-ffffff m-l-30 login-button">{{ locale.loginSignIn }}
          </button>
        </div>
      </form>
    </validation-observer>
    <div class="d-f--c-c m-t-30">
      <span class="font-12 color-8e8e8e">{{ locale.loginNoAccount }}</span>
      <router-link to="/register" class="font-16 bg-f8f8f8 login-button d-f-c-c color-8e8e8e m-t-15">
        {{ locale.loginSignUp }}
      </router-link>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import {ValidationProvider, ValidationObserver} from 'vee-validate';
import {extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import locale from '@/assets/locales/pl-PL/locale.json';

extend('required', required);

export default {
  name: 'Login',
  components: {
    ValidationObserver,
    ValidationProvider,
    Header,
  },
  data() {
    return {
      errors: [],
      visiblename: false,
      visiblepassword: false,
      login: '',
      password: '',
      locale,
      console: console.log,
      nameInputPlaceholder: locale.loginLogin,
      passwordInputPlaceholder: locale.loginPassword
    }
  },
  methods: {
    inputCheckerName() {
      if (this.login) {
        this.visiblename = true;
      } else {
        this.visiblename = false;
        this.nameInputPlaceholder = locale.loginLogin;
      }
    },
    inputCheckerPassword() {
      if (this.password) {
        this.visiblepassword = true;
      } else {
        this.visiblepassword = false;
        this.passwordInputPlaceholder = locale.loginPassword;
      }
    },
    focusName() {
      this.visiblename = true;
      this.nameInputPlaceholder = '';
    },
    focusPassword() {
      this.visiblepassword = true;
      this.passwordInputPlaceholder = '';
    },
    onSubmit() {
      let isValid = false
      this.$refs.loginform.validate().then(async success => {
        if (!success) {
          return;
        }
        const data = await this.$store.dispatch('getLogin', {login: this.login, password: this.password});
        if (data) {
          this.$store.commit('activeUser', {user: this.login, id: 7});
          this.$router.push('/home');
          isValid = true;
        }
        if (!isValid) {
          alert('Login or password is invalid');
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">

.login-input {
  height: 30px;
  width: 185px;
  color: #808080;
  border: none;
  text-align: center;
}

.login-button {
  height: 40px;
  width: 125px;
  border: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

</style>
