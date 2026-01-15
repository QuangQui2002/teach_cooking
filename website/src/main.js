// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import '@/assets/css/style.css'

// Nếu bạn có plugin GoogleAuth, cần viết lại theo Vue 3
import GoogleAuth from './config/google_oAuth.js'

const gauthOption = {
  clientId: '360788872801-hv1le8bnrnr2mbjarek0l9vspt2e2k2n.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

const app = createApp(App)

// Đăng ký plugin theo Vue 3
app.use(router)
app.use(store)
app.use(GoogleAuth, gauthOption)

app.mount('#app')