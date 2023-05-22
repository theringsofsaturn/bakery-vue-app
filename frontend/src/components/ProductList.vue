<!-- eslint-disable vue/no-use-v-if-with-v-for -->
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
          v-if="product.available"
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
            <v-card-subtitle class="subtitles"
              >Quantity: ${{ product.quantity }}</v-card-subtitle
            >
            <v-card-subtitle class="subtitles">
              Price: ${{ product.originalPrice }}
            </v-card-subtitle>
            <v-card-subtitle class="final-price subtitles"
              >Discount: ${{ product.discounted.toFixed(2) }}</v-card-subtitle
            >
            <v-card-subtitle
              class="discount-price subtitles"
              v-if="product.discountRate !== 0"
            >
              Final Price: ${{ product.finalPrice.toFixed(2) }} ({{
                product.discountRate
              }}% off)
            </v-card-subtitle>
            <v-card-subtitle class="expires subtitles"
              >Expires: {{ product.expires }}</v-card-subtitle
            >
            <div
              class="details-btn"
              @click="viewDetails(product)"
              role="button"
              tabindex="0"
            >
              View Details
            </div>
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
        this.productList = response.data
          .map((product) => {
            const calculatedProduct = this.calculatePrice(product);
            return {
              ...product,
              ...calculatedProduct,
              expires: this.calculateExpiration(product),
            };
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    calculatePrice(product) {
      const daysPassed = moment()
        .startOf('day')
        .diff(moment(product.createdAt).startOf('day'), 'days');
      let finalPrice = 0;
      let available = true;
      let discountRate = 0;

      if (daysPassed === 0) {
        finalPrice = 0;
        discountRate = 0;
      } else if (daysPassed === 1) {
        finalPrice = product.price * 0.2;
        discountRate = 20;
      } else if (daysPassed === 2) {
        finalPrice = product.price * 0.8;
        discountRate = 80;
      } else if (daysPassed === 3) {
        finalPrice = product.price * 0.9;
        discountRate = 90;
      } else if (daysPassed > 3) {
        finalPrice = product.price * 0.95;
        discountRate = 95;
      } else {
        finalPrice = product.price;
        available = false;
      }

      let discounted = product.price - finalPrice;

      return {
        originalPrice: product.price,
        finalPrice: finalPrice,
        discounted: discounted,
        available,
        discountRate,
      };
    },

    calculateExpiration(product) {
      const expirationDate = moment(product.created_at).add(7, 'days');
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

<style scoped>
h1 {
  text-align: center;
  color: #8b4513;
  font-family: 'Georgia', serif;
  margin-top: 30px;
  font-size: 2.5em;
}

.v-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.v-card:hover {
  transform: scale(1.03);
}

.v-img {
  transition: transform 0.2s;
}

.v-img:hover {
  transform: scale(1.1);
}

.expires {
  font-weight: bold !important;
  color: red !important;
}

.discount-price {
  color: green !important;
}

.subtitles {
  font-weight: bold !important;
  padding: 4px;
  margin-left: 12px;
}

.details-btn {
  display: inline-block;
  background: #8b4513;
  width: 100px;
  height: 40px;
  line-height: 40px; /* vertically center the text */
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 4px;
  margin: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

.details-btn:hover {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>
