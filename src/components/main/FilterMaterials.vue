<template>
  <fieldset class="form__block">
    <legend class="form__legend">
      Материал
    </legend>
    <ul class="check-list">
      <li class="check-list__item"
          v-for="material in materials"
          :key="material.id"
      >
        <label class="check-list__label">
          <input class="check-list__check sr-only"
                 type="checkbox"
                 name="material"
                 :value="material.id"
                 v-model="materialChecked"
          >
          <span class="check-list__desc">
            {{ material.title }}
            <span> ({{ material.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>

export default {
  props: {
    materials: {
      type: Array,
      required: true,
    },
    products: {
      type: Array,
    },
    checkedMaterials: {
      type: Array,
    },
  },
  data() {
    return {
      materialChecked: [],
    };
  },
  watch: {
    materialChecked(val) {
      this.$emit('inputMaterials', val);
    },
  },
};
</script>
