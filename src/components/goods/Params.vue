<template>
  <div>
    <breadcrumb>
      <slot slot="left">商品管理</slot>
      <slot slot="right">参数列表</slot>
    </breadcrumb>

    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon></el-alert>
      <!-- CASCAFER -->
      <cascader :cateList="cateList" ref="cascaderRef" @handleChange="handleChange"></cascader>

      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini"
          :disabled="isBtnDisabled"
          @click="showAddDialog">添加参数</el-button>
          <!--  PARAMSTABLE -->
          <params-table
          :Table="manyTable"
          :activeName="activeName" :getParamsData="getParamsData"></params-table>
        </el-tab-pane>

        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" size="mini"
          :disabled="isBtnDisabled"
          @click="showAddDialog">添加属性</el-button>
          <!--  PARAMSTABLE -->
           <params-table
           :Table="onlyTable"
           :activeName="activeName"
           ></params-table>
        </el-tab-pane>
      </el-tabs>

    </el-card>

    <add-params
    :activeName="activeName"
    :addDialogVisible="addDialogVisible"
    :getParamsData="getParamsData"
    :cateId="cateId"
    @closeDialog="closeDialog"></add-params>
  </div>
</template>

<script>
import Breadcrumb from 'commons/Breadcrumb'

import Cascader from './childrenP/Cascader'
import ParamsTable from './childrenP/ParamsTable'
import AddParams from './childrenP/AddParams'

export default {
  name: 'Params',
  components: {
    Breadcrumb,
    Cascader,
    ParamsTable,
    AddParams
  },
  data() {
    return {
      cateList: [],
      activeName: 'many',
      selectedKeys: [],
      manyTable: [],
      onlyTable: [],
      addDialogVisible: false
    }
  },
  created() {
    this.getCateList()
  },
  mounted() {
    this.selectedKeys = this.$refs.cascaderRef.$data.selectedKeys
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedKeys.length !== 3) {
        return true
      }
      return false
    },
    cateId() {
      if (this.selectedKeys.length === 3) {
        return this.selectedKeys[2]
      }
      return null
    }
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品失败！')
      }
      this.cateList = res.data
    },
    async getParamsData() {
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys = []
        // 清空表格数据
        this.manyTable = []
        this.onlyTable = []
        return
      }
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName }
        })
      if (res.meta.status !== 200) return

      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []

        // 控制文本框的显示与隐藏
        item.inputVisible = false
        // 文本框的输入值
        item.inputValue = ''
      })

      if (this.activeName === 'many') {
        this.manyTable = res.data
      } else {
        this.onlyTable = res.data
      }
    },
    handleChange() {
      // 当级联器发生改变时 重新赋值 选中的分类ID
      this.selectedKeys = this.$refs.cascaderRef.$data.selectedKeys

      this.getParamsData()
    },
    handleClick() {
      this.getParamsData()
    },
    showAddDialog() {
      this.addDialogVisible = true
    },
    closeDialog() {
      this.addDialogVisible = false
    }
  }
}
</script>

<style scoped>
</style>
