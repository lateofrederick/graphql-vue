const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

app.use(cors());

app.use('/', serveStatic(path.join('../frontend', '/dist')))

const port = process.env.PORT || 8080
// connecting to database
mongoose.connect('mongodb+srv://lateo:killme2016@frontend-5wbny.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
	console.log("connection successful");
})

app.use('/graphql', graphqlHttp({
	schema,
	graphiql: true
}));

// app.listen('4000', () => {
// 	console.log('Listening on port 4000');
// })
app.listen(port);