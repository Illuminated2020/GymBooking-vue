<template>
    <div>
        <h1>场馆管理</h1>
        <div style="margin:10px 0 10px 5px">
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button plain icon="el-icon-circle-plus-outline" @click="add">新增场馆</el-button>
            <el-button style="margin-right: 5px;" type="danger" icon="el-icon-delete" @click="handleDel(1)">批量删除
            </el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="image" label="场馆图片" align="center">
                <template slot-scope="{ row }">
                    <el-image style="width: auto; height: 40px; border:none;cursor: pointer;"
                        :src="`http://localhost:8080/common/download?name=${row.image}`">
                        <div slot="error" class="image-slot">
                            <img src="#" style="width: auto; height: 40px; border:none;">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="场馆名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="count" label="预约次数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="场馆状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="description" label="场馆描述" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="注册日期" width="120">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" text-conten="center" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle style="margin-left: 20px;"></el-button>

                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="padding:10px 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentpage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="pagetotal">
            </el-pagination>
        </div>

        <!-- 新增对话框 -->
        <el-dialog :title="mytitle" :visible.sync="dialogFormVisible">
            <el-form id="add" :rules="rules" ref="addForm" :label-position="labelPosition" label-width="80px"
                :model="addForm" style="text-align: auto;width: 70%;margin-left: 70px;">
                <el-form-item label="场馆名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="预约次数" prop="count">
                    <el-input type="text" v-model="addForm.count"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="addForm.status" active-text="开启" inactive-text="禁用" active-value="1"
                        inactive-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="场馆图片:" prop="image" class="uploadImg">
                    <el-upload class="avatar-uploader" action=" http://localhost:8080/common/upload"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :on-change="onChange" ref="upload">
                        <img style="height: 150px; width:150px" v-if="addForm.image"
                            :src="`http://localhost:8080/common/download?name=${addForm.image}`" class="avatar"></img>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add('addForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from '../util/myaxios';
export default {
    name: "Sports",
    data() {
        return {
            addForm: {
                name: '',
                image: '',
                count: '',
                status: '',
                description: '',
            },
            pageSize: 10,
            pagetotal: 0,
            mytitle: '',
            currentpage: 1,
            tableData: [],
            dialogFormVisible: false,
            multipleSelection: [],
            labelPosition: 'right',
            rules: {
                name: [
                    { required: true, message: '请输入场馆名称', trigger: 'blur' },
                ],
                count: [
                    { required: true, message: '请输入预约次数', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请设置场馆状态', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请添加描述', trigger: 'blur' },
                ],
                image: [
                    { required: true, message: '请长传图片', trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            axios.get('/sports/page', {
                params: {
                    page: this.currentpage, pageSize: this.pageSize,
                }
            }).then(res => {
                console.log(res.data);
                if (String(res.data.code) === '1') {
                    this.tableData = res.data.data.records || [];
                    console.log(this.tableData);
                    this.pagetotal = res.data.data.total;
                }
            }).catch(error => {
                this.$message.error('请求出错了：' + error)
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
            this.init();
        },
        handleCurrentChange(val) {
            this.currentpage = val;
            console.log(`当前页: ${val}`);
            this.init();
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            let checkArr = []
            val.forEach((n) => {
                checkArr.push(n.id)
            })
            console.log(checkArr);
            this.multipleSelection = checkArr
        },
        //新增
        add(formName) {
            this.dialogFormVisible = true;
            this.mytitle = '新增场馆';
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    axios.post('/sports/add', {
                        name: this.addForm.name,
                        image: this.addForm.image,
                        count: this.addForm.count,
                        status: this.addForm.status,
                        description: this.addForm.description,
                    }).then(res => {
                        this.loading = true
                        if (String(res.data.code) === '1') {//1表示添加成功
                            this.$message({
                                message: '场馆添加成功',
                                type: 'success'
                            });
                            window.location.href = '/sports'
                        } else {
                            this.$message.error(res.data.msg)
                            this.loading = false
                        }
                    })
                }
            });

        },
        //编辑
        edit() {
            this.dialogFormVisible = true;
            this.mytitle = '编辑用户';
        },
        //批量删除
        handleDel() {
            if (this.multipleSelection.length === 0) {
                return this.$message.error('请选择删除对象')
            }
            this.$confirm('确定删除该用户, 是否继续?', '确定删除', {
                'confirmButtonText': '确定',
                'cancelButtonText': '取消',
            }).then(() => {
                // let ids = this.multipleSelection.map(v => v.id)
                let ids = this.multipleSelection.join(',')
                // let ids = this.multipleSelection
                console.log(ids);
                axios.delete('/user', {
                    params: { ids }
                }
                ).then(res => {
                    if (res.data.code === 1) {
                        this.$message.success('删除成功！')
                        this.init()
                    } else {
                        this.$message.error(res.msg || '操作失败')
                    }
                }).catch(err => {
                    this.$message.error('请求出错了：' + err)
                })
            })

        },
        handleAvatarSuccess(response, file, fileList) {
            this.addForm.image = response.data
            console.log(this.addForm);
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
    },
}
</script>

<style scoped>

</style>