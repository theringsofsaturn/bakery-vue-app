<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
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
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data: () => ({
    valid: true,
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'E-mail is required', // This function checks if the email field is not empty. The double negation !!v transforms v into a boolean that is true if v (the email input) is not empty, otherwise, it returns the message 'E-mail is required'.
      (v) => /.+@.+/.test(v) || 'E-mail must be valid', // This function checks if the email input is valid by testing it against a simple regular expression (/.+@.+/). If the input matches the expression, it returns true. If it doesn't match, it returns the message 'E-mail must be valid'.
    ],
    passwordRules: [(v) => !!v || 'Password is required'],
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            username: this.email,
            password: this.password,
          });

          localStorage.setItem('token', response.data.token);

          let redirect = this.$route.query.redirect;
          if (redirect) {
            this.$router.push(redirect);
          } else {
            this.$router.push('/dashboard');
          }
        } catch (error) {
          alert(error.response.data.message);
        }
      }
    },
  },
};
</script>
