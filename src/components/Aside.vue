<template>
    <el-menu class="el-menu-vertical-demo" :default-openeds="['1']" background-color="rgb(47,65,86)"
        style="height: 100%;min-height: 100%;" text-color="#EFF2FB" :collapse-transition="false" :collapse="isCollapse"
        :unique-opened="true" @select="prt" router>
        <div
            style="height: 60px;line-height: 60px;text-align: center;font-weight: bold; background-color: rgb(47,65,86)">
            <img src="../assets/img/logo.png" style="width: 20px;position: relative;top: 5px">
            <b v-show="!isCollapse"><b style="color: rgb(255,255,255);">场馆预约系统</b></b>
        </div>
        <el-menu-item index="/home">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">平台管理</span>
            </template>
            <el-menu-item index="/user">
                用户管理
            </el-menu-item>
            <el-menu-item index="/sports">场馆管理</el-menu-item>
            <el-menu-item index="/order">预约管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我要预约</span>
            </template>
            <el-menu-item index="/data">预约数据</el-menu-item>
            <el-menu-item index="/book">场馆预约</el-menu-item>
        </el-submenu>
        <el-submenu index="4" v-if="true">
            <template slot="title"><i class="el-icon-setting"></i><span>导航三</span></template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
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
        }
    }
}
</script>