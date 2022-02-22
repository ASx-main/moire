<template>
  <fieldset class="form__block">
    <legend class="form__legend">Коллекция</legend>
    <ul class="check-list">
      <li class="check-list__item"
          v-for="season in seasons"
          :key="season.id"
      >
        <label class="check-list__label">
          <input class="check-list__check sr-only"
                 type="checkbox"
                 name="collection"
                 :value="season.id"
                 v-model="onCheckedSeasons"
          >
          <span class="check-list__desc">
                    {{ season.title }}
                    <span>( {{ season.productsCount }} )</span>
                  </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      onCheckedSeasons: [],
    };
  },
  props: {
    seasons: {
      type: Array,
      required: true,
    },
  },
  watch: {
    onCheckedSeasons(val) {
      this.$emit('onCheckedSeasons', val);
    },
  },
};
</script>
