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
                            <el-button type="text" class="button">预约></el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
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
            sport,
            pageSize: 10,
            pagetotal: 0,
            mytitle: '',
            currentpage: 1,
            tableData: [],
            dialogFormVisible: false,
            multipleSelection: [],
            labelPosition: 'right',

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