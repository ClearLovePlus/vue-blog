<template xmlns:lift-menu="http://www.w3.org/1999/html">
  <div>
    <template v-for="menu in this.menuData">
      <el-submenu :key="menu.id" :index="menu.path" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <lift-menu :menu-data="menu.children"></lift-menu>
      </el-submenu>
      <el-menu-item :key="menu.id" :index="menu.path" v-else>
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </template>
  </div>

</template>

<script>
export default {
  props: ['menuData'],
  name: 'liftMenu'
}
</script>

<style scoped>
.el-menu-item{
  overflow:hidden
}

</style>
