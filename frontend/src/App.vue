<template>
  <v-app>
    <TopNavBar></TopNavBar>
    <router-view />
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    TopNavBar,
    AppFooter,
  },
};
</script>

<style></style>
