# Luana & Maria's Bakery

[interlogica-test.webm](https://github.com/theringsofsaturn/interlogica-test/assets/60050952/32ef3cc0-cf81-45bb-8272-7e096b1daccc)


Welcome to Luana & Maria's Bakery, the sweetest destination for delicious treats!

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

Luana & Maria's Bakery is a web application that allows users to browse and purchase a variety of delectable pastries. The application provides both a customer-facing frontend where users can view and order products, as well as an admin dashboard for managing products and inventory.

## Features

- User Authentication:
  - Users can create accounts and log in using their email and password.
- Product Management:
  - Admin users have access to the admin dashboard for managing products.
  - CRUD (Create, Read, Update, Delete) operations are available for products.
  - Products can have names, prices, quantities, descriptions, and images.
- Special Offers:
  - Products have different prices based on the number of days since they were created.
  - Prices decrease over time, and expired products are removed from the listing.
- Popular Items:
  - The homepage displays a selection of popular products.
- Product Showcase:
  - The product list page showcases all available products.
- Product Details:
  - Each product has a dedicated page with detailed information, including ingredients.

## Installation

To run Luana & Maria's Bakery locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/luana-maria-bakery.git
   ```

2. Navigate to the project directory:
   ```
   cd luana-maria-bakery
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up the backend:

- Set up a MongoDB database and update the `config/db.js` file with the connection details.
- Run the backend server:
  ```
  npm run server
  ```

5. Set up the frontend:

- Update the API base URL in `src/config.js` to match your backend server URL.
- Run the frontend server:
  ```
  npm run serve
  ```

6. Access the application in your browser at `http://localhost:8080`.

## Usage

- Open your browser and navigate to `http://localhost:8080`.
- Create an account or log in using existing credentials.
- Browse the available products, view details, and add items to your cart.
- Proceed to the checkout page to finalize your order.

## Contributing

Contributions to Luana & Maria's Bakery are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request with a description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
