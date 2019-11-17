<template>
    <div id="app">
        <button @click="send">SEND</button>
    </div>
</template>

<script>
export default {
    name: "app",
    methods: {
        send: function() {
            console.log("client: emit 'test'");
            this.$socket.emit("test", {});
        }
    }
};
</script>
