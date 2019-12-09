<template>
    <div class="pane pane-systeminfo"><b><u>System Info</u></b>
        <p>
            <b>Core Info</b> (last timestamp 5:42:29):
            <br />
            <br />
            Core IP: 192.168.1.183
            <br />
            Core Speed: 2300 MHz
            <br />
            Core CPU usage: 75 %
            <br />
            Core temperature: 30 degrees C
        </p>

        <p>
            <b>Sensor Info</b> (last timestamp 5:42:29):
            <br />
            <br />
            Thermocouple 1: 89 degrees C
            <br />
            Thermocouple 2: 42 degrees C
            <br />
            Load cell: 12 kg
            <br />
            Pressure sensor 1: 15 psi
            <br />
            Pressure sensor 2: 15 psi
        </p>

        <p>
            <b>Valve Info</b> (last timestamp 5:42:29):
            <br />
            <br />
            Solenoid 1: Closed
            <br />
            Solenoid 2: Open
            <br />
            Ball Valve: 30 degrees
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