<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mt-3 mb-3"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card class="pa-3 elevation-12 dialog-v-card">
            <v-card-title>
              <span class="headline">{{
                editedIndex === -1 ? 'New Item' : 'Edit Item'
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-header>Product</v-header>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-model="editedItem.image"
                      label="Image"
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      placeholder="Select a product image"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-header>Ingredients</v-header>
                  </v-col>
                </v-row>
                <v-row
                  v-for="(ingredient, index) in editedItem.ingredients"
                  :key="index"
                >
                  <v-col cols="12" sm="3">
                    <v-text-field
                      v-model="ingredient.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      v-model="ingredient.quantity"
                      label="Quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      v-model="ingredient.unit"
                      label="Unit"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="1" class="align-self-center">
                    <v-btn small @click="removeIngredient(index)">Remove</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn small @click="addIngredient">Add Ingredient</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="displayProducts"
          class="elevation-1"
        >
          <template v-slot:item.price="{ item }">
            {{ calculatePrice(item) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  small
                  class="mr-2"
                  v-bind="attrs"
                  @click="editItem(item)"
                  v-on="on"
                  >mdi-pencil</v-icon
                >
              </template>
              <span>Edit Item</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" @click="deleteItem(item)" v-on="on"
                  >mdi-delete</v-icon
                >
              </template>
              <span>Delete Item</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'AdminDashboard',

  data: () => ({
    dialog: false,
    headers: [
      { text: 'Product ID', value: '_id' },
      { text: 'Product Name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Available Quantity', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    products: [],
    displayProducts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      price: null,
      quantity: null,
      description: '',
      image: null,
      ingredients: [{ name: '', quantity: null, unit: '' }],
    },
    defaultItem: {
      id: '',
      name: '',
      price: null,
      quantity: null,
      description: '',
      image: null,
      ingredients: [{ name: '', quantity: null, unit: '' }],
    },
  }),

  methods: {
    getProducts() {
      axios.get('http://localhost:3000/products').then((response) => {
        this.products = response.data;
        this.products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        this.displayProducts = [...this.products];
      });
    },

    editItem(item) {
      this.editedIndex = this.displayProducts.indexOf(item);
      if (this.editedIndex !== -1) {
        this.editedItem = Object.assign({}, item);
        this.editedItem.image = null; // Clear the file input when editing an item.
      } else {
        console.error('Item not found in the products list');
        return;
      }
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.displayProducts.indexOf(item);
      if (confirm('Are you sure you want to delete this item?')) {
        axios
          .delete(`http://localhost:3000/products/${item._id}`)
          .then((response) => {
            if (response.status === 200) {
              this.displayProducts.splice(index, 1);
            }
          })
          .catch((error) => console.error(error));
      }
    },

    save() {
      // ...
      if (this.editedIndex > -1) {
        // Update existing product without image upload
        axios
          .put(
            `http://localhost:3000/products/${this.editedItem._id}`,
            this.editedItem
          )
          .then((response) => {
            Object.assign(
              this.displayProducts[this.editedIndex],
              response.data
            );
            this.close();
          })
          .catch((error) => console.error(error));
      } else {
        // Create new product with image upload
        let productData = new FormData();
        productData.append('name', this.editedItem.name);
        productData.append('price', this.editedItem.price);
        productData.append('quantity', this.editedItem.quantity);
        productData.append('description', this.editedItem.description);
        productData.append(
          'ingredients',
          JSON.stringify(this.editedItem.ingredients)
        );
        productData.append('file', this.editedItem.image);

        axios
          .post('http://localhost:3000/upload', productData)
          .then((response) => {
            // After image upload is complete, create the product
            this.editedItem.imageUrl = `/images/${response.data}`;

            return axios.post(
              'http://localhost:3000/products',
              this.editedItem
            );
          })
          .then((response) => {
            this.displayProducts.unshift(response.data);
            this.close();
          })
          .catch((error) => console.error(error));
      }
    },

    addIngredient() {
      this.editedItem.ingredients.push({ name: '', quantity: null, unit: '' });
    },

    removeIngredient(index) {
      this.editedItem.ingredients.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedItem.image = null;
        this.editedIndex = -1;
      }, 300);
    },
  },

  computed: {
    calculatePrice() {
      return (product) => {
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
      };
    },
  },

  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
.rounded-lg {
  border-radius: 1rem;
}
</style>
