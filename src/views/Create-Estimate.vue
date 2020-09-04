<template>
  <div>
    <Header :title="locale.createEstimateTitle"></Header>
    <ValidationObserver ref="estimateform">
      <form novalidate="true" @submit.prevent="onSubmit"
            class="d-f--c-c m-t-20 m-b-40">
        <validation-provider rules="required" v-slot="{ errors }" class="d-f-c-c m-b-15">
          <label for="solo" class="reset-checkbox checkmark-box">
            <input type="radio" id="solo" name="gender" :value="Job.solo" v-model="job">
            <div class="checkmark d-f-sb-c font-12">
              <svg class="checkbox-icon">
                <use xlink:href="#icon-painter"/>
              </svg>
              {{ locale.createEstimateSolo }}
            </div>
          </label>
          <label for="multi" class="reset-checkbox checkmark-box font-12">
            <input type="radio" id="multi" name="gender" :value="Job.multi" v-model="job" checked>
            <div class="checkmark d-f-sb-c">
              {{ locale.createEstimateMulti }}
              <svg class="checkbox-icon">
                <use xlink:href="#icon-toolbox"/>
              </svg>
            </div>
          </label>
          <span>{{ errors[0] }}</span>
        </validation-provider>
        <span class="m-b-5 color-555555 font-12">{{ locale.createEstimateLocation }}</span>
        <validation-provider rules="required" v-slot="{ errors }" class="d-f--c-c m-b-25 bg-arrow">
          <select name="whereAreYou" v-model="location" class="create-select font-16">
            <option value="Malopolska">Małopolska</option>
            <option value="Slask">Śląsk</option>
            <option value="Podkarpacie">Podkarpacie</option>
          </select>
          <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
        </validation-provider>
        <span class="m-b-5 color-555555 font-12">{{ locale.createEstimateHowManyRooms }}</span>
        <div class="d-f-sb-flexwrap p-v-10">
          <validation-provider rules="required|numeric|between:0,9" v-slot="{ errors }" class="d-f--c-c m-b-15 box"
                               v-for="element in rooms" :key="element.index">
            <svg class="createSvg">
              <use :xlink:href="element.svgId"/>
            </svg>
            <label :for="element.name" class="color-555555">{{ element.desc }}</label>
            <input type="number" :id="element.name" v-model.number="element.amount" :name="element.name"
                   class="font-16" placeholder="0">
            <span class="color-d63c00 font-10 align-self-fe">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <button type="submit" class="bg-fcc833 font-20 color-ffffff next-btn">
          {{ locale.createEstimateGoNext }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from "@/components/Header.vue";
import locale from "../assets/locales/pl-PL/locale.json"
import {ValidationProvider, ValidationObserver} from 'vee-validate';
import {extend} from 'vee-validate';
import {required, numeric, between} from 'vee-validate/dist/rules';
import {Job} from "@/models/Job";

extend('required', required);
extend('numeric', numeric);
extend('between', between);

interface Rooms {
  svgId: string,
  name: string,
  desc: string,
  amount: number
}

@Component({
  name: "Create-Estimate",
  components: {
    Header,
    ValidationObserver,
    ValidationProvider,
  },
})
export default class CreateEstimate extends Vue {
  locale: object = locale;
  Job = Job;
  job: Job = Job.multi;
  location: string = 'Malopolska';
  $refs!: {
    estimateform: InstanceType<typeof ValidationObserver>;
  };
  rooms: Rooms[] = [
    {svgId: "#icon-bathroom", name: "bathroom", desc: locale.createEstimateBathroom, amount: 0},
    {svgId: "#icon-livingroom", name: "livingroom", desc: locale.createEstimateLivingroom, amount: 0},
    {svgId: "#icon-kitchen", name: "kitchen", desc: locale.createEstimateKitchen, amount: 0},
    {svgId: "#icon-bedroom", name: "bedroom", desc: locale.createEstimateBedroom, amount: 0},
    {svgId: "#icon-hall", name: "hall", desc: locale.createEstimateHall, amount: 0},
    {svgId: "#icon-basement", name: "basement", desc: locale.createEstimateBasement, amount: 0},
    {svgId: "#icon-garage", name: "garage", desc: locale.createEstimateGarage, amount: 0},
    {svgId: "#icon-room", name: "room", desc: locale.createEstimateRoom, amount: 0},
    {svgId: "#icon-wardrobe", name: "wardrobe", desc: locale.createEstimateWardrobe, amount: 0}
  ]

  onSubmit() {
    this.$refs.estimateform.validate().then(success => {
      if (!success) {
        return;
      }
      this.$store.commit('addNewEstimate', {
        location: this.location,
        job: this.job,
        bathroom: this.rooms[0].amount,
        livingroom: this.rooms[1].amount,
        kitchen: this.rooms[2].amount,
        bedroom: this.rooms[3].amount,
        hall: this.rooms[4].amount,
        basement: this.rooms[5].amount,
        garage: this.rooms[6].amount,
        room: this.rooms[7].amount,
        wardrobe: this.rooms[8].amount
      })
      this.$router.push('/estimate');
    });
  }

}


</script>

<style scoped lang="scss">

.createSvg {
  height: 75px;
  width: 75px;
  fill: #555555;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 30vw;
  background-color: #f8f8f8;
}

.box input {
  width: 100%;
  text-align-last: center;
  background-color: transparent;
}

.box label {
  font-size: 12px;
  padding: 10px;
}

.next-btn {
  padding: 10px 5px;
}

.create-select {
  width: 220px;
  height: 30px;
  text-align-last: center;
  background-color: #f8f8f8;
}

.bg-arrow {
  position: relative;
}

.bg-arrow::before {
  content: "";
  height: 20px;
  width: 20px;
  top: 5px;
  left: 187px;
  background-image: url("../assets/015-right-arrow-1.svg");
  background-repeat: no-repeat;
  position: absolute;
  transform: rotateZ(90deg);
  pointer-events: none;
}

.reset-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark-box {
  width: 40%;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkmark {
  text-align: center;
  color: #555555;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: #f8f8f8;
}

.checkmark-box input:checked ~ .checkmark {
  background-color: #fcc833;
  color: #ffffff;
}

.checkmark-box:hover input ~ .checkmark {
  background-color: #fcc833;
  color: #ffffff;
}

.checkbox-icon {
  fill: currentColor;
  height: 30px;
  width: 60px;
  padding: 3px;
}

@media (min-width: 480px) {
  .checkmark-box {
    width: 35%;
  }
}

@media (min-width: 600px) {
  .checkmark-box {
    width: 30%;
  }
}

</style>