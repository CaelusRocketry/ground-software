<template>
    <div class="pane pane-abort" style="display: grid; grid-template-rows: 100px auto;">Abort
        <button v-on:click=hard_abort>Hard Abort</button>
        <button v-on:click=soft_abort>Soft Abort</button>
    </div>
</template>

<script>
export default {
    name: "abort",
    methods: {
        hard_abort: function(event){
            alert('Performing hard abort');
            // TODO: Send hard abort function to backend, which should then send that over telem to the Pi
        },
        soft_abort: function(event){
            alert('Performing soft abort');
            // TODO: Send soft abort function to backend, which should then send that over telem to the Pi
        }
    }
};
</script>
