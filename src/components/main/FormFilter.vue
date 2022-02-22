<template>
  <form class="filter__form form"
        action="#"
        method="get"
        @submit.prevent="onSubmit">
    <FilterPrice
      :filter-price-from="filterPriceFrom"
      @inputFrom="inputFrom"
      :filter-price-to="filterPriceTo"
      @inputTo="inputTo"
    />

    <FilterCategories
      :categories="categoriesIdData"
      @change="onChange"
    />

    <FilterColors
      :colors="colorsData"
      @checkedColor="checkedColor"
    />

    <FilterMaterials
      :products="products"
      :materials="materialsData"
      :checked-materials="checkedMaterials"
      @inputMaterials="inputMaterials"
    />
    <FilterSeasons :seasons="seasonsData"
                   @onCheckedSeasons="onCheckedSeasons"
    />
    <button class="filter__submit button button--primery"
            type="submit"
    >
      Применить
    </button>
    <button v-show="hideButtonReset"
            class="filter__reset button button--second"
            type="button"
            @click.prevent="reset"
    >
      Сбросить
    </button>
  </form>
</template>

<script>
import FilterPrice from '@/components/main/FilterPrice.vue';
import FilterCategories from '@/components/main/FilterCategories.vue';
import FilterMaterials from '@/components/main/FilterMaterials.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import FilterSeasons from '@/components/main/FilterSeasons.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import FilterColors from '@/components/main/FilterColors.vue';

export default {
  name: 'FormFilter',
  props: {
    products: {
      type: Array,
    },
    filterPriceFrom: {
      type: Number,
      default: 0,
    },
    filterPriceTo: {
      type: Number,
      default: 0,
    },
    checkedMaterials: {
      type: Array,
    },
  },
  data() {
    return {
      categoriesIdData: [],
      colorsData: [],
      materialsData: [],
      seasonsData: [],
    };
  },
  computed: {
    ...mapState({
      filterCategoryId: (state) => state.main.filterCategoryId,
      checkedColors: (state) => state.main.checkedColors,
      checkedSeasons: (state) => state.main.checkedSeasons,
      hideButtonReset: (state) => state.main.hideButtonReset,
    }),
  },
  watch: {
    filterPriceFrom() {
      if (this.filterPriceFrom > 0) {
        this.$store.commit('main/hideButton', true);
      }
    },
    filterPriceTo() {
      if (this.filterPriceTo > 0) {
        this.$store.commit('main/hideButton', true);
      }
    },
    filterCategoryId() {
      if (this.filterCategoryId > 0) {
        this.$store.commit('main/hideButton', true);
      }
    },
    checkedColors() {
      if (this.checkedColors.length) {
        this.$store.commit('main/hideButton', true);
      }
    },
    checkedSeasons() {
      if (this.checkedSeasons.length) {
        this.$store.commit('main/hideButton', true);
      }
    },
    checkedMaterials() {
      if (this.checkedMaterials.length) {
        this.$store.commit('main/hideButton', true);
      }
    },
  },
  components: {
    FilterColors,
    FilterMaterials,
    FilterCategories,
    FilterPrice,
    FilterSeasons,
  },
  methods: {
    ...mapMutations({
      resetProductsList: 'main/resetProductsList',
    }),
    ...mapActions({
      loadProductsList: 'main/loadProductList',
    }),
    reset() {
      this.resetProductsList();
      this.loadProductsList();
    },
    checkedColor(e) {
      this.$emit('checkedColor', e);
    },
    onSubmit() {
      this.$emit('onSubmit');
    },
    onChange(e) {
      this.$emit('change', e);
    },
    inputFrom(e) {
      this.$emit('inputFrom', e);
    },
    inputTo(e) {
      this.$emit('inputTo', e);
    },
    inputMaterials(e) {
      this.$emit('inputMaterials', e);
    },
    onCheckedSeasons(e) {
      this.$emit('onCheckedSeasons', e);
    },
    loadCategoriesId() {
      return axios
        .get(`${API_BASE_URL}api/productCategories`)
        .then((response) => {
          this.categoriesIdData = response.data.items;
        });
    },
    loadColorsData() {
      return axios
        .get(`${API_BASE_URL}api/colors`)
        .then((response) => {
          this.colorsData = response.data.items;
        });
    },
    loadMaterialsData() {
      return axios
        .get(`${API_BASE_URL}api/materials`)
        .then((response) => {
          this.materialsData = response.data.items;
        });
    },
    loadSeasonsData() {
      return axios
        .get(`${API_BASE_URL}api/seasons`)
        .then((response) => {
          this.seasonsData = response.data.items;
        });
    },
  },
  async created() {
    await this.loadCategoriesId();
    await this.loadColorsData();
    await this.loadMaterialsData();
    await this.loadSeasonsData();
  },
};
</script>
