<template>
  <div>
    <BaseHeader/>
    <router-view/>
    <BaseFooter/>
  </div>
</template>

<script>

import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: { BaseFooter, BaseHeader },
  created() {
    this.getUserKey();
    this.loadCart();
  },
  methods: {
    ...mapActions({
      getUserKey: 'cart/getUserKey',
      loadCart: 'cart/loadCart',
    }),
    ...mapMutations({
      updateAccessKey: 'cart/updateUserAccessKey',
    }),
  },
};
</script>
