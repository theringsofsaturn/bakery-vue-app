<template>
  <v-app>
    <TopNavBar></TopNavBar>
    <router-view />
  </v-app>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue';

export default {
  components: {
    TopNavBar,
  },
};
</script>

<style></style>
