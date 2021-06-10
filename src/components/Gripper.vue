<template>
  <div class="gripper"  :style="{transform: 'rotate('+angle+'deg)'}">
    <div class="gripper-outline" :style="{width: length + 'px'}"></div>
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
.gripper {
  position: absolute;
  transition: transform 0.5s ease-in-out;
  pointer-events: none;
}
.gripper-outline {
  position: absolute;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 1px solid black;
  border-bottom: 3px solid black;
  border-radius: 10px;
  background-color: rgba(0,255,0,0.25);
  left: 0;
  top: 0;
  height: 0;
  transform: translate(-50%, -50%);
}
</style>
