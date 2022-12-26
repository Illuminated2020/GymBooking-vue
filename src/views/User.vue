<template>
    <div>
        <div style="padding:0 0 10px 0">
            <template>
                <el-select v-model="serchform.role" clearable placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </template>
            <el-input class="ml-5" style="width:15%" v-model="serchform.nickname" suffix-icon="el-icon-search"
                placeholder="请输入用户名">
            </el-input>
            <!-- <el-input class="ml-5" style="width:15%" v-model="serchform.phone" suffix-icon="el-icon-phone"
                placeholder="请输入电话">
            </el-input>
            <el-input class="ml-5" style="width:15%" v-model="serchform.email" suffix-icon="el-icon-message"
                placeholder="请输入邮箱">
            </el-input> -->
            <el-button class="ml-5" type="primary" round @click="serch">搜索</el-button>
        </div>
        <div style="margin:0 0 10px 5px">
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button plain icon="el-icon-circle-plus-outline" @click="add">新增用户</el-button>
            <el-button style="margin-right: 5px;" type="danger" icon="el-icon-delete" @click="handleDel(1)">批量删除
            </el-button>
            <el-upload :action="'http://localhost:8080/user/import'" :show-file-list="false" accept="xlsx"
                :on-success="handleExcelImportSuccess" style="display: inline-block; margin-left: 5px;">
                <el-button type="primary" icon="el-icon-download">导入</el-button>
            </el-upload>

            <el-button style="margin-left: 5px;" type="primary" icon="el-icon-upload2" @click="exp">导出</el-button>
        </div>


        <!-- 新增对话框 -->
        <el-dialog :title="mytitle" :visible.sync="dialogFormVisible">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
                style="text-align: auto;width: 70%;margin-left: 70px;">
                <el-form-item label="用户名" prop="nickname">
                    <el-input v-model="addForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpwd">
                    <el-input type="password" v-model="addForm.checkpwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="addForm.sex" label="男">男</el-radio>
                    <el-radio v-model="addForm.sex" label="女">女</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>


        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="nickname" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="电话号码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="role" label="用户类型" show-overflow-tooltip>
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
    </div>
</template>

<script>
import axios from '../util/myaxios';
export default {
    name: 'User',
    props: {

    },
    data() {
        return {
            options: [{
                value: '普通用户',
                label: '普通用户'
            }, {
                value: '管理员',
                label: '管理员'
            },],
            value: "",
            addForm: {
                nickname: '',
                username: '',
                password: '',
                checkpwd: '',
                email: '',
                phone: '',
                sex: '',
            },
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            serchform: {
                role: '',
                nickname: '',
                phone: '',
            },
            pageSize: 10,
            pagetotal: 0,
            mytitle: '',
            currentpage: 1,
            tableData: [],
            dialogFormVisible: false,
            multipleSelection: [],
            labelPosition: 'right',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            axios.get('/user/page', {
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
        add() {
            this.dialogFormVisible = true;
            this.mytitle = '新增用户';
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
        //导出信息
        exp() {
            axios.get('/user/export', {}).then(
                window.open(`http://localhost:8080/user/export`)
            )
        },
        handleExcelImportSuccess() {
            this.$message.success('导入成功！')
        },
        //搜索
        serch() {
            console.log(1);
            axios.get('/user/page', {
                params: {
                    page: this.currentpage, pageSize: this.pageSize,
                    role: this.serchform.role, nickname: this.serchform.nickname,
                }
            }).then(res => {
                this.tableData = res.data.data.records || [];
            })
        }
    },
}
</script>