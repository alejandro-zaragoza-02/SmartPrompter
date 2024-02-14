<script setup>
import { ref } from 'vue'
import Header from '@/components/PlayerHeader.vue'
import { useConfigStore } from '@/stores/config'
import { usePlayerStore } from '@/stores/player';
import { onMounted } from 'vue';

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

  if (store.config.styles.mode === 'Continuo') {
    player.intervalId = setInterval(startModeContinuos, 100 / store.config.styles.speed)
  } else if (store.config.styles.mode === 'Diapositivas') {
    player.intervalId = setInterval(startModePowerPoint, store.config.styles.speed * 10)
  }

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
      player.restart();
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
      player.restart();
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
      <div v-for="(content, index) in store.contents">
        <div v-if="content.type === 'text'">
          <p v-for="parragraph in content.data.split('\n')">
            <span v-for="word in parragraph.split(' ')">
              {{ word + ' ' }}
            </span>
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