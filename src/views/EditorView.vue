<script setup>
import { ref } from 'vue'
import Header from '@/components/EditorHeader.vue'
import { useConfigStore } from '@/stores/config'

const store = useConfigStore()

const addParagraph = () => {
  store.contents.push({
    type: 'text',
    data: 'Parrafo'
  })
  console.log(store.contents)
}

const removeParagraph = (index) => {
  if (store.contents[index].data === '') {
    store.contents.splice(index, 1)
  }
}

const addImage = () => {
  store.contents.push({
    type: 'image',
    data: '/src/assets/editor/image.jpg',
    config: {
      width: 25
    }
  })
}

const changeImage = (index) => {
  let input = document.getElementById(`inpFile-${index}`)
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      store.contents[index].data = e.target.result
    }
    reader.readAsDataURL(input.files[0]);
  }
}

const editSizeImage = (index, size) => {
  store.contents[index].config.size = size
}

const deleteImage = (index) => {
  store.contents.splice(index, 1)
}

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
        <p v-if="content.type === 'text'" @blur="removeParagraph(index)">{{ content.data }}</p>
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
    <!-- <div class="d-flex justify-center">
      <v-btn prepend-icon="mdi-plus" class="ma-4" @click="addParagraph">Añadir párrafo</v-btn>
      <v-btn prepend-icon="mdi-image" class="ma-4" @click="addImage()">Añadir imagen</v-btn>
    </div> -->
  </main>
</template>