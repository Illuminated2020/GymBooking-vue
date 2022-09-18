<template>
    <div id="chat">
        <el-row :gutter="40">
            <el-col :span="21">
                <el-card class="box-card"
                    style="background-image: linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);">
                    <h3 class="chat" style="text-align: center; margin:5px 0 10px 0">聊天广场</h3>
                    <div class="markdown-body" v-for="(item,index) in blogs" :key="index">
                        <br>
                        <el-card class="box-card" style="box-shadow: 7px 7px 17px rgb(52 56 66 / 50%);">
                            <div>
                                <el-avatar shape="circle"
                                    :src="'http://localhost:8080/common/download?name=' + item.avatarUrl">
                                </el-avatar>
                                <b>{{item.nickname}}</b>
                                <span
                                    style="font-size: 5px; color:darkgray;text-align:right">发布于{{item.createTime}}</span>
                            </div>
                            <VueMarkdown :source="item.content" style="min-height:200px"></VueMarkdown>
                            <el-collapse accordion @change="getComment(item.id)">
                                <el-collapse-item>
                                    <template slot="title">
                                        查看回复 <i class="el-icon-chat-round"></i>
                                    </template>
                                    <div v-for="(comment,index) in comments" :key="index">
                                        <el-divider content-position="left">
                                            <span style="color:darkgray;">于{{comment.createTime}}回复 来自：</span>
                                            <el-avatar shape="square"
                                                :src="'http://localhost:8080/common/download?name=' + comment.avatarUrl"
                                                :size="25">
                                            </el-avatar>{{comment.nickname}}
                                        </el-divider>
                                        <span>{{comment.content}}</span>
                                        <br>
                                    </div>
                                </el-collapse-item>
                                <Comment style="position: relative; bottom: 0;" :blogId="item.id"></Comment>
                            </el-collapse>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="3">
                <el-backtop target=".chat" :visibility-height=20></el-backtop>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from '../util/myaxios';
import VueMarkdown from 'vue-markdown'
import Comment from '@/views/Comment.vue';
export default {
    name: "Chat",
    components: {
        VueMarkdown, // 注入组件
        Comment
    },
    data() {
        var blogs = [];
        var comments = [];
        return {
            count: 5,
            blogs,
            comments,
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
                console.log(this.blogs);
            })
        },
        getComment(id) {
            axios.get('/comment', {
                params: {
                    id: id,
                }
            }).then(res => {
                console.log(res.data);
                this.comments = res.data.data;
                console.log(this.comments)
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

#popper-container {
    width: 100px;
}

.markdown-body {
    background-color: transparent;
}
</style>