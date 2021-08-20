const express = require('express');
const router = express.Router();
const db = require('../db');


router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const random = Math.ceil(Math.random() * 10);
  const length = db.seats.length;
  const id = random%length +1;
  console.log(random,length,id);
  res.send(res.json(db.seats.filter(testimonial => testimonial.id == id)));
});

router.route('/seats/:id').get((req, res) => {
  res.send(res.json(db.seats.filter(testimonial => testimonial.id == req.params.id)));
});

router.route('/seats').post((req, res) => {
  const id = db.seats.length;
  req.body.id = id;
  res.json(req.body);
});

router.route('/seats/:id').put((req, res) => {
  db.seats = db.seats.map(item => {
    if (item.id == req.params.id) {
      return {
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
      };
    } else {
      return item;
    };
  })
  res.json({ message: "Ok!" });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(req.params.id, 1);
  res.json({ message: "Ok!" });
});

module.exports = router;