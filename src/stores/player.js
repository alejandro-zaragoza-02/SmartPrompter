import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  
  const play = ref(false)
  const time = ref(0)
  const pointer = ref({
    parragraph: 0,
    word: 0
  })
  const scrollTop = ref(0)
  const scrollIntervalId = ref(0)
  const timeIntervalId = ref(0)

  const lastWordSaid = ref('Escuchando...')
  const lastWordPosition = ref(0)

  const audioFile = ref([])

  const restart = () => {
    play.value = 0
    time.value = 0
    scrollTop.value = 0
    pointer.value.parragraph = 0
    pointer.value.text = 0
    lastWordSaid.value = 'Escuchando...'
    lastWordPosition.value = 0
    audioFile.value = []
  }

  return { play, time, pointer, scrollTop, scrollIntervalId, timeIntervalId, lastWordSaid, lastWordPosition, audioFile, restart }
})
