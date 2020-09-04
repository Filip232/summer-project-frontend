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

<style lang="scss" scoped src="./Home.scss"></style>
