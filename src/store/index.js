import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    cart,
  },
});
