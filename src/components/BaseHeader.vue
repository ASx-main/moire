<template>
  <header class="header container">
    <div class="header__wrapper">
      <router-link class="header__info header-link"
                  :to="{ name: 'main' }"
      >
        Каталог
      </router-link>

      <router-link class="header__logo"
                   href="#"
                   :to="{ name: 'main' }"
      >
        <img src="../assets/img/svg/logo-moire.svg"
             alt="Логотип интернет магазина Moire"
             width="116"
             height="34"
        >
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <a v-if="$store.state.cart.basketsProducts"
        class="header__cart"
         aria-label="Корзина с товарами"
         href="#"
      >
        <img src="../assets/img/svg/Union.svg"
             alt="Корзина"
             width="19"
             height="24"
        >
        <span class="header__count"
              aria-label="Количество товаров"
        >
          {{ countProducts }}
        </span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      countProducts: 'cart/countProductToBasket',
    }),
  },
};
</script>

<style lang="scss" scoped>
.header-link {
  font-size: 12px;
  color: #150c26;
}
</style>
