<template>
  <label class="form__label form__label--price">
    <input
      class="form__input"
      :type="type"
      name="price"
      @input="onInput"
      :value="inputValue"
    >
    <span class="form__value">{{ placeholder }}</span>
  </label>
</template>

<script>

export default {
  data() {
    return {
      currentValue: 0,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputValue: {
      type: [Number, String],
      default: 0,
    },
    type: {
      type: [Number, String],
      default: 'text',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>
