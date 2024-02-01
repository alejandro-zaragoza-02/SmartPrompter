<script setup>
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'

const store = useConfigStore()

const colorFillDialog = ref(false)
const colorTextDialog = ref(false)

const mobileDisplay = ref(false)

const auxMargin = ref(store.config.styles.margin)

const symmetrize = () => {
  if (auxMargin.value[0] !== store.config.styles.margin[0] && (auxMargin.value[1] === store.config.styles.margin[1] || auxMargin.value[0] === store.config.styles.margin[1])) {
    store.config.styles.margin[1] = 100 - store.config.styles.margin[0];
  }
  if ((auxMargin.value[0] === store.config.styles.margin[0] || auxMargin.value[1] === store.config.styles.margin[0]) && auxMargin.value[1] !== store.config.styles.margin[1]) {
    store.config.styles.margin[0] = 100 - store.config.styles.margin[1];
  }
  auxMargin.value = store.config.styles.margin;
}

const downloadFile = () => {
  const file = new Blob([JSON.stringify(store)], { type: 'application/json' })
  const url = URL.createObjectURL(file)
  const aElement = document.createElement('a')
  aElement.setAttribute('download', 'config.json')
  aElement.setAttribute('href', url)
  aElement.setAttribute('target', '_blank')
  aElement.click();
  URL.revokeObjectURL(href)
}

const importFile = (evt) => {
  let input = evt.target
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      const json = JSON.parse(e.target.result)
      store.contents = json.contents
      store.config = json.config
      input.value = ''
    }
    reader.readAsText(input.files[0]);
  }
}

</script>

<template>
  <header class="bg-grey-darken-3 pa-3 header">
    <h1>SmartPrompter</h1>
    <div v-if="!mobileDisplay" class="options">
      <v-btn color="primary" @click="$router.push('/player')">Iniciar</v-btn>
      <v-select label="Modo" :items="['Continuo', 'Diapositivas']" v-model="store.config.styles.mode" hide-details
        density="comfortable" class="mode" variant="solo"></v-select>
      <v-select :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]" v-model="store.config.styles.speed" prepend-inner-icon="mdi-speedometer"
        hide-details density="comfortable" class="speed" variant="solo"></v-select>
      <v-select :items="[8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96]" v-model="store.config.styles.fontSize"
        prepend-inner-icon="mdi-format-font-size-increase" hide-details density="comfortable" class="textSize" variant="solo"></v-select>
      <v-select
        :items="['Roboto', 'Arial', 'Courier New', 'Calibri', 'Verdana', 'Georgia', 'Gill Sans', 'Segoe UI', 'Tahoma', 'Geneva', 'Cambria', 'Cochin', 'Impact']"
        v-model="store.config.styles.fontFamily" prepend-inner-icon="mdi-format-size" hide-details density="comfortable"
        class="fontFamily" variant="solo"></v-select>
      <div>
        <v-icon icon="mdi-format-color-fill" class="mr-1"></v-icon>
        <v-btn @click="colorFillDialog = true" :color="store.config.styles.backgroundColor">
          <v-dialog v-model="colorFillDialog" width="auto">
            <v-card>
              <v-card-text>
                <v-color-picker v-model="store.config.styles.backgroundColor" hide-inputs></v-color-picker>
              </v-card-text>
              <v-card-actions>
                <v-btn block @click="colorFillDialog = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
      <div>
        <v-icon icon="mdi-format-color-text" class="mr-1"></v-icon>
        <v-btn @click="colorTextDialog = true;" :color="store.config.styles.textColor">
          <v-dialog v-model="colorTextDialog" width="auto">
            <v-card>
              <v-card-text>
                <v-color-picker v-model="store.config.styles.textColor" hide-inputs></v-color-picker>
              </v-card-text>
              <v-card-actions>
                <v-btn block @click="colorTextDialog = false">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
      <v-select v-model="store.config.styles.lineSpacing" :items="[0.5, 1.0, 1.5, 2.0, 2.5, 3.0]"
        prepend-inner-icon="mdi-format-font-size-increase" hide-details density="comfortable" class="lineSpacing" variant="solo"></v-select>
      <div>
        <v-btn-toggle v-model="store.config.styles.textJustify" shaped mandatory rounded="">
          <v-btn size="small" icon="mdi-format-align-left"></v-btn>
          <v-btn size="small" icon="mdi-format-align-center"></v-btn>
          <v-btn size="small" icon="mdi-format-align-right"></v-btn>
          <v-btn size="small" icon="mdi-format-align-justify"></v-btn>
        </v-btn-toggle>
      </div>
      <label :class="store.config.styles.mirrorX ? 'selected' : ''" class="rounded-circle">
        <v-icon icon="mdi-flip-horizontal"></v-icon>
        <input type="checkbox" v-model="store.config.styles.mirrorX" style="display: none;">
      </label>
      <label :class="store.config.styles.mirrorY ? 'selected' : ''" class="rounded-circle">
        <v-icon icon="mdi-flip-vertical"></v-icon>
        <input type="checkbox" v-model="store.config.styles.mirrorY" style="display: none;">
      </label>
      <v-icon icon="mdi-download" @click="downloadFile()"></v-icon>
      <label class="clickable">
        <v-icon icon="mdi-file-upload-outline"></v-icon>
        <input v-show="false" type="file" @change="importFile($event)">
      </label>
      <v-icon icon="mdi-microphone"></v-icon>
    </div>
    <div v-if="mobileDisplay" class="options">
      Movil
    </div>
  </header>
  <div>
    <v-range-slider v-model="store.config.styles.margin" @end="symmetrize()" min="0" max="100" step="1"></v-range-slider>
  </div>
</template>

<style>

.mode {
  width: 10em;
}

.speed {
  width: 6em;
}

.textSize {
  width: 7em;
}

.fontFamily {
  width: 11em;
}

.lineSpacing {
  width: 7em;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  font-size: 14px;
}

.selected {
  color: rgb(129, 173, 240);
}

</style>