<template>
  <div class="pt-20 h-screen text-white">
    <div class="max-w-screen-sm mx-auto p-10 rounded-md">
      <h1 class="mb-4 text-3xl">Create Hero</h1>
      <form @submit.prevent="submitForm" class="flex flex-col gap-6">
        <input v-model="formData.name" type="text" placeholder="Character name"
          class="p-3 background-gray rounded-lg mt-1 text-black">
        <span v-for="error in v$.name.$errors" :key="error.$uid" class="text-red-500">{{ error.$message }}</span>
        <fieldset>
          <legend>Gender:</legend>

          <div>
            <input id="male" v-model="formData.gender" type="radio" value="Male">
            <label for="male">Male</label>
          </div>

          <div>
            <input id="female" v-model="formData.gender" type="radio" value="Female">
            <label for="female">Female</label>
          </div>

          <div>
            <input id="genderless" v-model="formData.gender" type="radio" value="Genderless">
            <label for="genderless">Genderless</label>
          </div>

          <div>
            <input id="unknown" type="radio" value="Unknown">
            <label for="unknown">Unknown</label>
          </div>
        </fieldset>
        <span v-for="error in v$.gender.$errors" :key="error.$uid" class="text-red-500">{{ error.$message }}</span>

        <input v-model="formData.image" type="text" placeholder="Image url"
          class="p-3 background-gray text-black rounded-lg mt-1">
        <span v-for="error in v$.image.$errors" :key="error.$uid" class="text-red-500">{{ error.$message }}</span>

        <button type="submit"
          class="px-6 py-3 rounded-lg background-dark border-2 border-zinc-700 uppercase tracking-widest hover:text-white h-fit disabled:opacity-25 disabled:cursor-not-allowed"
          @click="submitForm" :disabled="v$.$errors.length > 0">Add</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, reactive, computed } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
import { useVuelidate } from '@vuelidate/core'
import { required, url } from '@vuelidate/validators'
import { useCharacters } from '@/stores/characters'
import type { Character } from '@/models/character.model'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter();

    const characters = useCharacters()

    const formData = reactive({
      name: '',
      gender: '',
      image: '',
    })
    const submitForm = async () => {
      const result = await v$.value.$validate()
      if (!result) {
        return
      } else {
        console.log(formData)
        console.log(characters)
        let id = characters.count + 1
        console.log(id)
        console.log({...formData as Character, id})
        characters.customCharacters.push({...formData as Character, id})
        console.log(characters.characters[characters.count - 1])
        router.push(`/`)
      }
    }
    const rules = computed(() => {
      return {
        name: { required }, // Matches state.firstName
        gender: { required }, // Matches state.lastName
        image: { required, url }, // Matches state.email
      }
    })

    const v$ = useVuelidate(rules, formData)

    return { formData, submitForm, v$ }
  }
}
</script>

<style scoped>
.background-dark {
  background: #181818;
}
</style>