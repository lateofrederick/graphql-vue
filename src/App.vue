<template>
  <div id="app">
  <!-- <template v-if='loading > 0'>
    loading
  </template>
  <template v-else>
    <ul>
    <li v-for="(book,index) in books" :key="index">{{book.name}}</li>
  </ul>
  </template> -->
  <router-view/>
  </div>
</template>

<script>
// import  gql  from 'graphql-tag'

// const getBookQuery = gql`
//   query books {
//     books {
//       name
//       id  
//     }
//   }
// `

export default {
  name: 'app',
  // components: {
  // },
  // data: () => ({
  //   books: [],
  //   loading: 0
  // }),
  // apollo: {
  //   books: {
  //     query: getBookQuery,
  //     loadingKey: 'loading'
  //   }
  // }
}
</script>

<style>
 #app {  
} 

</style>
