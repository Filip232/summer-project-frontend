<template src="./Game.html">

</template>

<script>
import {Api} from "@/api";

export default {
  name: "game",
  data() {
    return{
      inputValue: '',
      userMessages: [] // { id: '', text: '', x: 40, y 50 }
    }
  },

  methods: {
    sendMesseage() {
      let id = Math.random() * 10101010;
      this.userMessages.push({
        id: Math.random()*10101010,
        text: this.inputValue,
        x: Math.random()*90,
        y: Math.random()*90,
        user: {
          name: 'test'
        }
      })
      this.inputValue = '';
    }
  },
  mounted() {

  }

}

</script>

<style scoped src="./Game.scss" lang="scss">

</style>