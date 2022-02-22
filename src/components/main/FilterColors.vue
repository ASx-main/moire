<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors colors--black">
      <li class="colors__item"
          v-for="color in colors"
          :key="color.id"
      >
        <label class="colors__label">
          <input class="colors__radio sr-only"
                 type="checkbox"
                 name="color-1"
                 :value="color.id"
                 v-model="checkedColor"
          >
          <span class="colors__value"
                :style="`background-color: ${color.code};`">
                  </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkedColor: [],
    };
  },
  watch: {
    checkedColor(val) {
      this.$emit('checkedColor', val);
    },
  },
};
</script>

<style scoped>
</style>
