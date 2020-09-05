<template src="./Home.html"></template>

<script>
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
    onSubmit() {
      const userInputSplit = this.consoleInput.split(' ');
      this.consoleInput = '';
      switch (userInputSplit[0]){
        case 'a':
          this.consoleOutput += '\nelo';
          break;
        case 'change-name':
          this.$store.commit('changeUserName', userInputSplit[1]);
          this.consoleOutput += '\nname was changed to ' + userInputSplit[1];
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
