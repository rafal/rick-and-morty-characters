<template>
  <div class="max-w-[1200px] 2xl:max-w-[1920px] w-fit">
      
    <TheFilter />
   
    <div class="flex flex-wrap items-center justify-center ">
      <CharacterCard v-for="character in characters.characters" :key="character.id" :character="character" @click="$router.push({ name: 'character', params: { id: character.id } })" />
    </div>

    <ThePagination />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import ThePagination from '@/components/ThePagination.vue'
import TheFilter from '@/components/TheFilter.vue'
import { useCharacters } from '@/stores/characters'

export default {
  components: {
    CharacterCard, ThePagination, TheFilter
  },
  setup() {
    const characters = useCharacters()
    const info = ref<any>({})
    // fetch('https://rickandmortyapi.com/api/character')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('data', data)
    //     info.value = data.info
    //     characters.setCharacters(data.results)
    //   })

    watch(characters, (newCharacters, oldCharacters) => {
      console.log(newCharacters)
    })

    return { characters, info }
  }
}
</script>

<style scoped></style>
