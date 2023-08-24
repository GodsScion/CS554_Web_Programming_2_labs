import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/AboutPage.vue';
import Chars from './components/CharsPg.vue';
import Comics from './components/ComicsPg.vue';
import ComicPg from './components/ComicPg.vue';
import Stories from './components/StoriesPg.vue';
import StoryPg from './components/StoryPg.vue';
import ChPg from './components/CharPg.vue';
import Error from './components/Error.vue';
import Error404 from './components/Error404.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
      path: '/characters/page/:page',
      name: 'chars',
      component: Chars
  },
  {
      path: '/comics/page/:page',
      name: 'comics',
      component: Comics
  },{
      path: '/comics/:id',
      name: 'comicPg',
      component: ComicPg
  },{
      path: '/stories/page/:page',
      name: 'stories',
      component: Stories
  },{
      path: '/stories/:id',
      name: 'storyPg',
      component: StoryPg 
  },
  {
    path: '/characters/:id',
    name: 'chPg',
    component: ChPg
  },
  {
    path: '/error/:message',
    name: 'error',
    component: Error
  },
  { path: '/:pathMatch(.*)*', name: 'error404', component: Error404 }
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})


// 5. Create and mount the root instance.
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

// new Vue({
//   router: router
// }).$mount('#app')



// Vue.createApp(App).mount('#app')




// import Vue from 'vue';
// import App from './App.vue';
// import router from './router';
// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: (h) => h(App)
// }).$mount('#app');
