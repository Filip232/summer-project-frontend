<template>
  <div class="console">
      <textarea class="console__textarea" readonly v-model="consoleOutput" ref="consoleOutputElement" @focus="() => $refs.consoleInputElement.focus()"></textarea>
      <form @submit.prevent="onSubmit" class="d-flex flex-row">
          <div class="console__user">C:\User\{{$store.state.user.name ? $store.state.user.name + '\\' : ''}}</div>
          <div class="console__input-wrapper">
              <input class="console__input" type="text" :value="consoleInput" @input="$event => consoleInput = $event.target.value" autofocus autocapitalize="off" autocomplete="off" ref="consoleInputElement" maxlength="40">
              <div class="console__prompt-wrapper">
                  {{ consoleInput}}<span class="console__prompt"></span>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
// @ is an alias to /src

import {Api} from "@/api";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      consoleInput: '',
      consoleOutput: 'H@c1SH 0$ [Version 10.0.18363.1016]\n' +
          '(c) 2020 IT komórka Grupy Roboczej. All rights reserved.\n\n' +
          'To begin set your name using "change-name" command'
    };
  },
  methods: {
    helpCommand() {
      this.consoleOutput += '\n\n All commands:\n' +
          '"change-name <new name>" - to change username\n' +
          '"game.exe create" - to create new game\n' +
          '"game.exe join <id>" - to join existing game\n' +
          '"help" - to show help'
    },
    async onSubmit() {
      const userInputSplit = this.consoleInput.split(' ');
      this.consoleInput = '';
      switch (userInputSplit[0]) {
        case 'elo':
          this.consoleOutput += '\n\nNo siema';
          break;
        case 'change-name':
          this.$store.commit('changeUserName', userInputSplit[1]);
          this.consoleOutput += '\nname was changed to ' + userInputSplit[1] +
              '\n\nTo create new game use command "game.exe create"\n\n' +
              'If u want to join to existing lobby use command "game.exe join <id>"';
          break;
        case 'game.exe':
          switch (userInputSplit[1]) {
            case 'create':
              if(this.$store.state.user.name === ''){
                this.consoleOutput += '\n\nBefore you create the game please setup your name';
              }else{
                await this.handleCreateGame();
              }

              break;
            case 'join':
              await this.handleGameJoin(userInputSplit[2]);
              break;
          }
          break;
        case 'help':
          this.helpCommand();
          break;
        default:
          this.consoleOutput += '\n\nwrong command';
      }

      this.$nextTick(() => {
        if (this.$refs.consoleOutputElement)
          this.$refs.consoleOutputElement.scrollTop = this.$refs.consoleOutputElement.scrollHeight;
      });
    },
    async handleCreateGame() {
      const {game} = await Api.fetch('games', {
        method: 'POST',
        body: JSON.stringify({ownerId: this.$store.state.user.id})
      })
          .then(res => res.json())

      this.$router.push('/game.exe?id=' + game.id)
    },
    async handleGameJoin(gameId) {
      const {success, error} = await Api.fetch('games/' + gameId)
          .then(data => data.json());

      if (success) {
        return this.$router.push('/game.exe?id='+gameId)
      }

      this.consoleOutput += '\n' + error;
    }
  }
}
</script>

<style lang="scss" scoped>

@import "variables.scss";

.console {
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    border: none;
    font-size: $fontSize;
    font-weight: normal;
    font-family: monospace;
    background-color: $colorPrimary;
    padding: 0;

    &__textarea {
        border: none;
        flex-grow: 1;
        resize: none;
        border: none;
        box-shadow: none;

        &:focus{
            outline: none;
            border: none;
            font-size: inherit;
            font-family: inherit;
        }
    }

    &__input {
        border: none;
        width: 100%;
        font-size: inherit;
        font-family: inherit;

        &:focus{
            outline: none;
            border: none;
        }
    }

    &__input-wrapper {
        position: relative;
        flex-grow: 1;
    }
  
    &__prompt-wrapper {
        overflow: hidden;
        position: absolute;
        bottom: 0;
        top: 0;
        color: transparent;
        user-select: none;
        pointer-events: none;
        width: 100%;
        background-color: transparent;

    }
  
    &__prompt {
        margin: auto 0;
        color: $colorSecondary;
        display: inline-block;
        width: 9px;
        height: 20px;
        animation: blinking-rect 1s;
        animation-iteration-count: infinite;

        &::before {
            width: 2px;
            height: 100%;
            content: ' ';
            background-color: $colorPrimary;
            display: inline-block;
            position: relative;
            transform: translateX(-1px);
        }
    }

    &__user {
        margin-right: .5em;
    }

    ::-webkit-scrollbar {
        width: 5px;

        &-thumb {
            background: $colorGreyLighter;

            &:hover {
                background: $colorGreyLight;
            }
        }
    }
}

@media (prefers-color-scheme: dark) {
    .console {
        background-color: $colorSecondary;
        color: $colorPrimary;

        &__prompt {
            background-color: $colorPrimary;

            &::before {
                background-color: $colorSecondary;
            }
        }
    }

    ::-webkit-scrollbar-thumb {
        background: $colorGreyLight; 

        &:hover {
            background: $colorGreyDark;
        }
    }
}

@keyframes blinking-rect {
  0% {
    background-color: $colorPrimary;
  }

  49% {
    background-color: $colorPrimary;
  }
  
  50% {
    background-color: $colorSecondary;
  }

  100% {
    background-color: $colorSecondary;
  }
}

</style>
