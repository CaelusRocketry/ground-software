<template>
    <div class="pane pane-message">Messages<hr/></div>
</template>

<script>
export default {
    name: "message",
    methods: {
        send_socket (event){
            this.$emit('send_socket', this.send_data)
        }

    }
};
</script>

<style scoped>
</style>