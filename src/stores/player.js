import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  const play = ref(false)
  const reset = ref(false)
  const pointer = ref({
    parragraph: 0,
    word: 0
  })
  const timeIntervalId = ref(0)

  const lastWordSaid = ref('Escuchando...')
  const lastWordPosition = ref(0)

  const audioFile = ref([])

  const restart = () => {
    play.value = false
    pointer.value.parragraph = 0
    pointer.value.word = 0
    lastWordSaid.value = 'Escuchando...'
    lastWordPosition.value = 0
    audioFile.value = []
  }

  return {
    play,
    reset,
    pointer,
    timeIntervalId,
    lastWordSaid,
    lastWordPosition,
    audioFile,
    restart
  }
})
