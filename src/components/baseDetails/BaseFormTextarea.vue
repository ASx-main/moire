<template>
  <BaseFieldForm :title="title"
                 :error="error"
  >
    <textarea class="form__input form__input--area"
              :placeholder="placeholder"
              v-model="inputValue"
    >
    </textarea>
  </BaseFieldForm>
</template>
<script>
import BaseFieldForm from '@/components/baseDetails/BaseFieldForm.vue';

export default {
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
  props: {
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
  components: { BaseFieldForm },
};
</script>
