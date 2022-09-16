<template>
    <div id="book">
        <el-row :gutter="50">
            <el-col :span="6" v-for="(item, index) in sport" :key="index">
                <el-card shadow="hover" :body-style="{ padding: '10px' } " style="margin-top: 20px;">
                    <img :src="`http://localhost:8080/common/download?name=${item.image}`" class="image">
                    <div style="padding: 14px;">
                        <span>{{item.name}}</span>
                        <div class="bottom clearfix">
                            <time class="time">总预约数：{{ item.count }}</time>
                            <el-button type="text" class="button" @click="book(item.id)">预约></el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-drawer title="场馆预约:" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
                size="60%">
                <el-descriptions :column="3" :border="true" title="" style="margin: 2px 500px 20px 50px;" size="small">
                    <el-descriptions-item label="场馆图片">
                        <div>
                            <img style="height: 100px;"
                                :src="`http://localhost:8080/common/download?name=${showForm.image}`">
                            </img>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="场馆名称">{{showForm.name}}</el-descriptions-item>
                    <el-descriptions-item label="场馆描述">{{showForm.description}}</el-descriptions-item>
                </el-descriptions>
                <el-form id="add" :model="orderForm" :rules="rules" ref="orderForm" :label-position="labelPosition"
                    label-width="80px" style="text-align: auto;width: 70%;margin-left: 70px;">
                    <el-form-item label="学生姓名" prop="stuname" disabled="true">
                        <el-input v-model="orderForm.stuname"></el-input>
                    </el-form-item>
                    <el-form-item label="专业班级" prop="class" disabled="true">
                        <el-input v-model="orderForm.class"></el-input>
                    </el-form-item>
                    <el-form-item label="预约时间" required>
                        <el-col :span="6">
                            <el-form-item prop="dateDay">
                                <el-date-picker v-model="orderForm.dateDay" value-format="yyyy/MM/dd" align="right"
                                    placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="6">
                            <el-form-item prop="dateTime">
                                <el-time-select v-model="orderForm.dateTime" :picker-options="{
                                  start: '10:30',
                                  step: '00:30',
                                  end: '22:30'
                                }" placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="beizhu">
                        <el-input v-model="orderForm.beizhu" placeholder="请仔细填写，手机号将作为运动统计数据"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('orderForm')">立即预约</el-button>
                        <el-button @click="resetForm('orderForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>

        </el-row>
    </div>
</template>

<script>
import axios from '../util/myaxios';

export default {
    name: "Book",
    data() {
        var sport = [];
        return {
            showForm: {
                name: '',
                image: '',
                count: '',
                status: '',
                description: '',
            },
            orderForm: {
                stuname: '',
                dateDay: '',
                dateTime: '',
                class: '',
                beizhu: '',
            },
            rules: {
                stuname: [
                    { required: true, message: '请输入学生姓名', trigger: 'blur' },
                ],
                class: [
                    { required: true, message: '请输入专业班级', trigger: 'blur' }
                ],
                dateDay: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                dateTime: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
            },
            drawer: false,
            direction: 'ttb',
            sport,
            pageSize: 10,
            pagetotal: 0,
            mytitle: '',
            currentpage: 1,
            tableData: [],
            dialogFormVisible: false,
            multipleSelection: [],
            labelPosition: 'right',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 3600 * 1000 * 24;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '明天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }

    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            axios.get('/sports/list', {}).then(res => {
                this.sport = res.data.data
                console.log(this.sport)
            })
        },
        book(id) {
            this.drawer = true
            axios.get('/sports/one', {
                params: {
                    id: id
                }
            }).then(res => {
                this.showForm = res.data.data
                console.log(this.showForm)
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/book', {
                        sportsName: this.showForm.name,
                        stuName: this.orderForm.stuname,
                        className: this.orderForm.class,
                        dateDay: this.orderForm.dateDay,
                        dateTime: this.orderForm.dateTime,
                        beizhu: this.orderForm.beizhu,
                    }).then(res => {
                        console.log(res.data);
                        this.drawer = false,
                            this.$refs[formName].resetFields();
                        this.$message({
                            message: '预约成功',
                            type: 'success'
                        });
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }

}
</script>

<style scoped>
#book {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
    padding: 0 50px;
    /* 给gutter留padding */
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>