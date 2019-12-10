<template>
    <div id="app">
        <PaneMessages />
        <PaneSystemInfo />
        <div style="display: grid; grid-template-rows: 100px auto;">
            <PaneInfo />
            <PaneValves />
            <PaneAbort />
        </div>
    </div>
</template>

<script>
import PaneMessages from "@/components/PaneMessages.vue";
import PaneInfo from "@/components/PaneInfo.vue";
import PaneSystemInfo from "@/components/PaneSystemInfo.vue"
import PaneValves from "@/components/PaneValves.vue";
import PaneAbort from "@/components/PaneAbort.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: "app",
    components: {
        PaneMessages,
        PaneInfo,
        PaneSystemInfo,
        PaneValves,
        PaneAbort
    }
};
</script>

<style>
@font-face {
    font-family: "Karla";
    src: url("~@/assets/ttf/Karla-Regular.ttf");
}
@font-face {
    font-family: "Space Mono";
    src: url("~@/assets/ttf/SpaceMono-Regular.ttf");
}

html {
    height: 100vh;
}

body {
    margin: 10px;
    height: calc(100vh - 20px);
    background-color: #f3f7f0;
    overflow-x: hidden;
    max-height: 100vh;
    max-width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body * {
    grid-gap: 10px;
}

#app {
    height: 100%;
    overflow: hidden;
    color: #0d1321 !important;
    font-family: "Karla", Helvetica, Arial, sans-serif !important;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
}

.pane {
    border: 1px solid #d3d7d0;
    border-radius: 10px;
    padding: 10px;
}

code,
pre {
    font-family: "Space Mono";
}

</style>
