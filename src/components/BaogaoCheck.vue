<template>
    <div class="container">
        <router-link :to="{name:'baogao'}" style="position: absolute;left: 5px;top: 5px;">
            <Icon type="chevron-left"></Icon>
            返回
        </router-link>
        <h4 class="text-center">报告查看</h4>
        <hr style="margin: 4px;padding: 0">
        <div class="row" style="padding: 4px;">

            <span style="margin-top: 5px;">日期选择：</span>
            <DatePicker
                        type="date"
                        placeholder="报告日期"
                        v-model="reportDate"
                        @on-change="dateChange">
            </DatePicker>


        </div>
        <div class="table-wrap" v-for="(report,idx) in reports">
            <hr>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th colspan="4" class="text-center">{{report.name || '消防大队出警报告'}}</th>
                </tr>
                <tr>
                    <th colspan="4" class="text-right">{{report.rep_datetime.split(' ')[0]}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colspan="2">接警时间</th>
                    <td colspan="2">{{report.accept_datetime}}</td>
                </tr>
                <tr>
                    <th colspan="2">接警中队</th>
                    <td colspan="2">{{report.accept_object}}</td>
                </tr>
                <tr>
                    <th>接警电话</th>
                    <td>{{report.call_address}}</td>
                    <th>报警人</th>
                    <td>{{report.call_man}}</td>
                </tr>
                <tr>
                    <th colspan="2">火灾地点</th>
                    <td colspan="2">{{report.fire_address}}</td>
                </tr>
                <tr>
                    <th colspan="2">出警力量</th>
                    <td colspan="2">{{report.force}}</td>
                </tr>
                <tr>
                    <th colspan="2">燃烧物质</th>
                    <td colspan="2">{{report.fire_obj}}</td>
                </tr>
                <tr>
                    <th colspan="2">过火面积</th>
                    <td colspan="2">{{report.burned_area}}</td>
                </tr>
                <tr>
                    <th colspan="2">到达火场时间</th>
                    <td colspan="2">{{report.arrived_datetime}}</td>
                </tr>
                <tr>
                    <th colspan="2">归队时间</th>
                    <td colspan="2">{{report.back_datetime}}</td>
                </tr>
                <tr>
                    <th colspan="2">火灾损失</th>
                    <td colspan="2">{{report.lose}}</td>
                </tr>
                <tr>
                    <th colspan="2">补救措施</th>
                    <td colspan="2">{{report.save_measure}}</td>
                </tr>
                <tr>
                    <th colspan="2">战评</th>
                    <td colspan="2">{{report.evaluation}}</td>
                </tr>
                <tr>
                    <th colspan="2">建议</th>
                    <td colspan="2">{{report.advice}}</td>
                </tr>
                </tbody>
            </table>

        </div>
        <div>
            <hr>
            <p class="text-center">该日暂无数据</p>
        </div>
    </div>
</template>

<script>
    import {getChujingReport} from "../api/service";
    import {getNowFormatDate, yyyMMdd} from "../utils/common";


    export default {
        name: "BaogaoCheck",
        data() {
            return {
                reportDate:'',
                reports: []
            }
        },
        created() {
            this.reportDate = getNowFormatDate()[0];
            this.dateChange(this.reportDate);
        },
        methods:{
            dateChange(val){
                //console.log(val);
                getChujingReport(val).then(res => {
                    this.reports = res.data.data;
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped>
    table{
        word-wrap:break-word;
        word-break:break-all;
    }
    .container{
        padding-top: 15px;
    }
</style>