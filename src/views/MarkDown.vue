<template>
    <div id="main">
        <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
            <el-form-item label="内容" prop="content" style="margin: 10px 0 20px 0;">
                <mavon-editor v-model="editForm.content" />
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="8">
                    <!-- <el-form-item label="标题" prop="userId">
                        <el-input v-model="editForm.userId"></el-input>
                    </el-form-item> -->
                </el-col>
                <el-col :span="8">
                    <!-- <el-form-item label="摘要" prop="description">
                        <el-input type="textarea" v-model="editForm.description"></el-input>
                    </el-form-item> -->
                </el-col>
                <el-col :span="24" style="text-align: right;margin-top: 15px;">
                    <el-button type="primary" @click="submitForm()">发布</el-button>
                    <el-button>取消</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
   
   
<script>
import axios from '../util/myaxios';

export default {
    name: "markdown",
    data() {
        return {
            editForm: {
                id: null,
                userId: '',
                description: '',
                content: '',
            },
            rules: {
                userId: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入摘要', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        // const blogId = this.$route.params.blogId
        // const _this = this
        // if (blogId) {
        //     this.$axios.get('/blog/' + blogId).then((res) => {
        //         const blog = res.data.data
        //         _this.editForm.id = blog.id
        //         _this.editForm.userId = blog.userId
        //         _this.editForm.description = blog.description
        //         _this.editForm.content = blog.content
        //     });
        // }
    },
    methods: {
        submitForm() {
            this.editForm.userId = JSON.parse(localStorage.getItem("userInfo")).data.id
            const _this = this
            this.$refs.editForm.validate((valid) => {
                console.log(this.editForm);
                if (valid) {
                    axios.post('/blog/edit', this.editForm
                    ).then((res) => {
                        _this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                window.location.href = '/chat'
                            }
                        });
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
#main {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
    padding: 0 50px;
    /* 给gutter留padding */
}
</style>