<template>
  <div class="arm-piece" :style="{transform: 'rotate('+angle+'deg)'}">
    <div class="line" :style="{height: length + 'px'}" />
    <div class="outline" :style="{height: length + 'px'}" />
    <div class="base-indicator" />
    <div :style="{top: length + 'px'}" class="end-container">
      <div class="end-indicator" />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    length: Number,
    angle: Number
  }
}
</script>
<style>
.arm-piece {
  position: absolute;
  transition: transform 0.5s ease-in-out;
  pointer-events: none;}
.base-indicator{
  position: absolute;
  left: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 20px;
}
.line{
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  padding: 2px;
  transform: translate(-3px, -3px);
  border: 1px solid gray;
  border-radius: 20px;
  background-color: rgba(128,128,128,1);
}
.outline{
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  padding: 20px;
  transform: translate(-21px, -21px);
  border: 1px solid gray;
  border-radius: 20px;
  background-color: rgba(0,0,0,0.1);
}
.end-container {
  position: absolute;
}
.end-indicator{
  position: absolute;
  left: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 25px;
}
</style>
