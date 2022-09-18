<template>
  <div id="dl">
    <el-row type="flex" class="row-bg" justify="center"
      style="background-image: linear-gradient(to top left, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%); height: 100%;">
      <el-col :span="5">
        <div class="tit">欢迎来到体育馆预约登录系统</div>
        <el-divider></el-divider>
        <el-image :src="require('@/assets/img/erweima.jpg')" style="height: 100%; width: 180px;">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        <p style="margin-top: 20px;">Made By Lsz</p>
      </el-col>
      <el-col :span="1">
        <el-divider id="did" direction="vertical"></el-divider>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="always" style=" background:transparent; width: 90%;margin-left: 45px;">
          <h2 style="margin-left: 5px;">欢迎登录</h2>
          <br><br>
          <el-form id="login" style="width: 95%;" :rules="rules" ref="loginForm" :model="loginForm" label-width="80px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button :loading="loading" class="login-btn" size="medium" type="primary" style="width:100%;"
                @click="login('loginForm')">
                <span v-if="!loading">登录</span>
                <span v-else>登录中...</span>
              </el-button>
            </el-form-item>
            <a href="#" style="margin: 50px 0 0 50px;" @click="register">没有账号？</a>
          </el-form>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script src="../../axios/axios.min.js"></script>
<script>
import axios from '../util/myaxios';
import qs from 'qs'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loading: false,
      rules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {max: 12, message: '长度在 12个字符以内', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ],
      }
    }

  },

  methods: {
    login(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          const res = await axios.post('/user/login',{
            username:this.loginForm.username,
            password:this.loginForm.password,
          })
          if (String(res.data.code) === '1') {//1表示登录成功
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            console.log(res.data);
            window.location.href= '/home'
          } else {
            this.$message.error(res.data.msg)
            this.loading = false
          }
        } 
      });
    },
    register(){
      window.location.href= '/register'
    }
  },

}
</script>
<style scoped>
#dl {
  margin-top: 0px;
  height: 100%;
}

#login {
  width: auto;
}

#did {
  height: 400px;
}

.el-row {
  background-color: #fafafa;
  height: 910px;
  display: flex;
  align-items: center;
  text-align: center;
}

.tit {
  font-size: 20px;
  font-weight: bold;
}
</style>