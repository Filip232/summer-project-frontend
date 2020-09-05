<template src="./Game.html">

</template>

<script>
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
    },
    hamburgerShowHide() {
      const hamburger = document.querySelector('.hamburger');
      const nav = document.querySelector('.navigation');
      const handleClick = () => {
        hamburger.classList.toggle('hamburger--active');
        nav.classList.toggle('navigation--active');
      }
      hamburger.addEventListener('click', handleClick);
    }
  },
  mounted() {

  }

}

</script>

<style scoped src="./Game.scss" lang="scss">

</style>