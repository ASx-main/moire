<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link"
         :class="{'arrow-disabled' : currentPage === 1}"
         aria-label="Предыдущая страница"
         @click.prevent="paginationLeft(currentPage)"
      >
        <img src="../../assets/img/svg/arrow-left.svg"
             width="40"
             height="40"
             alt="Влево"
             class="arrow-pagination"
        />
      </a>
    </li>

    <li class="pagination__item"
        v-for="page in pages"
        :key="page"
    >
      <a class="pagination__link"
         :class="{'pagination__link--current' : page === currentPage}"
         @click.prevent="pagination(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link"
         href="#"
         aria-label="Следующая страница"
         :class="{'arrow-disabled' : currentPage === pages}"
         @click.prevent="paginationRight(currentPage)"
      >
        <img src="../../assets/img/svg/arrow-right.svg"
             width="40"
             height=40
             alt="Вправо"
             class="arrow-pagination"
        />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    productPerPage: {
      type: [Number, String],
      default: 12,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.productPerPage);
    },
  },
  methods: {
    pagination(page) {
      this.$emit('pagination', page);
    },
    paginationLeft(page) {
      if (page !== 1) {
        this.$emit('paginationLeft', page - 1);
      }
    },
    paginationRight(page) {
      if (page !== this.pages) {
        this.$emit('paginationRight', page + 1);
      }
    },
  },
};
</script>

<style scoped>
.arrow-pagination {
  cursor: pointer;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.arrow-disabled {
  opacity: 30%;
}

.pagination__link {
  cursor: pointer;
  position: relative;
}
</style>
