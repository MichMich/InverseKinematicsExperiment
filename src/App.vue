<template>
  <div id="app">
    <div class="world">
      <div class="explanation">Click the gray dots on the grid.</div>
      <div class="base">
        <ClickableGrid :minX="-350" :maxX="350" :minY="0" :maxY="500" :stepSize="25"  @click="moveToCoordinates" />
        <div class="indicator"></div>
        <ArmPiece :length="lengthA" :angle="angleA">
          <ArmPiece :length="lengthB" :angle="angleB">
            <Gripper :angle="angleG-angleB-angleA" :length="100" />
          </ArmPiece>
        </ArmPiece>
      </div>
    </div>
    <div class="controls">
      <div class="control-box">
        <div class="input-item">
          <label>A: </label>
          <input type="range" min="-90" max="90" value="0" v-model="angleA">
        </div>
        <div class="input-item">
          <label>B: </label>
          <input type="range" min="-90" max="90" value="0" v-model="angleB">
        </div>
        <div class="input-item">
          <label>G: </label>
          <input type="range" min="-90" max="90" value="0" v-model="angleG">
        </div>
      </div>
      <div class="control-box">
        <pre v-text="data"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import KinematicsEngine from './KinematicsEngine'
import ArmPiece from './components/ArmPiece.vue'
import Gripper from './components/Gripper.vue'
import ClickableGrid from './components/ClickableGrid.vue'

const engine = new KinematicsEngine(300, 200)

export default {
  name: 'App',
  components: {
    ArmPiece,
    ClickableGrid,
    Gripper
  },
  data () {
    return {
      lengthA: engine.lengthA,
      lengthB: engine.lengthB,
      angleA: 0,
      angleB: 0,
      angleG: 0,
      data: engine.data()
    }
  },
  watch: {
    angleA (angle) {
      this.angleA = parseFloat(angle)
      engine.angleA = angle
      this.data = engine.data()
    },
    angleB (angle) {
      this.angleB = parseFloat(angle)
      engine.angleB = angle
      this.data = engine.data()
    },
    angleG (angle) {
      this.angleG = parseFloat(angle)
      engine.angleG = angle
      this.data = engine.data()
    }
  },
  methods: {
    moveToCoordinates ({ x, y }) {
      engine.setPosition(x, y, this.angleG)

      this.angleA = engine.angleA
      this.angleB = engine.angleB
      // this.angleG = engine.angleG

      this.data = engine.data()
    }
  }
}
</script>
<style>
#app {
  display: flex;
  align-items: flex-start;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.explanation {
  padding: 5px;
  font-size: 0.8rem;
}
.controls {
  margin-left: 10px;
}
.control-box {
  border:1px solid black;
  padding: 20px;
  margin-bottom: 10px;
}
.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  line-height: 1rem;
}
.input-item:last-child {
  margin-bottom: 0;
}
.input-item label {
  width: 30px;
}
input {
  min-width: 200px;
  text-align: right;
}
.world {
  width: 800px;
  min-width: 800px;
  height: 600px;
  border: 1px solid #000;
  position: relative;
}
.base {
  position: absolute;
  left: 400px;
  top: 50px;
}
.base .indicator {
  position: absolute;
  left: -20px;
  top: -20px;
  width: 40px;
  height: 40px;
  background-color: rgba(255,0,0,0.25);
  border-radius: 20px;
}
</style>
