const mongoose = require('mongoose');
const {v4: uuid} = require('uuid')
const productSchema = new mongoose.Schema({
  pId:{
    type: String,
    default: uuid,
    unique: true,
    trim:true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 2,
  },
  stocks: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  uploadedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);