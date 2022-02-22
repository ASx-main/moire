<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ count }} товаров
        </span>
        <span class="content__info">
          Вывести количество товаров на странице по
          <select @change="onSelect($event)"
                  class="select"
          >
            <option :value="productPerPage"
                    autofocus
            > -
            </option>
            <option v-for="countPerPage in selectCountPerPages"
                    :value="countPerPage"
                    :key="countPerPage"
            >
              {{ countPerPage }}
            </option>
          </select>
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <aside class="filter">

        <FormFilter
          :products="products"
          @change="onChange"
          :filter-price-from="filterPriceFrom"
          @inputFrom="inputFrom"
          :filter-price-to="filterPriceTo"
          @inputTo="inputTo"
          @inputMaterials="inputMaterials"
          :checked-materials="checkedMaterials"
          @onCheckedSeasons="onCheckedSeasons"
          @onSubmit="onSubmit"
          @checkedColor="checkedColor"
        />

      </aside>

      <section class="catalog">
          <LoadPreload v-if="preload"/>
          <LoadError v-else-if="errorLoad"/>
          <ProductCard
            v-if="products"
            :products="products"
          />

        <BasePagination
          :count="count"
          :product-per-page="productPerPage"
          :current-page="currentPage"
          @pagination="updatePage"
          @paginationLeft="updatePage"
          @paginationRight="updatePage"
        />
      </section>
    </div>
  </main>
</template>

<script>

import {
  mapActions, mapState, mapMutations,
} from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import ProductCard from '@/components/main/ProductCard.vue';
import FormFilter from '@/components/main/FormFilter.vue';
import BasePagination from '@/components/baseDetails/BasePagination.vue';
import LoadPreload from '@/components/baseDetails/LoadPreload.vue';
import LoadError from '@/components/baseDetails/LoadError.vue';

export default {
  name: 'Main',
  data() {
    return {
      countSelectPages: null,
    };
  },
  components: {
    LoadError,
    LoadPreload,
    BasePagination,
    FormFilter,
    ProductCard,
  },
  created() {
    this.loadProductList();
  },
  watch: {
    currentPage() {
      this.loadProductList();
    },
  },
  computed: {
    ...mapState({
      products: (state) => state.main.productList,
      count: (state) => state.main.countTotalProducts,
      filterPriceFrom: (state) => state.main.filterPriceFrom,
      filterPriceTo: (state) => state.main.filterPriceTo,
      currentPage: (state) => state.main.currentPage,
      checkedMaterials: (state) => state.main.checkedMaterials,
      productPerPage: (state) => state.main.productPerPage,
      preload: (state) => state.main.productsLoading,
      errorLoad: (state) => state.main.productLoadingFailed,
      selectCountPerPages: (state) => state.main.selectCountPerPage,
    }),
  },
  methods: {
    ...mapActions({
      loadProductList: 'main/loadProductList',
    }),
    ...mapMutations({
      updateCategoryId: 'main/updateCategoryId',
      updatePriceFrom: 'main/updatePriceFrom',
      updatePriceTo: 'main/updatePriceTo',
      updateCheckedMaterials: 'main/updateCheckedMaterials',
      updateCheckedSeasons: 'main/updateCheckedSeasons',
      updateCurrentPage: 'main/updateCurrentPage',
      updateCheckedColor: 'main/updateCheckedColor',
      updateProductPerPage: 'main/updateProductPerPage',
    }),
    checkedColor(e) {
      this.updateCheckedColor(e);
    },
    onSubmit() {
      this.loadProductList();
    },
    updatePage(e) {
      this.updateCurrentPage(e);
    },
    numberFormat,
    onChange(e) {
      this.updateCategoryId(e);
    },
    inputFrom(e) {
      this.updatePriceFrom(e);
    },
    inputTo(e) {
      this.updatePriceTo(e);
    },
    inputMaterials(e) {
      this.updateCheckedMaterials(e);
    },
    onCheckedSeasons(e) {
      this.updateCheckedSeasons(e);
    },
    onSelect(e) {
      this.countSelectPages = e.target.value;
      this.updateProductPerPage(e.target.value);
      this.loadProductList(this.countSelectPages);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  margin: 0 25px;
  padding: 5px;
  font-size: 18px;
  color: #898989;
  border-color: #e02d71;
}
</style>
