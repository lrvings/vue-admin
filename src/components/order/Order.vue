<template>
  <div>
    <breadcrumb><slot slot="left">订单管理</slot><slot slot="right">订单列表</slot></breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <search :queryInfo="queryInfo" :getList="getOrderList"/>
        </el-col>
      </el-row>

       <!-- 订单列表 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.row.pay_status">未付款</el-tag>
            <el-tag type="success" size="mini" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | showDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot>
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-location"
              @click="showProgressDialog"
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

     <el-dialog title="查看物流进度" :visible.sync="progressDialogVisible" width="50%">
    <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from 'commons/Breadcrumb'
import Search from 'commons/Search'
import Pagination from 'commons/Pagination'
import { formatDate } from 'common/utils'
export default {
  name: 'name',
  components: {
    Breadcrumb,
    Search,
    Pagination
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      progressDialogVisible: false,
      // 物流进度
      progressInfo: []
    }
  },
  filters: {
    showDate: function (value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    async showProgressDialog() {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流进度失败!')
      }
      this.progressInfo = res.data
      this.progressDialogVisible = true
    }
  }
}

</script>

<style scoped>

</style>
