<template>
  <div class="d-f-sb-c bg-f8f8f8">
    <div class="d-f-sb-c">
      <button type="button" class="p-10" @click="back" v-if="this.$route.meta.isBack">
        <svg class="arrow-header">
          <use xlink:href="#icon-right-arrow"/>
        </svg>
      </button>
      <slot></slot>
      <h1 class="m-l-15">{{ title }}</h1>
    </div>
    <slot name="price"></slot>
    <div class="d-f-c-c">
      <slot name="other"></slot>
      <nav :class="{'visible' : isVisible}">
        <button type="click" class="empty-btn hamburger-btn" @click="showMenu">
          <div class="hamburger-menu"></div>
        </button>
        <ul class="menu d-f--c-c">
          <li :class="{ 'active' : this.$router.currentRoute.path === '/home'}">
            <router-link to="/home" class="menu-first-btn">{{ $store.state.activeUser.name }}</router-link>
          </li>
          <li>
            <router-link to="#">{{ locale.menuMesseage }}</router-link>
          </li>
          <li>
            <router-link to="#">{{ locale.menuOffers }}</router-link>
          </li>
          <li>
            <router-link to="#">{{ locale.menuCalendar }}</router-link>
          </li>
          <li :class="{ 'active' : this.$router.currentRoute.path === '/estimate'}">
            <router-link to="/estimate">{{
                locale.menuEstimate
              }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import locale from '@/assets/locales/pl-PL/locale.json';

export default {
  name: 'Header',
  props: {
    title: String
  },
  data() {
    return {
      locale,
      isVisible: false,
    }
  },
  methods: {
    showMenu() {
      if (this.isVisible === false) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h1 {
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #fad879;
}

nav {
  position: relative;
}

.arrow-header {
  fill: #555555;
  height: 25px;
  width: 25px;
  transform: rotateY(180deg);
}

.hamburger-btn {
  height: 46px;
  width: 46px;
  padding: 10px;
}

.hamburger-menu {
  height: 3px;
  width: 24px;
  background-color: #000;
  position: relative;
  transition: 0.2s;
}

.hamburger-menu::after {
  height: 3px;
  width: 24px;
  background-color: #000;
  position: absolute;
  top: 6px;
  left: 0;
  content: '';
  transition: 0.5s;
}

.hamburger-menu::before {
  height: 3px;
  width: 24px;
  background-color: #000;
  position: absolute;
  top: -6px;
  left: 0;
  content: '';
  transition: 0.5s;
}

.menu {
  display: none;
  width: 250px;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 46px;
  background-color: #f8f8f8;
  z-index: 50;
}

.visible .menu {
  display: block;
}

.menu li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #fff;
}

.menu a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 40px;
  color: #555555;
  font-size: 18px;
  background-color: transparent;
}

.menu .active a {
  color: #fff;
  background-color: #fcc833;
}

.menu .menu-first-btn {
  color: #fff;
  background-color: #555555;
}

.visible .hamburger-menu {
  height: 0;
  width: 0;
  transition: 0.5s;
}

.visible .hamburger-menu::after {
  top: 0;
  transform: rotateZ(-45deg);
  transition: 0.5s;
}

.visible .hamburger-menu::before {
  top: 0;
  transform: rotateZ(45deg);
  transition: 0.5s;
}

.menu a:hover {
  background-color: transparent;
  border: 1px solid #fcc833;
  color: #fcc833;
}

</style>
