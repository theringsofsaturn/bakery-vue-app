<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-data-table :headers="headers" :items="products" class="elevation-1">
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

export default {
  name: 'AdminDashboard',
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Product ID', value: 'id' },
      { text: 'Product Name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Available Quantity', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      price: '',
      quantity: '',
    },
    defaultItem: {
      name: '',
      price: '',
      quantity: '',
    },
  }),
  methods: {
    getProducts() {
      axios.get('http://localhost:3000/products').then((response) => {
        this.products = response.data;
      });
    },
    editItem(item) {
      const index = this.products.indexOf(item);

      if (index !== -1) {
        this.editedIndex = index;
        this.editedItem = Object.assign({}, this.products[index]);
        this.dialog = true;
      } else {
        console.error('Item not found');
      }
    },
    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
        axios
          .delete(`http://localhost:3000/products/${item.id}`)
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            this.products.splice(index, 1);
          });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        axios
          .put(
            `http://localhost:3000/products/${this.editedItem.id}`,
            this.editedItem
          )
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            Object.assign(this.products[this.editedIndex], this.editedItem);
          });
      } else {
        axios
          .post('http://localhost:3000/products', this.editedItem)
          .then((response) => {
            this.products.push(response.data);
          });
      }
      this.close();
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
