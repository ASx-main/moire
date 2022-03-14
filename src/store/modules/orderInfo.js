import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  namespaced: true,
  state() {
    return {
      orderInfoData: null,
    };
  },
  mutations: {
    updateOrderInfoData(state, info) {
      state.orderInfoData = info;
    },
  },
  getters: {
    productsOrder(state) {
      return state.orderInfoData.basket.items;
    },
    deliveryType(state) {
      return state.orderInfoData.deliveryType.price;
    },
    countProducts(state) {
      return state.orderInfoData.basket.items.reduce((acc, item) => (item.quantity) + acc, 0);
    },
  },
  actions: {
    async loadOrderInfo(context, id) {
      try {
        const response = await axios
          .get(`${API_BASE_URL}api/orders/${id}`, {
            params: {
              userAccessKey: context.rootState.cart.userAccessKey,
            },
          });
        context.commit('updateOrderInfoData', response.data);
      } catch (e) {
        console.log({ e });
      }
    },
  },
};
