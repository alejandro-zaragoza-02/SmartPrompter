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
  if(store.config.styles.mode !== 'Diapositivas'){
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
    }">
      <div v-if="store.contents[store.config.styles.slide].type === 'text'">
        <p v-for="parragraph in store.contents[store.config.styles.slide].data.split('\n')">
          <template v-for="(word, wIndex) in parragraph.split(' ')">
            <span :id="`word-${store.config.styles.slide}-${wIndex}`">{{ word }}</span>{{ ' ' }}
          </template>
          <br>
        </p>
      </div>
      <v-img v-if="store.contents[store.config.styles.slide].type === 'image'" :width="`${store.contents[store.config.styles.slide].config.width}%`"
        :id="`img-${store.config.styles.slide}`" :src="store.contents[store.config.styles.slide].data" class="my-2"></v-img>
    </div>
  </main>
</template>

<style>
.said {
  opacity: 0.5;
}
</style>