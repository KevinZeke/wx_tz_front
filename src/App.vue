<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>  
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk'

    export default {
        name: 'App',
        methods: {
            show() {

                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        var localIds = res.localIds;
                    }
                });

            }
        }
    }
</script>

<style scoped>
    #app{
        width: 100%;
        height: 100%;
    }
</style>
