<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <pxAssetsTable v-if="isLoading" :assets="assets" />
  </div>
</template>

<script>
import pxAssetsTable from "../components/pxAssetsTable.vue";
import api from "../api";

export default {
  name: "Home",
  components: { pxAssetsTable },

  data() {
    return {
      assets: [],
      isLoading: false,
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = true));
  },
};
</script>
