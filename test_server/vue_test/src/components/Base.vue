<template>
  <div class="valve1">
    <h3>Valve 1: {{ v1_value }}</h3>
    <range-slider
      class="slider"
      min="0"
      max="90"
      step="1"
      v-model="v1_value">
    </range-slider>
    <button v-on:click="send_v1">Send Valve 1 Value</button>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'
import send_data from '@/valve_funcs'
export default {
  name: 'Base',
  data: function () {
    return {
//      v1_value: document.getElementById("v1_range").value
      v1_value: 0
    }
  },
  components: {
    RangeSlider
  },
  methods: {
    send_v1: function () {
      alert('Set valve 1 to: ' + this.v1_value + ' degrees')
      send_data("VALVE1", "actuate:" + this.v1_value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.slider {
  -webkit-appearance: none;
  width: 30%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #4CAF50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
</style>
