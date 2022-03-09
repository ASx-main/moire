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
                  @click.prevent="sub"
          >
            <img src="../../assets/img/svg/sub.svg"
                 alt="Убрать"
            >
          </button>

          <input type="number"
                 v-model.number="localQuantity"
                 name="count"
          >

          <button type="button"
                  aria-label="Добавить один товар"
                  @click.prevent="add"
          >
            <img src="../../assets/img/svg/add.svg"
                 alt="Добавить"
            >
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
  data() {
    return {
      localQuantity: 1,
    };
  },
  watch: {
    quantity: {
      immediate: true,
      handler() {
        this.localQuantity = Number(this.quantity);
      },
    },
    localQuantity(v) {
      this.localQuantity = Math.abs(v);
      this.$emit('input', v);
    },
  },
  methods: {
    add() {
      this.localQuantity += 1;
    },
    sub() {
      if (this.localQuantity > 1) {
        this.localQuantity -= 1;
      }
    },
  },

};
</script>
