<script setup>
import { ref } from 'vue'
import Header from '@/components/EditorHeader.vue'
import { useConfigStore } from '@/stores/config'
import draggable from 'vuedraggable'

const store = useConfigStore()

const drag = ref(false);

const dragOptions = ref({
  animation: 200,
})
const addParagraph = () => {
  store.contents.push({
    type: 'text',
    data: 'Parrafo'
  })
  console.log(store.contents)
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
    <draggable v-model="store.contents" v-bind="{ dragOptions }" item-key="id">
      <template #item="{ content, index }">
        <li class="d-flex align-center">
          <v-icon icon="mdi-drag" class="draggable mx-2"></v-icon>
          <div class="w-100">
            <v-textarea v-if="store.contents[index].type === 'text'" variant="outlined" class="my-2 list-group-item"
              v-model="store.contents[index].data" rows="1" no-resize auto-grow hide-details></v-textarea>
            <v-img v-if="store.contents[index].type === 'image'" :width="`${store.contents[index].config.width}%`"
              :id="`img-${index}`" :src="store.contents[index].data" class="my-2">
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
            <input v-if="store.contents[index].type === 'image'" v-show="false" :id="`inpFile-${index}`" type="file"
              @change="changeImage(index)">
          </div>
          <v-icon class="mx-2" icon="mdi-close"></v-icon>
        </li>
      </template>
    </draggable>
    <div class="px-16 pt-2" tag="ul">
    </div>
    <div class="d-flex justify-center">
      <v-btn prepend-icon="mdi-plus" class="ma-4" @click="addParagraph">Añadir párrafo</v-btn>
      <v-btn prepend-icon="mdi-image" class="ma-4" @click="addImage()">Añadir imagen</v-btn>
    </div>
  </main>
</template>

<style>

li {
  list-style: none;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

</style>