<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="product" class="mx-auto product-card" outlined>
          <v-img
            :src="'http://localhost:3000' + product.imageUrl"
            :alt="product.name"
            height="200"
            width="300"
            class="align-center pa-2"
          ></v-img>
          <v-card-title class="headline">{{ product.name }}</v-card-title>
          <v-card-text>
            <h3>Ingredients:</h3>
            <ul>
              <li
                v-for="ingredient in product.ingredients"
                :key="ingredient.name"
              >
                {{ ingredient.name }} - {{ ingredient.quantity }}
                {{ ingredient.unit }}
              </li>
            </ul>
          </v-card-text>

          <v-card-text>
            <div class="title">Price: ${{ product.price }}</div>
            <div class="subtitle">
              Discount Price: ${{ product.discountPrice }}
            </div>
            <div class="subtitle">Expires: {{ product.expires }}</div>
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
import moment from 'moment';

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
      this.product = {
        ...response.data,
        discountPrice: this.calculatePrice(response.data),
        expires: this.calculateExpiration(response.data),
      };
    } catch (error) {
      console.error(error);
    }
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
  },
};
</script>
