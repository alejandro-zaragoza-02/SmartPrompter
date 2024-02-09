import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const contents = ref([{
    type: 'text',
    data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus pellentesque aliquam. Donec malesuada nulla sed orci vehicula tincidunt. Suspendisse at diam at neque consequat convallis. Duis tincidunt ultricies dolor, et dictum odio cursus vel. Integer ultrices metus quis dapibus finibus. Nam at sagittis nibh. Sed quis posuere arcu. Nullam sollicitudin maximus varius. Vestibulum dictum risus at urna rutrum viverra. Fusce aliquet, leo in ultrices auctor, arcu tortor ultricies ante, in viverra diam est nec justo. Nam vel leo sed nulla malesuada sodales eu vulputate arcu. Nam accumsan vulputate bibendum. Aenean eu auctor nunc. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam sit amet tortor maximus, laoreet ipsum in, tristique est.'
  }]);
  const config = {
    styles: {
      mode: ref('Continuo'),
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
