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

      <v-row>
        <v-col>
          <h2>Special Offers</h2>
          <v-carousel>
            <v-carousel-item
              v-for="(offer, index) in specialOffers"
              :key="index"
            >
              <v-card>
                <div class="d-flex justify-center">
                  <v-img
                    :src="offer.image"
                    alt="offer.name"
                    height="400"
                    width="600"
                    contain
                    class="align-center"
                  ></v-img>
                </div>
                <v-card-title>{{ offer.name }}</v-card-title>
                <v-card-text>Price: ${{ offer.price }}</v-card-text>
                <v-card-text
                  >Discount Price: ${{ offer.discountPrice }}</v-card-text
                >
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

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
                    :src="item.image"
                    alt="item.name"
                    height="200"
                    width="300"
                    contain
                    class="align-center pa-2"
                  ></v-img>
                </div>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>Price: ${{ item.price }}</v-card-subtitle>
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
      .get('http://localhost:3000/specialOffers')
      .then((response) => {
        this.specialOffers = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3000/popularItems')
      .then((response) => {
        this.popularItems = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
