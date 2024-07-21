<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <pxIcon class="mr-2 w-14 h-14" />
          <router-link v-bind:to="{ name: 'home' }">
            <span class="font-semibold text-xl tracking-tight">PlatziExchange</span></router-link>
        </div>
        <div class="hidden sm:block w-full block flex-grow lg:flex lg:item-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <router-link class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              v-for="l in links" :key="l.title" :to="{ name: l.to }">{{ l.title }}</router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import pxIcon from "./pxIcon.vue";

export default {
  name: 'pxHeader',
  components: { pxIcon },

  props: {
    type: Array,
    default: () => { }
  }
}
</script>
