<template>
    <baidu-map class="bmap"
               ak="B105130ef8b3784b23baff3362874405"
               :center="center"
               :zoom="zoom"
               :scroll-wheel-zoom="true"
               @ready="handler">
        <bm-marker
                :position="center"
                :dragging="false" animation="BMAP_ANIMATION_DROP">
            <bm-label content="你的位置"
                      :labelStyle="{color: 'red', fontSize : '12px'}"
                      :offset="{width: -35, height: 30}"/>
        </bm-marker>

        <bm-marker
                v-for="(pos,idx) in ddPos"
                :position="pos"
                :key="idx"
                :dragging="false" animation="BMAP_ANIMATION_DROP">
            <bm-label :content="idx+'号大队位置'"
                      :labelStyle="{color: 'red', fontSize : '12px'}"
                      :offset="{width: -35, height: 30}"/>
        </bm-marker>

        <bm-traffic v-if="trafficShow" :predictDate="{weekday: 6, hour: 12}">
        </bm-traffic>
        <!--<bm-view style="width: 100%; height:100%; flex: 1"></bm-view>-->
        <button style="position: absolute;z-index: 999;top: 0;"
                class="btn btn-default"
                @click="ctrlModal = !ctrlModal">控制
        </button>
        <div style="position: absolute;z-index: 999;top: 60px;display: inline-block;background-color:#fff;padding:5px;box-shadow: 1px 1px 3px 1px #ccc" v-if="trafficShow">
            <p><span class="ivu-tag-dot-inner" style="background-color:#d95756;"></span><small>拥挤</small></p>
            <p><span class="ivu-tag-dot-inner" style="background-color:#f2ad00;"></span><small>缓行</small></p>
            <p><span class="ivu-tag-dot-inner" style="background-color:#63b352;"></span><small>畅通</small></p>
        </div>
        <bm-driving
                :start="from"
                :end="to"
                :panel="false"
                :auto-viewport="true"
        ></bm-driving>

        <div style="position:absolute;top:0;right: 0;max-width: 50%">
            <Input v-model="toText" icon="search" placeholder="终点"
                   style="margin: 5px 0" @on-focus="showSearch = true"></Input>
            <bm-local-search
                    :panel="showSearch"
                    :keyword="toText"
                    :auto-viewport="true"
                    @infohtmlset="infohtmlset"
                    :location="city"></bm-local-search>

        </div>
        <Modal
                v-model="ctrlModal"
                title="控制面板">
            <div class="row">
                <p class="col-sm-6 col-xs-6 text-center">显示路况：</p>
                <p class="text-center col-sm-6 col-xs-6">
                    <i-switch
                            v-model="trafficShow"
                            @on-change="trafficChange"></i-switch>
                </p>

            </div>
        </Modal>
    </baidu-map>
</template>
<script>

    import baiduMap from 'vue-baidu-map/components/map/Map'
    import bmView from 'vue-baidu-map/components/map/MapView'
    import bmMarker from 'vue-baidu-map/components/overlays/Marker'
    import bmLabel from 'vue-baidu-map/components/overlays/Label'
    import bmTraffic from 'vue-baidu-map/components/layers/Traffic'
    import bmDriving from 'vue-baidu-map/components/search/Driving'
    import bmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
    import wx from 'weixin-js-sdk'


    function randomPos(lng, lat) {
        //31.81072,119.97365
        let i = Math.random() > 0.5 ? -1 : 1;
        let lngOffset = i*(Math.random() * 9000 >> 0) / 100000;
        let latOffset = -1*i*(Math.random() * 9000 >> 0) / 100000;
        return {lng: lng + lngOffset, lat: lat + latOffset}
    }

    export default {
        data() {
            return {

                showSearch: false,
                city:'',
                center: {lng: 0, lat: 0},
                zoom: 3,
                ctrlModal: false,
                localSearchShow: true,
                trafficShow: false,
                isFrom: true,
                keyword: '',
                from: '',
                to: '',
                fromText: '',
                toText: '',
                localSearchShowFrom: true,
                localSearchShowTo: true,
                ddPos: []
            }
        },
        created() {
            wx.ready(() => {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: (res) => {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        console.log(res);
                        this.center = {lng: longitude, lat: latitude};
                        this.city = res.city;

                        for (let i = 0; i < 12; i++) {
                            this.ddPos.push(randomPos(longitude, latitude));
                        }
                    }
                });
            });
        },
        methods: {
            handler({BMap, map}) {
                // console.log(BMAP_ANIMATION_BOUNCE);
                // console.log(BMap, map)
                //this.center.lng = 116.404
                //this.center.lat = 39.915
                this.zoom = 12
            },
            trafficChange() {
            },
            infohtmlset(pos) {
                this.showSearch = false;
                this.from = this.center;
                this.to = pos.point;
                console.log(this.pos);
            }
        },
        components: {baiduMap, bmLabel, bmMarker, bmTraffic, bmView, bmDriving, bmLocalSearch}
    }
</script>
<style>
    .bmap {
        width: 100%;
        height: 100%;
    }
</style>


<!--<template>-->
<!--<div id="map-wrap"></div>-->
<!--</template>-->

<!--<script>-->
<!--import {BDMap} from "../utils/map";-->

<!--export default {-->
<!--name: "DiTuDaoHang",-->
<!--mounted() {-->
<!--this.initMap();-->
<!--},-->
<!--methods:{-->
<!--initMap(){-->
<!--var bmap = new BDMap("map-wrap");-->
<!--bmap-->
<!--.curCity("北京")-->
<!--.centerAndZoom([116.414, 39.915], 15)-->
<!--.scrollWheelZoom(true)-->
<!--.mark([-->
<!--{lng: 116.414, lat: 39.915},-->
<!--{lng: 116.404, lat: 39.915}-->
<!--], function (marker, info) {-->
<!--marker.addEventListener('click', function () {-->
<!--bmap.panTo(info.lng, info.lat);-->
<!--})-->
<!--});-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--#map-wrap {-->
<!--width: 100%;-->
<!--height: 100%;-->
<!--}-->
<!--</style>-->