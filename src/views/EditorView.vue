<script setup>
import { ref } from 'vue'
import Header from '@/components/EditorHeader.vue'
import { useConfigStore } from '@/stores/config'

const store = useConfigStore()

let addParagraph = () => {
  store.contents.push({
    type: 'text',
    data: 'Parrafo'
  })
  console.log(store.contents)
}

let removeParagraph = (index) => {
  if (store.contents[index].data === '') {
    store.contents.splice(index, 1)
  }
}

let addImage = () => {
  store.contents.push({
    type: 'image',
    data: '/src/assets/editor/image.jpg',
    config: {
      width: 25
    }
  })
}

let changeImage = (index) => {
  let input = document.getElementById(`inpFile-${index}`)
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      store.contents[index].data = e.target.result
    }
    reader.readAsDataURL(input.files[0]);
  }
}

let editSizeImage = (index, size) => {
  store.contents[index].config.size = size
}

let deleteImage = (index) => {
  store.contents.splice(index, 1)
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
  <main>
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
      <div v-for="(content, index) in store.contents">
        <!-- <p v-if="content.type === 'text'" contenteditable="true" @input="editParagraph($event, index)"
          @blur="removeParagraph(index)"></p> -->
        <v-textarea v-if="content.type === 'text'" @blur="removeParagraph(index)" v-model="content.data"></v-textarea>
        <v-img v-if="content.type === 'image'" :width="`${content.config.width}%`" :id="`img-${index}`"
          :src="content.data" class="my-2">
          <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
                <v-list>
                  <v-list-item value="0">
                    <label :for="`inpFile-${index}`">
                      <v-list-item-title>Cambiar</v-list-item-title>
                    </label>
                  </v-list-item>
                  <v-list-item value="1" @click="deleteImage(index)">
                    <v-list-item-title>Borrar</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-toolbar>
        </v-img>
        <input v-if="content.type === 'image'" v-show="false" :id="`inpFile-${index}`" type="file"
          @change="changeImage(index)">
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-btn prepend-icon="mdi-plus" class="ma-4" @click="addParagraph">Añadir párrafo</v-btn>
      <v-btn prepend-icon="mdi-image" class="ma-4" @click="addImage()">Añadir imagen</v-btn>
    </div>
  </main>
</template>