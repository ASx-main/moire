<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <label class="form__label form__label--select">
      <select class="form__select"
              name="category"
              @change="onChange"
      >
        <option value="value1">Все категории</option>
        <option v-for="category in categories"
                :value="category.id"
                :key="category.id">
          {{ category.title }}</option>
      </select>
    </label>
  </fieldset>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    },
  },
};
</script>
