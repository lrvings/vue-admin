<template>
  <div>
    <breadcrumb><slot slot="left">商品管理</slot><slot slot="right">商品列表</slot></breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <search :queryInfo="queryInfo" :getList="getGoodsList"/>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodsList" stripe border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
        <el-table-column label="创建时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | showDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="remove(scope.row.goods_id)"
              ></el-button>
          </template>
      </el-table-column>
      </el-table>

      <Pagination
        :queryInfo="queryInfo"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"/>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from 'commons/Breadcrumb'
import Pagination from 'commons/Pagination'
import Search from 'commons/Search'

import { formatDate, removeById } from 'common/utils'
export default {
  name: 'List',
  components: {
    Breadcrumb,
    Pagination,
    Search
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  filters: {
    showDate: function (value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    goAddpage() {
      this.$router.push('/goods/add')
    },
    remove(id) {
      removeById('goods', id, () => {
        this.getGoodsList()
      })
    }
  }
}

</script>

<style scoped>

</style>
