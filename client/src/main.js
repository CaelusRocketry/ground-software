import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

Vue.use(BootstrapVue)
Vue.use(
    new VueSocketIO({
        debug: true,
        connection: 'http://localhost:5000'
    })
);

new Vue({
    render: function(h) {
        return h(App);
    },
}).$mount('#app');
