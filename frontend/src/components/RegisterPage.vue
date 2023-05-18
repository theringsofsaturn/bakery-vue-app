<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                name="email"
                prepend-icon="mdi-email"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data: () => ({
    valid: true,
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
  }),
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:3000/register', {
            username: this.email,
            password: this.password,
          });

          localStorage.setItem('token', response.data.token);
          this.$router.push('/login');
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    },
  },
};
</script>
