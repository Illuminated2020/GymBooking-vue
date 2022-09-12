<template>
    <div id="personal">
        <h1>个人中心</h1>
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- <div class="grid-content">
                    <el-image style="width: 300px; height: 300px"
                        :src="'http://localhost:8080/common/download?name=' + imgurl" :fit="fit"></el-image>
                </div> -->
                <el-image style="width: 300px; height: 300px"
                    :src="'http://localhost:8080/common/download?name=' + imgurl" :fit="fit"></el-image>
                <el-upload style="margin-left: 90px ;" class="avatar-uploader"
                    action="http://localhost:8080/common/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :on-change="onChange" ref="upload">
                    <el-button type="primary" size="medium" style="">更换头像<i class="el-icon-upload el-icon--right"></i>
                    </el-button>

                </el-upload>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-dark"></div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Personal",
    data() {
        return {
            imgurl: '',
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.imgurl = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data.avatarUrl
                : "";
        },
        handleAvatarSuccess(response, file, fileList) {
            // this.imageUrl = response.data
            console.log(response.data);
            this.imgurl = `http://localhost:8080/common/download?name=${response.data}`
        },
        onChange(file) {
            if (file) {
                const suffix = file.name.split('.')[1]
                const size = file.size / 1024 / 1024 < 2
                if (['png', 'jpeg', 'jpg'].indexOf(suffix) < 0) {
                    this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
                    this.$refs.upload.clearFiles()
                    return false
                }
                if (!size) {
                    this.$message.error('上传文件大小不能超过 2MB!')
                    return false
                }
                return file
            }
        },
    }
}
</script>

<style scoped>
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
    background: #1e62af;

}

.bg-purple {
    background: #0d1016;

}

.bg-purple-light {
    background-color: Transparent;

}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

#personal {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    margin-bottom: 5px;
    padding: 0 10px;
    /* 给gutter留padding */
}
</style>