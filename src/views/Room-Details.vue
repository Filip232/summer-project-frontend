<template>
  <div>
    <Header :title="locale.roomDetailsParents">
      <svg class="header-icon">
        <use xlink:href="#icon-kitchen"/>
      </svg>
      <template v-slot:price>
        <span class="header-text">3 092 zł</span>
      </template>
      <template v-slot:other>
        <svg class="header-menu-icon">
          <use xlink:href="#icon-interface"/>
        </svg>
        <svg class="header-menu-icon">
          <use xlink:href="#icon-paper-with-text"/>
        </svg>
      </template>
    </Header>
    <main>
      <div class="d-f-se-c">
        <div class="nav-box">
          <svg class="nav-icon">
            <use xlink:href="#icon-interface"/>
          </svg>
          <span class="nav-text">
          Elo
        </span>
        </div>
        <div class="nav-box">
          <svg class="nav-icon">
            <use xlink:href="#icon-paper-with-text"/>
          </svg>
          <span class="nav-text">
          Elo
        </span>
        </div>
        <div class="nav-box active">
          <svg class="nav-icon">
            <use xlink:href="#icon-paper-with-text"/>
          </svg>
          <span class="nav-text">
          {{ locale.roomDetailsWalls }}
        </span>
        </div>
        <div class="nav-box">
          <svg class="nav-icon">
            <use xlink:href="#icon-paper-with-text"/>
          </svg>
          <span class="nav-text">
          Elo
        </span>
        </div>
        <div class="nav-box">
          <div class="icon-pair">
            <svg class="nav-tv-icon">
              <use xlink:href="#icon-television"/>
            </svg>
            <svg class="nav-lamp-icon">
              <use xlink:href="#icon-lamp"/>
            </svg>
          </div>
          <span class="nav-text">
          Elo
        </span>
        </div>
        <div class="nav-box">
          <svg class="nav-icon">
            <use xlink:href="#icon-flash"/>
          </svg>
          <span class="nav-text">
          Elo
        </span>
        </div>
        <div class="nav-box">
          <svg class="nav-icon">
            <use xlink:href="#icon-bath"/>
          </svg>
          <span class="nav-text">
          Elo
        </span>
        </div>
      </div>
      <span class="saving">{{ locale.roomDetailsSave }}</span>
      <validation-observer ref="roomdetails">
        <form novalidate="true" @submit.prevent="onSubmit">
          <div class="w_40">
            <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-5">
              <label for="name" class="font-12 color-555555 m-b-2">{{ locale.roomDetailsRoomName }}</label>
              <input type="text" id="name" v-model="roomName" class="font-16 bg-f8f8f8 p-5 w_100-bbox">
              <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-5 relative">
              <label for="area" class="font-12 color-555555 m-b-2">{{ locale.roomDetailsRoomArea }}</label>
              <input type="number" id="area" v-model="roomArea" class="font-16 bg-f8f8f8 p-5 w_100-bbox">
              <span class="font-12 color-555555 square-meters">m²</span>
              <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-5">
              <label for="number" class="font-12 color-555555 m-b-2">{{ locale.roomDetailsWallNumber }}</label>
              <input type="number" id="number" v-model="wallNumber" class="font-16 bg-f8f8f8 p-5 w_100-bbox"
                     @input="wallsAmount">
              <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
            </validation-provider>
            <div class="font-12 color-555555 m-t-20">{{ locale.roomDetailsInsertWallDetails }}</div>
          </div>
          <ul class="m-t-30 w_70 m-auto ul-wrap">
            <li v-for="n in Number(wallNumber)" :key="n.index" class="wall-box m-t-15 m-l-5 m-r-5">
              <WallDetails @getInput1Value="$event => walls[n-1].measurement1 = $event"
                           @getInput2Value="$event => walls[n-1].measurement2 = $event"
                           @getInput3Value="$event => walls[n-1].measurement3 = $event"
                           @type="$event => walls[n-1].wallType = $event"></WallDetails>
            </li>
          </ul>
          <div class="submit-position">
            <input type="submit" :value="locale.roomDetailsNextStep" class="submit-btn m-t-30">
          </div>
        </form>
      </validation-observer>
    </main>
  </div>
</template>

<script lang="js">
// @ is an alias to /src
import Header from "../components/Header";
import WallDetails from "@/components/WallDetails";
import {ValidationProvider, ValidationObserver} from 'vee-validate';
import {extend} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';
import locale from '@/assets/locales/pl-PL/locale.json';

extend('required', required);

export default {
  name: 'Room-Details',
  components: {
    Header,
    WallDetails,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      locale,
      roomName: '',
      roomArea: 0,
      wallNumber: 0,
      walls: [],

    }
  },
  methods: {
    wallsAmount() {
      this.walls = [];
      for (let i = 0; i < this.wallNumber; i++) {
        let measurement = {
          measurement1: 0,
          measurement2: 0,
          measurement3: 0,
          wallType: 1
        };
        this.walls.push(measurement);
      }
    },
    onSubmit() {
      this.$refs.roomdetails.validate().then(async success => {
        if (!success) {
          return;
        }
        for(let i = 0; i < this.walls.length; i++){
          if(this.walls[i].wallType === 4){
            this.walls[i].measurement3 = 0;
          }
        }
        this.$store.commit('roomDetails', {
          roomName: this.roomName,
          roomArea: this.roomArea,
          walls: this.walls
        });
        this.$router.push('/estimate');
      })
    }
  }
}
</script>

<style scoped lang="scss">

.header-icon {
  fill: #fcc833;
  height: 20px;
  width: 20px;
}

.header-menu-icon {
  fill: #555555;
  height: 20px;
  width: 20px;
  padding: 5px
}

.header-menu-icon:hover {
  fill: #ffffff;
  background-color: #fcc833;
}

.header-text {
  font-size: 16px;
  color: #fcc833;
}

.nav-icon {
  height: 20px;
  width: 20px;
  padding: 5px;
  fill: #555555;
}

.nav-lamp-icon {
  padding: 0;
  height: 20px;
  width: 20px;
  fill: #555555;
}

.nav-tv-icon {
  padding: 0;
  height: 12px;
  width: 12px;
  fill: #555555;
}

.icon-pair {
  padding: 5px;
}


.nav-box:hover .nav-tv-icon {
  fill: #ffffff;
}

.nav-box:hover .nav-lamp-icon {
  fill: #ffffff;
}

.nav-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
}

.nav-box:hover {
  background-color: #fcc833;

}

.nav-box:hover .nav-icon {
  fill: #ffffff;
}

.nav-text {
  font-size: 12px;
  color: #ffffff;
}

.active {
  background-color: #fcc833;
}

.active .nav-icon {
  fill: #ffffff;
}

.saving {
  font-size: 10px;
  padding-left: 10px;
  padding-top: 10px;
}

.w_40 {
  width: 40%;
  margin: 15px auto 0;
  text-align-last: center;
}

.relative {
  position: relative;
}

.square-meters {
  position: absolute;
  bottom: 4px;
  right: -25px;
}

.w_100-bbox {
  width: 100%;
  box-sizing: border-box;
}

.figure1 {
  height: 12px;
  width: 35px;
  background-color: #555555;
  position: relative;
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

.submit-btn {
  background-color: #fcc833;
  font-size: 20px;
  font-family: 'Roboto';
  text-align-last: center;
  padding: 10px 20px;
  color: #ffffff;
}

.submit-position {
  display: flex;
  margin: 0 auto;
  width: 50%;
  justify-content: flex-end;
}

</style>