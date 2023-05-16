<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="product" class="mx-auto product-card" outlined>
          <v-img
            :src="product.image"
            alt="product.name"
            height="200"
            width="300"
            class="align-center pa-2"
          ></v-img>
          <v-card-title class="headline">{{ product.name }}</v-card-title>
          <v-card-subtitle>{{ product.description }}</v-card-subtitle>
          <v-card-text>
            <div class="title">Price: ${{ product.price }}</div>
            <!-- Add more details as required -->
            <div class="subtitle">Category: {{ product.category }}</div>
            <div>Stock: {{ product.stock }}</div>
            <div>SKU: {{ product.sku }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addToCart(product)"
              >Add to Cart</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null,
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      this.product = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.product-card {
  margin-top: 16px; /* Adjust this value as needed */
}
</style>
