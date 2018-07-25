import Vue from 'vue'
import Router from 'vue-router'
import DiTuDaoHang from '../components/DiTuDaoHang'
import Qiandao from '../components/QianDao'
import Baogao from '../components/BaoGao'
import Zhiri from '../components/ZhiRiPaiBan'
import ZhiriDetail from '../components/ZhiRiDetail'
import BaogaoCheck from '../components/BaogaoCheck'
import ZhiBanJiaoJie from '../components/ZhiBanJiaoJie'


Vue.use(Router)

export default new Router({
    routes: [
        {path: '/ditudaohang', component: DiTuDaoHang, name: 'ditudaohang'},
        {path: '/qiandao', component: Qiandao, name: 'qiandao'},
        {path: '/baogao', component: Baogao, name: 'baogao'},
        {path: '/zhiri', component: Zhiri, name: 'zhiri'},
        {path: '/zhiriDetail', component: ZhiriDetail, name: 'zhiriDetail'},
        {path: '/baogaoCheck', component: BaogaoCheck, name: 'baogaoCheck'},
        {path: '/zhiBanJiaoJie', component: ZhiBanJiaoJie, name: 'zhiBanJiaoJie'},

    ]
})
