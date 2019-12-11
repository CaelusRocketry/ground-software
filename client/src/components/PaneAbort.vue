<template>
    <div class="pane pane-abort" style="display: grid; grid-template-rows: 100px auto;">
        Abort
        <b-button variant="warning" v-on:click=soft_abort>Soft Abort</b-button>
        <b-button variant="danger" v-on:click=hard_abort>Hard Abort</b-button>
        <b-button variant="danger" v-on:click=make_packet>Send message</b-button>
    </div>
</template>

<script>
export default {
    name: "abort",
    data() {
        return {
            send_data: 'yooowhatsup',
            recv_data: 'heyythere'
        }
    },
    methods: {
        hard_abort: function(event){
            alert('Performing hard abort');
            // TODO: Send hard abort function to backend, which should then send that over telem to the Pi
        },
        soft_abort: function(event){
            alert('Performing soft abort');
            // TODO: Send soft abort function to backend, which should then send that over telem to the Pi
        },
        make_packet (header, message) {
            this.$emit('make_packet', header, message)
        },
    }
};
</script>
