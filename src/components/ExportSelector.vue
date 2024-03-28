<template>
    <v-dialog v-model="modalActivator" width="min(90%, 500px)">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn prepend-icon="mdi-download" block v-bind="activatorProps">Exportar</v-btn>
        </template>
        <v-card style="overflow: hidden;">
            <v-toolbar>
                <v-toolbar-title>Elegir formato de descarga</v-toolbar-title>
                <v-btn icon="mdi-close" @click="modalActivator = false"></v-btn>
            </v-toolbar>
            <v-card-text>
                <p class="mb-1">¿Qué deseas descargar?</p>
                <v-row dense>
                    <v-col v-for="type in downloadContent" :key="type.title" cols="4"
                        @click="downloadConfig.content = (downloadConfig.content !== type.title) ? type.title : null">
                        <div class="down-btn" :class="(type.title === downloadConfig.content) ? 'selected' : ''">
                            <v-row>
                                <v-img class="ma-2" :src="`src/assets/editor/download-types/${type.img}`"></v-img>
                            </v-row>
                            <v-row>
                                <p class="w-100 text-center text-no-wrap card-text">{{ type.title }}</p>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
                <p class="mt-4 mb-1">Tipo de fichero</p>
                <v-row dense>
                    <v-col v-for="type in downloadMethods" :key="type.title" cols="6"
                        @click="downloadConfig.type = (downloadConfig.type !== type.title) ? type.title : null">
                        <div class="down-btn" :class="(type.title === downloadConfig.type) ? 'selected' : ''">
                            <v-row>
                                <v-img class="ma-2" :src="`src/assets/editor/download-formats/${type.img}`"></v-img>
                            </v-row>
                            <v-row>
                                <p class="w-100 text-center text-no-wrap card-text">{{ type.title }}</p>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
                <v-text-field class="mt-4" v-model="downloadConfig.name" label="Nombre del fichero"></v-text-field>
                <v-btn color="primary" block :disabled="!(downloadConfig.content && downloadConfig.type && downloadConfig.name !== '')" @click="download()">Descargar</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useConfigStore } from '@/stores/config';
import { ref } from 'vue';


const modalActivator = ref(false)

const store = useConfigStore()

const downloadConfig = ref({
    content: null,
    type: null,
    name: ''
})

const download = () => {
    try {
        let file 
        switch (downloadConfig.value.type) {
            case 'Json':
                file = new Blob([JSON.stringify(store)], { type: 'application/json' })
                break;
            case 'Markdown':

                break
            default:
                break
        }
        const url = URL.createObjectURL(file)
        const aElement = document.createElement('a')
        aElement.setAttribute('download', 'config.json')
        aElement.setAttribute('href', url)
        aElement.setAttribute('target', '_blank')
        aElement.click();
        URL.revokeObjectURL(href)
    } catch (error) {
        console.log("No se puede cargar el fichero")
    }
}

const downloadMethods = [
    {
        title: "Json",
        img: "json.svg",
    },
    {
        title: "Markdown",
        img: "markdown.svg",
    },
]

const downloadContent = [
    {
        title: "Contenido",
        img: "content.svg",
    },
    {
        title: "Configuración",
        img: "settings.svg",
    },
    {
        title: "Ambos",
        img: "both.svg",
    },
]


</script>

<style scoped>
.down-btn {
    padding: 1em;
    border-radius: .6em;
    border: solid 2px black;
    

    &:hover {
        cursor: pointer;
    }
}

.selected {
    background-color: rgb(239, 255, 255);
}

@media (max-width: 600px) {
  .card-text {
    font-size: 11px;
  }
}

</style>