<template>
  <div>
      <h3>
        К сожалению, произошла ошибка, попробуйте еще раз
      </h3>
    <button class="filter__submit button button--primery btn-error"
            type="submit"
            @click="loadProductsRepeat"
    > Повторить
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      loadProducts: 'main/loadProductList',
    }),
    loadProductsRepeat() {
      this.loadProducts();
    },
  },
};
</script>

<style lang="scss">
.btn-error {
  width: 20%;
}
</style>
