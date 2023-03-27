import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/models/character.model'

// export const useCharacters = defineStore('characters', () => {
//   interface Character {
//     id: number
//     name: string
//     status: string
//     species: string
//     type: string
//     gender: string
//     origin: {
//       name: string
//       url: string
//     }
//     location: {
//       name: string
//       url: string
//     }
//     image: string
//     episode: string[]
//     url: string
//     created: string
//   }
//   const characters = ref<Character[]>([])
//   // const doubleCount = computed(() => count.value * 2)
//   function setCharacters(characters: Character[]) {
//     characters.value = characters
//   }

//   return { characters, setCharacters }
// })

export const useCharacters = defineStore('characters', {
  state: () => ({
    characters: <Character[]>[],
    customCharacters: <Character[]>[],
    count: 0
  }),
  getters: {},
  actions: {
    async getCharacters(page: number, query: string) {
      const lastItem = page * 12
      console.log('lastItem', lastItem)
      const firstItem = lastItem - 12
      console.log('firstItem', firstItem)
      if (lastItem % 20 >= 12 || lastItem % 20 === 0) {
        const convertedPage = Math.floor(lastItem / 20)
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?${query}&page=${convertedPage}`
        )
        const data = await response.json()
        console.log(data.results.slice(firstItem % 20, firstItem % 20 + 12))
        this.characters = data.results.slice(firstItem % 20, firstItem % 20 + 12)
        this.count = data.info.count
      } else {
        const page2 = Math.ceil(lastItem / 20)
        const page1 = page2 - 1
        const res1 = await fetch(
          `https://rickandmortyapi.com/api/character/?${query}&page=${page1}`
        )
        const res2 = await fetch(
          `https://rickandmortyapi.com/api/character/?${query}&page=${page2}`
        )
        const data1 = await res1.json()
        const data2 = await res2.json()
        const allCharacters = [...data1.results, ...data2.results]
        console.log(allCharacters)
        console.log(allCharacters.slice(firstItem % 20, firstItem % 20 + 12))
        this.characters = allCharacters.slice(firstItem % 20, firstItem % 20 + 12)
        this.count = data2.info.count
      }
      if (!query){
        this.characters = [...this.customCharacters, ...this.characters].slice(0,12)
      }
    }

  }
})
