<template>
  <ul class="catalog__list">
    <li class="catalog__item item-btn"
        v-for="(product, index) in products"
        :key="product.id"
    >
      <a class="catalog__pic"
         href="#"
      >
        <img :src="currentColor[index].gallery && currentColor[index].gallery[0].file.url"
             :alt="product.title"
        >
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ numberFormat(product.price) }} ₽
      </span>

      <ul class="colors colors--black">
        <li class="colors__item"
            v-for="color in product.colors"
            :key="color.id"
        >
          <label class="colors__label">
            <input class="colors__radio sr-only"
                   type="radio"
                   name="color-1"
                   :value="color.color.code"
                   @change="setCurrentColor(index, color.id)"
            >
            <span class="colors__value"
                  :style="`background-color: ${color.color.code}`"
            ></span>
          </label>
        </li>
      </ul>
      <button class="button button--second button-cart"
              type="button"
      >
        В корзину
      </button>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentColor: [],
      errorImg: 'http://era74.ru/media/catalog/2019/08/06/no-photo_94BoRIW.png',
    };
  },
  methods: {
    numberFormat,
    setCurrentColor(index, id) {
      const neededColor = this.products[index].colors.find((color) => color.id === id);

      if (neededColor.gallery === null) {
        neededColor.gallery = [{ file: { url: this.errorImg } }];
      }

      this.currentColor.splice(index, 1, neededColor);
    },
    setCurrentColorDefault() {
      this.currentColor = [];
      this.products.forEach((product) => {
        this.currentColor.push(product?.colors[0]);
      });

      this.currentColor = this.currentColor.map((color) => {
        if (color.gallery === null) {
          return {
            ...color,
            gallery: [{ file: { url: this.errorImg } }],
          };
        }

        return color;
      });
    },
  },
  watch: {
    products: {
      immediate: true,
      handler() {
        this.setCurrentColorDefault();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.item-btn {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.button-cart {
  margin: 5px 0;
}
</style>
