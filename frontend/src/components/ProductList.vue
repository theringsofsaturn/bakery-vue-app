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
            <v-card-subtitle class="subtitles"
              >Quantity: ${{ product.quantity }}</v-card-subtitle
            >
            <v-card-subtitle class="subtitles"
              >Price: ${{ product.price }}</v-card-subtitle
            >
            <v-card-subtitle class="discount-price subtitles"
              >Discount Price: ${{ product.discountPrice }}</v-card-subtitle
            >
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

<style scoped>
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
  background: linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d);
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.details-btn:hover {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>
