<script setup>
import { ref } from 'vue'
import Header from '@/components/EditorHeader.vue'
import { useConfigStore } from '@/stores/config'
import draggable from 'vuedraggable'

const store = useConfigStore()

const imgConfigDialog = ref(false)
const lastImgConfigClicked = ref(0)

const addParagraph = () => {
  store.contents.push({
    type: 'text',
    data: 'Parrafo'
  })
}

const addImage = () => {
  store.contents.push({
    type: 'image',
    data: 'editor-assets/add-image.png',
    config: {
      width: 25
    }
  })
}

const removeItem = (index) => {
  store.contents.splice(index, 1);
}

const openFileExplorer = (index) => {
  const fileInput = document.getElementById(`inpFile-${index}`);
  if(fileInput){
    fileInput.click();
  }
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

const editSizeImage = (index, width) => {
  store.contents[index].config.width = width
}

</script>

<template>
  <Header />
  <main>
    <draggable v-model="store.contents" item-key="id" handle=".handle">
      <template #item="{ content, index }">
        <li class="d-flex align-center">
          <v-icon icon="mdi-drag" class="draggable mx-2 handle"></v-icon>
          <div class="w-100">
            <v-textarea v-if="store.contents[index].type === 'text'" variant="outlined" class="my-2 list-group-item"
              v-model="store.contents[index].data" rows="1" no-resize auto-grow hide-details></v-textarea>
            <v-img v-if="store.contents[index].type === 'image'" :width="`${store.contents[index].config.width}%`"
              :id="`img-${index}`" :src="store.contents[index].data" class="my-2 img" @click="openFileExplorer(index)">
            </v-img>
            <input v-if="store.contents[index].type === 'image'" v-show="false" :id="`inpFile-${index}`" type="file"
              @change="changeImage(index)">
          </div>
          <div class="d-flex flex-column">
            <v-icon v-if="store.contents[index].type === 'image'" class="mx-2" icon="mdi-cog" @click="imgConfigDialog = true; lastImgConfigClicked = index;"></v-icon>
            <v-icon class="mx-2" icon="mdi-close" @click="removeItem(index)"></v-icon>
          </div>
        </li>
      </template>
    </draggable>
    <div class="d-flex justify-center flex-wrap mt-2">
      <v-btn prepend-icon="mdi-plus" class="ma-2" @click="addParagraph">Añadir párrafo</v-btn>
      <v-btn prepend-icon="mdi-image" class="ma-2" @click="addImage()">Añadir imagen</v-btn>
    </div>
  </main>
  <v-dialog
      v-model="imgConfigDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="bg-blue-lighten-5">Configurar imagen</v-card-title>
        <v-card-text>
          <v-slider
            v-model="store.contents[lastImgConfigClicked].config.width"
            label="Ancho"
            min="1"
            max="100"
            step="1"
            thumb-label
          ></v-slider>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="imgConfigDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style>

li {
  list-style: none;
}

.draggable {
  cursor: grab;
}

.img {
  border: solid 1px #202020;
  border-radius: .3em;
}

</style>