require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./model/Post');

const posts = [
  {
    title: 'How to travel Bakkhali on a budget',
    excerpt: 'Short tips to enjoy the beach without breaking your wallet.',
    content: 'Full blog html or markdown...',
    category: 'Tips',
    image: 'https://source.unsplash.com/collection/190727/800x600',
    date: new Date('2025-12-01')
  },
  // add more...
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Post.deleteMany({});
    await Post.insertMany(posts);
    console.log('seeded posts');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seed();
