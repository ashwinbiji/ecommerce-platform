const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const products = require('./data/products');

// Load env variables so we have the MongoDB connection string
dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out any existing products to prevent duplicates
    await Product.deleteMany(); 

    // Find your existing Admin account
    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      console.error('No admin user found. Please ensure you set isAdmin to true in Atlas.');
      process.exit(1);
    }

    // Attach the admin user ID to every sample product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    // Bulk insert the data
    await Product.insertMany(sampleProducts);

    console.log('Sample Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check terminal arguments to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}