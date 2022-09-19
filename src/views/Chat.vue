<template>
    <div id="chat">
        <el-row :gutter="0">
            <el-col :span="20">
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
                                <span style="color: darkgray;cursor: pointer;margin-left: 800px;"
                                    v-if="showBlog(item.userId)" @click="deleteBlog(item.id)">
                                    <i class="el-icon-delete-solid"></i>删除帖子</span>
                            </div>
                            <VueMarkdown :source="item.content" style="min-height:200px"></VueMarkdown>
                            <el-collapse accordion>
                                <el-collapse-item>
                                    <template slot="title">
                                        查看评论 <i class="el-icon-chat-round"></i>
                                    </template>
                                    <div v-for="(comment,index) in item.commentDtoList" :key="index">
                                        <el-divider content-position="left">
                                            <span style="color:darkgray;">于{{comment.createTime}}评论 来自：</span>
                                            <el-avatar shape="square"
                                                :src="'http://localhost:8080/common/download?name=' + comment.avatarUrl"
                                                :size="25">
                                            </el-avatar>{{comment.nickname}}
                                            <span style="color: darkgray;cursor: pointer;"
                                                v-if="showDelete(comment.userId)" @click="deleteComment(comment.id)">
                                                删除评论
                                                <i class="el-icon-delete-solid"></i></span>
                                        </el-divider>
                                        <span>{{comment.content}}</span>
                                        <br>
                                    </div>
                                </el-collapse-item>
                                <Comment style="position: relative; bottom: 0;" :blogId="item.id" @init="init">
                                </Comment>
                            </el-collapse>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
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
        Comment,
    },
    data() {
        var blogs = [];
        var comments = new Map();
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
        showDelete(val) {
            if (JSON.parse(localStorage.getItem("userInfo")).data.role == '管理员') {
                return true;
            }
            return val === JSON.parse(localStorage.getItem("userInfo")).data.id
        },
        showBlog(val) {
            if (JSON.parse(localStorage.getItem("userInfo")).data.role == '管理员') {
                return true;
            }
            return val === JSON.parse(localStorage.getItem("userInfo")).data.id
        },
        deleteComment(val) {
            this.$confirm('确定删除此条评论吗, 是否继续?', '确定删除', {
                'confirmButtonText': '确定',
                'cancelButtonText': '取消',
            }).then(() => {
                axios.delete('/comment', {
                    params: {
                        id: val,
                    }
                }).then(res => {
                    this.init()
                })
            })
        },
        deleteBlog(val) {
            this.$confirm('确定删除此条帖子吗, 是否继续?', '确定删除', {
                'confirmButtonText': '确定',
                'cancelButtonText': '取消',
            }).then(() => {
                axios.delete('/blog', {
                    params: {
                        id: val,
                    }
                }).then(res => {
                    this.init()
                })
            })
        },
        /* getComment(id) {
            axios.get('/comment', {
                params: {
                    id: id,
                }
            }).then(res => {
                console.log(res.data);
                // this.comments = res.data.data;
                console.log(id);
                this.comments.set(id, res.data.data);
                console.log(this.comments.get(id))
            })
        } */
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