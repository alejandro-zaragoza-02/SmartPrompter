<script setup>

</script>

<template>
  <header class="bg-grey-darken-3 header">
    <v-col cols="4" class="text-left d-flex align-center" @click="$router.push('/')">
      <img src="/logo.png" alt="" height="50" width="50" class="mx-2">
      <h1 class="text-xs-h6 text-md-h5 header-title">SmartPrompter</h1>
    </v-col>
    <v-col cols="4" class="text-center pa-0">
      <p class="text-sm-h6 text-md-h5">EDITOR DE TEXTO</p>
    </v-col>
    <v-col cols="4" class="text-right">
      <v-btn @click="$router.push('/')" variant="plain" icon="mdi-arrow-left"></v-btn>
      <v-btn @click="$router.push('/styler')" variant="plain" icon="mdi-arrow-right" density="comfortable" class="ml-2"></v-btn>
    </v-col>
  </header>
</template>

<style scoped>

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: .3em;
}

</style>