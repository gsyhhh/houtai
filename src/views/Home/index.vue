<template>
  <el-container class="container">
    <el-header
      ><div class="log">
        <img
          src="https://img0.baidu.com/it/u=3838900603,3095669769&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <span class="wen">M78星云管理系统</span>
      </div>
      <el-button>退出</el-button>
    </el-header>

    <el-container>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="!isOpen"
        background-color="#373d41"
        text-color="#fff"
        :style="{ width: isOpen ? '220px' : '65px' }"
        :collapse-transition="false"
        router
        :default-active="this.$route.path"
      >
        <div
          @click="fn"
          style="
            width: 100%;
            background-color: pink;
            color: #fff;
            text-align: center;
          "
        >
          |||
        </div>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/userlist">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">角色列表</el-menu-item>
            <el-menu-item index="2-2">权限列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">分类参数</el-menu-item>
            <el-menu-item index="3-3">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">商品列表</el-menu-item>
            <el-menu-item index="4-2">分类参数</el-menu-item>
            <el-menu-item index="4-3">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">商品列表</el-menu-item>
            <el-menu-item index="5-2">分类参数</el-menu-item>
            <el-menu-item index="5-3">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: true,
      isOpen: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    fn () {
      this.isOpen = !this.isOpen
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-aside {
  background-color: #373d41;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.log {
  width: 291px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 61px;
    height: 56px;
  }
}
.wen {
  width: 220px;
  height: 29px;
  color: #fff;
  font-size: 22px;
  margin-left: 10px;
}
</style>
