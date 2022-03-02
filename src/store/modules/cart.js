import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      quantity: 1,
      preload: false,
      errorLoad: true,
      productAdd: false,
      productAddSending: false,
      basketsProducts: null,
      userAccessKey: null,
      productData: null,
      buttonGoToBasket: false,
      errorAdd: false,
    };
  },
  mutations: {
    updateProductAddSendingOn(state) {
      state.productAdd = false;
      state.productAddSending = true;
    },
    updateProductAddSendingOff(state) {
      state.productAdd = true;
      state.productAddSending = false;
      state.buttonGoToBasket = true;
    },
    updateErrorAdd(state) {
      state.errorAdd = true;
      state.productAddSending = false;
      state.productAdd = false;
    },
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
    updateQuantity(state, payload) {
      state.quantity = payload;
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
      context.commit('updateProductAddSendingOn');
      try {
        const response = await axios
          .post(`${API_BASE_URL}api/baskets/products1`, {
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
        context.commit('updateProductAddSendingOff');
      } catch (e) {
        context.commit('updateErrorAdd');
      }
    },
  },
};
