import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      preload: false,
      errorLoad: true,
      basketsProducts: null,
      userAccessKey: null,
      productData: null,
    };
  },
  mutations: {
    updateBasketsProducts(state, products) {
      state.basketsProducts = products;
    },
    updateUserAccessKey(state, userKey) {
      state.userAccessKey = userKey;
    },
    updateProductDate(state, product) {
      state.productData = product;
    },
    updateLoadPreloadOn(state) {
      state.preload = true;
      state.errorLoad = false;
    },
    updateLoadPreloadOff(state) {
      state.preload = false;
    },
    updateLoadErrorLoadOn(state) {
      state.errorLoad = true;
    },
  },
  getters: {
    countProductToBasket(state) {
      return state.basketsProducts.reduce((acc, item) => (item.quantity) + acc, 0);
    },
  },
  actions: {
    async getUserKey(context) {
      try {
        const accessKey = localStorage.getItem('accessKey');

        if (!accessKey) {
          const response = await axios
            .get(`${API_BASE_URL}api/users/accessKey`);

          localStorage.setItem('accessKey', response.data.accessKey);
          context.commit('updateUserAccessKey', response.data.accessKey);
        } else {
          context.commit('updateUserAccessKey', accessKey);
        }
      } catch (e) {
        console.log({ e });
      }
    },
    async loadCart(context) {
      try {
        const response = await axios
          .get(`${API_BASE_URL}api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          });
        context.commit('updateBasketsProducts', response.data.items);
      } catch (e) {
        console.log({ e });
      }
    },
    async loadProduct(context, id) {
      try {
        context.commit('updateLoadPreloadOn');
        const response = await axios
          .get(`${API_BASE_URL}api/products/${id}`);
        context.commit('updateProductDate', response.data);
      } catch (e) {
        context.commit('updateLoadErrorLoadOn');
      } finally {
        context.commit('updateLoadPreloadOff');
      }
    },
    async addProduct(context, {
      productId, colorId, sizeId, quantity,
    }) {
      try {
        const response = await axios
          .post(`${API_BASE_URL}api/baskets/products`, {
            colorId,
            productId,
            sizeId,
            quantity,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          });
        context.commit('updateBasketsProducts', response.data.items);
      } catch (e) {
        console.log({ e });
      }
    },
  },
};
