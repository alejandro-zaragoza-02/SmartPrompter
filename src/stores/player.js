import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  
  const play = ref(false)
  const time = ref(0)

  return { play, time }
})
