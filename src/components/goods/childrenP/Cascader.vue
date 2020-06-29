<template>
    <el-row class="cat_opt">
      <el-col>
        <span>选择商品分类：</span>
        <el-cascader
          v-model="selectedKeys"
          :options="cateList"
          :props="cascaderProps"
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'name',
  props: {
    cateList: Array
  },
  data() {
    return {
      selectedKeys: [],
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  methods: {
    handleChange() {
      this.$emit('handleChange')
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys = []
        return []
      }
    }
  }
}
</script>

<style scoped>
.cat_opt {
  margin-top: 15px;
}
</style>
