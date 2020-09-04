<template>
  <div>
    <Header :title="locale.registerTitle"></Header>
    <ValidationObserver ref="registerform">
      <form novalidate="true" @submit.prevent="onSubmit"
            class="d-f--c-c m-t-20 m-b-40">
        <validation-provider :class="{'m-b-60' : !isRegon}" rules="required" v-slot="{ errors }"
                             class="d-f--c-c m-b-15 bg-arrow">
          <label class="font-12 m-b-2 ">{{ locale.registerTypeOfCustomer }}</label>
          <select name="typeOfCustomer" id="typeOfCustomer" class="signup-input bg-f8f8f8 font-16"
                  v-model="select">
            <option :value="AccountType.person" selected>{{ locale.registerIndividual }}</option>
            <option :value="AccountType.company">{{ locale.registerCompany }}</option>
            <option :value="AccountType.other">{{ locale.registerOther }}</option>
          </select>
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider v-if="isRegon" rules="required|numeric" v-slot="{ errors }" class="d-f--c-c m-b-15">
          <input type="text" :placeholder="locale.registerRegon" id="regon" v-model="regon" name="regon"
                 class="signup-input bg-f8f8f8 font-16">
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider rules="required|email" v-slot="{ errors }" class="d-f--c-c m-b-15">
          <input type="email" :placeholder="locale.registerEmail" id="email" v-model="email" name="email"
                 class="signup-input bg-f8f8f8 font-16">
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-15">
          <input type="password" :placeholder="locale.registerPassword" id="password" v-model="password" name="password"
                 class="signup-input bg-f8f8f8 font-16">
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider :rules="'required|is:'+password" v-slot="{ errors }" class="d-f--c-c m-b-15">
          <input type="password" :placeholder="locale.registerRepeatPassword" id="password2" name="password2"
                 v-model="password2"
                 class="signup-input bg-f8f8f8 font-16">
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <button type="submit" class="bg-fcc833 font-20 color-ffffff m-l-120 signup-btn">
          {{ locale.registerSignUp }}
        </button>
      </form>
    </ValidationObserver>
    <div class="d-f--c-c">
      <span class="font-12 color-555555">{{ locale.registerDoYouHave }}</span>
      <router-link to="/" class="font-16 bg-f8f8f8 signup-signin d-f-c-c color-8e8e8e m-t-15">
        {{ locale.registerSignIn }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import locale from '@/assets/locales/pl-PL/locale.json';
import {ValidationProvider, ValidationObserver} from 'vee-validate';
import {extend} from 'vee-validate';
import {required, email, numeric, is} from 'vee-validate/dist/rules';
import {AccountType} from "@/models/AccountType";
import {Component, Vue} from "vue-property-decorator";

extend('required', required);
extend('email', email);
extend('numeric', numeric);
extend('is', is);

@Component({
  name: 'Register',
  components: {
    Header,
    ValidationObserver,
    ValidationProvider,
  },
})

export default class Register extends Vue {
  locale: object = locale;
  AccountType = AccountType;
  regon: string = '';
  email: string = '';
  select: AccountType = AccountType.person;
  password: string = '';
  password2: string = '';
  $refs!: {
    registerform: InstanceType<typeof ValidationObserver>;
  };

  get isRegon() {
    if (this.select === AccountType.company) {
      return true
    } else {
      return false
    }
  }

  onSubmit() {
    this.$refs.registerform.validate().then(success => {
      if (!success) {
        return;
      }
      this.$store.commit('addNewUser', {
        type: this.select,
        email: this.email,
        password: this.password,
        regon: this.regon,
      })
      this.$router.push('/');
    });
  }

}

</script>

<style scoped lang="scss">

.signup-btn {
  height: 40px;
  width: 165px;
  border: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.signup-input {
  height: 30px;
  width: 220px;
  color: #808080;
  border: none;
  text-align: center;
  text-align-last: center;
  padding: 0;
}

.signup-signin {
  height: 40px;
  width: 100px;
  border: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.bg-arrow {
  position: relative;
}

.bg-arrow::before {
  content: "";
  height: 20px;
  width: 20px;
  top: 20px;
  left: 187px;
  background-image: url("../assets/015-right-arrow-1.svg");
  background-repeat: no-repeat;
  position: absolute;
  transform: rotateZ(90deg);
  pointer-events: none;
}


</style>