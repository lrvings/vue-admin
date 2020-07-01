<template>
  <div>
    <el-table :data="Table" border stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, i) in scope.row.attr_vals"
            :key="i"
            @close="handleClose(i, scope.row)"
            closable
          >{{item}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row)"
          >+ New Tag</el-button>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column :label="isName" prop="attr_name"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="editParams(scope.row.attr_id,scope.row.cat_id)"
          >编辑</el-button>
          <el-button
            type="warning"
            icon="el-icon-delete"
            size="mini"
            @click="removeParams(scope.row.attr_id,scope.row.cat_id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <edit-params
      :activeName="activeName"
      :editForm="editForm"
      :cateId="cateId"
      :editDialogVisible="editDialogVisible"
      :getParamsData="getParamsData"
      @closeDialog="closeDialog"
    ></edit-params>
  </div>
</template>

<script>
import EditParams from './EditParams'
export default {
  name: 'ParamsTable',
  props: {
    Table: Array,
    activeName: String,
    getParamsData: Function
  },
  components: {
    EditParams
  },
  data() {
    return {
      editDialogVisible: false,
      editForm: {},
      cateId: 0
    }
  },
  computed: {
    isName() {
      if (this.activeName === 'many') {
        return '参数名称'
      }
      return '属性名称'
    }
  },
  methods: {
    async editParams(attrId, cateId) {
      this.cateId = cateId
      const { data: res } = await this.$http.get(
        `categories/${cateId}/attributes/${attrId}`,
        {
          params: { attr_sel: this.activeName }
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类失败！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },

    async removeParams(attrId, cateId) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该参数, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.delete(
        `categories/${cateId}/attributes/${attrId}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getParamsData()
    },

    closeDialog() {
      this.editDialogVisible = false
    },

    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm(row) {
      let inputValue = row.inputValue

      if (inputValue.trim().length === 0) {
        inputValue = ''
        row.inputVisible = false
        return
      }

      row.attr_vals.push(inputValue.trim())

      inputValue = ''
      row.inputVisible = false
      this.updateParams(row)
    },

    async updateParams(row) {
      const { data: res } = await this.$http.put(
        `categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      row.inputValue = ''
    },
    handleClose(i, row) {
      row.attr_vals.splice(i, 1)
      this.updateParams(row)
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 200px;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
