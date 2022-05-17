import { createApp } from 'vue'
import App from './App.vue'
// import VueObserveVisibility from 'vue-observe-visibility'
import InfiniteLoading from "v3-infinite-loading";

// import InfiniteLoading from 'vue-infinite-loading'

const myApp= createApp(App)
myApp.use(InfiniteLoading)
myApp.mount('#app')


// myApp.use(InfiniteLoading)

