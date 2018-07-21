import Vue from 'vue'
import Router from 'vue-router'
import DiTuDaoHang from '../components/DiTuDaoHang'
import Qiandao from '../components/QianDao'


Vue.use(Router)

export default new Router({
    routes: [
        {path: '/ditudaohang', component: DiTuDaoHang, name: 'ditudaohang'},
        {path: '/qiandao', component: Qiandao, name: 'qiandao'},
    ]
})
