<template>
  <div v-if="basketProducts"
       class="cart__block">
    <ul class="cart__orders">
      <li v-for="product in basketProducts"
          :key="product.id"
          class="cart__order">
        <h3>{{ product.product.title }}</h3>
        <br>
        <h3>{{ product.quantity}} шт</h3>
        <b> {{ numberFormat(product.price * product.quantity) }} ₽</b>
        <span>Артикул: {{ product.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p v-if="currentDeliveryPrice">Доставка: <b>{{ currentDeliveryPrice }} ₽ </b></p>
      <p v-else>Доставка: Выберите способ доставки</p>
      <p>Итого: <b>{{ countProductToBasket }}</b> товара на сумму
        <b>{{numberFormat(totalPrice) }} ₽</b></p>
      <p v-if="currentPaymentsMethods"> Способ оплаты : {{ currentPaymentsMethods }}</p>
      <p v-else> Способ оплаты : Выберите способ оплаты</p>
    </div>

    <button class="cart__button button button--primery"
            type="submit"
    >

      Оформить заказ
    </button>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapState } from 'vuex';

export default {
  methods: {
    numberFormat,
  },
  props: {
    basketProducts: {
      type: Array,
      default: null,
    },
    countProductToBasket: {
      type: [Number, String],
      default: 0,
    },
    productDetailTotalPrice: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    ...mapState({
      deliveryPrice: (state) => state.ordering.deliveryPrice,
      currentDeliveryPrice: (state) => state.ordering.currentDeliveryPrice,
      currentPaymentsMethods: (state) => state.ordering.currentPaymentsMethods,
    }),
    totalPrice() {
      return Number(this.currentDeliveryPrice) + Number(this.productDetailTotalPrice);
    },
  },
};
</script>
