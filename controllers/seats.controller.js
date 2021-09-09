const Seat = require('../models/seat.model');
var sanitize = require('mongo-sanitize');


exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getById = async (req, res) => {

  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.post = async (req, res) => {
  const {id, day, seat, client, email} = sanitize(req.body);
  try {
      const newSeat = new Seat({
          id: id,
          day: day,
          seat: seat,
          client: client,
          email: email
      });
      await newSeat.save();
      res.json(newSeat);
      req.io.emit('seatsUpdated', (await Seat.find()));
    } catch (err) {
      res.status(500).json({message: err});
  }
};

exports.update = async (req, res) => {
  const {id, day, seat, client, email} = req.body;

  try {
    await Seat.updateOne({ _id: req.params.id }, { $set: { day, seat, client, email }});
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.delete = async (req, res) => {

  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};