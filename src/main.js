
import Vue from 'vue'
import App from './App'
import infiniteScroll from 'vue-infinite-scroll'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'




Vue.config.productionTip = false;
// Register a global custom directive called v-focus
let VueTouch = require('vue-touch');
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
});
Vue.use(VueTouch);
Vue.use(infiniteScroll);
Vue.use(MintUI);






/* eslint-disable no-new */
let AppVue = new Vue({
  el: '#app',
  template: '<App/>',
  data: {
    firebaseApp: false,
    database: false,
    user: false,
    provider:false,
    state:{doubletap: true}

  },
  components: {App},


  created: function () {

    const firebaseConfig = {
      apiKey: "AIzaSyA3UdBrIvHxcTEaGGEFI6obqi17JjT6S9Q",
      authDomain: "local-dev-amb.firebaseapp.com",
      databaseURL: "https://local-dev-amb.firebaseio.com",
      projectId: "local-dev-amb",
      storageBucket: "local-dev-amb.appspot.com",
      messagingSenderId: "464414262517"
    };
    this.firebaseApp = firebase.initializeApp(firebaseConfig);
    // Get a reference to the database service
    this.database = this.firebaseApp.database();
    this.provider = {
      google: new firebase.auth.GoogleAuthProvider(),
      facebook:new firebase.auth.FacebookAuthProvider(),
      twitter : new firebase.auth.TwitterAuthProvider()
    };
  }


});
