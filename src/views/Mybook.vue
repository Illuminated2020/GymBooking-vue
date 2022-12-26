<template>
    <div id="mybook">
        <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'dateDay', order: 'descending'}">
            <el-table-column prop="dateDay" label="预约日期" sortable width="180">
            </el-table-column>
            <el-table-column prop="dateTime" label="预约时间" sortable width="180">
            </el-table-column>
            <el-table-column prop="stuName" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="sportsName" label="场馆">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="className" label="专业班级">
            </el-table-column>
            <el-table-column label="预约状态">
                <template scope=scope>
                    {{getOrderType(scope.row)}}
                    <el-button v-if="showCancle(scope.row)" style="float: right; padding: 3px 0" type="text"
                        @click="cancel(scope.row.id)">取消预约
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from '../util/myaxios';
export default {
    name: "Mybook",
    data() {
        return {
            tableData: [],
        }
    },
    mounted() {
        this.init()
    },
    computed: {
        fullTime(val) {
            console.log(val);
        }
    },
    methods: {
        init() {
            axios.get('/book/mybook', {
                params: {
                    id: JSON.parse(localStorage.getItem("userInfo")).data.id
                }
            }).then(res => {
                this.tableData = res.data.data
                console.log(this.tableData);
            })
        },
        currTimeFormate() {
            var date = new Date(); // 当前日期时间
            var year = date.getFullYear(); // 年份
            var month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份+1
            var day = ('0' + date.getDate()).slice(-2); // 日
            var hour = ('0' + date.getHours()).slice(-2); // 小时
            var minute = ('0' + date.getMinutes()).slice(-2); // 分钟
            var second = ('0' + date.getSeconds()).slice(-2); // 秒数
            var millisecond = ('000' + date.getMilliseconds()).slice(-3); // 毫秒数0-999
            // console.log(year + '-' + month + '-' + day + ' ' +
            //     hour + ':' + minute + ':' + second + '.' + millisecond);
            return year + '/' + month + '/' + day
        },
        getOrderType(row) {
            var time = this.currTimeFormate()
            let str = ''
            if (row.dateDay < time && row.status == 0) {
                str = '未前往,预约已过期'
                return str
            }
            switch (row.status) {
                case 0:
                    str = '已预约，待前往'
                    break;
                case 1:
                    str = '运动中...'
                    break;
                case 2:
                    str = '已完成'
                    break;
                case 3:
                    str = '已完成'
                    break;
                case 4:
                    str = '已取消'
                    break;
            }
            return str
        },
        showCancle(val) {
            var time = this.currTimeFormate()
            if (val.status < 1 && val.dateDay >= time) {
                return true
            }
            return false
        },
        cancel(val) {
            this.$confirm('确定取消预约吗, 是否继续?', '确定取消', {
                'confirmButtonText': '确定',
                'cancelButtonText': '取消',
            }).then(() => {
                axios.get('/book/cancle', {
                    params: {
                        id: val
                    }
                }).then(res => {
                    this.init()
                })
            })

        }
    }
}
</script>

<style scoped>

</style>