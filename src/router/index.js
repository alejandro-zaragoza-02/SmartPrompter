import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditorView from '../views/EditorView.vue'
import PlayerView from '../views/PlayerView.vue'
import SliderView from '../views/SliderView.vue'
import StylerView from '../views/StylerView.vue'
import { useConfigStore } from '@/stores/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView
    },
    {
      path: '/styler',
      name: 'styler',
      component: StylerView
    },
    {
      path: '/slider',
      name: 'slider',
      component: SliderView
    },
    {
      path: '/player',
      name: 'player',
      component: PlayerView
    }
  ]
})

export default router
