<template>
  <div>
    <Header></Header>
    <div class="d-f-c-c">
      <button type="button" @click="logout">LOGOUT</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";

export default {
  name: 'Home',
  components: {
    Header
  },
  methods: {
    logout(){
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>
