<template>
  <nav
    class="fixed h-20 left-0 top-0 !w-full !m-0 !p-0 border-b-2 border-b-zinc-800 flex items-center justify-center z-20 background-dark gap-6">
    <button
      class="px-6 py-3 rounded-lg background-dark border-2 border-zinc-700 uppercase tracking-widest hover:text-white h-fit"
      @click="$router.push('/')">Home</button>
    <button
      class="px-6 py-3 rounded-lg background-dark border-2 border-zinc-700 uppercase tracking-widest hover:text-white h-fit"
      @click="addHero">Add
      hero</button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
function addHero() {
  router.push('/add-hero');
}
</script>

<style scoped>
.background-dark {
  background: #181818;
}
</style>