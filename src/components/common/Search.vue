<template>
  <el-input
    placeholder="请输入查找内容"
    v-model="queryInfo.query"
    clearable
    @clear="getList"
  >
    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
  </el-input>
</template>

<script>
export default {
  name: 'Search',
  props: {
    queryInfo: Object,
    getList: Function
  }
}
</script>

<style scoped>
</style>
