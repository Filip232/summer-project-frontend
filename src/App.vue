<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

html {
  font-family: Roboto;
  font-size: 10px;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

select {
  -webkit-appearance: none;
  border: none;
}

a{
  text-decoration: none;
}

input{
  border: none;
}

@font-face {
  font-family: Roboto;
  src: url(fonts/Roboto/Roboto-Medium.ttf);
  font-style: normal;
  font-weight: 400;
}

.d-f--c {
  display: flex;
  align-items: center;
}

.d-f-c-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.d-f-c {
  display: flex;
  justify-content: center;
}

.d-f--c-c {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.d-f-fe {
  display: flex;
  justify-content: flex-end;
}

.d-f-sb-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.d-f-sb-fe {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.d-f-sb-flexwrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.d-f-se-c {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.align-self-fe {
  align-self: flex-end;
}


.bg-f8f8f8 {
  background-color: #f8f8f8;
}

.bg-fcc833 {
  background-color: #fcc833;
}

.color-transparent{
  color: transparent;
}

.color-8e8e8e {
  color: #8e8e8e;
}

.color-555555{
  color: #555555;
}

.color-d63c00{
  color: #d63c00;
}

.color-ffffff{
  color: #ffffff;
}

.m-b-2{
  margin-bottom: 2px;
}

.m-b-5{
  margin-bottom: 5px;
}

.m-b-15{
  margin-bottom: 15px;
}

.m-b-25{
  margin-bottom: 25px;
}

.m-b-30{
  margin-bottom: 30px;
}

.m-b-40{
  margin-bottom: 40px;
}

.m-b-60{
  margin-bottom: 60px;
}

.m-l-5{
  margin-left: 5px;
}

.m-l-15{
  margin-left: 15px;
}

.m-l-20{
  margin-left: 20px;
}

.m-l-30{
  margin-left: 30px;
}

.m-l-120{
  margin-left: 120px;
}

.m-t-5{
  margin-top: 5px;
}

.m-t-15{
  margin-top: 15px;
}

.m-t-20{
  margin-top: 20px;
}

.m-t-30{
  margin-top: 30px;
}

.m-r-5{
  margin-right: 5px;
}

.m-r-15{
  margin-right: 15px;
}

.m-r-20{
  margin-right: 20px;
}


.m-r-30{
  margin-right: 30px;
}

.m-auto{
  margin: 0 auto;
}

.p-5{
  padding: 5px;
}

.p-10{
  padding: 10px;
}

.p-l-25{
  padding-left: 25px;
}

.p-t-20{
  padding-top: 20px;
}

.p-t-25{
  padding-top: 25px;
}

.p-t-35{
  padding-top: 35px;
}

.p-v-10{
  padding-left: 10px;
  padding-right: 10px;
}

.p-v-20{
  padding-left: 20px;
  padding-right: 20px;
}

.font-10{
  font-size: 10px;
}

.font-12{
  font-size: 12px;
}

.font-16{
  font-size: 16px;
}

.font-20{
  font-size: 20px;
}

.w_70{
  width: 70%;
}


.w_100{
  width: 100%;
}

.h_100{
  height: 100%;
}

</style>
