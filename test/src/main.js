import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // template:`<p> deng is a p </p>`,
  render: h => h(App),
}).$mount('#app')
