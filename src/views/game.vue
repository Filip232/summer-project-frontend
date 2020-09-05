<template src="./Game.html">

</template>

<script>
import {Api} from "@/api";

export default {
  name: "game",
  data() {
    return{
      inputValue: '',
      game: {},
      userMessages: [], // { id: '', text: '', x: 40, y 50 },
      isNavigationActive: false
    }
  },
  computed: {
    winner() {
      if (!this.game || !this.game.finished) return;
      let winner = { points: 0 };
      this.game.players.forEach(player => {
        if (player.points > winner.points) {
          winner = player;
        }
      });
      return winner;
    }
  },
  methods: {
    sendMessage() {
      Api.fetch('games/' + this.$route.query.id + '/messages', {
        method: 'POST',
        body: JSON.stringify( {userId: this.$store.state.user.id, text: this.inputValue })
      })
      this.inputValue = '';
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
    showHideNavigation(){
      this.isNavigationActive = !this.isNavigationActive;
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