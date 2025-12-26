// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./model/Tour');

const seedData = [
  {
    title: "Sundarban Day Trip",
    price: "₹2,500",
    excerpt: "Explore mangroves & wildlife",
    days: "1 Day",
    image: "/images/sundarban.jpg"
  },
  {
    title: "Heritage Bengal Tour",
    price: "₹7,500",
    excerpt: "Culture, history & literature",
    days: "3 Days",
    image: "/images/heritage.jpg"
  }
];

async function seed() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✔");

    // 2. Remove existing data
    await Tour.deleteMany({});
    console.log("Old data deleted ✔");

    // 3. Insert new data
    await Tour.insertMany(seedData);
    console.log("New tours seeded ✔");

    // 4. Close connection
    mongoose.connection.close();
    console.log("Connection closed ✔");
  } catch (err) {
    console.log("Seed error:", err);
  }
}

seed();
