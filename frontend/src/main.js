import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ApolloClient  from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import VueApollo from 'vue-apollo'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, location, path}) => 
      // eslint-disable-next-line no-console
    console.error(`[GraphQL error]: Message ${message}, location: ${location}, path: ${path} `))
  }
  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network error]: ${networkError}`)
  } 
})

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(BootstrapVue)



const httpLink  = new HttpLink({
  uri:'http://localhost:4000/graphql'
})

const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})



new Vue({
  apolloProvider,
  router,
  render: h => h(App),
}).$mount('#app')
