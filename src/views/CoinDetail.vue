<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img class="w-20 h-20 mr-5"
            v:bind:src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" />
          <h1 class="text-5x1">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio mas bajo</b>
              <span>{{ min() }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio mas alto</b>
              <span>{{ max() }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg() }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variacion 24hs</b>
              <span>{{ asset.changePercent24Hr }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            cambiar
          </button>
        </div>
      </div>

      <line-chart class="my-10" :colors="['orange']" :min="min" :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])" />
      <!-- El parametro data recibe 2 argumentos el primero (X) label y el segundo (Y) el valor -->

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <pxButton :isLoading="m.isLoading || false" v-if="!m.url" @click="getWebSite(m)">
              <slot>Obtener Link</slot>
            </pxButton>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{ m.url }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>

import api from "../api";
import pxButton from "../components/pxButton.vue";
export default {
  name: "CoinDetail",

  components: {
    pxButton,
  },

  data() {
    return { isLoading: false, asset: {}, history: [], markets: [] };
  },

  watch: {
    $route() {
      this.getCoin()
    }
  },

  created() {
    this.getCoin();
  },

  methods: {
    getWebSite(exchange) {
      this.$set(exchange, "isLoading", true);
      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          this.$set(exchange, "url", res.exchangeUrl); //Esto resuelve el problema de reactividad de Vue que
          //no permite refrescar la vista una vez que un elemento de listas se le modifica un elemento
          //visualmente una vez ya renderixzada la vista
        })
        .finally(() => {
          this.$set(exchange, "isLoading", false);
        });
    },

    getCoin() {
      this.isLoading = true;
      const id = this.$route.params.id;
      //Funcion nativa que permite que se ejecuten varias promesas simultaneas parametro a parametro de promesas y continua cuando se hayan ejecutado todas
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  computed: {
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },

    avg() {
      return Math.abs(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
  },
};
</script>
