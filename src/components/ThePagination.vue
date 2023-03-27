<template>
  
  <div class="flex items-center justify-center mx-auto">
    <v-pagination v-model="currentPage" :pages="pages" :range-size="1" active-color="#DCEDFF"
      @update:modelValue="updateHandler" />
  </div>
</template>

<!-- <script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

</script> -->

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useCharacters } from '@/stores/characters'
import { useRouter, useRoute } from 'vue-router'


export default defineComponent({
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    VPagination
  },
  setup() {
    const characters = useCharacters()
    const route = useRoute()

    const currentPage = ref(1)
    const queryString = computed(() => route.query.filterQuery)
    console.log('queryString', queryString)

    characters.getCharacters(currentPage.value, typeof queryString.value === 'string' ? queryString.value : '')

    const itemsPerPage = 12
    const pages = computed(() => Math.ceil(characters.count / itemsPerPage))
    console.log(pages)


    function updateHandler(page: number) {
      console.log(page)
      console.log(route.query)
      console.log('queryString', queryString)

      characters.getCharacters(page, typeof queryString.value === 'string' ? queryString.value : '')
    }

    return {
      characters,
      pages,
      currentPage,
      updateHandler
    }
  }
})
</script>