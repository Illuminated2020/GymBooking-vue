<template>
    <div>
        <div style="height: 75px; text-align: right; font-size: 12px;display: flex; ">
            <div style="font-size: 18px; width: 2%; ">
                <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
            </div>
            <el-breadcrumb class="breadcrumb" separator="/" style="margin: 22px 30px;width: 70%;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in levelList" :key="item.path" @click.native="breadcrumbClick(item)"
                    v-if='item.name' style="cursor: pointer">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="block" style="margin: 7px; width: 20%; text-align: right">
                <el-avatar shape="square" :src="'http://localhost:8080/common/download?name=' + squareUrl">
                </el-avatar>
            </div>
            <el-dropdown style="width: 8%; text-align: left">
                <div style="display: inline-block">
                    <span style="cursor: pointer;">
                        <div style="color: white;">
                            {{username}}
                        </div>
                    </span>
                    <!-- <i class="el-icon-user-solid" style="margin-left: 5px"></i> -->
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span @click="personal">个人中心</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span @click="logout">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import axios from '../util/myaxios';

export default {
    name: 'Header',
    props: {
        collapseBtnClass: '',
        collapse: '',
        username: '',
        squareUrl: '',
    },
    data() {
        return {
            urlsrc: '',
            breadList: [],
            levelList: [],
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        menuShow() {
            if (JSON.parse(localStorage.getItem("userInfo")).data.role == '普通用户') {
                return true
            }
            return false
        },
        // 面包屑数据处理
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)  //获取路由信息，并过滤保留路由名称信息存入数组
            this.levelList = matched
        },
        // 面包屑点击事件
        breadcrumbClick(item) {
            console.log(item.path);
            this.$router.push({
                path: item.path
            })
        },
        //退出账户
        logout() {
            axios.post('/admin/logout', {}).then(res => {
                if (res.data.code == '1') {
                    this.$message({
                        message: '退出账号成功',
                        type: 'success'
                    });
                    localStorage.removeItem('userInfo')
                    window.location.href = '/login'
                }
            }).catch(error => {
                this.$message({
                    message: '未知错误',
                    type: 'error'
                });
            })
        },
        personal() {
            window.location.href = '/personal'
        }
    },
    watch: {
        // 监听路由的变化
        $route() {
            this.getBreadcrumb();
        }
    }

};

</script>

<style>

</style>