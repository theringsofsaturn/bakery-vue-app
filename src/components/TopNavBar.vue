<template>
  <v-app-bar app color="pink accent-3">
    <v-toolbar-title class="logo-toolbar">
      <v-img
        class="logo-img mx-2"
        contain
        src="https://res.cloudinary.com/dqiyjy9ye/image/upload/v1683997190/random/Pink_Cute_Chef_Illustrated_Bakery_Logo_vvxhxo.png"
        alt="Bakery logo"
      ></v-img>
      <div class="logo-title">Luana & Maria's Bakery</div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/products">Products</v-btn>
    <v-btn text to="/login">Login</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopNavBar',
};
</script>

<style>

</style>
