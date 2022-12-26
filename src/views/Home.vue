<template>
    <div id="home" style="padding: 0 10px; box-sizing: border-box;">
        <div id="app">
            <h1 style="font-size: 70px; font-weight: bolder; text-align: center;">欢迎访问Gbooking体育馆预约系统</h1>
            <br><br>
            <br><br>
            <br><br>
            <br><br>
            <el-row>
                <el-col :span="18">
                    <br><br>
                    <br><br>
                    <br><br>
                    <br><br>
                    <br><br>
                    <br><br>
                    <br><br>
                    <el-row :gutter="6">
                        <el-col :span="6">
                            <el-card class="box-card1">
                                <el-tooltip class="item" effect="dark" content="立即预约" placement="top">
                                    <el-image :src="require('@/assets/img/ONCALL.png')" class="image"
                                        style="width:100%;cursor: pointer;" @click="jump('/book')">
                                    </el-image>
                                </el-tooltip>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="box-card2">
                                <el-tooltip class="item" effect="dark" content="聊天广场" placement="top">
                                    <el-image :src="require('@/assets/img/chat.png')" class="image"
                                        style="width:100%;cursor: pointer;" @click="jump('/chat')">
                                    </el-image>
                                </el-tooltip>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="box-card3">
                                <el-tooltip class="item" effect="dark" content="场馆数据" placement="top">
                                    <el-image :src="require('@/assets/img/data.png')" class="image"
                                        style="width:100%;cursor: pointer;" @click="jump('/data')">
                                    </el-image>
                                </el-tooltip>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="box-card4">
                                <el-tooltip class="item" effect="dark" content="我来讲两句" placement="top">
                                    <el-image :src="require('@/assets/img/blog.png')" class="image"
                                        style="width:100%;cursor: pointer;" @click="jump('/markdown')">
                                    </el-image>
                                </el-tooltip>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <div id="range">
                        <h3 style="margin-bottom: 10px;">运动排行榜[只显示前十名数据]</h3>
                        <div class="table">
                            <el-table :data="tableData" stripe style="background-color: rgba(255, 255, 255, 0.27);"
                                :header-cell-style="{ height:'10px',border: '1px solid tan'}">
                                <el-table-column type="index" label="排名" width="50">
                                </el-table-column>
                                <el-table-column prop="stuName" label="用户名" width="120">
                                </el-table-column>
                                <el-table-column prop="totalCount" label="运动次数">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>


        </div>


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
        },
        jump(url) {
            window.location.href = url
        },
    }

}
</script>

<style scoped>
#range {
    background: transparent;
}

#app {
    background-image: url("../assets/img/reg_bg_min.jpg");
    text-align: center;
    height: 830px;
    position: relative;
}

#app {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
    padding: 0 100px;
    /* 给gutter留padding */
}

.el-row {
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
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

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 120px;
    background: transparent;
    height: 120px;

}

.box-card1 {
    width: 120px;
    background: transparent;
    height: 120px;
    background-image: linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%);

}

.box-card2 {
    width: 120px;
    background: transparent;
    height: 120px;
    background-image: linear-gradient(to right, #00c9ff, #92fe9d);
}

.box-card3 {
    width: 120px;
    background: transparent;
    height: 120px;
    background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
}

.box-card4 {
    width: 120px;
    background: transparent;
    height: 120px;
    background-image: linear-gradient(to right, #11998e, #38ef7d);
}

.table /deep/ .el-table th {
    background-color: transparent !important;
}

.table /deep/ .el-table tr {
    background-color: transparent !important;
}

.table /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
    background-color: transparent;
}

.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}
</style>