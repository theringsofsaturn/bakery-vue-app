<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="displayProducts"
          class="elevation-1"
        >
          <template v-slot:item.price="{ item }">
            {{ calculatePrice(item) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
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
          <v-card>
            <v-card-title>
              <span class="headline">{{
                editedIndex === -1 ? 'New Item' : 'Edit Item'
              }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
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
      price: 0,
      quantity: 0,
      description: '',
    },
    defaultItem: {
      id: '',
      name: '',
      price: 0,
      quantity: 0,
      description: '',
    },
  }),

  methods: {
    getProducts() {
      axios.get('http://localhost:3000/products').then((response) => {
        this.products = response.data;
        this.displayProducts = [...this.products];
      });
    },

    editItem(item) {
      this.editedIndex = this.displayProducts.indexOf(item);
      if (this.editedIndex !== -1) {
        this.editedItem = Object.assign({}, item);
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
      if (this.editedIndex > -1) {
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
        let product = {
          name: this.editedItem.name,
          price: parseFloat(this.editedItem.price),
          quantity: parseInt(this.editedItem.quantity),
          description: this.editedItem.description,
        };
        axios
          .post('http://localhost:3000/products', product)
          .then((response) => {
            this.displayProducts.push(response.data);
            this.close();
          })
          .catch((error) => console.error(error));
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
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
