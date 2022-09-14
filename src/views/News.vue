<template>
    <div>
        <h1>新闻</h1>
        <template>
            <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
            <div id="main" style="width: 600px;height:400px;"></div>
        </template>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: "News",
    data() {

        return {

        }
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                    markPoint: {
                        data: [
                            {
                                type: 'max'
                            }
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
    },
    methods: {

    }
}

</script>

<style scoped>

</style>