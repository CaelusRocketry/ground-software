<template>
    <div class="pane-info">
        <div style="justify-self: start;">
            <h1>Project Caelus</h1>
            <p>Ground Software</p>
        </div>
        <img style="justify-self: end;" src="@/assets/img/banner.png" />
    </div>
</template>

<script>
export default {
    name: "info",
    methods: {
        make_packet (header, message) {
            this.$emit('make_packet', header, message)
        },
    }
};
</script>

<style scoped>
.pane-info {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 10px;
}
.pane-info h1 {
    margin: 0 0 10px 0;
    font-size: 1.8em;
}
.pane-info p {
    margin: 0;
}

img {
    max-height: 100%;
}
</style>