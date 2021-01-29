import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  //绑定路由实例
  router: router
}).$mount('#app')
