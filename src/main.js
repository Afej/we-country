import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueScrollReveal from 'vue-scroll-reveal';

Vue.use(VueResource);
Vue.use(VueScrollReveal);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
