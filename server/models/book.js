const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a book model
const bookSchema = new Schema({
	name: String,
	genre: String,
	authorId: String 
});

module.exports = mongoose.model('Book', bookSchema);