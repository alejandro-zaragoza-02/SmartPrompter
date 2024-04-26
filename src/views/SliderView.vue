<script setup>
import { ref } from 'vue'
import Header from '@/components/PlayerHeader.vue'
import { useConfigStore } from '@/stores/config'
import { usePlayerStore } from '@/stores/player'
import { onMounted } from 'vue'
import router from '@/router'

const store = useConfigStore()
const player = usePlayerStore()

onMounted(() => {
  if (store.config.styles.mode !== 'Diapositivas') {
    router.push('/player')
  }
})

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

</script>

<template>
  <Header />
  <main id="scrollContainer" style="height:100%; overflow-y: hidden;">
    <div :style="{
      backgroundColor: store.config.styles.backgroundColor,
      textAlign: getAlign(),
      fontSize: store.config.styles.fontSize + 'px',
      lineHeight: store.config.styles.lineSpacing,
      color: store.config.styles.textColor,
      transform: `scale(${getFlipX()},${getFlipY()})`,
      fontFamily: store.config.styles.fontFamily,
      paddingInline: store.config.styles.margin[0] + '%',
      minHeight: '100%',
    }">
      <div v-if="store.contents[player.slide].type === 'text'">
        <p v-for="parragraph in store.contents[player.slide].data.split('\n')">
          <template v-for="(word, wIndex) in parragraph.split(' ')">
            <span :id="`word-${player.slide}-${wIndex}`">{{ word }}</span>{{ ' ' }}
          </template>
          <br>
        </p>
      </div>
      <v-img v-if="store.contents[player.slide].type === 'image'"
        :width="`${store.contents[player.slide].config.width}%`" :id="`img-${player.slide}`"
        :src="store.contents[player.slide].data" :style="{ margin: getAligImg() }"></v-img>
    </div>
  </main>
</template>

<style scoped>
.said {
  opacity: 0.5;
}
</style>