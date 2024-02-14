<script setup>
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'

const store = useConfigStore()

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
  <header class="bg-grey-darken-3 pa-3 mb-3 header">
    <div class="d-flex align-center clickable" @click="$router.push('/')">
      <img src="../assets/logo.png" alt="" height="50" width="50" class="mx-2">
      <h1>SmartPrompter</h1>
    </div>
    <div class="options">
      <v-icon icon="mdi-download" @click="downloadFile()"></v-icon>
      <label class="clickable">
        <v-icon icon="mdi-file-upload-outline"></v-icon>
        <input v-show="false" type="file" @change="importFile($event)">
      </label>
      <v-btn color="primary" @click="$router.push('/styler')">Continuar</v-btn>
    </div>
  </header>
</template>

<style>

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

</style>