const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating an author model
const authorSchema = new Schema({
	name: String,
	age: Number 
});

module.exports = mongoose.model('Author', authorSchema);
