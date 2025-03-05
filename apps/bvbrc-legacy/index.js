require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// express
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'BV-BRC Legacy' });
});

// api routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BV-BRC Legacy API is running' });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error', 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// start server
app.listen(port, () => {
  console.log(`BV-BRC Legacy server running on http://localhost:${port}`);
});