<template>
    <v-app class="bg-blue-lighten-5" style="overflow-y: auto;">
        <header class="bg-grey-darken-3 header">
            <v-col cols="4" class="text-left d-flex align-center clickable" @click="$router.push('/')">
                <img src="/logo.png" alt="" height="50" width="50" class="mx-2">
                <h1 class="text-xs-h6 text-md-h5 header-title">SmartPrompter</h1>
            </v-col>
            <v-col cols="4" class="text-center pa-0">
                <p class="text-sm-h6 text-md-h5">SECCIÓN DE AYUDA</p>
            </v-col>
            <v-col cols="4" class="text-right">
                <v-btn @click="$router.push('/home')" variant="plain" icon="mdi-arrow-left"></v-btn>
                <v-btn @click="$router.push('/player')" variant="plain" icon="mdi-arrow-right" class="ml-2"
                    disabled></v-btn>
            </v-col>
        </header>
        <main>
            <!-- How it works section -->
            <v-container>
                <v-row class="pa-4" v-for="content in contents">
                    <h2 class="w-100" :id="content.id">{{ content.id }}. {{ content.title }}</h2>
                    <v-divider thickness="2" class="mb-3"></v-divider>
                    <p v-html="content.data"></p>
                </v-row>
            </v-container>
        </main>

        <!-- Footer section -->
        <v-footer class="bg-indigo-lighten-1 d-flex justify-space-between">
            <div>
                <strong>Alejandro Zaragoza Elías</strong> - {{ new Date().getFullYear() }}
            </div>
            <div>
                <a v-for="icon in icons" :key="icon.link" class="nostyle" target="_blank" :href="icon.link">
                    <v-btn class="mx-4" :icon="icon.icon" variant="text"></v-btn>
                </a>
            </div>
        </v-footer>
    </v-app>
</template>

<script setup>
import { useConfigStore } from '@/stores/config';
import { ref } from 'vue';

const store = useConfigStore();

const contents = [
    {
        id: '1',
        title: '¿Cómo funciona?',
        data: `SmartPrompter es una aplicación web que te permite configurar un texto para leerlo en formato de
                        teleprompter a la velocidad que desees. Además, te permite configurar elementos visuales y
                        utilizar reconocimiento de voz.`
    },
    {
        id: '2',
        title: 'Introduce el contenido',
        data: `Al comenzar aparecerá una pantalla dónde poder añadir, editar o eliminar el contenido que desees, estos contenidos pueden ser párrafos de texto o imagenes.
                        También podrás ajustar el tamaño de las imagenes y ordenar los contenidos según tus preferencias.`
    },
    {
        id: '3',
        title: 'Añade estilos',
        data: `En la siguiente página puedes configurar como se visulizará el contenido, si quieres cambiar el color de fondo, la fuente, la justificación, etc.`
    },
    {
        id: '4',
        title: 'Configura la funcionalidad',
        data: `Al pulsar el botón de ajustes ⚙️ desde la página de los estilos, podrás acceder a la configuración de la aplicación, donde podrás principalmente cambiar de modo:
               <ul>
                <li class="list">Modo continuo: en este modo podrás establecer una velocidad a la que deseas que baje el contenido que quieres reproducir, esta velocidad será continua.</li>
                <li class="list">Modo dispositivas: en este modo el contenido esta estático y para avanzar entre las diferentes dispositivas deberás hacer uso de los botones de la barra superior o usar las fleshas del teclado ⬅️ y ➡️.</li>
                <li class="list">Modo inteligente: en este modo el contenido avanzará hacia abajo según tu velocidad de lectura, ya que la app reconocerá tu voz y la sincronizará con el texto. En este modo puedes ajustar tanto el margen de error a la hora de reconocer una palabra, como la ventana de análisis, que establece el número de palabras hacia delante que tendrá en cuenta a la hora de analizar.</li>
               </ul>`
    },
    {
        id: '5',
        title: 'Inicia el reproducor',
        data: `
            Una vez esten hechos todos los ajustes a su gusto, se podrá avanzar a la siguiente pantalla para iniciar el reproductor, este tendrá un aspecto diferente según el modo seleccionado.
        `
    },
]

const icons = [
    {
        icon: 'mdi-instagram',
        link: ''
    },
    {
        icon: 'mdi-twitter',
        link: ''
    },
    {
        icon: 'mdi-linkedin',
        link: ''
    },
    {
        icon: 'mdi-github',
        link: 'https://github.com/alejandro-zaragoza-02/SmartPrompter'
    },
];
</script>

<style scoped>

main {
    height: 100%;
}

a.nostyle:link {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
}

a.nostyle:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
}

.list{
    list-style: circle !important;
    margin-left: 1em;
}

</style>
