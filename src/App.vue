<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
html {
  height: 100%;
  width:100%;
  margin:0 0 0 0;
  overflow:hidden hidden;

}
#app {
  height: 100%;
  padding: 0px;
  margin:0px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.no-padding {
  padding: 0px !important;
}
</style>
