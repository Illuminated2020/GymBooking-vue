import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import "./style/global.css"
import axios from 'axios'
//在vue项目的mian.js文件中，引入js-md5并挂载原型
import md5 from 'js-md5';
//全局引入echarts
import echarts from 'echarts'
import 'github-markdown-css/github-markdown.css'
//整合mavonEditor实现markdown
import { mavonEditor } from "mavon-editor"
import "mavon-editor/dist/css/index.css"
Vue.component("mavon-editor", mavonEditor)
Vue.prototype.$echarts = echarts
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios //
Vue.use(Element, { size: "mini" })
Vue.config.productionTip = false
require("./mock") //引入mock数据，关闭则注释该行
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
