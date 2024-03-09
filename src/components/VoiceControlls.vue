<template>
  <p>{{ player.lastWordSaid }}</p>
</template>

<script setup>

import { usePlayerStore } from '@/stores/player';
import { onMounted, onUnmounted } from 'vue';

const player = usePlayerStore()



onMounted(() => {
  navigator.permissions.query({ name: 'microphone' }).then(function (permissionStatus) {
    if (permissionStatus.state !== 'granted') {
      player.lastWordSaid = 'Error. Falta permiso de micrófono.'
    }
    permissionStatus.onchange = function () {
      if (permissionStatus.state !== 'granted') {
        player.lastWordSaid = 'Error. Falta permiso de micrófono.'
      }else{
        player.lastWordSaid = 'Escuchando...'
      }
    }
  })
})

</script>