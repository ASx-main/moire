<template>
  <fieldset class="form__block">
    <legend class="form__legend">
      Цена
    </legend>
    <BaseInput
      :placeholder="'От'"
      :type="'Number'"
      :input-value="filterPriceFrom"
      @input="inputFrom"
    />
    <BaseInput
      :placeholder="'До'"
      :type="'Number'"
      :input-value="filterPriceTo"
      @input="inputTo"
    />
  </fieldset>
</template>

<script>
import BaseInput from '@/components/baseDetails/BaseInput.vue';

export default {
  name: 'FilterPrice',
  components: {
    BaseInput,
  },
  props: {
    filterPriceFrom: {
      type: Number,
      default: 0,
    },
    filterPriceTo: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    inputFrom(e) {
      this.$emit('inputFrom', e);
    },
    inputTo(e) {
      this.$emit('inputTo', e);
    },
  },
};

</script>
