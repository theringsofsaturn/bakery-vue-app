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
          <!-- Will make it a carousel or a grid component -->
          <v-carousel>
            <!-- Loop through special offers -->
            <v-carousel-item
              v-for="(offer, index) in specialOffers"
              :key="index"
            >
              <!-- Display offer details -->
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2>Our Popular Items</h2>
          <!-- Will make it a list or a grid -->
          <v-list>
            <!-- Loop through popular items -->
            <v-list-item v-for="(item, index) in popularItems" :key="index">
              <!-- Display item details -->
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      // Will replace these with actual data
      specialOffers: [],
      popularItems: [],
    };
  },

  // Will fetch the data in created so that it is available when the component is rendered
  created() {
    // Fetch special offers and popular items
  },
};
</script>
