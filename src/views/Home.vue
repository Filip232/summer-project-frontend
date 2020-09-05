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
    onSubmit() {
      const userInputSplit = this.consoleInput.split(' ');
      this.consoleInput = '';
      switch (userInputSplit[0]){
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
              this.$router.push('/game.exe')
              break;
            case 'join':
              this.$router.push('/game.exe?id='+userInputSplit[2])
              break;
          }
          break;
        case 'help':
          this.helpCommand();
          break;
        default:
          this.consoleOutput += '\nwrong command';
      }
      
      this.$nextTick(() => {
        this.$refs.consoleOutputElement.scrollTop = this.$refs.consoleOutputElement.scrollHeight;
      });
    }
  }
}
</script>

<style lang="scss" scoped src="./Home.scss"></style>
