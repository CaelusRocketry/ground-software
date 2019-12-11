<template>
    <div class="pane pane-valve" style="display: grid; grid-template-rows: 100px auto;">Valves
        <div>
        </div>
        <div style="display: grid; grid-template-rows: 25px auto;">
            <div id="valve_actuate_options">
                Valve:
                <select class="selectpicker" id="valve_select">
                    <option value=1>Oxidizer Pressure Relief Valve</option>
                    <option value=2>Fuel Pressure Relief Valve</option>
                    <option value=3>Fuel to Engine Valve</option>
                    <option value=4>Oxidizer to Engine Valve</option>
                    <option value=5>Fuel Outflow Valve</option>
                    <option value=6>Oxidizer Outflow Valve</option>
                </select>
                Priority:
                <select class="selectpicker" id="priority_select">
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                    <option value=5>5</option>
                    <option value=6>6</option>
                </select>
            </div>
            <b-button variant="primary" v-on:click=actuate_valve id="valve_actuate_button">Actuate valve</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "valves",
    methods: {
        actuate_valve: function(event){
            let valve_num = document.getElementById("valve_select").value;
            let priority = document.getElementById("priority_select").value;
            let degrees = 45;
            alert('Actuating valve ' + valve_num + ' with priority ' + priority);
            this.$socket.emit('test', 'hello');
            this.$socket.emit('actuate_valve', valve_num, degrees, priority);
//            let header = "valve";
//            let message = "actuate_valve int:" + valve_num + " int:" + degrees + " int:" + priority;
//            this.make_packet(header, message);
            // TODO: Send valve actuation function to backend, which should then send that over telem to the Pi
        },
    }
};
</script>