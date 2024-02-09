<script setup>
import { ref } from 'vue'
import Header from '@/components/StylerHeader.vue'
import { useConfigStore } from '@/stores/config'

const store = useConfigStore()

const getAlign = () => {
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

const getFlipX = () => { return (store.config.styles.mirrorX ? -1 : 1) }
const getFlipY = () => { return (store.config.styles.mirrorY ? -1 : 1) }

</script>

<template>
  <Header />
  <main>
    <p :style="{
      backgroundColor: store.config.styles.backgroundColor,
      fontSize: store.config.styles.fontSize + 'px',
      textAlign: getAlign(),
      lineHeight: store.config.styles.lineSpacing,
      color: store.config.styles.textColor,
      transform: `scale(${getFlipX()},${getFlipY()})`,
      fontFamily: store.config.styles.fontFamily,
      paddingInline: store.config.styles.margin[0] + '%',
    }" class="pt-4">
      <div v-for="(content, index) in store.contents">
        <p v-if="content.type === 'text'">{{ content.data }}</p>
        <v-img v-if="content.type === 'image'" :width="`${content.config.width}%`" :id="`img-${index}`"
          :src="content.data" class="my-2">
        </v-img>
        <input v-if="content.type === 'image'" v-show="false" :id="`inpFile-${index}`" type="file"
          @change="changeImage(index)">
      </div>
    </p>
  </main>
</template>