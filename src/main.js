import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Antd from 'ant-design-vue'
import SequentialEntrance from 'vue-sequential-entrance'
import VueSweetalert2 from 'vue-sweetalert2'
import VueThailandAddress from 'vue-thailand-address'
import 'vue-thailand-address/dist/vue-thailand-address.css'
import 'ant-design-vue/dist/antd.css'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(VueThailandAddress)
Vue.use(VueSweetalert2)
Vue.use(SequentialEntrance)
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
