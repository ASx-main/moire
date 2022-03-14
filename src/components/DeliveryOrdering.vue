<template>
  <div class="cart__options">
    <h3 class="cart__title">Доставка</h3>
    <ul class="cart__options options">
      <li v-for="delivery in deliveryPrice"
          class="options__item"
          :key="delivery.id"
      >
        <label class="options__label">
          <input class="options__radio sr-only"
                 type="radio"
                 name="delivery"
                 @change="currentDelivery(delivery.id, delivery.price)"
                 :checked="delivery.id === 1"
          >
          <span class="options__value">
            {{  delivery.title }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      updateCurrentDeliveryPrice: 'ordering/updateCurrentDeliveryPrice',
      updateCurrentDeliveryPriceId: 'ordering/updateCurrentDeliveryPriceId',
    }),
    ...mapActions({
      loadPaymentsMethods: 'ordering/loadPaymentsMethods',
    }),
    currentDelivery(id, price) {
      this.updateCurrentDeliveryPriceId(id);
      this.updateCurrentDeliveryPrice(price);
      this.loadPaymentsMethods();
    },
  },
  computed: {
    ...mapState({
      deliveryPrice: (state) => state.ordering.deliveryPrice,
    }),
  },
};
</script>
