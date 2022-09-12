<template>
  <el-row type="flex" class="row-bg" justify="center"
    style="background-image: linear-gradient(to top left, #3b41c5 0%, #a981bb 49%, #ffc8a9 100%);">
    <el-col :span="5">
      <div class="tit">欢迎来到体育馆预约注册系统</div>
      <el-divider></el-divider>
      <el-image :src="require('@/assets/img/erweima.jpg')" style="height: 100%; width: 180px;">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <p style="margin: 10px;">Made By Lsz</p>
      <a href="#" @click="login">已有账号？</a>
    </el-col>
    <el-col :span="1">
      <el-divider id="did" direction="vertical"></el-divider>
    </el-col>
    <el-col :span="8" style="margin-left: 70px;">
      <h2 style="width: 450px;">欢迎注册</h2>
      <br><br>
      <el-form id="register" style="width: 70%;" :rules="rules" ref="registerForm" :model="registerForm"
        label-width="80px">
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-input type="password" v-model="registerForm.checkpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="registerForm.sex" label="男">男</el-radio>
          <el-radio v-model="registerForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button :loading="loading" class="register-btn" size="medium" type="primary" style="width:40%;"
            @click="register('registerForm')">
            <span v-if="!loading">注册</span>
            <span v-else>注册中...</span>
          </el-button>
          <el-button size="medium" style="width:40%;margin-left: 50px;" @click="resetForm('registerForm')">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
  
<script src="../store/validate.js"></script>
  <script src="../store/register.js"></script>
  <script src="../../axios/axios.min.js"></script>
  <script>
  import axios from '../util/myaxios';
  import qs from 'qs'
  export default {
    name: "register",
    data() {
        let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkpwd !== '') {
            this.$refs.registerForm.validateField('checkpwd');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
      return {
        registerForm: {
          nickname:'',
          username: '',
          password: '',
          checkpwd:'',
          email:'',
          phone:'',
          sex:'',
        },
        loading: false,
        rules: {
          nickname:[ 
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          ],
          username: [
            {required: true, message: '请输入账号名称', trigger: 'blur'},
            {max: 12, min:5,message: '长度在 5到12个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { validator: validatePass, trigger: 'blur' }
          ],
          checkpwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            { max:11,min:11, message: '手机号格式不正确', trigger: 'blur'}
          ],
          email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
           ],
           sex:[ 
           { required: true, message: '请选择性别', trigger: 'blur' },
           ]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login() {
        window.location.href = '/login'
    },
      register(formName){
        this.$refs[formName].validate(async(valid) => {
        if (valid) {
          axios.post('/user/register',{
            nickname:this.registerForm.nickname,
            username: this.registerForm.username,
            password: this.registerForm.password,
            email:this.registerForm.email,
            phone:this.registerForm.phone,
            sex:this.registerForm.sex,
        }).then(res=>{
            this.loading = true
            if (String(res.data.code) === '1') {//1表示注册成功
                this.$message({
                    message: '账号注册成功',
                    type: 'success'
                });
                window.location.href= '/login'
          } else {
            this.$message.error(res.data.msg)
            this.loading = false
          }
        })
        } 
      });
      },
    },
  }
  </script>
<style scoped>
#register {
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