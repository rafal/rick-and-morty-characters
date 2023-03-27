<template>
  <article class="flex flex-col w-full overflow-hidden m-3 rounded-lg shadow-md md:w-[600px] md:h-[220px] md:flex-row cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-103 hover:bg-gray-500 duration-300">
    <div class="w-full article__image">
      <img :src="character.image" alt="character image"
        class="w-full object-center object-cover opacity-100 m-0 border-none p-0 md:!h-full" />
    </div>
    <div class="article__content relative p-3 text-white flex flex-col">
      <div class="section">
        <h2 class="text-xl m-0 p-0 font-extrabold">{{ character.name }}</h2>
        <span class="status">
          <span class="status__icon" :class="{alive: character.status === 'Alive', dead: character.status === 'Dead'}"></span>
          {{ character.status || 'Unknown' }} - {{ character.species || 'Unknown' }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location:</span>
        {{ character.location?.name || 'Unknown' }}
      </div>
      <div class="section">
        <span class="text-gray">First seen in:</span>
        Episode {{ character.episode && character.episode[0]?.split('/').pop() || 'Unknown' }}
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    character: {
      type: Object as () => any,
      required: true
    }
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