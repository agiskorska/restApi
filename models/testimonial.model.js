const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);

//{ id: 1, author: 'John Doe', text: 'This company is worth every coin!' },