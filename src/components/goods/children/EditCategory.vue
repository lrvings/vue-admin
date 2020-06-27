<template>
  <el-dialog
    title="编辑分类"
    :visible.sync="editCateDialogVisible"
    width="50%"
    @close="editCateDialogClosed"
    :show-close="false"
  >
    <el-form
      :model="editCateForm"
      :rules="editCateFormRules"
      ref="editCateFormRef"
      label-width="100px"
    >
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="editCateForm.cat_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="eidtCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditCategory',
  props: {
    editCateDialogVisible: Boolean,
    getCateList: Function
  },
  data() {
    return {
      editCateForm: {},
      editCateFormRules: {}
    }
  },
  methods: {
    async getCateById(id) {
      const { data: res } = await this.$http.get('categories/' + id)
      if (res.meta.status !== 200) return this.$message.error('获取分类失败！')
      this.editCateForm = res.data
    },
    eidtCate() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'categories/' + this.editCateForm.cat_id,
          {
            cat_name: this.editCateForm.cat_name
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新分类名失败！')
        }
        this.$message.success('更新分类名成功！')
        this.getCateList()
        this.$emit('myEvent')
      })
    },
    editCateDialogClosed() {
      this.$emit('myEvent')
    },
    cancle() {
      try {
        this.$emit('myEvent')
      } catch (error) {}
    }
  }
}
</script>

<style scoped></style>
