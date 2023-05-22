<template>
  <v-container class="product-detail-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="6" xl="5">
        <div class="product-image-container">
          <v-img
            :src="'http://localhost:3000' + product.imageUrl"
            :alt="product.name"
            class="product-image"
            width="400"
            height="300"
          ></v-img>
        </div>
      </v-col>

      <v-col cols="12" sm="8" md="6" lg="6" xl="5">
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <h3 class="ingredients-title">Ingredients:</h3>
          <ul class="ingredients-list">
            <li
              class="ingredient-item"
              v-for="ingredient in product.ingredients"
              :key="ingredient.name"
            >
              <v-icon small class="mr-2">mdi-food-variant</v-icon>
              {{ ingredient.name }} - {{ ingredient.quantity }}
              {{ ingredient.unit }}
            </li>
          </ul>
          <h2 class="product-price">Price: ${{ product.originalPrice }}</h2>
          <h3 class="product-discount-amount">
            Discount: ${{ product.discounted.toFixed(2) }}
          </h3>
          <h3 class="product-discount" v-if="product.discountRate !== 0">
            Final Price: ${{ product.finalPrice.toFixed(2) }} ({{
              product.discountRate
            }}% off)
          </h3>
          <div class="product-expiration">Expires: {{ product.expires }}</div>
          <p class="product-description">{{ product.description }}</p>
          <v-btn
            class="add-to-cart-btn"
            color="primary"
            @click="addToCart(product)"
            >Add to Cart</v-btn
          >
        </div>
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
      const calculatedProduct = this.calculatePrice(response.data);
      this.product = {
        ...response.data,
        ...calculatedProduct,
        expires: this.calculateExpiration(response.data),
      };
    } catch (error) {
      console.error(error);
    }
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
  },
};
</script>

<style scoped>
.product-detail-container {
  padding: 60px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fafafa;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.product-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.product-info {
  padding: 20px;
  text-align: center;
}

.product-title {
  font-size: 2em;
  color: #8b4513;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.6em;
  color: #333;
  margin-bottom: 10px;
}

.product-discount {
  font-size: 1.3em;
  color: #b21f1f;
  margin-bottom: 10px;
}

.product-expiration {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 10px;
}

.product-description {
  font-size: 1em;
  color: #333;
  margin-bottom: 20px;
}

.ingredients-title {
  font-size: 1.5em;
  color: #8b4513;
  margin: 20px 0;
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.ingredient-item {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.ingredient-item v-icon {
  padding-right: 10px;
}

.add-to-cart-btn {
  padding: 10px 20px;
  font-size: 1em;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d);
  border-radius: 50px;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
</style>
