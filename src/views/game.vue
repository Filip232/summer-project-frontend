<template src="./Game.html">

</template>

<script>
import {Api} from "@/api";

export default {
  name: "game",
  data() {
    return {
      inputValue: '',
      userMessages: [] // { id: '', text: '', x: 40, y 50 },
    }
  },

  methods: {
    sendMesseage() {
      let id = Math.random() * 10101010;
      this.userMessages.push({
        id: id,
        text: this.inputValue,
        x: Math.random() * 90,
        y: Math.random() * 90
      })
      this.inputValue = '';
      setTimeout(() => {
        this.userMessages = this.userMessages.filter((message) => id !== message.id);
      }, 5000)
    }
  },
  async mounted() {
    //if (this.$store.state.user.name !== '' && this.$store.state.userId) {
    const data = await (await Api.fetch('games/' + this.$route.query.id + '/join', {
      method: 'POST',
      body: JSON.stringify({userId: this.$store.state.user.id})
    })).json();
    console.log(data);
    console.log(this.$route.query.id);
  }

}

</script>

<style scoped src="./Game.scss" lang="scss">

</style>