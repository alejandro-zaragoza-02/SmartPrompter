<template>
    <header class="bg-grey-darken-3 d-flex justify-between pa-3">
        <h1>SmartPrompter</h1>
        <div class="d-flex flex-wrap align-center justify-right w-100">
            <v-select label="Modo" :items="['Continuo', 'Diapositivas']" v-model="config.styles.mode" hide-details></v-select>
            <v-select :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]" v-model="config.styles.speed" prepend-icon="mdi-speedometer" hide-details></v-select>
            <v-select :items="[8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96]" v-model="config.styles.fontSize" prepend-icon="mdi-format-font-size-increase" hide-details></v-select>
            <v-select :items="['Roboto', 'Arial', 'Courier New', 'Calibri', 'Verdana', 'Georgia', 'Gill Sans', 'Segoe UI', 'Tahoma', 'Geneva', 'Cambria', 'Cochin', 'Impact']" v-model="config.styles.fontFamily" prepend-icon="mdi-format-size" hide-details></v-select>
                <div>
                    <v-icon icon="mdi-format-color-fill"></v-icon>
                    <v-btn @click="colorFillDialog = true" :color="config.styles.backgroundColor">
                        <v-dialog v-model="colorFillDialog" width="auto">
                            <v-card>
                                <v-card-text>
                                    <v-color-picker v-model="config.styles.backgroundColor" hide-inputs></v-color-picker>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn block @click="colorFillDialog = false">Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-btn>
                </div>
                <div>
                    <v-icon icon="mdi-format-color-text"></v-icon>
                    <v-btn @click="colorTextDialog = true;" :color="config.styles.textColor">
                        <v-dialog v-model="colorTextDialog" width="auto">
                            <v-card>
                                <v-card-text>
                                    <v-color-picker v-model="config.styles.textColor" hide-inputs></v-color-picker>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn block @click="colorTextDialog = false">Cerrar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-btn>
                </div>
                <v-select v-model="config.styles.lineSpacing" :items="[0.5, 1, 1.5, 2, 2.5, 3]"
                    prepend-icon="mdi-format-font-size-increase" hide-details></v-select>
                <div>
                    <v-btn-toggle v-model="config.styles.textJustify" shaped mandatory>
                        <v-btn>
                            <v-icon>mdi-format-align-left</v-icon>
                        </v-btn>

                        <v-btn>
                            <v-icon>mdi-format-align-center</v-icon>
                        </v-btn>

                        <v-btn>
                            <v-icon>mdi-format-align-right</v-icon>
                        </v-btn>

                        <v-btn>
                            <v-icon>mdi-format-align-justify</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <label :class="config.styles.mirrorX ? 'bg-blue-lighten-4' : 'bg-transparent'" class="pa-2 rounded-circle">
                    <v-icon icon="mdi-flip-horizontal"></v-icon>
                    <input type="checkbox" v-model="config.styles.mirrorX" style="display: none;">
                </label>
                <label :class="config.styles.mirrorY ? 'bg-blue-lighten-4' : 'bg-transparent'" class="pa-2 rounded-circle">
                    <v-icon icon="mdi-flip-vertical"></v-icon>
                    <input type="checkbox" v-model="config.styles.mirrorY" style="display: none;">
                </label>
                <v-icon icon="mdi-attachment-plus"></v-icon>
                <v-icon icon="mdi-download"></v-icon>
                <v-icon icon="mdi-file-upload-outline"></v-icon>
                <v-icon icon="mdi-microphone"></v-icon>
        </div>
    </header>
    <div>
        <v-range-slider v-model="config.styles.margin" @end="symmetrize()" min="0" max="100" step="1"></v-range-slider>
    </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'

const { config } = useConfigStore()

const colorFillDialog = ref(false)
const colorTextDialog = ref(false)

const auxMargin = ref(config.styles.margin)

let symmetrize = () => {
    if(auxMargin.value[0] !== config.styles.margin[0] && (auxMargin.value[1] === config.styles.margin[1] || auxMargin.value[0] === config.styles.margin[1])){
        config.styles.margin[1] = 100 - config.styles.margin[0];
    }
    if((auxMargin.value[0] === config.styles.margin[0] || auxMargin.value[1] === config.styles.margin[0]) && auxMargin.value[1] !== config.styles.margin[1]){
        config.styles.margin[0] = 100 - config.styles.margin[1];
    }
    auxMargin.value = config.styles.margin;
}

</script>