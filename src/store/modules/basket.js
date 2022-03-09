import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  namespaced: true,
  actions: {
    async deleteProduct(context, basketItemId) {
      try {
        context.commit('cart/updateBasketsDelete', basketItemId, { root: true });
        const response = await axios
          .delete(`${API_BASE_URL}api/baskets/products`, {
            data: {
              basketItemId,
            },
            params: {
              userAccessKey: context.rootState.cart.userAccessKey,
            },
          });
        context.commit('cart/updateBasketsProducts', response.data.items, { root: true });
      } catch (e) {
        console.log({ e });
      }
    },
    async updateQuantityProduct(context, { basketItemId, quantity }) {
      try {
        const response = await axios
          .put(`${API_BASE_URL}api/baskets/products`, {
            basketItemId,
            quantity,
          }, {
            params: {
              userAccessKey: context.rootState.cart.userAccessKey,
            },
          });
        context.commit('cart/updateBasketsProducts', response.data.items, { root: true });
      } catch (e) {
        console.log({ e });
      }
    },

  },

};
