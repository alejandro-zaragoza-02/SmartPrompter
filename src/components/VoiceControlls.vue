<template>
  <p>{{ player.lastWordSaid }}</p>
</template>

<script setup>

import { useConfigStore } from '@/stores/config';
import { usePlayerStore } from '@/stores/player';
import { onMounted, onUnmounted } from 'vue';

const player = usePlayerStore()
const store = useConfigStore()

let mediaRecorder;

onMounted(() => {
  navigator.permissions.query({ name: 'microphone' }).then(function (permissionStatus) {
    if (permissionStatus.state !== 'granted') {
      player.lastWordSaid = 'Error. Falta permiso de micrófono.'
    }else{
      recordAudio()
    }
    permissionStatus.onchange = function () {
      if (permissionStatus.state !== 'granted') {
        player.lastWordSaid = 'Error. Falta permiso de micrófono.'
      } else {
        player.lastWordSaid = 'Escuchando...'
        recordAudio()
      }
    }
  })
})

onUnmounted(() => {
  if(mediaRecorder){
    mediaRecorder.stop()
  }
})

const recordAudio = () => {

  if(!store.config.voice.recordVoice) return
  
  let chunks = []

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start()

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
      };

      mediaRecorder.onstop = e => {
        player.audioFile = chunks
        chunks = []
        // let audioURL = window.URL.createObjectURL(blob);
        // let link = document.createElement("a");
        // link.href = audioURL;
        // link.download = 'audio.ogg';
        // link.click();
      }
    })
}

</script>