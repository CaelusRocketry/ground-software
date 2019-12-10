<template>
    <div class="pane pane-systeminfo">System Info
        <hr/>
        <p>
            <b id="gay">Core Info</b> (last timestamp 5:42:29):
            <br />
            <br />
            <b>Core IP:</b> 192.168.1.183
            <br />
            <b>Core Speed:</b> 2300 MHz
            <br />
            <b>Core CPU usage:</b> 75 %
            <br />
            <b>Core temperature:</b> 30 degrees C
        </p>

        <p>
            <b>Sensor Info</b> (last timestamp 5:42:29):
            <br />
            <br />
            <b>Thermocouple 1:</b> 89 degrees C
            <br />
            <b>Thermocouple 2:</b> 42 degrees C
            <br />
            <b>Load cell:</b> 12 kg
            <br />
            <b>Pressure sensor 1:</b> 15 psi
            <br />
            <b>Pressure sensor 2:</b> 15 psi
        </p>

        <p>
            <b>Valve Info</b> (last timestamp 5:42:29):
            <br />
            <br />
            <b>Solenoid 1:</b> Closed
            <br />
            <b>Solenoid 2:</b> Open
            <br />
            <b>Ball Valve:</b> 30 degrees
        </p>


    </div>
</template>

<script>
export default {};
</script>

<style scoped>
div{
    white-space: pre-wrap;
}
p {white-space: pre-line;}
</style>