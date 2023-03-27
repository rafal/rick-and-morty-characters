import { createRouter, createWebHistory } from 'vue-router'
import CharactersList from '../views/CharactersList.vue'
import CharacterPage from '../views/CharacterPage.vue'
import AddHero from '../views/AddHero.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'characters',
      component: CharactersList
    },
    {
      path: '/characters/:id',
      name: 'character',
      component: CharacterPage
    },
    {
      path: '/add-hero',
      name: 'add-hero',
      component: AddHero
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
