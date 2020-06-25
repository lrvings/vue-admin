<template>
  <div>
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="dialogClosed"
    >
      <el-form
        label-width="80px"
        :model="editForm"
        :rules="formRules"
        ref="formRef"
      >
        <el-form-item label="用户名">
          <el-input type="input" v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle()">取 消</el-button>
        <el-button type="primary" @click="editUser">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formRuleMixin } from 'common/mixin'
export default {
  name: 'name',
  props: {
    editDialogVisible: {
      type: Boolean
    },
    editForm: {
      type: Object,
      default() {
        return {}
      }
    },
    getUserList: {
      type: Function
    }
  },
  mixins: [formRuleMixin],
  data() {
    return {
    }
  },
  methods: {
    dialogClosed() {
      this.$refs.formRef.resetFields()
      try {
        this.$emit('success')
      } catch (error) {}
    },
    cancle() {
      try {
        this.$emit('success')
      } catch (error) {}
    },
    editUser() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return

        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // 关闭对话框
        try {
          this.$emit('success')
        } catch (error) {}
        // 刷新数据列表
        this.getUserList()

        this.$message.success('更新用户成功')
      })
    }
  }
}
</script>

<style scoped></style>
