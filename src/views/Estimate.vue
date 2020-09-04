<template>
  <div>
    <Header :title="locale.estimateTitle"></Header>
    <div class="p-t-25 p-v-20">
      <div class="w_100 d-f-fe">
        <router-link to="/create-estimate" class="bg-fcc833 p-10 font-16 color-ffffff">{{
            locale.estimateCreate
          }}
        </router-link>
      </div>
      <div :key="element.index" class="p-t-20"
           v-for="(element, index) in $store.getters.getEstimateCurrentUser">
        <div class=" d-f-sb-c p-l-25 bg-f8f8f8">
          <span class="font-16">TEXT</span>
          <div class="d-f--c">
            <button type="button" class="m-r-30 reset-btn"  @click="$store.commit('deleteEstimate',index)">
              <svg class="trash-bin">
                <use xlink:href="#icon-trash-bin"/>
              </svg>
            </button>
            <router-link to="/room-details" class="bg-fcc833 h_100">
              <svg class="arrow">
                <use xlink:href="#icon-right-arrow"/>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import locale from "../assets/locales/pl-PL/locale.json"

export default {
  name: "Estimate",
  components: {
    Header
  },
  data() {
    return {
      locale
    }
  }
}
</script>

<style scoped lang="scss">

.trash-bin {
  height: 20px;
  width: 20px;
  fill: #555;
}

.arrow {
  height: 25px;
  width: 25px;
  padding: 8px 8px;
  fill: #fff;
}


</style>