<template>
    <div id="personal">

        <el-row>
            <el-col :span="5">
                <div style="margin:10px 0 10px 100px;font-weight:bold">我的头像</div>
                <el-image style="width: 270px; height: 270px ;border-radius: 10px;"
                    :src="'http://localhost:8080/common/download?name=' + imgurl"></el-image>
                <el-divider id="div"></el-divider>
                <el-upload style="margin-left: 60px ;" class="avatar-uploader"
                    action="http://localhost:8080/common/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :on-change="onChange" ref="upload">
                    <el-button type="primary" size="medium" style="margin: 10px;">更换头像<i
                            class="el-icon-upload el-icon--right"></i>
                    </el-button>
                </el-upload>
            </el-col>
            <el-col :span="1">
                <el-divider id="did" direction="vertical"></el-divider>
            </el-col>
            <el-col :span="14">
                <h2>编辑资料</h2>
                <el-divider id="div"></el-divider>
                <el-form id="register" style="width: 70%;" :rules="rules" ref="registerForm" :model="registerForm"
                    label-width="80px">
                    <el-form-item label="用户名" prop="nickname">
                        <el-input v-model="registerForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" prop="prepwd">
                        <el-input type="text" v-model="registerForm.prepwd"></el-input>
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
                        <el-button :loading="loading" class="register-btn" size="medium" type="primary"
                            style="width:40%;" @click="edit('registerForm')">
                            <span v-if="!loading">确定</span>
                            <span v-else>更新中...</span>
                        </el-button>
                        <el-button size="medium" style="width:40%;margin-left: 50px;"
                            @click="resetForm('registerForm')">重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from '../util/myaxios';
export default {
    name: "Personal",
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
        let validatePass3 = (rule, value, callback) => {
            let a = this.$md5(value);
            console.log('a', a);
            if (a === '') {
                callback(new Error('请输入原密码'));
            } else if (a !== JSON.parse(localStorage.getItem("userInfo")).data.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            imgurl: '',
            ruleForm: {
                id: '',
                avatarUrl: '',
            },
            registerForm: {
                nickname: '',
                password: '',
                checkpwd: '',
                email: '',
                phone: '',
                sex: '',
                prepwd: '',
            },
            loading: false,
            rules: {
                nickname: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                ],
                prepwd: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { validator: validatePass3, message: '与原密码不一致噢', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkpwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { max: 11, min: 11, message: '手机号格式不正确', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ]
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        init() {
            axios.get('/user', {
                params: {
                    id: JSON.parse(localStorage.getItem("userInfo")).data.id
                }
            }).then(res => {
                console.log(res)
                if (String(res.data.code) === '1') {
                    this.registerForm.nickname = res.data.data.nickname
                    this.registerForm.email = res.data.data.email
                    this.registerForm.phone = res.data.data.phone
                    this.registerForm.sex = res.data.data.sex
                    this.registerForm.createTime = res.data.data.createTime
                    this.registerForm.avatarUrl = res.data.data.avatarUrl
                    this.imgurl = res.data.data.avatarUrl
                } else {
                    this.$message.error(res.data.msg || '操作失败')
                }
            }).catch(err => {
                this.$message.error(err)
            })
        },
        handleAvatarSuccess(response, file, fileList) {
            // this.imageUrl = response.data
            console.log(response.data);
            this.imgurl = `${response.data}`;
            this.ruleForm.avatarUrl = response.data;
            this.ruleForm.id = JSON.parse(localStorage.getItem("userInfo")).data.id;
            console.log(this.ruleForm);
            axios.put('/user', {
                id: this.ruleForm.id,
                avatarUrl: this.ruleForm.avatarUrl
            }).then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                location.reload()
            })

        },
        onChange(file) {
            if (file) {
                const suffix = file.name.split('.')[1]
                const size = file.size / 1024 / 1024 < 2
                if (['png', 'jpeg', 'jpg'].indexOf(suffix) < 0) {
                    this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
                    this.$refs.upload.clearFiles()
                    return false
                }
                if (!size) {
                    this.$message.error('上传文件大小不能超过 2MB!')
                    return false
                }
                return file
            }
        },
        edit(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    axios.post('/user/update', {
                        id: JSON.parse(localStorage.getItem("userInfo")).data.id,
                        nickname: this.registerForm.nickname,
                        username: this.registerForm.username,
                        password: this.$md5(this.registerForm.password),
                        email: this.registerForm.email,
                        phone: this.registerForm.phone,
                        sex: this.registerForm.sex,
                    }).then(res => {
                        this.loading = true
                        if (String(res.data.code) === '1') {//1表示更新成功
                            this.$message({
                                message: '账号更新成功',
                                type: 'success'
                            });
                            localStorage.setItem('userInfo', JSON.stringify(res.data))
                            location.reload()
                        } else {
                            this.$message.error(res.data.msg)
                            this.loading = false
                        }
                    })
                }
            });
        },
    }
}
</script>

<style scoped>
#div {
    display: block;
    height: 2px;
    width: 90%;
    margin: 24px 0;
}

#did {
    display: inline-block;
    width: 2px;
    height: 60em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #1e62af;

}

.bg-purple {
    background: #0d1016;

}

.bg-purple-light {
    background-color: Transparent;

}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

#personal {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
    padding: 0 10px;
    /* 给gutter留padding */
}
</style>