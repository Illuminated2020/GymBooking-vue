<template>
    <div id="data">
        <h1 style="margin: 1px 0 0 10px;">场馆数据[实时更新]</h1>
        <el-row :gutter="10">
            <el-col :span="12">
                <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <div ref="main" style="width: auto;height:400px;margin:10px 0 0 20px;"></div>
            </el-col>
            <el-col :span="12">
                <div ref="pie" style="width: auto;height:400px;"></div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
                <h5>场馆未来两周人流量预计曲线</h5>
                <div ref="every" style="width: auto;height:380px;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from '../util/myaxios';
import * as echarts from 'echarts';
export default {
    name: "Data",
    data() {
        return {
            myData: null,
            allData: null,
            myChart1: null,
            myChart2: null,
            myChart3: null,
        }
    },
    mounted() {
        this.initChart()
        this.getData()
    },
    methods: {
        getData() {
            axios.get('/echarts/pie', {}).then(res => {
                this.allData = res.data.data;
                // console.log(this.allData);
                this.updateChart();
            })
            axios.get('/echarts/one', {
            }).then(res => {
                this.myData = res.data.data;
                console.log(this.myData);
                this.updateChart();
            })
        },
        initChart() {
            this.myChart1 = echarts.init(this.$refs.main);
            this.myChart2 = echarts.init(this.$refs.pie);
            this.myChart3 = echarts.init(this.$refs.every);
        },
        updateChart() {
            const formNames = this.allData.map((item) => {
                return item.name
            })
            const formValue = this.allData.map((item) => {
                return item.value
            })
            const selfName = this.myData.map((item) => {
                return item.name
            })
            const selfValue = this.myData.map((item) => {
                return item.value
            })
            console.log(selfName);
            console.log(selfValue);
            const option = {
                xAxis: {
                    type: 'value',
                    max: 'dataMax'
                },
                yAxis: {
                    type: 'category',
                    data: formNames,
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                },
                series: [
                    {
                        realtimeSort: true,
                        type: 'bar',
                        name: '总计预约人数',
                        data: formValue,
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    }
                ],
                legend: {
                    show: true
                },
                animationDuration: 0,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };
            const pieoption = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '场馆总预约人数:',
                        type: 'pie',
                        data: this.allData,
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },

                    }
                ]
            };
            const myoption = {
                xAxis: {
                    type: 'category',
                    data: selfName
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: selfValue,
                        type: 'line'
                    }
                ]
            };
            this.myChart1.setOption(option);
            this.myChart2.setOption(pieoption);
            this.myChart3.setOption(myoption);

        }
    }
}

</script>

<style scoped>
#data {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
    padding: 0 50px;
    /* 给gutter留padding */
}
</style>