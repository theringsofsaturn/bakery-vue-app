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
                :src="'http://localhost:3000' + product.imageUrl"
                :alt="product.name"
                height="200"
                width="300"
                class="align-center pa-2"
              ></v-img>
            </div>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>Price: ${{ product.price }}</v-card-subtitle>
            <v-card-subtitle
              >Discount Price: ${{ product.discountPrice }}</v-card-subtitle
            >
            <v-card-subtitle>Expires: {{ product.expires }}</v-card-subtitle>
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
import moment from 'moment';

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
        this.productList = response.data.map((product) => ({
          ...product,
          discountPrice: this.calculatePrice(product),
          expires: this.calculateExpiration(product),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    calculatePrice(product) {
      const daysPassed = moment().diff(moment(product.created_at), 'days');
      if (daysPassed === 0) {
        return product.price;
      } else if (daysPassed === 1) {
        return product.price * 0.8;
      } else if (daysPassed === 2) {
        return product.price * 0.2;
      } else {
        return 0;
      }
    },
    calculateExpiration(product) {
      const expirationDate = moment(product.created_at).add(3, 'days');
      return expirationDate.format('YYYY-MM-DD');
    },
    viewDetails(product) {
      this.$router.push({
        name: 'product-detail',
        params: { id: product._id },
      });
    },
  },
};
</script>
