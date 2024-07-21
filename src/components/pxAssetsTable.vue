<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variacion 24hs</th>
        <td class="hidden sm:block"></td>
        <input
          class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block"
          id="filter"
          placeholder="Buscar..."
          type="text"
          v-model="filter"
        />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        v-bind:key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-6"
            v-bind:src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`"
            v-bind:alt="a.name"
          />
        </td>
        <td>
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            v-bind:to="{ name: 'coin-detail', params: { id: a.id } }"
            >{{ a.name }}</router-link
          ><small class="ml-1 text-gray-500">{{ a.symbol }}</small>
        </td>
        <td>{{ dollarFilter(a.priceUsd) }}</td>
        <td>{{ dollarFilter(a.marketCapUsd) }}</td>
        <td
          v-bind:class="
            a.changePercent24Hs.icludes('-') ? 'text-red-600' : 'text-green-600'
          "
        >
          {{ percentFilter(a.changePercent24Hs) }}
        </td>
        <td class="hidden sm:block">
          <pxButton @click="gotoCoin(a.id)"><span>Details</span></pxButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import pxButton from "./pxButton.vue";
import numeral from "numeral";

export default {
  name: "pxAssetsTable",

  components: { pxButton },

  data() {
    return {
      filter: "",
      sortOrder: 1,
    };
  },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1;
      return this.assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    },
  },

  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },

    dollarFilter(value) {
      if (!value) return "$ 0";
      return numeral(value).format("($ 0.00a)");
    },

    percentFilter(value) {
      if (!value) return "0%";
      return `${Number(value).toFixed(2)}%`;
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
};
</script>

<style scope>
.up ::before {
  content: "UP";
}

.downl ::before {
  content: "DOWN";
}
td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
