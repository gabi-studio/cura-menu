const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const menuRoutes = require('./routes/menuRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const dailyMenuRoutes = require('./routes/dailyMenuRoutes');
const auth = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
require('./db');

// setup public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// Setup sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/menu', dailyMenuRoutes);
app.use('/admin', authRoutes); // Login, dashboard, logout
app.use('/admin', auth, adminRoutes); // Admin routes

app.get("/", (req, res) => {
  res.render("home"); 
});


const PORT = process.env.PORT || 8900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
