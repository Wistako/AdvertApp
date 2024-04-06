const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');

// start the server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running');
});

// connect to the database
connectToDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.sessionKey, 
  store: MongoStore.create(mongoose.connection), 
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/api/ads', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));
// app.use('/auth', require('./routes/users.routes'));

app.get((req, res) => {
  res.status(404).send({ message: 'Not found'});
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

