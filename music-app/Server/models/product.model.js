const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    type: {type: String, required: true, max: 4},
    loanPeroid: {type: Number, required: false},
    quantity: {type: Number, required: false},
}, {collection:'Rentals'}
);

// create and export a js object with schema snd database instance
module.exports = mongoose.model('Product', ProductSchema);