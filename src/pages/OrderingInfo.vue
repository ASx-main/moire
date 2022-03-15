<template>
  <main v-if="orderInfoData"
        class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }"
                       class="breadcrumbs__link"
                       href="#">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'basket' }"
                       class="breadcrumbs__link"
                       href="#"
          >
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{  $route.params.id  }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form"
            action="#"
            method="POST"
      >
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfoData.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
               {{ orderInfoData.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfoData.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfoData.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="product in productsOrder"
                class="cart__order"
                :key="product.id"
            >
              <div class="cart_detail_info">
                <h3>{{ product.product.title }}</h3>
                <p>{{ product.quantity }} шт</p>
                <span>Артикул: {{ product.product.id }}</span>
              </div>
              <b>{{ product.product.price * product.quantity }} ₽</b>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ deliveryType }}</b></p>
            <p>Итого: <b>{{ countProducts }}</b> товара на сумму
              <b>
              {{ orderInfoData.totalPrice }} ₽
              </b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  created() {
    if (this.orderInfoId === null) {
      this.$router.push('/');
    } else {
      this.loadOrderingInfo(this.orderInfoId);
    }
  },
  methods: {
    ...mapActions({
      loadOrderingInfo: 'orderInfo/loadOrderInfo',
    }),
  },
  computed: {
    ...mapState({
      orderInfoId: (state) => state.ordering.orderInfoId,
      orderInfoData: (state) => state.orderInfo.orderInfoData,
    }),
    ...mapGetters({
      productsOrder: 'orderInfo/productsOrder',
      deliveryType: 'orderInfo/deliveryType',
      countProducts: 'orderInfo/countProducts',
    }),

  },
};
</script>

<style scoped>
.cart_detail_info {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
