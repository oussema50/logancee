const express = require('express');
const connectdb = require('./database/db');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const filterRoute = require('./routes/filter')
const app = express();
const port = process.env.PORT || 5000;
//connect to database
connectdb();
// middleware 
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use(cookieParser());
app.use('/api/category',categoryRoute);
app.use('/api/product',productRoute);
app.use('/api/filter',filterRoute);
app.use('/uploads',express.static('uploads'));
app.listen(port,()=>console.log(`the server is runing on port ${port}`));






