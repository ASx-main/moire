<template>
  <BaseFieldForm :title="title"
                 :error="error"
  >
    <input class="form__input"
           :type="type"
           :placeholder="placeholder"
           v-model="inputValue"
    >
  </BaseFieldForm>
</template>
<script>

import BaseFieldForm from '@/components/baseDetails/BaseFieldForm.vue';

export default {
  components: { BaseFieldForm },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    error: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
