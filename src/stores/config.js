import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const contents = ref([{
    type: 'text',
    data: ''
  }]);
  const config = {
    styles: {
      mode: ref('Continuo'),
      speed: ref(5),
      fontSize: ref(14),
      fontFamily: ref('Arial'),
      textColor: ref('#000000'),
      backgroundColor: ref('#FFFFFF'),
      lineSpacing: ref(1.5),
      textJustify: ref(0),
      mirrorY: ref(false),
      mirrorX: ref(false),
      margin: ref([10,90])
    },
    voice: {
      lang: ref('es'),
      micro: ref(0),
      recordVoice: ref(false),
      voiceSync: ref(false),
      recognitionThreshold: ref(0.3),
      voiceCommands: ref([]),
    }
  }

  return { contents, config }
})
