<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-data-table
              :headers="headers"
              :items="products"
              class="elevation-1"
            >
              <template #item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data: () => ({
    headers: [
      { text: 'Product ID', value: 'id' },
      { text: 'Product Name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Available Quantity', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    products: [],
  }),
  methods: {
    getProducts() {
      axios.get('http://localhost:3000/products').then((response) => {
        this.products = response.data;
      });
    },
    // editItem(item) {
    //   // Will implement this later
    // },
    // deleteItem(item) {
    //   // Will implement this later
    // },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
