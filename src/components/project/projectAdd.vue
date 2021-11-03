<template>
<div>
  <el-button @click="myFunction()">点我</el-button>
  <p>{{message}}</p>
</div>
</template>

<script>
export default {
  name: 'projectAdd',
  data () {
    return {
      message: 'AWUBWUBWUBBWUBWUBWUBC'
    }
  },
  methods: {
    myFunction () {
      this.message = this.$codeWar.SquareDigit(3212)
    }
  }
}
</script>

<style scoped>

</style>
