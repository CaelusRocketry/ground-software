<template>
    <div id="app">
        <button @click="send">SEND</button>
    </div>
</template>

<script>
export default {
    name: 'app',
    methods: {
        send: function() {
            console.log("client: emit 'test'");
            this.$socket.emit('test', {});
        }
    }
};
</script>

<style>
@font-face {
    font-family: 'Karla';
    src: url('~@/assets/ttf/Karla-Regular.ttf');
}
@font-face {
    font-family: 'Space Mono';
    src: url('~@/assets/ttf/SpaceMono-Regular.ttf');
}
html,
body {
    color: #0d1321 !important;
    background-color: #f3f7f0;
    overflow-x: hidden;
    font-family: 'Karla', Helvetica, Arial, sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#app {
    overflow: hidden;
}
code,
pre {
    font-family: 'Space Mono';
}
.align-left {
    text-align: left;
}
.align-center {
    text-align: center;
}
.align-right {
    text-align: right;
}
.buffer-bottom {
    margin-bottom: 3vh !important;
}
</style>
