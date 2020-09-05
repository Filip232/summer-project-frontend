<template src="./Home.html"></template>

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

<style lang="scss" scoped src="./Home.scss"></style>
