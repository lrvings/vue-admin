<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="~assets/img/avatar.jpg" alt="avatar" />
        <span>Vue + element UI后台管理</span>
      </div>
      <div>
      <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
      <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="togleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in muenList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]" class="my-icon"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      muenList: [],
      iconObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-grid',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-claim',
        145: 'el-icon-s-platform'
      },
      isCollapse: false,
      activePath: '',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('navActive')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 菜单列表数据
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.err(res.meta.msg)
      this.muenList = res.data
    },
    togleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('navActive', activePath)
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      margin-left: 20px;
    }
  }
}
.el-aside {
  background-color: #545c64;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}

.my-icon {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-button {
  margin-left: 30px;
}
</style>
