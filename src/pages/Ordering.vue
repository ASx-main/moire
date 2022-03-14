<template>
  <main class="content container">
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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>
    <LoadPreload v-if="loadPreload"/>
    <div v-if="loadFormError"
         class="failed">
      <h2> Произошла ошибка</h2>
      <h3 class="error">
        Заполните необходимые поля
      </h3>
    </div>

    <section class="cart">
      <form class="cart__form form"
            action="#"
            method="POST"
            @submit.prevent="createdOrderingInfo"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText :title="'ФИО'"
                          :placeholder="'Введите ваше полное имя'"
                          :error="formError.name"
                          v-model="formData.name"
                          :type="'text'"
            />

            <BaseFormText :title="'Адрес доставки'"
                          :placeholder="'Введите ваш адрес'"
                          :error="formError.address"
                          v-model="formData.address"
                          :type="'text'"
            />

            <BaseFormText :title="'Телефон'"
                          :placeholder="'Введите ваш телефон'"
                          :error="formError.phone"
                          v-model="formData.phone"
                          :type="'tel'"
            />

            <BaseFormText :title="'Email'"
                          :placeholder="'Введи ваш Email'"
                          :error="formError.email"
                          v-model="formData.email"
                          :type="'email'"
            />

            <BaseFormTextarea :title="'Комментарии к заказу'"
                              :placeholder="'Ваши пожелания'"
                              :error="formError.comment"
                              v-model="formData.comment"
            />
          </div>

          <DeliveryOrdering/>

          <DeliveryMethodsOrdering/>

        </div>

        <CartDetailBasket :basket-products="basketProducts"
                          :count-product-to-basket="countProductToBasket"
                          :product-detail-total-price="productDetailTotalPrice"
        />
        <div v-if="errorMessages"
          class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ errorMessages }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import {
  mapActions, mapGetters, mapState,
} from 'vuex';

import numberFormat from '@/helpers/numberFormat';
import CartDetailBasket from '@/components/baseDetails/CartDetailBasket.vue';
import BaseFormText from '@/components/baseDetails/BaseFormText.vue';
import BaseFormTextarea from '@/components/baseDetails/BaseFormTextarea.vue';
import DeliveryOrdering from '@/components/DeliveryOrdering.vue';
import DeliveryMethodsOrdering from '@/components/DeliveryMethodsOrdering.vue';
import LoadPreload from '@/components/baseDetails/LoadPreload.vue';

export default {
  components: {
    DeliveryMethodsOrdering,
    DeliveryOrdering,
    BaseFormTextarea,
    BaseFormText,
    CartDetailBasket,
    LoadPreload,
  },
  methods: {
    numberFormat,
    ...mapActions({
      loadDelivery: 'ordering/loadDelivery',
      loadPaymentsMethods: 'ordering/loadPaymentsMethods',
      createdOrder: 'ordering/createOrder',
      loadOrderInfo: 'orderInfo/loadOrderInfo',
    }),
    async createdOrderingInfo() {
      try {
        await this.createdOrder();
        await this.$router.push({ name: 'orderingInfo', params: { id: this.orderInfoId } });
      } catch (e) {
        console.log(e, 'error');
      }
    },
  },
  computed: {
    ...mapGetters({
      countProductToBasket: 'cart/countProductToBasket',
      productDetailTotalPrice: 'cart/productDetailTotalPrice',
    }),
    ...mapState({
      basketProducts: (state) => state.cart.basketsProducts,
      formData: (state) => state.ordering.formData,
      formError: (state) => state.ordering.formError,
      orderInfoId: (state) => state.ordering.orderInfoId,
      loadPreload: (state) => state.ordering.loadPreload,
      errorMessages: (state) => state.ordering.errorMessages,
      loadFormError: (state) => state.ordering.loadFormError,
    }),
  },
  created() {
    this.loadDelivery();
    this.loadPaymentsMethods();
  },
};
</script>
