import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './../node_modules/bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import './assets/css/index.css'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-163993851-1'
})

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
