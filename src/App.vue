<template>
  <div id="app">
    <!--  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      :unique-opened="true">
      <el-menu-item index="1" style="color: black" @click="jump('/')">体育馆预约系统</el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>

      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">数据管理</a></el-menu-item>

      <el-submenu index="4">
        <i class="el-icon-user-solid" style="position: relative"></i>
        <template slot="title" class="el-icon-user-solid">{{username}}</template>
        <el-menu-item index="4-1">个人中心</el-menu-item>
        <el-menu-item index="4-2" @click="jump('/login')">登录</el-menu-item>
        <el-menu-item index="4-3">退出</el-menu-item>
      </el-submenu>
    </el-menu>
 -->
    <router-view />
  </div>
</template>

<script>
import LoginVue from './views/Login.vue';

export default {

  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem('umeetCloudVuex') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('umeetCloudVuex'))));
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('umeetCloudVuex', JSON.stringify(this.$store.state))
    })
  },
  mounted() {
    this.getUsername()
  },
  data() {
    return {
      username: '请登录',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    jump(url) {
      this.$router.push(url);
    },
    getUsername() {
      const _username = sessionStorage.getItem('_username');
      if (_username) {
        this.username = JSON.parse(_username);
      }
    }
  }
}
</script>

<style>
@import '@/assets/css/all.css';
</style>
