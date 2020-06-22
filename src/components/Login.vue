<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avtar-box">
        <img src="../assets/img/avatar.jpg" alt="" />
      </div>
      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="60px"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <!-- 用户名 -->
          <el-input
            type="input"
            v-model="loginForm.username"
            suffix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            suffix-icon="el-icon-lock"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginHandle">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      islogin: false
    }
  },
  methods: {
    loginHandle() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('tokenid', res.data.token)
        this.$router.push('/home')
      })
    },
    resetLoginForm() {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@fff: #fff;

.login-container {
  height: 100%;
  background-color: #2b4b6b;
}
.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: @fff;
  border-radius: 10px;
}

.avtar-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: @fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: @fff;
  }
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
