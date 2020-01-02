const graphql = require('graphql');
const _ = require('lodash');

// importing mongoose schema from the models folder
const Book = require('../models/book');
const Author = require('../models/author');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


// dummy data

// var books = [
//  {name: "Python", genre:"John", id:'1', authorId:'1'},
//  {name: "Java", genre:"Peter", id:'2', authorId:'2'},
//  {name: "C++", genre:"James", id:'1', authorId:'3'},
//  {name: "Ruby", genre:"Isaac", id:'1', authorId:'2'},
//  {name: "Scala", genre:"Jude", id:'3', authorId:'1'},
//  {name: "Dart", genre:"Mike", id:'2', authorId:'1'}
// ]

// var authors = [
//  {name:"Lateo",age:23,id:'1'},
//  {name:"Kumi",age:43,id:'2'},
//  {name:"Moses",age:57,id:'3'},
// ]

// book object type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => (
        {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author:{
            	type: AuthorType,
            	resolve(parent, args){
            		return Author.findById(parent.authorId);
            	}
            }
        }
    )
});

// author object type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => (
        {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            book: {
                type: GraphQLList(BookType), // using GraphQLList instead of just indicating type as BooKType
                resolve(parent, args){
                    // return _.filter(books, {authorId: parent.id});
                    return Book.find({authorId: parent.id});
                }
            }
        }
    )
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // using specific id to find a book
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
            	// this function is used to read data from database or elsewhere
            	 return Book.findById(args.id);
            }
        },
        // using specific id to find an author
        author: {
        	type: AuthorType,
        	args: {id: {type:GraphQLID}},
        	resolve(parent, args){
        		return Author.findById(args.id);
        	}
        },
        // querying for all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                 return Book.find({});
            }
        },
        // querying all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        }
    }
});

// adding mutations to perform CRUD operations
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)} ,
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
          type: BookType,
          args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            genre: {type: new GraphQLNonNull(GraphQLString)},
            authorId: {type: new GraphQLNonNull(GraphQLID)}
          },
          resolve(parent, args){
            let book = new Book({
              name: args.name,
              genre: args.genre,
              authorId: args.authorId
            });
            return book.save();
          }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
