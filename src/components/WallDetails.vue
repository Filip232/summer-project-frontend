<template>
  <div>
    <div class="figure-big-box">
      <div class="figure-box box-active" @click="activeBox($event)">
        <div class="figure1"></div>
      </div>
      <div class="figure-box" @click="activeBox($event)">
        <div class="figure2"></div>
      </div>
      <div class="figure-box m-t-5" @click="activeBox($event)">
        <div class="figure3"></div>
      </div>
      <div class="figure-box m-t-5" @click="activeBox($event)">
        <div class="figure4"></div>
      </div>
    </div>
    <div class="d-f-sb-fe m-t-5 relative">
      <div :class="classname+'-small1'"></div>
      <input class="figure-input" v-model="measurement1" @input="onInput1(measurement1)"/>
      <div class="black-input-line"></div>
      <span class="font-12">cm</span>
    </div>
    <div class="d-f-sb-fe m-t-5 relative">
      <div :class="classname+'-small2'"></div>
      <input class="figure-input" v-model="measurement2" @input="onInput2(measurement2)"/>
      <div class="black-input-line"></div>
      <span class="font-12">cm</span>
    </div>
    <div :class="{ hidden: !isVisible } " class="d-f-sb-fe m-t-5 relative">
      <div :class="classname+'-small3'"></div>
      <input class="figure-input" v-model="measurement3" @input="onInput3(measurement3)"/>
      <div class="black-input-line"></div>
      <span class="font-12">cm</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "WallDetails",
  data() {
    return {
      classname: 'figure1',
      isVisible: true,
      measurement1: 0,
      measurement2: 0,
      measurement3: 0,
      type: 1
    }
  },
  methods: {
    activeBox(e) {
      let boxes = this.$el.getElementsByClassName("figure-box");
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("box-active");
      }
      e.target.classList.add('box-active');
      let elo = this.$el.getElementsByClassName("box-active");
      this.classname = elo.item(0).getElementsByTagName("div").item(0).className;
      if (this.classname === 'figure4') {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
      this.type = Number(this.classname[6]);
      this.$emit('type', this.type);
    },
    onInput1(value){
      this.$emit('getInput1Value', value);
    },
    onInput2(value){
      this.$emit('getInput2Value', value);
    },
    onInput3(value){
      this.$emit('getInput3Value', value);
    }
  }
}

</script>

<style scoped lang="scss">

.figure1 {
  height: 12px;
  width: 35px;
  background-color: #555555;
  position: relative;
  pointer-events: none;
}

.figure1::before {
  content: '';
  height: 12px;
  width: 35px;
  background-color: #555555;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 12px;
  left: -12px;
}

.figure1::after {
  content: '';
  height: 0;
  width: 0;
  border-left: 17px solid transparent;
  border-top: 17px solid #555555;
  border-right: 17px solid transparent;
  border-bottom: 17px solid transparent;
  transform: rotateZ(45deg);
  position: absolute;
  bottom: -5px;
  left: -6px;
}

.figure2 {
  height: 12px;
  width: 35px;
  background-color: #555555;
  position: relative;
  pointer-events: none;
}

.figure2::after {
  content: "";
  height: 0;
  width: 0;
  border-left: 14px solid transparent;
  border-top: 24px solid #555555;
  border-right: 27px solid transparent;
  border-bottom: 24px solid transparent;
  transform: rotateZ(31deg);
  position: absolute;
  bottom: -22px;
  left: -15px;
}

.figure3 {
  height: 12px;
  width: 35px;
  background-color: #555555;
  position: relative;
  pointer-events: none;
}

.figure3::after {
  content: '';
  height: 0;
  width: 0;
  border-left: 17px solid transparent;
  border-top: 17px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 17px solid #555555;
  position: absolute;
  bottom: 12px;
  left: 0;
}

.figure4 {
  height: 35px;
  width: 35px;
  background-color: #555555;
  pointer-events: none;
}

.figure-box {
  display: flex;
  align-items: flex-end;
  height: 35px;
  width: 35px;
  padding: 10px;
  background-color: #ffffff;
}

.figure-big-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.wall-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 140px;
  background-color: #f8f8f8;
  padding: 5px;
}


.figure1-small1 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 3px #fcc833;
  border-right: solid 1px #555555;
  position: relative;
}

.figure1-small1::before {
  content: '';
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-left: solid 1px #555555;
  border-bottom: solid 1px #555555;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 3px;
  left: -5px;
}

.figure1-small1::after {
  content: '';
  height: 1px;
  width: 13px;
  background-color: #555555;
  transform: rotateZ(45deg);
  position: absolute;
  bottom: 9px;
  left: 4px;
}

.figure1-small2 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 1px #555555;
  border-right: solid 1px #555555;
  position: relative;
}

.figure1-small2::before {
  content: '';
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-left: solid 1px #555555;
  border-bottom: solid 3px #fcc833;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 3px;
  left: -5px;
}

.figure1-small2::after {
  content: '';
  height: 1px;
  width: 13px;
  background-color: #555555;
  transform: rotateZ(45deg);
  position: absolute;
  bottom: 9px;
  left: 4px;
}


