<template>
  <el-dialog
    :title="'添加' + titleText"
    :visible.sync="addDialogVisible"
    width="50%"
    @close="DialogClosed">

    <el-form :model="addForm"
    :rules="addFormRules"
    ref="addFormRef" label-width="100px">

      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="addForm.attr_name"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="DialogClosed">取 消</el-button>
      <el-button type="primary" @click="AddParams">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    activeName: String,
    addDialogVisible: Boolean,
    getParamsData: Function,
    cateId: Number
  },
  data() {
    return {
      addForm: {
        attr_name: ''
      },
      addFormRules: {
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
      this.$refs.addFormRef.resetFields()
      try {
        this.$emit('closeDialog')
      } catch (error) {}
    },
    AddParams() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        )
        if (res.meta.status !== 201) {
          return this.$message.error('添加参数失败！')
        }
        this.$message.success('添加参数成功！')
        this.$emit('closeDialog')
        this.getParamsData()
      })
    }
  }
}

</script>

<style scoped>

</style>
