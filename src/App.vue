<template>
  <div id="app">
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
