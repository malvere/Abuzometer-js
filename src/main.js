import './assets/main.css'

// import {createRouter, createWebHistory} from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WebApp from '@twa-dev/sdk'

WebApp.ready()
WebApp.expand()
const app = createApp(App)

app.use(router)

app.mount('#app')
