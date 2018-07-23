<template>
    <div v-if="account" class="container">
        <div class="text-center">
            <div class="ava">
                <img :src="account.headimgurl" style="border-radius:50% " alt="">
                <p>{{account.nickname}}</p>
            </div>
            <div class="">
                <p>周签到次数：{{dayProgress}} / 7</p>
                <Progress :percent="dayProgressPer>>0"></Progress>
                <p>月签到次数：{{signedCount}} / {{monthTotalDays}}</p>
                <Progress :percent="monProgressPer" style="margin-bottom:10px;"></Progress>
                <Button :type="signed?'dashed':'info'" 
                        @click="sign">{{signed?'已签到':'签到'}}</Button>
            </div>
            <div class="display">
                <Timeline class="col-sm-5 col-xs-5">
                    <TimelineItem >
                        <Icon type="log-in" color="#19be6b" size=20 slot="dot"></Icon>
                        <p class="time"><strong>2018-7-22</strong></p>
                        <p class="content">签到成功</p>
                    </TimelineItem>
                    <TimelineItem>
                        <Icon type="log-in" color="#19be6b"  size=20 slot="dot"></Icon>
                        <p class="time"><strong>2018-7-21</strong></p>
                        <p class="content">签到成功</p>
                    </TimelineItem>
                    <TimelineItem>
                        <Icon type="log-in" color="#19be6b"  size=20 slot="dot"></Icon>
                        <p class="time"><strong>2018-7-20</strong></p>
                        <p class="content">签到成功</p>
                    </TimelineItem>
                </Timeline>
                <div class="col-md-7 col-xs-7">
                    <table class="table" style="background-color:#fff;">
                        <thead>
                            <tr>
                                <th style="text-align:center" colspan=2>值班人员</th>
                            </tr>
                            <tr>
                                <th style="text-align:center" >姓名</th>
                                <th style="text-align:center" >签到时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>jack</td>
                                <td>19:09</td>
                            </tr>
                            <tr>
                                <td>rose</td>
                                <td>19:19</td>
                            </tr>
                            <tr>
                                <td colspan=2><button class="btn btn-default">查看更多</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import {getAccountInfo} from "../api/wx";
    import {getLastDay} from "../utils/common";

    export default {
        name: "QianDao",
        data() {
            return {
                account: null,
                signed: false,
                signedCount: 18,
                monthTotalDays: getLastDay(new Date().getFullYear(), new Date().getMonth() + 1),
                dataColumns:[
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '签到时间',
                        key: 'signTime'
                    }
                ],
                tableData:[
                    {name:'charlee',signTime:'19:09'},
                    {name:'peachy',signTime:'12:39'},
                    {name:'violet',signTime:'15:19'},
                ]
            }
        },
        computed: {
            dayProgress() {

                return this.signedCount - ((this.signedCount / 7 >> 0) * 7);
            },

            dayProgressPer() {
                return this.dayProgress / 7 * 100
            },

            monProgressPer() {
                return this.signedCount / this.monthTotalDays * 100 >> 0;
            }
        },
        created() {
            this.getWxAccountInfo();
        },
        methods: {
            getWxAccountInfo() {
                getAccountInfo().then(res => {
                    console.log(res);
                    res = {
                        nickname: '山姆渔',
                        headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLEFYUUkTeIXBHXPUibMDMCVDDorQefrHDT2epDiaG1HlnQ8r2Ad3vo53aoTVpu7xt5AibIfDslh9Hbg/132'
                    };
                    this.account = res;
                });
            },
            sign() {
                if (!this.signed) {

                    this.signed = true;
                    this.signedCount++;
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        padding: 5px;
    }
    .ava{
        padding: 25px;
        border: 1px solid #eaeaea;
        border-radius: 20px;
        width: 80%;
        margin: 0 auto 15px;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 3px 1px #ccc;
    }
    .display{
        margin-top: 20px;
    }
    .container{
        /*background-color: #fff;*/
    }
    thead{
        font-size: 12px;

    }

</style>