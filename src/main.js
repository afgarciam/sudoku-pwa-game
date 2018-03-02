// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import conf from '../config/index'
import VueOfflinePreloader from 'vue-offline-preloader'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    'vue-offline-preloader': VueOfflinePreloader,
    App
   },
  template: `<App> <vue-offline-preloader
  v-bind:public="[
      '/',
      'images/icons/icon-72x72.png',
      'images/icons/icon-96x96.png',
      'images/icons/icon-128x128.png',
      'images/icons/icon-144x144.png',
      'images/icons/icon-152x152.png',
      'images/icons/icon-192x192.png',
      'images/icons/icon-384x384.png',
      'images/icons/icon-512x512.png',
      'styles/sudoku.css',
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      'ui.js'
  ]"
  ></vue-offline-preloader></App>`
})

