<template>
    <div class="pane pane-valve" style="display: grid; grid-template-rows: 100px auto;">Valves
        <div>
        </div>
        <div style="display: grid; grid-template-rows: 25px auto;">
            <div id="valve_actuate_options" style="margin-left: 15px;">
                Valve:
                <select id="valve_select" style="margin-right: 10px;">
                    <option value=1>Oxidizer Pressure Relief Valve</option>
                    <option value=2>Fuel Pressure Relief Valve</option>
                    <option value=3>Fuel to Engine Valve</option>
                    <option value=4>Oxidizer to Engine Valve</option>
                    <option value=5>Fuel Outflow Valve</option>
                    <option value=6>Oxidizer Outflow Valve</option>
                </select>
                Priority:
                <select id="priority_select">
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                    <option value=5>5</option>
                    <option value=6>6</option>
                </select>
            </div>
            <button v-on:click=actuate_valve id="valve_actuate_button">Actuate valve</button>
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
            alert('Actuating valve ' + valve_num + ' with priority ' + priority);
            // TODO: Send valve actuation function to backend, which should then send that over telem to the Pi
        }
    }
};
</script>