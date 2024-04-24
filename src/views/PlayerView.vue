<script setup>
import { onUnmounted } from 'vue'
import Header from '@/components/PlayerHeader.vue'
import { useConfigStore } from '@/stores/config'
import { usePlayerStore } from '@/stores/player'
import { onMounted } from 'vue'
import router from '@/router'

const store = useConfigStore()
const player = usePlayerStore()

let recognition = null

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

const getAligImg = () => {
  switch (store.config.styles.textJustify) {
    case 0:
      return '0'
    case 1:
      return '0 auto'
    case 2:
      return '0 0 0 auto'
    case 3:
      return '0'
    default:
      return '0'
  }
}

let getFlipX = () => { return (store.config.styles.mirrorX ? -1 : 1) }
let getFlipY = () => { return (store.config.styles.mirrorY ? -1 : 1) }

const autoScroll = () => {

  clearInterval(player.intervalId)

  switch (store.config.styles.mode) {
    case 'Continuo':
      player.intervalId = setInterval(startModeContinuos, 100 / (store.config.styles.speed * 3))
      break
    case 'Inteligente':
      initVoiceRecognition()
      // navigator.mediaDevices.getUserMedia({
      //   audio: {
      //     deviceId: store.config.voice.micro ? { exact: store.config.voice.micro } : undefined
      //   }
      // }).then(function (stream) {
      //   initVoiceRecognition()
      // }).catch(function (err) {
      //     console.log(err);
      // })
      break
    default:
      break
  }

}

const initVoiceRecognition = () => {
  recognition = new (webkitSpeechRecognition || SpeechRecognition)()
  recognition.lang = store.config.voice.lang || 'es-ES'
  recognition.interimResults = true
  recognition.continuos = true
  recognition.maxAlternatives = 1
  let grammarWords = ''
  store.contents.forEach(content => {
    if (content.type === 'text') {
      content.data.split(' ').forEach(word => {
        grammarWords += word.replace(/[^a-zA-Z0-9\u00C0-\u00FF]/g, '') + ' - '
      })
    }
  })
  if (grammarWords !== '') {
    grammarWords = grammarWords.substring(0, grammarWords.length - 3)
    var speechRecognitionList = new webkitSpeechGrammarList()
    var grammar = '#JSGF V1.0; grammar palabras; public <palabra> = ' + grammarWords + ' ;'
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
  }
  recognition.start();

  let lastTranscription = ''

  recognition.onresult = function (event) {
    if (!event.results[0].isFinal) {
      let transcription = event.results[0][0].transcript
      let text = transcription.replace(lastTranscription, '')
      lastTranscription = transcription
      let words = text.split(' ')
      checkText(words)

    } else {
      //console.log('Final: ', event.results[0][0].transcript)
      // Corregir palabras anteriores
    }
  }

  recognition.onend = function (event) {
    recognition.start()
  }
}

const checkText = async (words) => {
  let found = false
  let wordsLeft = []
  let maxWindow = store.config.voice.wordWindow
  for (let iWordTarget = 0; iWordTarget < maxWindow; iWordTarget++) {
    if (found) return
    const wordTarget = getWord(iWordTarget)
    console.log(player.pointer, wordTarget)
    if (wordTarget.length < 3) {
      maxWindow++
      continue
    }
    words.forEach((wordListen, index) => {
      if (wordListen !== '') {
        console.log(wordListen, wordTarget, checkWord(wordListen, wordTarget))
        player.lastWordSaid = wordListen
        setTimeout(() => {
          if (player.lastWordSaid === wordListen) {
            player.lastWordSaid = '...Silencio...'
          }
        }, 1500)
        if (checkWord(wordListen, wordTarget)) {
          for (let i = 0; i <= iWordTarget; i++) {
            paintWord()
            nextPointer()
          }
          wordsLeft = (words.length > 1) ? words.splice(index, 1) : []
          found = true
        }
      }
    })
  }
  if (wordsLeft.length > 0) {
    checkText(wordsLeft)
  }
}


