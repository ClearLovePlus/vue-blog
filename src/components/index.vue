<template>
  <div>
    <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to='{ path: "/login" }'>流程平台</el-breadcrumb-item>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="selectDiv">
      <el-select v-model='value' placeholder='请选择'>
        <el-option-group
          v-for='group in options'
          :key='group.label'
          :label='group.label'>
          <el-option
            v-for='item in group.options'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-option-group>
      </el-select>
      <el-button type='primary' style='margin-left: 20px' @click='getData'>查询</el-button>
    </div>
    <el-table
      :data='tableData'
      border
      class="dataTable">
      <el-table-column
        prop='date'
        label='日期'
        width='auto'>
      </el-table-column>
      <el-table-column
        prop='name'
        label='姓名'
        width='auto'>
      </el-table-column>
      <el-table-column
        prop='address'
        label='地址'>
      </el-table-column>
      <el-table-column
        prop='sex'
        label='性别'>
      </el-table-column>
      <el-table-column
        prop='status'
        label='状态'>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      tableData: [],
      options: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }],
      value: ''
    }
  },
  methods: {
    getData () {
      this.tableData = [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style scoped>
.dataTable {
  top: 130px;
  position: absolute;
  width: 80%;
}

.selectDiv {
  position: absolute;
  left: 30px;
  top: 70px;
}

</style>
