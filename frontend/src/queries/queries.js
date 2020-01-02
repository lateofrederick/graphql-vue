import  gql  from 'graphql-tag'

// query to retrieve a all books from the database
const getBookQuery = gql`
  query books {
    books {
      name
      id  
    }
  }
`

// query to retrieve all authors from the database
const getAuthorsQuery = gql`
    query authors {
        authors {
            name
            id
        }
    }
`
//a mutation to add a book to the database 
const ADD_BOOK_MUTATION = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook (
      name: $name,
      genre: $genre,
      authorId: $authorId
    ){
      name
    }        
  }
`

// query to retrieve a book from the database
const GET_BOOK_QUERY = gql`
  query book($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        name
        book {
          name
          genre
        }
      }
    }
  }
`


export {getBookQuery, getAuthorsQuery, ADD_BOOK_MUTATION, GET_BOOK_QUERY };
