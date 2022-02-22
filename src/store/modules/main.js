import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  namespaced: true,
  state() {
    return {
      productList: null,
      filterCategoryId: 0,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      currentPage: 1,
      checkedMaterials: [],
      checkedSeasons: [],
      checkedColors: [],
      productPerPage: 12,
      countTotalProducts: null,
      productsLoading: false,
      productLoadingFailed: true,
      hideButtonReset: false,
      selectCountPerPage: [9, 18, 27],
    };
  },
  mutations: {
    hideButton(state, payload) {
      state.hideButtonReset = payload;
    },
    updateLoadPreloadOn(state) {
      state.productsLoading = true;
      state.productLoadingFailed = false;
    },
    updateLoadPreloadOff(state) {
      state.productsLoading = false;
    },
    updateLoadErrorLoadOn(state) {
      state.productLoadingFailed = true;
    },
    resetProductsList(state) {
      state.hideButtonReset = false;
      state.filterCategoryId = null;
      state.filterPriceFrom = null;
      state.filterPriceTo = null;
      state.checkedMaterials.splice(0, state.checkedMaterials.length);
      state.checkedSeasons.splice(0, state.checkedSeasons.length);
      state.checkedColors.splice(0, state.checkedColors.length);
    },
    updateProductList(state, products) {
      state.productList = products;
    },
    updateCountTotalProducts(state, total) {
      state.countTotalProducts = total;
    },
    updateCategoryId(state, categoryId) {
      state.filterCategoryId = categoryId;
    },
    updatePriceFrom(state, priceFrom) {
      state.filterPriceFrom = Number(priceFrom);
    },
    updatePriceTo(state, priceTo) {
      state.filterPriceTo = Number(priceTo);
    },
    updateCheckedMaterials(state, materials) {
      state.checkedMaterials = materials;
    },
    updateCheckedSeasons(state, seasons) {
      state.checkedSeasons = seasons;
    },
    updateCurrentPage(state, page) {
      state.currentPage = page;
    },
    updateCheckedColor(state, color) {
      state.checkedColors = color;
    },
    updateProductPerPage(state, payload) {
      state.productPerPage = payload;
    },
  },

  actions: {
    async loadProductList(context, countLimit = context.state.productPerPage) {
      try {
        context.commit('updateLoadPreloadOn');
        const response = await axios
          .get(`${API_BASE_URL}api/products`, {
            params: {
              categoryId: context.state.filterCategoryId,
              materialIds: context.state.checkedMaterials,
              seasonIds: context.state.checkedSeasons,
              colorIds: context.state.checkedColors,
              page: context.state.currentPage,
              limit: countLimit,
              minPrice: context.state.filterPriceFrom,
              maxPrice: context.state.filterPriceTo,
            },
          });

        context.commit('updateProductList', response.data.items);
        context.commit('updateCountTotalProducts', response.data.pagination.total);
      } catch (e) {
        context.commit('updateLoadErrorLoadOn');
      } finally {
        context.commit('updateLoadPreloadOff');
      }
    },
  },
};
