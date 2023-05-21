<!-- Footer -->
<template>
  <v-footer color="gradient" app>
    <v-container fluid text-xs-center>
      <v-row align="center">
        <v-col xs="12">
          <div class="white--text">
            &copy; {{ new Date().getFullYear() }} - Luana & Maria's Bakery
          </div>
        </v-col>
        <v-col xs="12">
          <v-btn
            class="mx-2 white--text"
            fab
            small
            color="blue darken-1"
            href="https://www.facebook.com"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            class="mx-2 white--text"
            fab
            small
            color="red darken-1"
            href="https://www.instagram.com"
          >
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn
            class="mx-2 white--text"
            fab
            small
            color="blue darken-3"
            href="https://www.twitter.com"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style>
.gradient {
  background: linear-gradient(to right, #f5deb3, #8b4513);
}
</style>
