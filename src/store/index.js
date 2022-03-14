import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import cart from './modules/cart';
import basket from './modules/basket';
import ordering from './modules/ordering';
import orderInfo from './modules/orderInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    cart,
    basket,
    ordering,
    orderInfo,
  },
});
