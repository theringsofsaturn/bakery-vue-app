<template>
  <v-app>
    <TopNavBar></TopNavBar>
    <HomePage></HomePage>
    <AppFooter></AppFooter>
    <router-view />
  </v-app>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue';
import AppFooter from './components/AppFooter.vue';
import HomePage from './components/HomePage.vue';

export default {
  components: {
    TopNavBar,
    AppFooter,
    HomePage,
  },
};
</script>

<style></style>
