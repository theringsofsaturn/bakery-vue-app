// Import necessary packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Product from '../models/Product.js';

const productRouter = express.Router();

productRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

productRouter.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

productRouter.post('/products', async (req, res) => {
  try {
    console.log('Received a POST request to /products');
    console.log('Request body:', req.body);
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log('Saved product:', savedProduct);
    res.json(savedProduct);
  } catch (error) {
    console.error('Error handling POST request to /products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

productRouter.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default productRouter;
