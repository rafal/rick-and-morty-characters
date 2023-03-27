<template>
  <article class="flex flex-col w-full overflow-hidden mx-auto rounded-lg shadow-md md:w-[600px]">
    <div class="w-full article__image">
      <img :src="character.image" alt="character image"
        class="w-full object-center object-cover opacity-100 m-0 border-none p-0 md:!h-full" />
    </div>
    <div class="article__content relative p-3 text-white flex flex-col">
      <div class="section">
        <h2 class="text-xl m-0 p-0 font-extrabold">{{ character.name }}</h2>
        <span class="status">
          <span class="status__icon"
            :class="{ alive: character.status === 'Alive', dead: character.status === 'Dead' }"></span>
          {{ character.status }} - {{ character.species }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Type:</span>
        {{ character.type || 'Unknown' }}
      </div>
      <div class="section">
        <span class="text-gray">Episodes:</span>
        <ul>
          <li v-for="episode in character.episodes" :key="episode.id">
            {{ episode.id }}: {{ episode.name }}
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCharacters } from '@/stores/characters'

export default defineComponent({
  async setup() {
    const characters = useCharacters()

    const route = useRoute()
    const response = await fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`)
    let id = typeof route.params.id === 'string' ? parseInt(route.params.id) : characters.count
    console.log(id)
    let character = await response.json()
    if (character.error) {
      character = characters.characters.find(c => c.id === id)
      console.log(character)
    }
    if (character.episode) {
      const episodes = await Promise.all(character.episode.map(async (episode: string) => {
        const response = await fetch(episode)
        return response.json()
      }))
      character.episodes = episodes
    }
    console.log(character)
    return { character }
  }
})
</script>
<style scoped>
article {
  background: rgb(60, 62, 68);
}

.article__image {
  flex: 2 1 0%;
}

.article__image img {
  height: 300px;
  transition: opacity 0.5s ease 0s;
}

.article__content {
  flex: 3 1 0%;
}

.article__content .section {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}

.article__content .section h2 {
  line-height: 1.1;
}

.article__content .section .status {
  display: flex;
  align-items: center;
  text-transform: capitalize;
}

.article__content .section .status .status__icon {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(158, 158, 158);
  border-radius: 50%;
}

.article__content .section span {
  font-size: 16px;
  font-weight: 500;
}

.article__content .section span,
.article__content .section h2 {
  margin: 0px;
  padding: 0px;
}

.article__content .section+.section {
  margin-top: 1.25rem;
}

.text-gray {
  color: rgb(158, 158, 158);
}

.article__content .section:first-child {
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.alive {
  background: rgb(85, 204, 68) !important;
}

.dead {
  background: rgb(214, 61, 46) !important;
}
</style>