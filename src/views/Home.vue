<template>
  <div class="console">
    <textarea class="console__textarea" readonly v-model="consoleOutput">
    </textarea>
    <form @submit.prevent="onSubmit">
      <input class="console__input" type="text" v-model="consoleInput" autofocus>
      <div class="console__prompt-wrapper">
        {{ consoleInput }}<span class="console__prompt">|</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      consoleInput: '',
      consoleOutput: 'H@c1SH 0$ [Version 10.0.18363.1016]\n' +
          '(c) 2020 IT komórka Grupy Groboczej. All rights reserved.\n\n' +
          'To begin set your name using "change-name" command'
    };
  },
  methods: {
    onSubmit(){
      switch (this.consoleInput){
        case 'a':
          this.consoleOutput += '\nelo';
          break;
        case 'change-name':
          this.consoleOutput += '\nname was changed to ';
          break;
        case 'join':
          break;
        case 'create':
          break;
        default:
          this.consoleOutput += '\nwrong command';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.console {
  display: flex;
  flex-direction: column;
  height: 100vh;
  $fontSize: 1.6rem;
  font-weight: normal;
  font-family: monospace;

  &__textarea {
    flex-grow: 1;
  }

  &__input {
    width: 100%;
    font-size: $fontSize;
    font-family: inherit;
  }

  &__prompt-wrapper {
    position: absolute;
    bottom: 2px;
    color: transparent;
    user-select: none;
    pointer-events: none;
    width: 100%;
    font-size: $fontSize;
  }

  &__prompt {
    color: #000;
  }
}
</style>
