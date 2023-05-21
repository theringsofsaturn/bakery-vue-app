<template>
  <v-app-bar app color="gradient" dense>
    <v-toolbar-title class="logo-toolbar">
      <v-img
        class="logo-img mx-2"
        contain
        src="https://res.cloudinary.com/dqiyjy9ye/image/upload/v1684631115/random/Brown_Simple_Illustrated_Dessert_Cafe_Logo_2_lqqg4r.png"
      ></v-img>
      <div class="logo-title">Luana & Maria's Bakery</div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/products">Products</v-btn>
    <v-btn text to="/dashboard">Dashboard</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> Menu </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="!isLoggedIn" @click="goToLogin">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn" @click="goToRegister">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" @click="goToProfile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopNavBar',

  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    };
  },

  created() {
    this.updateLoginStatus();
    this.$root.$on('loginStatusChanged', this.updateLoginStatus);
  },

  beforeDestroy() {
    this.$root.$off('loginStatusChanged', this.updateLoginStatus);
  },

  methods: {
    updateLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },

    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
      this.$root.$emit('loginStatusChanged');
    },

    goToLogin() {
      this.$router.push({ name: 'login' });
    },

    goToRegister() {
      this.$router.push({ name: 'register' });
    },

    goToProfile() {
      this.$router.push({ name: 'profile' });
    },

    goToDashboard() {
      this.$router.push({ name: 'dashboard' });
    },
  },
};
</script>

<style>
.logo-toolbar {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 50px;
  width: 50px;
}

.logo-title {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: white;
}

.gradient {
  background: linear-gradient(to right, #f5deb3, #8b4513);
}
</style>
