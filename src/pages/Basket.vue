<template>
  <div>
    <LoadError v-if="loadCartFailed"/>
    <LoadPreload v-if="loadCart"/>

    <main v-if="basketsProducts"
          class="content container"
    >
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link :to="{name: 'main' }"
                         class="breadcrumbs__link"
                         href="#"
            >
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"
               href="#"
            >
              Корзина
            </a>
          </li>
        </ul>

        <div v-if="countProducts"
             class="content__row"
        >
          <h1 class="content__title">
            Корзина
          </h1>
          <span class="content__info">{{ countProducts }} товара</span>
        </div>
        <h3 v-else>
          Корзина пуста! Добавьте товары из каталога
          <router-link tag="button"
                       :to="{name: 'main'}"
                       class="cart__button button button--primery zero-products"
                       style="width: 15%"
          >
            В каталог
          </router-link>
        </h3>
      </div>

      <section class="cart">
        <form class="cart__form form"
              action="#"
              method="POST"
        >
          <div class="cart__field">
            <ul class="cart__list">
              <li v-for="product in basketsProducts"
                  :key="product.id"
                  class="cart__item product"
              >
                <div class="product__pic">
                  <img :src="product.color.gallery[0].file.url"
                       width="120"
                       height="120"
                       :alt="product.product.title"
                  >
                </div>

                <span> Размер: {{ product.size.title }}</span>
                <h3 class="product__title">{{ product.product.title }}</h3>
                <p class="product__info product__info--color">
                  Цвет:
                  <span>
                    <i :style="`background-color: ${product.color.color.code}`"></i>
                    {{ product.color.color.title }}
                  </span>
                </p>
                <span class="product__code">
                  Артикул: {{ product.product.id }}
                </span>

                <AddSub :quantity="product.quantity"
                        @input="onInput($event, product.id)"
                />

                <b class="product__price">{{ numberFormat(product.quantity * product.price) }} ₽</b>

                <button class="product__del button-del"
                        type="button"
                        aria-label="Удалить товар из корзины"
                        @click.prevent="deleteProduct(product.id)"
                >
                  <img width="20"
                       height="20"
                       src="../assets/img/svg/Delete.svg"
                       alt="Удалить из корзины"
                  >
                </button>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
            <p class="cart__price">
              Итого: <span>{{ numberFormat(productDetailTotalPrice) }} ₽</span>
            </p>

            <router-link class="cart__button button button--primery"
                         type="submit"
                         :to="{name: 'ordering'}"
                         tag="button"
                         :disabled="basketsProducts.length === 0"
            >
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
    </main>
  </div>

</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import AddSub from '@/components/baseDetails/AddSub.vue';
import numberFormat from '@/helpers/numberFormat';
import LoadError from '@/components/baseDetails/LoadError.vue';
import LoadPreload from '@/components/baseDetails/LoadPreload.vue';

export default {
  components: {
    LoadError,
    AddSub,
    LoadPreload,
  },
  computed: {
    ...mapGetters({
      countProducts: 'cart/countProductToBasket',
      productDetailTotalPrice: 'cart/productDetailTotalPrice',
    }),
    ...mapState({
      basketsProducts: (state) => state.cart.basketsProducts,
      loadCart: (state) => state.cart.loadCart,
      loadCartFailed: (state) => state.cart.loadCartFailed,
    }),
  },
  methods: {
    numberFormat,
    ...mapActions({
      deleteProduct: 'basket/deleteProduct',
      updateQuantityProduct: 'basket/updateQuantityProduct',
    }),
    onInput(e, id) {
      this.updateQuantityProduct({
        quantity: e,
        basketItemId: id,
      });
    },
  },
};
</script>
