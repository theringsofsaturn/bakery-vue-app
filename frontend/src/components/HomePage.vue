<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col>
          <h1>
            Welcome to Luana & Maria's Bakery - Your sweetest destination!
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
                    color="rgba(0, 0, 0, 0.6)"
                    dark
                    class="justify-end"
                    style="width: 100%"
                  >
                    <v-card-title>{{ offer.name }}</v-card-title>
                    <v-card-subtitle class="subtitles"
                      >Quantity: ${{ offer.quantity }}</v-card-subtitle
                    >
                    <v-card-subtitle class="subtitles">Price: ${{ offer.price }}</v-card-subtitle>
                    <v-card-subtitle class="discount-price subtitles"
                      >Discount Price: ${{
                        offer.discountPrice
                      }}</v-card-subtitle
                    >
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
              <v-card>
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
                <v-card-subtitle class="subtitles" >Price: ${{ item.price }}</v-card-subtitle>
                <v-card-subtitle class="discount-price subtitles"
                  >Discount Price: ${{ item.discountPrice }}</v-card-subtitle
                >
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
        this.specialOffers = response.data.map((offer) => ({
          ...offer,
          discountPrice: this.calculatePrice(offer),
          expires: this.calculateExpiration(offer),
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3000/products?popularItem=true')
      .then((response) => {
        this.popularItems = response.data.map((item) => ({
          ...item,
          discountPrice: this.calculatePrice(item),
          expires: this.calculateExpiration(item),
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
</style>
