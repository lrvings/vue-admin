<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[1, 2, 5, 10]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    queryInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    total: Number
  },
  methods: {
    handleSizeChange(newSize) {
      this.$emit('handleSizeChange', newSize)
    },
    handleCurrentChange(newPage) {
      this.$emit('handleCurrentChange', newPage)
    }
  }
}
</script>

<style scoped></style>
