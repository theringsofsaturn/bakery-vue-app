<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" class="full-height">
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
<style scoped>
.full-height {
  min-height: calc(
    100vh - 60px - 60px
  ); 
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  padding: 30px;
  background-color: #fafafa;
}

.product-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  transition: transform 0.2s;
  cursor: pointer;
  padding: 20px;
  margin-bottom: 60px;
}

.product-card:hover {
  transform: scale(1.03);
}

.v-img {
  width: 100%; /* Full width of the card */
  transition: transform 0.2s;
}

.v-img:hover {
  transform: scale(1.1);
}

.v-card-title {
  color: #8b4513;
  font-family: 'Georgia', serif;
  text-align: center;
  font-size: 1.5em;
}

.v-card-text {
  font-family: 'Arial', sans-serif;
  color: #333;
  padding-left: 20px;
}

.v-card-text h3 {
  color: #8b4513;
  font-size: 1.2em;
}

.v-card-text ul {
  list-style: disc;
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
  padding: 4px 20px; /* Adjusted padding */
  margin-top: 12px; /* Added margin */
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.v-btn:hover {
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>
