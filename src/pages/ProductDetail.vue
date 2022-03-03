<template>
  <div>
    <LoadPreload v-if="preload"/>
    <LoadError v-else-if="errorLoad"/>
    <main v-if="productData" class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link :to="{ name: 'main' }"
                         class="breadcrumbs__link"
                         href="#"
            >
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link :to="{name: 'main'}"
                         class="breadcrumbs__link"
                         href="#"
            >
              {{ product.category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item"
      >
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570"
                 :src="currentColor && currentColor.gallery[0].file.url"
                 :alt="product.title"
            >
          </div>
          <ul class="pics__list">
            <li class="pics__item" v-for="color in miniColors" :key="color.id">
              <a href="#"
                 class="pics__link pics__link--current"
              >
                <img
                  width="98"
                  height="98"
                  :src="color && color.gallery[0].file.url"
                  :alt="product.title"
                >
              </a>
            </li>
          </ul>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form class="form"
                  action="#"
                  method="POST"
                  @submit.prevent="addProductToCart"
            >
              <div class="item__row item__row--center">
                <AddSub :quantity="quantity"
                        @input="updateQuantity"
                />

                <b class="item__price">
                  {{ numberFormat(product.price) }} ₽
                </b>
              </div>

              <div class="item__row">
                <fieldset class="form__block">
                  <legend class="form__legend">Цвет</legend>
                  <ul class="colors colors--black">
                    <li v-for="color in colors"
                        :key="color.id"
                        class="colors__item">
                      <label class="colors__label">
                        <input class="colors__radio sr-only"
                               type="radio"
                               name="color-item"
                               :value="color.color.code"
                               :checked="color === currentColor"
                               @change="setSelectedColor(color)"
                        >
                        <span class="colors__value"
                              :style="`background-color: ${color.color.code}`"
                        >
                        </span>
                      </label>
                    </li>
                  </ul>
                </fieldset>

                <fieldset class="form__block">
                  <legend class="form__legend">Размер</legend>
                  <label class="form__label form__label--small form__label--select">
                    <select class="form__select"
                            name="category"
                            @change="checkedSizes"
                            autofocus
                    >
                      <option :value="0">Выберите размер</option>
                      <option v-for="size in sizes"
                              :key="size.id"
                              :value="size.id"
                      >
                        {{ size.title }}
                      </option>
                    </select>
                  </label>
                </fieldset>
              </div>
              <LoadError v-if="errorLoad"/>

              <div v-show="productAdd">
                <h3>
                  Товар добавлен в корзину
                </h3>
              </div>
              <div v-show="productAddSending"
                   class="add-product-to-cart">
                <h3>
                  Добавляем товар в корзину...
                </h3>
                <LoadPreload/>
              </div>

              <button class="item__button button button--primery"
                      type="submit"
                      :disabled="checkedSize === null || productAdd || errorLoad"
              >
                Добавить в корзину
              </button>
              <router-link
                :to="{name: 'basket'}"
                v-if="buttonGoToBasket"
                class="item__button button button--primery"
              >
                Перейти в корзину
              </router-link>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Информация о товаре
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link"
                 href="#"
              >
                Доставка и возврат
              </a>
            </li>
          </ul>

          <div class="item__content">
            <h3>Состав:</h3>

            <p>
              60% хлопок<br>
              30% полиэстер<br>
            </p>

            <h3>Уход:</h3>

            <p>
              Машинная стирка при макс. 30ºC короткий отжим<br>
              Гладить при макс. 110ºC<br>
              Не использовать машинную сушку<br>
              Отбеливать запрещено<br>
              Не подвергать химчистке<br>
            </p>

          </div>
        </div>
      </section>
    </main>
  </div>

</template>

<script>

import { mapActions, mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import LoadError from '@/components/baseDetails/LoadError.vue';
import LoadPreload from '@/components/baseDetails/LoadPreload.vue';
import AddSub from '@/components/baseDetails/AddSub.vue';

export default {
  components: { AddSub, LoadError, LoadPreload },
  data() {
    return {
      checkedSize: null,
      quantity: 1,
      errorImg: 'http://era74.ru/media/catalog/2019/08/06/no-photo_94BoRIW.png',
      currentColor: null,
      productAdd: false,
      productAddSending: false,
      buttonGoToBasket: false,
      errorLoad: false,
    };
  },
  computed: {
    ...mapState({
      productData: (state) => state.cart.productData,
      preload: (state) => state.cart.preload,
    }),
    product() {
      return this.productData ? this.productData : {};
    },
    sizes() {
      return this.product.sizes;
    },
    colors() {
      return this.product.colors;
    },
    miniColors() {
      return this.colors.filter((color) => color !== this.currentColor);
    },
  },
  watch: {
    '$route.params.id': {
      async handler(val) {
        await this.loadProduct(val);
        this.setSelectedColor(this.colors[0]);
      },
      immediate: true,
    },
  },
  methods: {
    numberFormat,
    ...mapActions({
      loadProduct: 'cart/loadProduct',
      loadCart: 'cart/loadCart',
      addProduct: 'cart/addProduct',
    }),
    setSelectedColor(color) {
      this.currentColor = color;
    },
    checkedSizes(e) {
      this.$emit('checkedSizes', this.checkedSize = Number(e.target.value));
    },
    updateQuantity(e) {
      this.$emit('input', this.quantity = e);
    },
    addProductToCart() {
      this.productAdd = false;
      this.productAddSending = true;

      this.addProduct({
        productId: this.product.id,
        colorId: this.currentColor.color.id,
        sizeId: this.checkedSize,
        quantity: this.quantity,
      })
        .then(() => {
          this.productAdd = true;
          this.productAddSending = false;
          this.buttonGoToBasket = true;
        })
        .catch(() => {
          this.errorLoad = true;
          this.productAdd = false;
          this.buttonGoToBasket = false;
          this.productAddSending = false;
        });
    },
  },
  created() {
    this.loadCart();
  },
};
</script>
