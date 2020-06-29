<template>
  <el-dialog
    :title="'修改' + titleText"
    :visible.sync="editDialogVisible"
    width="50%"
    @close="DialogClosed">

    <el-form :model="editForm"
    :rules="editFormRules"
    ref="editFormRef" label-width="100px">

      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="editForm.attr_name"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="DialogClosed">取 消</el-button>
      <el-button type="primary" @click="editParams">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    activeName: String,
    editDialogVisible: Boolean,
    cateId: Number,
    editForm: Object,
    getParamsData: Function
  },
  data() {
    return {
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },
  methods: {
    DialogClosed() {
      this.$refs.editFormRef.resetFields()
      try {
        this.$emit('closeDialog')
      } catch (error) {}
    },
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('修改参数失败！')
        }
        this.$message.success('修改参数成功！')
        this.$emit('closeDialog')
        this.getParamsData()
      })
    }
  }
}

</script>

<style scoped>

</style>
