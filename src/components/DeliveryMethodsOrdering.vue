<template>
  <div>
    <h3 class="cart__title">Оплата</h3>
    <ul class="cart__options options">
      <li v-for="method in paymentsMethods"
          :key="method.id"
          class="options__item">
        <label class="options__label">
          <input class="options__radio sr-only"
                 type="radio"
                 name="pay"
                 @change="currentPaymentsMethods(method.id, method.title)"
                 :checked="method.id === 1"
          >
          <span class="options__value">
                    {{ method.title }}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      updateCurrentPaymentsMethods: 'ordering/updateCurrentPaymentsMethods',
      updateCurrentPaymentsMethodsId: 'ordering/updateCurrentPaymentsMethodsId',
    }),
    currentPaymentsMethods(id, method) {
      this.updateCurrentPaymentsMethodsId(id);
      this.updateCurrentPaymentsMethods(method);
    },
  },
  computed: {
    ...mapState({
      paymentsMethods: (state) => state.ordering.paymentsMethods,
    }),
  },
};
</script>
