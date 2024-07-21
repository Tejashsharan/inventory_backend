const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  itemcode: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  timestamp:{type:Date,default:Date.now}
});

inventorySchema.index({ itemcode: 1, seller: 1 }, { unique: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
