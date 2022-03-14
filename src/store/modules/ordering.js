import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  namespaced: true,
  state() {
    return {
      formData: {},
      formError: {},
      errorMessages: '',
      orderingInfo: null,
      deliveryPrice: null,
      currentDeliveryPrice: null,
      currentDeliveryPriceId: 1,
      paymentsMethods: null,
      currentPaymentsMethods: null,
      currentPaymentsMethodsId: 1,
      loadCreatedOrdering: false,
      orderInfoId: null,
      loadPreload: false,
      loadFormError: false,
    };
  },
  mutations: {
    updateOrderInfoId(state, id) {
      state.orderInfoId = id;
    },
    updateDeliveries(state, delivery) {
      state.deliveryPrice = delivery;
    },
    updateCurrentDeliveryPrice(state, payload) {
      state.currentDeliveryPrice = payload;
    },
    updateCurrentDeliveryPriceId(state, id) {
      state.currentDeliveryPriceId = id;
    },
    updatePaymentsMethods(state, methods) {
      state.paymentsMethods = methods;
    },
    updateCurrentPaymentsMethods(state, method) {
      state.currentPaymentsMethods = method;
    },
    updateCurrentPaymentsMethodsId(state, id) {
      state.currentPaymentsMethodsId = id;
    },
    updateFormError(state, payload) {
      state.formError = payload;
    },
    updateOrderInfo(state, info) {
      state.orderingInfo = info;
    },
    updateErrorMessages(state, messages) {
      state.errorMessages = messages;
    },
    updateLoadPreloadOn(state) {
      state.loadPreload = true;
      state.loadFormError = false;
    },
    updateLoadPreloadOff(state) {
      state.loadPreload = false;
    },
    updateLoadFormErrorOn(state) {
      state.loadFormError = true;
    },
  },
  actions: {
    // eslint-disable-next-line consistent-return
    async createOrder(context) {
      context.commit('updateLoadPreloadOn');
      try {
        if (context.rootState.cart.basketsProducts) {
          const response = await axios
            .post(`${API_BASE_URL}api/orders`, {
              ...context.state.formData,
              paymentTypeId: context.state.currentPaymentsMethodsId,
              deliveryTypeId: context.state.currentDeliveryPriceId,
            }, {
              params: {
                userAccessKey: context.rootState.cart.userAccessKey,
              },
            });
          context.commit('updateOrderInfo', response.data);
          context.commit('cart/updateBasketsProducts', [], { root: true });
          context.commit('updateOrderInfoId', response.data.id);
          context.commit('updateLoadPreloadOff');

          return response;
        }
      } catch (e) {
        context.commit('updateFormError', e.response.data.error.request);
        context.commit('updateErrorMessages', e.response.data.error.message);
        context.commit('updateLoadFormErrorOn');
        context.commit('updateLoadPreloadOff');

        throw e.response;
      }
    },
    async loadDelivery(context) {
      try {
        const response = await axios
          .get(`${API_BASE_URL}api/deliveries`);
        context.commit('updateDeliveries', response.data);
      } catch (e) {
        console.log({ e });
      }
    },
    async loadPaymentsMethods(context) {
      try {
        const response = await axios
          .get(`${API_BASE_URL}api/payments`, {
            params: {
              deliveryTypeId: context.state.currentDeliveryPriceId,
            },
          });
        context.commit('updatePaymentsMethods', response.data);
      } catch (e) {
        console.log({ e });
      }
    },
  },
};
