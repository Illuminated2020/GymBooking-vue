<template>
    <div id="chat">
        <el-row :gutter="40">
            <el-col :span="4">
                <el-card class="box-card">
                </el-card>
            </el-col>
            <el-col :span="19">
                <h3 style="text-align: center; margin:5px 0 5px 0">广场</h3>
                <el-card class="box-card">
                    <div class="markdown-body" v-for="(item,index) in blogs" :key="index">
                        <br>
                        <el-card class="box-card">
                            <VueMarkdown :source="item.content"></VueMarkdown>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from '../util/myaxios';
import VueMarkdown from 'vue-markdown'
export default {
    name: "Chat",
    components: {
        VueMarkdown // 注入组件
    },
    data() {
        var blogs = [];

        return {
            count: 5,
            blogs,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        load() {
            this.count += 5,
                console.log(this.count);
        },
        init() {
            axios.get('/blog', {}).then(res => {
                this.blogs = res.data.data
            })
        }
    }
}
</script>

<style scoped>
#chat {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
    padding: 0 50px;
    /* 给gutter留padding */
}
</style>