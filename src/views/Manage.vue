<template>
  <div class="home">
    <el-container style="height: 100%; ">
      <el-aside width=" sideWidth+'px' "
        style=" background-color: rgb(47,65,86);box-shadow: 6px 6px 6px rgb(0 21 41 / 35%)">
        <AsideVue :isCollapse="isCollapse"></AsideVue>
      </el-aside>

      <el-container>
        <el-header style="  background-image: linear-gradient(to top left, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);">
          <HeaderVue :collapse=" collapse" :collapseBtnClass="collapseBtnClass" :username="username"
            :squareUrl="squareUrl">
          </HeaderVue>
        </el-header>
        <el-main style="padding:10px 0 10px 20px">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
// @ is an alias to /src
import AsideVue from '@/components/Aside.vue';
import HeaderVue from '@/components/Header.vue';
export default {
  name: 'HomeView',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(10).fill(item),
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sidewidth: 200,
      username: '',
      squareUrl: '',
    }
  },
  components: {
    AsideVue,
    HeaderVue,
  },
  created() {
    this.getUser()
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.sidewidth = 36
      } else {
        this.sidewidth = 200
      }
    },
    getUser() {
      this.username = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data.nickname : "";
      this.squareUrl = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data.avatarUrl
        : "";
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.home {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #EFF2FB;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
