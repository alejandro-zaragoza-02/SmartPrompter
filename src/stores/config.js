import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const contents = ref([{
    type: 'text',
    data: 'El teleprónter​ (en inglés teleprompter, también llamado teleapuntador, autocue o cue por influencia del nombre de la principal empresa fabricante) es un aparato electrónico que refleja el texto, ya sea noticias, canciones... previamente cargado en una computadora, en un cristal transparente que se sitúa en la parte frontal de una cámara.'
  },{
    type: 'text',
    data: 'En algunos casos se controlan a través de un pedal en los pies del presentador que, al pisarlo, hace avanzar el texto y, si deja de pisarlo, este se detiene. De este modo, el sujeto puede leer con comodidad y a su ritmo. En otras ocasiones, es controlado por un operador que debe llevar el ritmo del narrador, para que la lectura se note natural y pausada. Por lo regular, debe estar instalado en todas las cámaras que se usan a la hora de una transmisión.'
  }]);
  const config = {
    styles: {
      mode: ref('Reconocimiento de voz'),
      speed: ref(5),
      fontSize: ref(48),
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
      lang: ref('es-ES'),
      micro: ref(''),
      recordVoice: ref(false),
      voiceSync: ref(false),
      recognitionThreshold: ref(0.3),
      wordWindow: ref(5),
      voiceCommands: {
        play: ref([]),
        pause: ref([]),
        restart: ref([]),
      },
    }
  }

  return { contents, config }
})
