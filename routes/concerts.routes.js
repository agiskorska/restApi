const express = require('express');
const router = express.Router();
const db = require('../db');


router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const random = Math.ceil(Math.random() * 10);
  const length = db.concerts.length;
  const id = random%length +1;
  console.log(random,length,id);
  res.send(res.json(db.concerts.filter(concert => concert.id == id)));
});

router.route('/concerts/:id').get((req, res) => {
  res.send(res.json(db.concerts.filter(concert => concert.id == req.params.id)));
});

router.route('/concerts').post((req, res) => {
  const id = db.concerts.length;
  req.body.id = id;
  res.json(req.body);
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts = db.concerts.map(item => {
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

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(req.params.id, 1);
  res.json({ message: "Ok!" });
});

module.exports = router;