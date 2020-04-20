<template>
  <div>
    <div class="split right">
      <div>
        <div v-if="bookSelected">
          <div
            style="margin:20px;color:white;font-family: 'Times New Roman', Times, serif;"
          >Book details</div>
          <div>
            <p
            >Title: {{detail.name}}</p>
            <p
            >Author: {{detail.genre}}</p>
            <p>Other books by the author</p>
            <ul>
              <li v-for="otherBook in authorBooks" v-bind:key="otherBook.id">{{otherBook.name}}</li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p
          >No book selected</p>
        </div>
      </div>
    </div>
    <div class="split left">
      <h1 style="text-align:center;margin-top:10px;margin-bottom:20px;">Reading List</h1>
      <div class="added-books" v-if="buttonPressed">
        <!-- <span style="border-style:groove;padding:5px;">{{bookName}}</span> -->
      </div>
      <div>
        <span
          v-for="book in books"
          v-bind:key="book.id"
          v-on:click="bookDetails(book.id)"
          style="border-style:groove;padding:5px;overflow-wrap:break-word;display:inline-block;margin:10px;"
        >{{book.name}}</span>
      </div>
      <div class="add-book">
        <div>
          <form class="add-book-form">
            <div id="name-section" class="form-group row">
              <label id="l-1" class="col-sm-3 col-form-label" for="book-name">Name:</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  v-model="name"
                  style="margin-left:-50px;"
                  class="form-control form-control-sm"
                  id="book-name"
                />
              </div>
            </div>
            <div id="genre-section" class="form-group row">
              <label id="l-2" class="col-sm-3 col-form-label" for="genre">Genre:</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  v-model="genre"
                  style="margin-left:-50px;"
                  class="form-control form-control-sm"
                  id="genre"
                />
              </div>
            </div>
            <div id="author-section" class="form-group row">
              <label id="l-3" for="author" class="col-sm-3 col-form-label">Author:</label>
              <div class="col-sm-6">
                <select
                  name="author"
                  v-model="author"
                  style="margin-left:-50px;"
                  class="form-control form-control-sm"
                  id="author"
                >
                  <option selected value="Select author">Select author</option>
                  <option disabled v-if="loading > 0">loading</option>
                  <option
                    v-else
                    v-for="author in authors"
                    :key="author.id"
                    :value="author.id"
                  >{{author.name}}</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img v-on:click="addBook" class="img-button" src="@/assets/button.png" alt="no image" />
    </div>
  </div>
</template>

<script>
// import  gql  from 'graphql-tag'
import {
  getBookQuery,
  getAuthorsQuery,
  ADD_BOOK_MUTATION,
  GET_BOOK_QUERY
} from "../queries/queries";

export default {
  name: "Homepage",
  data() {
    return {
      name: "",
      genre: "",
      author: "Select author",
      authors: [],
      buttonPressed: null,
      bookName: "",
      books: [],
      detail: "",
      bookSelected: null,
      Books: [],
      loading: 0,
      details: [],
      authorBooks: []
    };
  },
  methods: {
    addBook() {
      this.buttonPressed = true;
      // this.bookDetail.name = this.bookName
      // this.bookName = this.name
      // var bookDetailArr = {
      //   name: this.bookName
      // }
      // this.books.push(bookDetailArr)
      this.$apollo.mutate({
        mutation: ADD_BOOK_MUTATION,
        variables: {
          name: this.name,
          genre: this.genre,
          authorId: this.author
        },
        update: (store, { data: { addBook } }) => {
          const data = store.readQuery({
            query: getBookQuery
          });
          data.books.push(addBook);
          store.writeQuery({ query: getBookQuery, data });
        }
      });
    },
    bookDetails(id) {
      // var bookInfo = this.bookName
      // this.detail = bookData.name
      this.bookSelected = true;
      this.$apollo
        .query({
          query: GET_BOOK_QUERY,
          variables: {
            id: id
          }
        })
        .then(response => {
          this.details = response.data;
          this.detail = this.details.book;
           this.authorBooks = this.detail.author.book;
          // eslint-disable-next-line no-console
          console.log(this.authorBooks);
        });
    }
  },
  apollo: {
    books: {
      query: getBookQuery,
      loadingKey: "loading"
    },
    authors: {
      query: getAuthorsQuery,
      loadingKey: "loading"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.split {
  height: 100%;
  position: fixed;
  top: 0;
  overflow-x: hidden;
  width: 100%;
}

.left {
  left: 0;
  width: 60%;
  background-color: whitesmoke;
}

.right {
  right: 0;
  width: 40%;
  background-color: #e6435e;
}

span {
  border-color: #e6435e;
  color: #e6435e;
  border-radius: 5px;
}

.add-book {
  position: absolute;
  z-index: 1;
  width: 60%;
  background-color: white;
  padding-top: 2%;
  padding-bottom: 2%;
  bottom: 0px;
}

#l-1 {
  margin-left: 25%;
  margin-right: 0%;
}

#l-2 {
  margin-left: 25%;
}

#l-3 {
  margin-left: 24%;
  margin-right: 1%;
}

#genre-section {
  margin-top: -15px;
}

#author-section {
  margin-top: -15px;
}

.img-button {
  position: absolute;
  z-index: 2;
  margin-top: 10%;
  margin-left: 1%;
  margin-bottom: 1%;
  bottom: 0px;
}

.added-books {
  margin: 10px;
}

p {
  margin:20px;
  color:white;
  font-family: 'Times New Roman', Times, serif;
}

li {
  color:white;
  font-family: 'Times New Roman', Times, serif;
}
</style>
