<script setup>
import { ref } from 'vue'
import Header from '@/components/PlayerHeader.vue'
import { useConfigStore } from '@/stores/config'
import { usePlayerStore } from '@/stores/player'
import { onMounted } from 'vue'

const store = useConfigStore()
const player = usePlayerStore()

let getAlign = () => {
  switch (store.config.styles.textJustify) {
    case 0:
      return 'left'
    case 1:
      return 'center'
    case 2:
      return 'right'
    case 3:
      return 'justify'
    default:
      return 'left'
  }
}

let getFlipX = () => { return (store.config.styles.mirrorX ? -1 : 1) }
let getFlipY = () => { return (store.config.styles.mirrorY ? -1 : 1) }

const autoScroll = () => {

  clearInterval(player.intervalId)

  switch (store.config.styles.mode) {
    case 'Continuo':
      player.intervalId = setInterval(startModeContinuos, 100 / store.config.styles.speed)
      break
    case 'Diapositivas':
      player.intervalId = setInterval(startModePowerPoint, store.config.styles.speed * 10)
      break
    case 'Reconocimiento de voz':
      initVoiceRecognition()
      break
    default:
      break
  }

}

const initVoiceRecognition = () => {
  const recognition = new (webkitSpeechRecognition || SpeechRecognition)()
  recognition.lang = store.config.voice.lang || 'es-ES'
  recognition.interimResults = true
  recognition.continuos = true
  recognition.maxAlternatives = 1
  let grammarWords = ''
  store.contents.forEach(content => {
    if(content.type === 'text'){
      content.data.split(' ').forEach(word => {
        grammarWords += word.replace(/[^a-zA-Z0-9\u00C0-\u00FF]/g,'') + ' - '
      })
    }
  })
  if(grammarWords !== ''){
    grammarWords = grammarWords.substring(0, grammarWords.length - 3)
    var speechRecognitionList = new webkitSpeechGrammarList();
    var grammar = '#JSGF V1.0; grammar palabras; public <palabra> = ' + grammarWords + ' ;'
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
  }
  recognition.start();

  let lastTranscription = ''
  let lastText = ''
  const pointer = {
    parragraph: 0,
    word: 0
  }

  recognition.onresult = function(event) {
    if(!event.results[0].isFinal){

      let transcription = event.results[0][0].transcript
      let text = transcription.replace(lastTranscription, '')
      let lastWord = lastText + text
      lastTranscription = transcription
      lastText = text
      
      if(checkWord(text, pointer)) return
      
      if(checkWord(lastWord, pointer)) return
      
      let words = text.split(' ')
      words.forEach(wordListen => {
        if(wordListen === '') return
        checkWord(wordListen, pointer)
      })
      
      
    }else{
      //console.log('Final: ', event.results[0][0].transcript)
      // Corregir palabras anteriores
    }
  }

  recognition.onend = function(event) {
    recognition.start()
  }
}

const checkWord = (wordListen, pointer) => {
  const wordWanted = store.contents[pointer.parragraph].data.split(' ')[pointer.word].replace(/[^a-zA-Z0-9\u00C0-\u00FF]/g,'').toUpperCase()
  console.log('Word listen:', wordListen)
  console.log('Word wanted:', wordWanted)
  wordListen = wordListen.replace(/[^a-zA-Z0-9\u00C0-\u00FF]/g,'').toUpperCase()
  if (levenshtein(wordListen, wordWanted) <= 3) {
    const wordElement = document.getElementById(`word-${pointer.parragraph}-${pointer.word}`)
    wordElement.classList.add('said')
    if (store.contents[pointer.parragraph].data.split(' ').length > pointer.word + 1) {
      pointer.word++
    } else {
      if (store.contents.length > pointer.parragraph + 1) {
        pointer.parragraph++
        pointer.word = 0
      } else {
        console.log('FIN')
      }
    }
  }else{
    return false
  }
  return true
}


const levenshtein = (a, b) => {
      var t = [], u, i, j, m = a.length, n = b.length;
      if (!m) { return n; }
      if (!n) { return m; }
      for (j = 0; j <= n; j++) { t[j] = j; }
      for (i = 1; i <= m; i++) {
        for (u = [i], j = 1; j <= n; j++) {
          u[j] = a[i-1] === b[j-1] ? t[j-1] : Math.min(t[j-1], t[j], u[j-1]) + 1;
        } 
        t = u;
      }
      return t[n];
    }

const startModeContinuos = () => {
  const scrollContainer = document.getElementById('scrollContainer')
  if (!scrollContainer) return
  scrollContainer.scroll({
    top: player.scrollTop,
    left: 0,
    behavior: 'auto'
  })
  if (player.play) {
    player.scrollTop += 1
    if (player.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight) {
      player.restart()
    }
  }
}

const startModePowerPoint = () => {
  const scrollContainer = document.getElementById('scrollContainer')
  if (!scrollContainer) return
  scrollContainer.scroll({
    top: player.scrollTop,
    left: 0,
    behavior: 'auto'
  })
  if (player.play) {
    player.scrollTop += 1
    if (player.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight) {
      player.restart()
    }
  }
}


onMounted(() => {
  player.restart()
  autoScroll()
})

</script>

<template>
  <Header />
  <main id="scrollContainer" style="height:100%; overflow-y: scroll;">
    <div style="height: 40%;"></div>
    <div :style="{
      backgroundColor: store.config.styles.backgroundColor,
      textAlign: getAlign(),
      fontSize: store.config.styles.fontSize + 'px',
      lineHeight: store.config.styles.lineSpacing,
      color: store.config.styles.textColor,
      transform: `scale(${getFlipX()},${getFlipY()})`,
      fontFamily: store.config.styles.fontFamily,
      paddingInline: store.config.styles.margin[0] + '%',
    }">
      <div v-for="(content, cIndex) in store.contents">
        <div v-if="content.type === 'text'">
          <p v-for="parragraph in content.data.split('\n')">
            <template v-for="(word, wIndex) in parragraph.split(' ')">
              <span :id="`word-${cIndex}-${wIndex}`">{{ word }}</span>{{ ' ' }}
            </template>
            <br>
          </p>
        </div>
        <v-img v-if="content.type === 'image'" :width="`${content.config.width}%`" :id="`img-${index}`"
          :src="content.data" class="my-2"></v-img>
      </div>
    </div>
    <div style="height: 95vh;"></div>
  </main>
</template>

<style>

.said{
  opacity: 0.5;
}

</style>