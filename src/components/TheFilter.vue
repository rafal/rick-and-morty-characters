<template>
  <div class="container z-10 flex items-center justify-center md:justify-start mx-auto max-w-[600px] 2xl:max-w-[1224px]">
    <div class="relative text-left inline-flex flex-col shadow">
      <button
class="flex items-center text-white background-gray px-6 py-3 rounded-lg w-fit"
        @click="open = !open">Filters</button>
      <div v-if="open" class="rounded-lg flex flex-col">
        <input
v-model="name" type="text" placeholder="Character name"
          class="p-3 background-gray text-white rounded-lg mt-1">
          <legend>Status:</legend>

          <div>
            <input id="alive" v-model="status" type="radio" value="alive">
            <label for="alive">Alive</label>
          </div>

          <div>
            <input id="dead" v-model="status" type="radio" value="dead">
            <label for="dead">Dead</label>
          </div>

          <div>
            <input id="unknown" v-model="status" type="radio" value="unknown">
            <label for="unknown">Unknown</label>
          </div>
        <input v-model="type" type="text" placeholder="Type" class="p-3 background-gray text-white rounded-lg mt-1">
        <input v-model="species" type="text" placeholder="Species" class="p-3 background-gray text-white rounded-lg mt-1">
        <fieldset>
          <legend>Gender:</legend>

          <div>
            <input id="male" v-model="gender" type="radio" value="male">
            <label for="male">male</label>
          </div>

          <div>
            <input id="female" v-model="gender" type="radio" value="female">
            <label for="female">female</label>
          </div>

          <div>
            <input id="genderless" v-model="gender" type="radio" value="genderless">
            <label for="genderless">genderless</label>
          </div>

          <div>
            <input id="unknown" type="radio" value="unknown">
            <label for="unknown">unknown</label>
          </div>
        </fieldset>
        <button class="p-3 background-gray rounded-lg text-white mt-1" @click="clear">Clear</button>

        <button class="p-3 background-gray rounded-lg text-white mt-1" @click="apply">Apply</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCharacters } from '@/stores/characters'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const characters = useCharacters()

let open = ref(false)
const name = ref('')
const type = ref('')
const species = ref('')
const gender = ref('')
const status = ref('')
const filters = { name, type, species, gender, status }
let filterQuery = ''
const apply = () => {
  // create query for each filter
  for (const [key, value] of Object.entries(filters)) {
    if (value.value) {
      filterQuery += `${key}=${value.value}&`
    }
  }
  console.log(filterQuery)
  characters.getCharacters(1, filterQuery)
  router.push({ name: 'characters', query: { filterQuery } })
  filterQuery = ''
  open.value = false
}
const clear = () => {
  for (const [key, value] of Object.entries(filters)) {
    value.value = ''
  }
  filterQuery = ''
  characters.getCharacters(1, '')
  router.push({ name: 'characters' })
  open.value = false
}
</script>

<style scoped>
.background-gray {
  background: rgb(60, 62, 68);
}
</style>