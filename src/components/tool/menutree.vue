<template>
  <div class="menutree" :class="[className]">
    <div class>
      <label v-for="menu in data" :key="menu.index">
        <el-submenu :index="String(menu.id)" v-if="menu.children!=''">
          <!-- <el-submenu :index="String(menu.id)" v-if="menu.children"> -->
          <template slot="title">
            <img src="require(menu.icon)" alt v-if="menu.icon" />
            <span style="color: black">{{menu.name}}</span>
          </template>
          <label>
            <menutree :data="menu.children" :calssName="className"></menutree>
          </label>
        </el-submenu>
        <el-menu-item :index="menu.path" v-else>
          <img src='../assets/img/mainLogo.png' alt v-if="menu.icon" />
          <span
            style="display:block;width:4px;height:4px;background:#ffffff;margin-top:28px;margin-left:30px; border-radius:100%;"
            :style="{backgroundColor:className=='listtxt'?'#a6160a':'#ffffff',}"
            v-else
          ></span>
          <span
            slot="title"
            style="color:black; display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;white-space : nowrap;"
          >{{menu.name}}</span>
        </el-menu-item>
      </label>
    </div>
  </div>
</template>

<script>
import menutree from '@/components/menutree'
export default {
  name: 'menutree',
  data() {
    return {
      menu_data: {},
      name: 'one'
    }
  },
  components: {
    menutree: menutree
  },
  props: ['data', 'className'],
  mounted() {
  },
  methods: {
    getImgUrl(icon) {
      return require()
    }
  }
}
</script>

<style scoped>

menutree /deep/ .el-menu-item,
.menutree /deep/ .el-submenu__title {
  color: #ffffff !important;
  height: 60px;
  line-height: 60px;
  display: flex;
  text-align: left;
  padding: 0;}
img {
  width: 16px;
  height: 16px;
  float: left;
  margin-top: 21px;
  margin-left: 39px;
}
span {
  float: left;
  margin-left: 12px;
}

.one /deep/ .el-menu {
  background: none;
}
.listtxt.menutree /deep/ .el-menu-item,.listtxt.menutree /deep/ .el-submenu__title {
  color: #a6160a !important;
}

</style>
