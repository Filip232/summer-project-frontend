<template>
  <div class="console">
    <textarea class="console__textarea" readonly>
      H@c1SH 0$ [Version 10.0.18363.1016]
      (c) 2020 IT komórka Grupy Groboczej. All rights reserved.
    </textarea>
    <div>
      <input class="console__input" type="text" v-model="consoleInput" autofocus>
      <div class="console__prompt-wrapper">
        {{consoleInput}}<span class="console__prompt">|</span>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      consoleInput: ''
    };
  },
  methods: {

  }
}
</script>

<<<<<<< HEAD
<style lang="scss" scoped src="./Home.scss"></style>
=======
<style lang="scss" scoped>
.console {
  height: calc(100vh - (1.6rem));
  display: flex;
  position: relative;
  flex-direction: column;
  $fontSize: 1.6rem;
  font-weight: normal;
  font-family: monospace;
  background-color: #fff;
  padding: 0;
  border: 0;

  &__textarea {
    flex-grow: 1;
  }

  &__input {
    border: 0;
    padding: 1px 0;
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
>>>>>>> 616fac3ebb68314477b2a6e3e2c9b8131e21966d
