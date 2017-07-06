
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false;
// Register a global custom directive called v-focus
let VueTouch = require('vue-touch');
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
});
Vue.use(VueTouch);



/* eslint-disable no-new */
new Vue({
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


  mounted: function () {

    const firebaseConfig = {
      apiKey: "AIzaSyCZOGNAh0h4zhmEshF-ExSQtVjJO8z8Loo",
      authDomain: "shade-dev.firebaseapp.com",
      databaseURL: "https://shade-dev.firebaseio.com",
      projectId: "shade-dev",
      storageBucket: "shade-dev.appspot.com",
      messagingSenderId: "91667937762"
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


})
