<template>
  <main>
    <pxHeader :links="links" />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center"></router-view>
  </main>
</template>

<script>
import pxHeader from "./components/pxHeader.vue";

export default {
  name: 'app',
  componets: {
    pxHeader,
  },

  data() {
    return {
      links: [
        {
          title: 'BTC',
          to: { name: 'coin-detail', params: { id: 'bitcoin' } }
        },
        {
          title: 'ETH',
          to: { name: 'coin-detail', params: { id: 'ethereum' } }
        },
        {
          title: 'XRP',
          to: { name: 'coin-detail', params: { id: 'ripple' } }
        }
      ]
    }
  }
}
</script>