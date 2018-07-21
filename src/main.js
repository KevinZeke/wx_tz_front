// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {getJssdkConfig} from "./api/wx"
import wx from 'weixin-js-sdk'
// import BaiduMap from 'vue-baidu-map'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/bootstrap.min.css'
import './assets/css/main.css'

// Vue.use(BaiduMap, {
//     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//     ak: 'B105130ef8b3784b23baff3362874405'
// })
Vue.config.productionTip = false

Vue.use(iView);

getJssdkConfig(location.href.split('#')[0]).then(resp => {
    console.log(resp);

    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: resp.data.appid, // 必填，公众号的唯一标识
        timestamp: resp.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: resp.data.nonceStr, // 必填，生成签名的随机串
        signature: resp.data.signature,// 必填，签名
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'getLocation'

        ] // 必填，需要使用的JS接口列表
    });

    wx.ready(function(){

        wx.onMenuShareTimeline({
            title: '1', // 分享标题
            link: 'https://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://img1.mukewang.com/5333a08f0001700202000200-140-140.jpg', // 分享图标
            success: function () {

            },
            cancel: function (){

            }
        });

        wx.onMenuShareAppMessage({
            title: '1', // 分享标题
            desc: '1', // 分享描述
            link: 'https://www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://img1.mukewang.com/5333a08f0001700202000200-140-140.jpg', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
            }
        });

    });
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        components: {App},
        template: '<App/>'
    });
})




