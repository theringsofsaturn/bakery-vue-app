<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col>
          <h1>All Products</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(product, index) in productList"
          :key="index"
        >
          <v-card>
            <div class="d-flex justify-center">
              <v-img
                :src="product.image"
                alt="product.name"
                height="200"
                width="300"
                class="align-center pa-2"
              ></v-img>
            </div>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>Price: ${{ product.price }}</v-card-subtitle>
            <v-btn @click="viewDetails(product)" class="details-btn"
              >View Details</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      productList: [],
    };
  },
  created() {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        this.productList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    viewDetails(product) {
      this.$router.push({ name: 'product-detail', params: { id: product.id } });
    },
  },
};
</script>

<style scoped>
.details-btn {
  background-color: #f50057 !important;
  color: white;
  margin: 10px;
}
</style>
