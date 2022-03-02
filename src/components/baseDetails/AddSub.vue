<template>
  <div class="item__form">
    <form class="form"
          action="#"
          method="POST"
    >
      <div class="item__row item__row--center">
        <div class="form__counter">
          <button type="button"
                  aria-label="Убрать один товар"
                  @click.prevent="subProduct"
          >
            <img src="../../assets/img/svg/sub.svg"
                 alt="Убрать">
          </button>

          <input type="number"
                 min="1"
                 :value="quantity"
                 name="count"
                 @input="handlerInput"
          >

          <button type="button"
                  aria-label="Добавить один товар"
                  @click.prevent="addProduct"
          >
            <img src="../../assets/img/svg/add.svg"
                 alt="Добавить">
          </button>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: [Number, String],
      default: 1,
    },
  },
  methods: {
    handlerInput(e) {
      this.$emit('input', e.target.value);
    },
    subProduct() {
      if (this.quantity >= 2) {
        this.$emit('input', Number(this.quantity) - 1);
      }
    },
    addProduct() {
      if (this.quantity >= 0) {
        this.$emit('input', Number(this.quantity) + 1);
      }
    },
  },

};
</script>