.figure1-small3 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 1px #555555;
  border-right: solid 3px #fcc833;
  position: relative;
}

.figure1-small3::before {
  content: '';
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-left: solid 1px #555555;
  border-bottom: solid 1px #555555;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 4px;
  left: -5px;
}

.figure1-small3::after {
  content: '';
  height: 1px;
  width: 14px;
  background-color: #555555;
  transform: rotateZ(45deg);
  position: absolute;
  bottom: 9px;
  left: 4px;
}

.figure2-small1 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 3px #fcc833;
  border-right: solid 1px #555555;
  position: relative;
}

.figure2-small1::before {
  content: '';
  height: 1px;
  width: 15px;
  background-color: #555555;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 6px;
  left: -7px;
}

.figure2-small1::after {
  content: "";
  height: 1px;
  width: 19px;
  background-color: #555555;
  transform: rotateZ(33deg);
  position: absolute;
  bottom: 9px;
  left: -1px;
}

.figure2-small2 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 1px #555555;
  border-right: solid 1px #555555;
  position: relative;
}

.figure2-small2::before {
  content: '';
  height: 3px;
  width: 15px;
  background-color: #fcc833;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 6px;
  left: -7px;
}

.figure2-small2::after {
  content: "";
  height: 1px;
  width: 19px;
  background-color: #555555;
  transform: rotateZ(33deg);
  position: absolute;
  bottom: 9px;
  left: -1px;
}

.figure2-small3 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 1px #555555;
  border-right: solid 3px #fcc833;
  position: relative;
}

.figure2-small3::before {
  content: '';
  height: 1px;
  width: 15px;
  background-color: #555555;
  position: absolute;
  transform: rotateZ(90deg);
  bottom: 6px;
  left: -7px;
}

.figure2-small3::after {
  content: "";
  height: 1px;
  width: 19px;
  background-color: #555555;
  transform: rotateZ(33deg);
  position: absolute;
  bottom: 9px;
  left: -1px;
}

.figure3-small1 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 3px #fcc833;
  border-right: solid 1px #555555;
  border-left: solid 1px #555555;
  position: relative;
}

.figure3-small1::before {
  content: "";
  height: 10px;
  width: 10px;
  border-left: solid 1px #555555;
  border-top: solid 1px #555555;
  position: absolute;
  transform: rotateZ(45deg);
  bottom: 0px;
  left: 2px;
}

.figure3-small2 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 1px #555555;
  border-right: solid 1px #555555;
  border-left: solid 3px #fcc833;
  position: relative;
}

.figure3-small2::before {
  content: "";
  height: 11px;
  width: 11px;
  border-left: solid 1px #555555;
  border-top: solid 1px #555555;
  position: absolute;
  transform: rotateZ(45deg);
  bottom: -1px;
  left: 1px;
}

.figure3-small3 {
  height: 5px;
  width: 15px;
  background-color: transparent;
  border-bottom: solid 1px #555555;
  border-right: solid 1px #555555;
  border-left: solid 1px #555555;
  position: relative;
}

.figure3-small3::before {
  content: "";
  height: 10px;
  width: 10px;
  border-left: solid 1px #555555;
  border-top: solid 1px #555555;
  position: absolute;
  transform: rotateZ(45deg);
  bottom: 0px;
  left: 2px;
}

.figure3-small3::after {
  content: "";
  height: 3px;
  width: 13px;
  background-color: #fcc833;
  transform: rotateZ(90deg);
  position: absolute;
  bottom: 5px;
  left: 1px;
}

.figure4-small1 {
  height: 15px;
  width: 15px;
  background-color: transparent;
  border-bottom: 3px solid #fcc833;
  border-left: 1px solid #555555;
  border-top: 1px solid #555555;
  border-right: 1px solid #555555;
}

.figure4-small2 {
  height: 15px;
  width: 15px;
  background-color: transparent;
  border-bottom: 1px solid #555555;
  border-left: 3px solid #fcc833;
  border-top: 1px solid #555555;
  border-right: 1px solid #555555;
}


.figure-input {
  width: 70%;
  padding: 4px 0;
  text-align-last: center;
}

.black-input-line {
  height: 1px;
  width: 60%;
  background-color: #555555;
  left: 27px;
  bottom: 5px;
  position: absolute;
}

.ul-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.box-active {
  background-color: #fcc833;
}

.box-active .figure1 {
  background-color: #ffffff;
}

.box-active .figure1::before {
  background-color: #ffffff;
}

.box-active .figure1::after {
  border-top: 17px solid #ffffff;
}

.box-active .figure2 {
  background-color: #ffffff;
}

.box-active .figure2::after {
  border-top: 24px solid #ffffff;
}

.box-active .figure3 {
  background-color: #ffffff;
}

.box-active .figure3::after {
  border-bottom: 17px solid #ffffff;
}

.box-active .figure4 {
  background-color: #ffffff;
}

.relative {
  position: relative;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}

</style>