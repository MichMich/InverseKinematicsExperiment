<template>
  <div class="clickable-grid">
    <a href="#" v-for="(gridItem, index) in grid" :key="index" :style="{left: gridItem.x + 'px', top: gridItem.y + 'px'}" class="grid-item" @click.prevent="$emit('click', gridItem)" />
  </div>
</template>
<script>
export default {
  props: {
    minX: Number,
    maxX: Number,
    minY: Number,
    maxY: Number,
    stepSize: Number
  },
  computed: {
    grid () {
      const grid = []

      for (let y = this.minY; y <= this.maxY; y += this.stepSize) {
        for (let x = this.minX; x <= this.maxX; x += this.stepSize) {
          grid.push({
            x, y
          })
        }
      }

      return grid
    }
  }
}
</script>
<style>
.clickable-grid {
  position: absolute;
}
.grid-item {
  border: 0;
  appearance: none;
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #eee;
  transform: translate(-7.5px, -7.5px);
  border-radius: 10px;
  transition: background-color 1s;
}
.grid-item:hover {
  background-color: #666;
  transition: background-color .1s;
}
</style>
