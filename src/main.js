import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/database'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY,
  }
})
Vue.config.productionTip = false

const updateSizes = (obj = {}) => {
	obj.width = window.innerWidth
	obj.height = window.innerHeight
	return obj
}

Object.defineProperty(Vue.prototype, '$viewport', {
	value: Vue.observable(updateSizes())
})

window.addEventListener('resize', () => {
	updateSizes(Vue.prototype.$viewport)
})

var baseUrl = process.env.VUE_APP_FIREBASE_PROJECT_ID.split('-').slice(-2).join('-')

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: baseUrl + ".firebaseapp.com",
  databaseURL: "https://" + baseUrl + ".firebaseio.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

console.info("Version : "+process.env.VUE_APP_VERSION)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
