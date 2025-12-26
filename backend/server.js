// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const contactRoute = require('./routes/contact');
const tourRoutes = require('./routes/tour')
const postRoutes = require('./routes/post');
const uploadRoute = require("./routes/upload");
const adminAuthRoutes = require("./routes/adminAuth");



const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET','POST','PUT','DELETE'],
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// Routes
app.use('/api/tours', tourRoutes);
app.use("/api/upload", uploadRoute);

app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoute);
app.use("/api/admin", adminAuthRoutes);


app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Healthcheck
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
