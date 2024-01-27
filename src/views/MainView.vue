<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import { useConfigStore } from '@/stores/config'

const store = useConfigStore();

let addParagraph = () => {
  store.contents.push('Parrafo')
}

let editParagraph = (evt, index) => {
  store.contents[index] = evt.target.innerText
}

let removeParagraph = (index) => {
  console.log(index, store.contents[index])
  if(store.contents[index] === ''){
    store.contents.splice(index, 1)
  }
}

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
  <main class="d-flex flex-column justify-center">
    <div :style="{
      backgroundColor: store.config.styles.backgroundColor,
      textAlign: getAlign(),
      fontSize: store.config.styles.fontSize + 'px',
      lineHeight: store.config.styles.lineSpacing,
      color: store.config.styles.textColor,
      transform: `scale(${getFlipX()},${getFlipY()})`,
      fontFamily: store.config.styles.fontFamily,
      paddingInline: store.config.styles.margin[0] + '%'
    }">
      <p contenteditable="true" v-for="(content, index) in store.contents" @input="editParagraph($event, index)" @blur="removeParagraph(index)">{{ content }}</p>
    </div>
    <v-btn @click="addParagraph" class="my-4 mx-16">
      <v-icon icon="mdi-plus"></v-icon>
    </v-btn>
  </main>
</template>

<style>

</style>