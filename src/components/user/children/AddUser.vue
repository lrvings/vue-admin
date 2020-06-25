<template>
  <div>
    <el-dialog
      title="添加用户信息"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClosed"
    >
      <el-form
        label-width="80px"
        :model="addForm"
        :rules="formRules"
        ref="formRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="input" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle()">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formRuleMixin } from 'common/mixin'
export default {
  name: 'AddUser',
  props: {
    addDialogVisible: {
      type: Boolean
    },
    getUserList: {
      type: Function
    }
  },
  data() {
    return {
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  mixins: [formRuleMixin],
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
      } catch (err) {}
    },
    addUser() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整表单')
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success('添加用户成功')
        this.getUserList()
        try {
          this.$emit('success')
        } catch (error) {}
      })
    }
  }
}
</script>

<style scoped></style>
