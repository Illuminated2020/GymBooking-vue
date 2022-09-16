<template>
    <div style="padding: 0 10px; box-sizing: border-box;">
        <el-row>
            <el-col :span="24">
                <el-carousel :interval="4000" type="card" height="360px">
                    <el-carousel-item v-for="item in imgwrap" :key="item.url">
                        <img style="height: 360px;" :src="item.url">
                        </img>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <el-divider style="margin: 50px;"></el-divider>
        <el-row>
            <el-col :span="5" :push="1">
                <h3 align="center" style="margin-bottom: 5px;">运动排行榜[只显示前十名数据]</h3>
                <el-table :data="tableData" stripe style="flex" :size="mini" :header-cell-style="{ 
                background:'#e2d2d2',height:'20px',border: '1px solid tan'}">
                    <el-table-column type="index" label="排名" width="50">
                    </el-table-column>
                    <el-table-column prop="stuName" label="用户名" width="120">
                    </el-table-column>
                    <el-table-column prop="totalCount" label="运动次数">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="10" :push="8">
                <el-calendar v-model="value">
                </el-calendar>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from '../util/myaxios';
export default {
    name: "Home",
    data() {
        return {
            tableData: [],
            imgwrap: [
                { url: require("../assets/img/6.jpg") },
                { url: require("../assets/img/banner02.jpg") },
                { url: require("../assets/img/3.jpg") },
                { url: require("../assets/img/4.jpg") },
                { url: require("../assets/img/5.jpg") }
            ],
            value: new Date()
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            axios.get('/book/all', {}).then(res => {
                this.tableData = res.data.data;
                console.log(this.tableData);
            })
        }
    }

}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
<style>
.el-calendar-table .el-calendar-day {
    width: 20px;
    height: 40px;
}
</style>