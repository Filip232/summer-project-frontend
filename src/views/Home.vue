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

<style lang="scss" scoped>
.console {
  height: calc(100vh - (1.6rem + 2px));
  display: flex;
  position: relative;
  flex-direction: column;
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
