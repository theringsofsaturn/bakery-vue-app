<template>
  <div class="product-detail-page">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card v-if="product" class="product-card" outlined>
            <v-img
              :src="'http://localhost:3000' + product.imageUrl"
              :alt="product.name"
              class="product-image"
            ></v-img>

            <v-card-title class="headline text-center mt-3">{{
              product.name
            }}</v-card-title>

            <v-card-text>
              <div class="text-center">
                <h3 class="mt-0 mb-2">Ingredients</h3>
                <v-chip
                  v-for="ingredient in product.ingredients"
                  :key="ingredient.name"
                  class="mx-1 my-1"
                  color="secondary"
                  text-color="white"
                >
                  {{ ingredient.name }} - {{ ingredient.quantity }}
                  {{ ingredient.unit }}
                </v-chip>
              </div>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="addToCart(product)"
                >Add to Cart</v-btn
              >
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <div class="title">Price: ${{ product.price }}</div>
              <div class="subtitle">
                Discount Price: ${{ product.discountPrice }}
              </div>
              <div class="subtitle">Expires: {{ product.expires }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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

<style scoped>
.product-detail-page {
  padding: 70px 0;
}

.product-card {
  transition: transform 0.2s;
  padding: 20px;
}

.product-card:hover {
  transform: scale(1.03);
}

.product-image {
  width: 100%;
  transition: transform 0.2s;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.product-image:hover {
  transform: scale(1.1);
}

.headline {
  color: #8b4513;
  font-family: 'Georgia', serif;
  font-size: 1.5em;
}

.v-chip {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.title,
.subtitle {
  font-weight: bold;
  padding: 10px 0;
}

.v-btn {
  display: inline-block;
  background: linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d);
  color: white;
  font-weight: bold;
  border-radius: 20px;
  text-align: center;
  padding: 4px 20px;
  margin-top: 12px;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.v-btn:hover {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>
