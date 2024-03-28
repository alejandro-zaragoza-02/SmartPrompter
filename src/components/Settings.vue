<script setup>
import { ref } from 'vue';
import languages from '../helpers/getLanguages.js'
import { useConfigStore } from '@/stores/config';
import ExportSelector from '@/components/ExportSelector.vue'

const { config } = useConfigStore()

const dialog = ref(false)
const mode = ref(config.styles.mode)
const speed = ref(config.styles.speed)
const error = ref(config.voice.recognitionThreshold)
const window = ref(config.voice.wordWindow)
const micro = ref(config.voice.micro || '')
const lang = ref(config.voice.lang)
const audio = ref(config.voice.recordVoice)
const commands = ref(config.voice.voiceCommands)

const audioDevices = ref([])

navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
        devices.forEach(function (device) {
            if (device.kind === 'audioinput') {
                audioDevices.value.push(device.label)
                if (device.deviceId === 'default') {
                    micro.value = device.label
                }
            }
        });
    })
    .catch(function (err) {
        console.log(err)
    });

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

const saveConfig = () => {
    config.styles.mode = mode
    config.styles.speed = speed
    config.voice.recognitionThreshold = error
    config.voice.wordWindow = window
    config.voice.micro = micro
    config.voice.lang = lang
    config.voice.recordVoice = audio
    config.voice.voiceCommands = commands
    dialog.value = false
}

</script>

<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
            <template v-slot:activator="{ props: activatorProps }">
                <v-icon icon="mdi-cog" v-bind="activatorProps"></v-icon>
            </template>

            <v-card>
                <v-toolbar>
                    <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
                    <v-toolbar-title>Congifuración</v-toolbar-title>
                    <v-toolbar-items>
                        <v-btn text="Guardar" variant="text" @click="saveConfig()"></v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list class="overflow-x-hidden">
                    <v-list-subheader>General</v-list-subheader>
                    <v-list-item title="Modo de reproducción">
                        <v-btn-toggle v-model="mode" mandatory tile color="primary"
                            class="d-flex flex-column flex-sm-row h-100 mb-2">
                            <v-btn value="Continuo" prepend-icon="mdi-timer-cog-outline" class="flex-grow-1 py-3"
                                :ripple="false">Continuo</v-btn>
                            <v-btn value="Diapositivas" prepend-icon="mdi-play-box-outline" class="flex-grow-1 py-3"
                                :ripple="false">Diapositivas</v-btn>
                            <v-btn value="Reconocimiento de voz" prepend-icon="mdi-microphone" class="flex-grow-1 py-3"
                                :ripple="false">Reconocimiento de voz</v-btn>
                        </v-btn-toggle>
                    </v-list-item>
                    <v-list-item v-if="mode === 'Continuo'" :title="`Velocidad de reproducción: ${speed.toString()}`">
                        <v-slider class="px-4" v-model="speed" min="1" max="9" step="1" hide-details></v-slider>
                    </v-list-item>
                    <v-list-item v-if="mode === 'Reconocimiento de voz'"
                        :title="`Ventana de reconocimiento: ${window.toString()}`">
                        <v-slider class="px-4" v-model="window" min="1" max="9" step="1" hide-details></v-slider>
                    </v-list-item>
                    <v-list-item v-if="mode === 'Reconocimiento de voz'"
                        :title="`Margen de error: ${error.toString()}`">
                        <v-slider class="px-4" v-model="error" min="0.1" max="0.5" step="0.1" hide-details></v-slider>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                    <v-list-subheader>Ajustes de voz</v-list-subheader>
                    <v-list-item>
                        <v-select label="Micrófono" variant="outlined" :items="audioDevices" v-model="micro"
                            class="mt-2"></v-select>
                        <v-autocomplete label="Idioma" variant="outlined" :items="languages" item-title="title"
                            item-value="code" v-model="lang" :rules="[
                            (val) =>
                                (val && val.length > 0) || 'Debe seleccionar un idioma',
                        ]"></v-autocomplete>
                    </v-list-item>
                    <v-list-item
                        subtitle="Grabar el audio del micrófono seleccionado para poder escuchar y descargar una vez finalizada la reproducción"
                        title="Grabar audio" @click="audio = !audio">
                        <template v-slot:prepend>
                            <v-list-item-action start>
                                <v-checkbox-btn v-model="audio" color="primary"></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                    <v-list-item v-if="mode === 'Continuo'">
                        <div class="text-h6 my-4">Comandos de voz</div>
                        <v-row class="align-center px-4 pt-1">
                            <label class="w-25">Reproducir:</label>
                            <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                                v-model="commands.Continuo.play"></v-combobox>
                        </v-row>
                        <v-row class="align-center px-4 pt-1">
                            <label class="w-25">Pausar:</label>
                            <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                                v-model="commands.Continuo.pause"></v-combobox>
                        </v-row>
                        <v-row class="align-center px-4 pt-1 mb-2">
                            <label class="w-25">Reiniciar:</label>
                            <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                                v-model="commands.Continuo.restart"></v-combobox>
                        </v-row>
                    </v-list-item>
                    <v-list-item v-if="mode === 'Diapositivas'">
                        <div class="text-h6 my-4">Comandos de voz</div>
                        <v-row class="align-center px-4 pt-1">
                            <label class="w-25">Anterior diapositiva:</label>
                            <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                                v-model="commands.Dispositivas.back"></v-combobox>
                        </v-row>
                        <v-row class="align-center px-4 pt-1 mb-2">
                            <label class="w-25">Siguiente diapositiva:</label>
                            <v-combobox clearable chips multiple hide-details density="compact" variant="outlined"
                                v-model="commands.Dispositivas.next"></v-combobox>
                        </v-row>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                    <v-list-subheader>Ajustes adicionales</v-list-subheader>
                    <v-row class="px-6">
                        <v-col cols="12" md="6">
                            <v-btn prepend-icon="mdi-upload" block @click="$refs.importInput.click()">Importar</v-btn>
                            <input v-show="false" ref="importInput" type="file" @change="importFile($event)" accept=".json, .md">
                        </v-col>
                        <v-col cols="12" md="6">
                            <ExportSelector></ExportSelector>
                        </v-col>
                    </v-row>
                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>