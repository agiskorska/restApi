const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatssRoutes = require('./routes/seats.routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'mongodb+srv://Aga:temporary123@cluster0.x1qny.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/newWavetest';
else dbUri = 'mongodb+srv://Aga:temporary123@cluster0.x1qny.mongodb.net/NewWaveDB?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(helmet());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors(corsOptions));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatssRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});;

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
});

module.exports = server
