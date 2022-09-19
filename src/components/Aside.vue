<template>
    <el-menu class="el-menu-vertical-demo" :default-openeds="['1']" background-color="rgb(47,65,86)"
        style="height: 100%;min-height: 100%;" text-color="#EFF2FB" :collapse-transition="false" :collapse="isCollapse"
        :unique-opened="false" @select="prt" router>
        <div
            style="height: 60px;line-height: 60px;text-align: center;font-weight: bold; background-color: rgb(47,65,86)">
            <img src="../assets/img/logo.png" style="width: 20px;position: relative;top: 5px">
            <b v-show="!isCollapse">
                <b style="color: rgb(255,255,255);">场馆预约<b v-if="menuShow()">管理</b>系统</b>

            </b>
        </div>
        <el-menu-item index="/home">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>我要预约</span>
            </template>
            <el-menu-item index="/data">
                <i class="el-icon-data-analysis"></i>
                场馆数据
            </el-menu-item>
            <el-menu-item index="/book">
                <i class="el-icon-phone"></i>
                场馆预约
            </el-menu-item>
        </el-submenu>
        <el-submenu v-if="menuShow()" index="3">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">平台管理</span>
            </template>
            <el-menu-item index="/user">
                <i class="el-icon-user"></i>
                用户管理
            </el-menu-item>
            <el-menu-item index="/sports">
                <i class="el-icon-office-building"></i>
                场馆管理
            </el-menu-item>
            <el-menu-item index="/order">
                <i class="el-icon-phone-outline"></i>
                预约管理
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4" v-if="true">
            <template slot="title"><i class="el-icon-bangzhu"></i><span>公共空间</span></template>
            <el-menu-item index="/chat">
                <i class="el-icon-cold-drink"></i>
                聊天广场
            </el-menu-item>
            <el-menu-item index="/markdown">
                <i class="el-icon-chat-line-square"></i>
                我来讲两句
            </el-menu-item>
            <el-menu-item index="/index">选项3</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'Aside',
    props: {
        isCollapse: Boolean,
    },

    methods: {
        jump(url) {
            this.$router.push(url);
        },
        prt() {
            let name = this.$router.currentRoute.name;
            this.$emit('getMessage', name)
            console.log(name);
        },
        menuShow() {
            if (JSON.parse(localStorage.getItem("userInfo")).data.role == '管理员') {
                return true
            }
            return false
        },
    }
}
</script>