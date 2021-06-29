const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

//DB Connect
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected to DB')
);


//Middlewares
app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');
const candidateRoute = require('./routes/candidates');
const voteRoute = require('./routes/vote');

//Route Middleware
app.use('/user', authRoute);
app.use('/data', candidateRoute);
app.use('/vote', voteRoute);


app.listen(PORT, () => console.log('Server Booted!'));