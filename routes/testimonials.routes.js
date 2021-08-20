const express = require('express');
const router = express.Router();
const db = require('../db');


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const random = Math.ceil(Math.random() * 10);
  const length = db.testimonials.length;
  const id = random%length +1;
  console.log(random,length,id);
  res.send(res.json(db.testimonials.filter(testimonial => testimonial.id == id)));
});

router.route('/testimonials/:id').get((req, res) => {
  res.send(res.json(db.testimonials.filter(testimonial => testimonial.id == req.params.id)));
});

router.route('/testimonials').post((req, res) => {
  const id = db.testimonials.length;
  req.body.id = id;
  res.json(req.body);
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials = db.testimonials.map(item => {
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

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(req.params.id, 1);
  res.json({ message: "Ok!" });
});

module.exports = router;