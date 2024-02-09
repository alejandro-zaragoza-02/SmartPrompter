import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  
  const play = ref(false)
  const time = ref(0)
  const scrollTop = ref(0)
  const scrollIntervalId = ref(0)
  const timeIntervalId = ref(0)

  const restart = () => {
    play.value = 0
    time.value = 0
    scrollTop.value = 0
  }

  return { play, time, scrollTop, scrollIntervalId, timeIntervalId, restart }
})
