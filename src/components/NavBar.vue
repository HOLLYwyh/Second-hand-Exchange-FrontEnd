<template>
  <div>
    <div class="nav"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.nav{
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 100px;
  min-width: 100%;
  width: 100.25%;
  background-image: linear-gradient(to right, #0071ae , #5db143);
  margin-left: -4px;
  z-index: 1000;
}
</style>
