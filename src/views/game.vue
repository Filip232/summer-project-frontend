<template>
  <div class="gameComponent">
      <form v-if="$store.state.user.name === ''" class="addNameIfDontExist">
          Enter name before You join
          <input type="text" v-model="userName" maxlength="20" autofocus autocomplete="off" autocapitalize="off" spellcheck="false">
          <button type="submit" @click="changeUserName">Save</button>
      </form>
      <div v-if="game.finished" class="gameFinishedMenu">
          <div v-if="game.owner && game.owner.id === this.$store.state.user.id">
              <button type="button" class="gameStarter" @click="startGame">
                  Start next game
              </button>
          </div>
          <div v-else class="waitNewGame">
              Wait for owner to start new game
          </div>
          <h3 class="gameFinishedMenu--gameWonPlayer">Game won by: {{ winner.user.name }}!</h3>
          <ol class="gameFinishedMenu--playersPoints">
              <li v-for="player in game.players" :key="player.id" class="gameFinishedMenu--playersPoints__player">
                  {{ player.points }}
                  {{ player.user.name }}
              </li>
          </ol>
      </div>
      <div v-if="!game.active" class="gameComponent__modal">
          <div v-if="game.owner && game.owner.id === this.$store.state.user.id">
              <button type="button" class="gameStarter" @click="startGame">
                  Start game
              </button>
          </div>
          <div class="waitPanel" v-else>
              Wait for owner to start game
          </div>
      </div>
      <div id="game" class="gameBox">
          <div
              v-for="msg in game.messages" :key="msg.id" class="userMessageBox"
              :style="{top: msg.y + '%', left: msg.x + '%'}"
              :class="{'userMessageBox--rotate': msg.type === 'ROTATING'}">
              <h4>{{msg.user.name}}</h4>
              {{msg.text}}
          </div>
          <p
              id="word"
              class="wordGenerator"
              :style="{'margin-top': game.currentWordOptions.y + '%', 'margin-left': game.currentWordOptions.x + '%'}"
              :class="{'wordGenerator--rotate': game.currentWordType === 'ROTATING'}">
              <span v-for="letter in game.currentWord" :key="letter.index">{{letter}}</span>
          </p>
      </div>
      <div>
          <form @submit.prevent="sendMessage" class="sendMessageBox">
              <button type="button" class="hamburger" @click="showHideNavigation">
                  <div class="hamburger--box">
                      <div class="hamburger--inner"></div>
                  </div>
              </button>
              <div v-if="isNavigationActive" class="navigation">
                  <ul class="navigationList">
                      <li class="navigationList--player navigationList--listElement">Players</li>
                      <li class="navigationList--listElement" v-for="player in game.players" :key="player.index">
                          {{ player.points }}
                          {{ player.user.name }}
                      </li>
                      <li class="navigationList--spectator navigationList--listElement">Spectators</li>
                      <li class="navigationList--listElement" v-for="player in game.spectators" :key="player.index">
                          {{ player.name }}
                      </li>
                  </ul>
              </div>
              <input v-model=inputValue type="text" class="sendMessageBox--sendMessage" autofocus autocomplete="off"
                    autocapitalize="off" spellcheck="false">
              <button type="submit" class="sendMessageBox--confirm">Confirm</button>
          </form>
      </div>
  </div>
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
      isNavigationActive: false,
      userName: ''
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
    changeUserName(){
      this.$store.commit('changeUserName', this.userName);
    },
    async startPolling() {
      const {success, game} = await Api.fetch('games/' + this.$route.query.id + '/updatePoll?cacheBust=' + Date.now())
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

<style scoped lang="scss">

@import "variables.scss";

@font-face {
  font-family: 'Roboto';
  src: url("../fonts/Roboto/Roboto-Regular.ttf");
  font-style: normal;
  font-weight: 400;
}

.gameComponent {
  font-size: $fontSize2;
  font-family: 'Roboto';
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gameStarter{
  border: thin solid $colorPrimary;
  color: $colorPrimary;
  border-radius: 10px;
  padding: 10px;
  font-size: $fontSize3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover{
    border-color: $colorContrast;
    color: $colorContrast;
  }
}

.gameFinishedMenu div .gameStarter{
  top: 5%;
}

.waitPanel{
  position: absolute;
  top: 50%;
  font-size: $fontSize4;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gameBox {
  background-color: $colorGreyLightest;
  height: 100%;
  width: 100vw;
  position: relative;
  overflow: hidden;
  z-index: -1;
}

.wordGenerator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  font-size: max(2rem, 4vw);
  white-space: nowrap;

  &--rotate{
    animation: around2 6s;
    animation-iteration-count: infinite;
  }
}

@keyframes around2{
  0% {
    transform: rotate(170deg);
  }

  49% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(170deg);
  }
}

.wordGenerator span {
  border: thin solid $colorContrast;
  font-size: inherit;
  padding: 0 4px;
  margin-right: 7px;
  color: $colorGreyDark;
}

.userMessageBox {
  z-index: 1;
  padding: 10px;
  font-size: max(1.2rem, 3vw);
  background-color: $colorGreyLightnotest;
  position: absolute;
  color: $colorGreyDark;
  border-radius: 2px;
  border: thin solid $colorGreyDark;

  &--rotate{
    animation: around 4s;
  }
}

@keyframes around{
  0% {
    transform: rotate(0);
  }
  49% {
    transform: rotate(180deg);
  }
}

.userMessageBox h4 {
  font-size: max(2rem, 3vh);
  color: inherit;
  text-align: center;
}

.sendMessageBox {
  border: 1px solid $colorSecondary;
  display: flex;

  &--sendMessage {
    width: 100%;
    background-color: $colorGreyLightnotest;
    color: $colorGreyDark;
    text-align: center;
    font-size: max(2.4rem, 3vw);
  }

  &--confirm{
    border-left: thin solid $colorSecondary;
    background-color: $colorGreyLightnotest;
    color: $colorGreyDark;
    font-size: max(1.2rem, 2.5vh);
    padding: 0 1vw;
    
    &:active{
      background-color: $colorGreyDark;
      color: $colorPrimary;
    }
  }
}

.gameComponent__modal {
  position: fixed;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.hamburger {
  display: inline-block;
  cursor: pointer;
  background-color: $colorGreyLightnotest;
  border: 0;
  margin: 0;
  z-index: 2;

  &--box {
    width: 24px;
    height: 15px;
    display: inline-block;
    position: relative;
  }

  &--inner {
    border-radius: 50%;
    background-color: $colorSecondary;
    height: 10px;
    width: 10px;
    position: relative;

    &::before {
      content: '';
      width: 4px;
      height: 20px;
      position: absolute;
      background-color: $colorSecondary;
      top: 2px;
      left: 3px;
    }

    &::after {
      content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      background-color: transparent;
      top:2px;
      left: -2px;
      border-bottom: 2px solid $colorSecondary;
      border-right: 2px solid $colorSecondary;
      transform: rotateZ(45deg);
      transition: 0.5s;
    }
  }
}

.hamburger:hover .hamburger--inner::after{
  transform: rotateZ(30deg);
  left: -3px;
  transition: 0.5s;
}

.hamburger--active .hamburger--inner {
  background-color: transparent;
}

.hamburger--active .hamburger--inner::before {
  transform: translateY(0) rotate(45deg);
}

.hamburger--active .hamburger--inner::after {
  transform: translateY(0) rotate(-45deg);
}

.navigation {
  height: 100%;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transform: translateX(0);
  border: 1px solid $colorSecondary;
  background-color: $colorGreyLightnotest;;
  transition: transform .3s .1s ease-in-out;
  overflow: auto;
  overflow-x: hidden;

  &List {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    text-align: center;

    &--listElement {
      padding: 5px;
      width: 80%;
    }

    &--player {
      font-size: $fontSize4;
      border-bottom: 1px solid $colorSecondary;
    }

    &--spectator {
      margin-top: 50px;
      font-size: $fontSize4;
      border-bottom: 1px solid $colorSecondary;
    }
  }
}

.addNameIfDontExist {
  padding-top: 20%;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  color: $colorPrimary;
  text-align: center;
  background-color: $colorSecondary;
}

.addNameIfDontExist input{
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px 10px;
  min-width: 400px;
  border: 1px solid $colorPrimary;
}

.addNameIfDontExist button{
  color: inherit;
  margin-top: 15px;
  padding: 5px 10px;
  font-size: $fontSize2;
}

.gameFinishedMenu {
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 2.4rem;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 3;
  color: $colorPrimary;
  overflow: auto;

  &--gameWonPlayer {
    margin-top: 20vh;
  }
}

.waitNewGame {
  position: absolute;
  left: 50%;
  top: 3%;
  transform: translate(-50%,0);
}

@media (min-width: 400px) {
  .gameFinishedMenu {
  
    &--gameWonPlayer {
      margin-top: 15vh;
    }
  }
}

</style>