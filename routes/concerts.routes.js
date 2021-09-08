const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);

router.get('/concert/:id', ConcertController.getById);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.update);

router.delete('/concert/:id', ConcertController.delete);

router.get('/concerts/price/day/:day', ConcertController.getDay);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getPriceBetween);

router.get('/concerts/genre/:genre', ConcertController.getGenre);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);

module.exports = router;