const paintWord = () => {
  const span = document.getElementById(`word-${player.pointer.parragraph}-${player.pointer.word}`)
  span.classList.add('said')
  const scrollContainer = document.getElementById('scrollContainer')
  if (!scrollContainer) return
  if (player.lastWordPosition === 0) {
    player.lastWordPosition = span.getBoundingClientRect().y + (span.getBoundingClientRect().height / 2)
  }
  if (span.getBoundingClientRect().y !== player.lastWordPosition) {
    console.log(span.getBoundingClientRect().top - player.lastWordPosition)
    scrollContainer.scrollTop += span.getBoundingClientRect().top - player.lastWordPosition
    player.lastWordPosition = span.getBoundingClientRect().y
  }
}

const getWord = (amount) => {
  const wordsInParragraph = store.contents[player.pointer.parragraph].data.split(' ').length
  const difference = player.pointer.word + amount - wordsInParragraph
  const newPointer = { ...player.pointer };
  if (difference >= 0) {
    newPointer.parragraph = nextParragraph()
    newPointer.word = difference
  } else {
    newPointer.word += amount
  }
  const wordWanted = store.contents[newPointer.parragraph].data.split(' ')[newPointer.word].replace(/[^a-zA-Z0-9\u00C0-\u00FF]/g, '').toUpperCase()
  return wordWanted
}

const nextPointer = (amount = 1) => {
  const wordsInParragraph = store.contents[player.pointer.parragraph].data.split(' ').length
  const difference = player.pointer.word + amount - wordsInParragraph
  console.log('dif: ', difference)
  if (difference >= 0) {
    player.pointer.parragraph = nextParragraph()
    player.pointer.word = difference
  } else {
    player.pointer.word += amount
  }
}

const nextParragraph = () => {
  let i = player.pointer.parragraph + 1
  while (i < store.contents.length) {
    if (store.contents[i].type === 'text') {
      return i
    }
    const img = document.getElementById(`img-${i}`)
    player.scrollTop += img.getBoundingClientRect().height + 18.
    i++
  }
  return -1
}

const checkWord = (wordListen, wordWanted) => {
  wordListen = wordListen.replace(/[^a-zA-Z0-9\u00C0-\u00FF]/g, '').toUpperCase()
  return levenshtein(wordListen, wordWanted) <= Math.ceil(wordWanted.length / ((0.6 - store.config.voice.recognitionThreshold) * 10))
}


const levenshtein = (a, b) => {
  var t = [], u, i, j, m = a.length, n = b.length;
  if (!m) { return n; }
  if (!n) { return m; }
  for (j = 0; j <= n; j++) { t[j] = j; }
  for (i = 1; i <= m; i++) {
    for (u = [i], j = 1; j <= n; j++) {
      u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
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
      player.play = false
    }
  }
}
onMounted(() => {
  if (store.config.styles.mode === 'Diapositivas') {
    router.push('/slider')
  }
  player.restart()
  autoScroll()
})

onUnmounted(() => {
  console.log('Unmounted')
  player.restart()
  if (recognition) {
    recognition.onend = null
    recognition.stop()
    recognition = null
  }
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
      fontFamily: store.config.styles.fontFamily + ', sans-serif',
      paddingInline: store.config.styles.margin[0] + '%',
    }">
      <div v-for="(content, cIndex) in store.contents" :key="content.data">
        <div v-if="content.type === 'text'">
          <p v-for="parragraph in content.data.split('\n')" :key="parragraph">
            <template v-for="(word, wIndex) in parragraph.split(' ')">
              <span :id="`word-${cIndex}-${wIndex}`">{{ word }}</span>{{ ' ' }}
            </template>
          </p>
        </div>
        <v-img v-if="content.type === 'image'" :width="`${content.config.width}%`" :id="`img-${cIndex}`"
          :src="content.data" :style="{ margin: getAligImg() }"></v-img>
        <br>
      </div>
    </div>
    <div style="height: 95vh;"></div>
  </main>
</template>

<style scoped>
.said {
  opacity: 0.5;
}
</style>