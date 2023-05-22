<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col>
          <h1>
            Welcome to Luana & Maria's Bakery <br />
            Your sweetest destination!
          </h1>
        </v-col>
      </v-row>

      <template>
        <v-row>
          <v-col>
            <h2>Special Offers</h2>
            <v-carousel>
              <v-carousel-item
                v-for="(offer, index) in specialOffers"
                :key="index"
                :src="'http://localhost:3000' + offer.imageUrl"
              >
                <v-row
                  class="fill-height"
                  style="width: 250px; height: 150px"
                  justify="start"
                >
                  <v-card
                    @click="navigateToItem(offer)"
                    color="rgba(0, 0, 0, 0.6)"
                    dark
                    class="justify-end"
                    style="width: 100%"
                  >
                    <v-card-title>{{ offer.name }}</v-card-title>
                    <v-card-subtitle class="subtitles"
                      >Quantity: ${{ offer.quantity }}</v-card-subtitle
                    >
                    <v-card-subtitle class="subtitles"
                      >Price: ${{ offer.price }}</v-card-subtitle
                    >
                    <v-card-subtitle class="final-price subtitles"
                      >Discount: ${{
                        offer.discounted.toFixed(2)
                      }}</v-card-subtitle
                    >
                    <v-card-subtitle
                      class="discount-price subtitles"
                      v-if="offer.discountRate !== 0"
                    >
                      Final Price: ${{ offer.finalPrice.toFixed(2) }} ({{
                        offer.discountRate
                      }}% off)
                    </v-card-subtitle>
                    <v-card-subtitle class="expires subtitles"
                      >Expires: {{ offer.expires }}</v-card-subtitle
                    >
                  </v-card>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </template>

      <v-row>
        <v-col>
          <h2>Our Popular Items</h2>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(item, index) in popularItems"
              :key="index"
            >
              <v-card @click="navigateToItem(item)">
                <div class="d-flex justify-center">
                  <v-img
                    :src="'http://localhost:3000' + item.imageUrl"
                    :alt="item.name"
                    height="200"
                    width="300"
                    class="align-center pa-2"
                  ></v-img>
                </div>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle class="subtitles"
                  >Quantity: ${{ item.quantity }}</v-card-subtitle
                >
                <v-card-subtitle class="subtitles"
                  >Price: ${{ item.originalPrice }}</v-card-subtitle
                >
                <v-card-subtitle class="final-price subtitles"
                  >Discount: ${{ item.discounted.toFixed(2) }}</v-card-subtitle
                >
                <v-card-subtitle
                  class="discount-price subtitles"
                  v-if="item.discountRate !== 0"
                >
                  Final Price: ${{ item.finalPrice.toFixed(2) }} ({{
                    item.discountRate
                  }}% off)
                </v-card-subtitle>
                <v-card-subtitle class="expires subtitles"
                  >Expires: {{ item.expires }}</v-card-subtitle
                >
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'HomePage',
  data() {
    return {
      specialOffers: [],
      popularItems: [],
    };
  },
  created() {
    axios
      .get('http://localhost:3000/products?specialOffer=true')
      .then((response) => {
        this.specialOffers = response.data.map((offer) => {
          const calculatedOffer = this.calculatePrice(offer);
          return {
            ...offer,
            ...calculatedOffer,
            expires: this.calculateExpiration(offer),
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3000/products?popularItem=true')
      .then((response) => {
        this.popularItems = response.data.map((item) => {
          const calculatedItem = this.calculatePrice(item);
          return {
            ...item,
            ...calculatedItem,
            expires: this.calculateExpiration(item),
          };
        });
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
      const expirationDate = moment(product.created_at).add(3, 'days');
      return expirationDate.format('YYYY-MM-DD');
    },

    navigateToItem(item) {
      this.$router.push({ name: 'product-detail', params: { id: item._id } });
    },
  },
};
</script>

<style scoped>
.expires {
  font-weight: bold !important;
  color: red !important;
}

.subtitles {
  font-weight: bold !important;
  padding: 4px;
  margin-left: 12px;
}

h1,
h2 {
  text-align: center;
  color: #8b4513;
  font-family: 'Georgia', serif;
  margin-top: 30px;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 2em;
  margin-bottom: 30px;
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

.subtitles {
  font-weight: bold !important;
  padding: 4px;
  margin-left: 12px;
}

.v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
