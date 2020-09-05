<template src="./Game.html">

</template>

<script>
import {Api} from "@/api";

export default {
  name: "game",
  data() {
    return {
      inputValue: '',
      game: {},
      userMessages: [], // { id: '', text: '', x: 40, y 50 },
      isHamburgerActive: false
    }
  },

  methods: {
    sendMessage() {
      let id = Math.random() * 10101010;
      this.userMessages.push({
        id: id,
        text: this.inputValue,
        x: Math.random() * 90,
        y: Math.random() * 90,
        user: {
          name: this.$store.state.user.name
        }
      })
      this.inputValue = '';
      setTimeout(() => {
        this.userMessages = this.userMessages.filter((message) => id !== message.id);
      }, 5000)
    },
    startGame() {
      Api.fetch('games/' + this.$route.query.id + '/start', {
        method: 'POST'
      })
    },
    async startPolling() {
      const {success, game} = await Api.fetch('games/' + this.$route.query.id + '/updatePoll')
        .then(res => res.json())
      console.log({success, game});
      if(success && game){
        console.log(game);
          this.game = game;
      }
      return this.startPolling();
    },
    showHideHamburger(){
      this.isHamburgerActive = !this.isHamburgerActive;
    }
  },
  async mounted() {
    //if (this.$store.state.user.name !== '' && this.$store.state.userId) {
    const {game} = await (await Api.fetch('games/' + this.$route.query.id + '/join', {
      method: 'POST',
      body: JSON.stringify({userId: this.$store.state.user.id})
    })).json();
    console.log(game);
    this.game = game;
    this.startPolling();
  }

}

</script>

<style scoped src="./Game.scss" lang="scss">

</style>