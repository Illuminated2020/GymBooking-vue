<template>
    <div>
        <h1>预约管理</h1>
        <div style="margin:10px 0 10px 5px">
            <el-button @click="toggleSelection()">取消选择</el-button>
            <el-button style="margin-right: 5px;" type="danger" icon="el-icon-delete" @click="handleDel(1)">批量删除
            </el-button>
        </div>
        <el-table ref="multipleTable" :data="orderForm" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="stuName" label="姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="className" label="专业班级" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sportsName" label="预约场馆" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dateDay" label="预约日期" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="dateTime" label="预约时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column fixed="right" label="操作" text-conten="center" width="200px">
                <template slot-scope="scope">
                    <!-- 编辑状态 -->
                    <el-popover placement="right" width="400" trigger="click">
                        <el-steps :active="scope.row.status" finish-status="success">
                            <el-step title="已预约，待前往" icon="el-icon-phone"></el-step>
                            <el-step title="运动中" icon="el-icon-basketball"></el-step>
                            <el-step title="已完成"></el-step>
                        </el-steps>
                        <el-button v-if="scope.row.status<3" style="margin-top: 12px;" @click="next(scope.row.id)">
                            更新预约状态</el-button>
                        <el-button type="primary" plain slot="reference">更新状态</el-button>
                    </el-popover>
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
    name: "Order",
    data() {
        return {
            orderForm: [],
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
        next(id) {
            console.log(id);
            axios.post('/book/next', {
                id
            }).then(res => {
                this.init()
            })
        },
        init() {
            axios.get('/book/page', {
                params: {
                    page: this.currentpage, pageSize: this.pageSize,
                }
            }).then(res => {
                console.log(res.data);
                if (String(res.data.code) === '1') {
                    this.orderForm = res.data.data.records || [];
                    console.log(this.orderForm);
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
                        name: this.orderForm.name,
                        image: this.orderForm.image,
                        count: this.orderForm.count,
                        status: this.orderForm.status,
                        description: this.orderForm.description,
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
                axios.delete('/book', {
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
            this.orderForm.image = response.data
            console.log(this.orderForm);
        },

    },
}
</script>

<style scoped>

</style>