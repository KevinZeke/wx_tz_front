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
                        @click="sign">
                    <Icon type="log-in" v-if="!signed"></Icon>
                    <Icon type="checkmark" v-if="signed"></Icon>
                    {{signed?'已签到':'签到'}}
                </Button>
            </div>
            <div class="display">
                <Timeline class="col-sm-5 col-xs-5">
                    <TimelineItem v-if="curMonRecord.length == 0">
                        <Icon type="social-tux" color="#19be6b" size=20 slot="dot"></Icon>
                        <p class="time"><strong>暂无敲到数据</strong></p>
                        <p class="content">-</p>
                    </TimelineItem>
                    <TimelineItem v-if="curMonRecord.length == 0">
                        <Icon type="social-tux" color="#19be6b" size=20 slot="dot"></Icon>
                        <p class="time"><strong>暂无敲到数据</strong></p>
                        <p class="content">-</p>
                    </TimelineItem>
                    <TimelineItem v-if="curMonRecord.length == 0">
                        <Icon type="social-tux" color="#19be6b" size=20 slot="dot"></Icon>
                        <p class="time"><strong>暂无敲到数据</strong></p>
                        <p class="content">-</p>
                    </TimelineItem>
                    <TimelineItem :key="index" v-for="(record,index) in curMonRecordLimit3">
                        <Icon type="log-in" color="#19be6b" size=20 slot="dot"></Icon>
                        <p class="time"><strong>{{record.date|formatDate}}</strong></p>
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
                            <th style="text-align:center">姓名</th>
                            <th style="text-align:center">设置时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="guy in luckyListLimit2">
                            <td>{{guy.name}}</td>
                            <td>{{guy.date.split(' ')[1]}}</td>
                        </tr>
                        <tr>
                            <td colspan=2>
                                <button @click="allDutyShow = true"
                                        class="btn btn-sm btn-default">查看全部名单
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <Modal
                v-model="allDutyShow"
                title="今日值日名单">
            <ul class="clearfix">
                <li class="col-sm-4 col-xs-4" v-for="guy in luckyGuy">
                    <p>
                        <Avatar
                                style="background-color: #87d068;margin-right: 2px"
                                size="small" icon="person"/>
                        {{guy.name}}
                    </p>
                </li>
            </ul>
        </Modal>
    </div>
</template>

<script>
    import {getAccountInfo} from "../api/wx";
    import {getLastDay} from "../utils/common";
    import {isSignToday, sign, getCurMonthRecordById, getDutyListToday} from "../api/service";

    export default {
        name: "QianDao",
        data() {
            return {
                allDutyShow: false,
                account: null,
                signed: true,
                signedCount: 0,
                monthTotalDays: getLastDay(new Date().getFullYear(), new Date().getMonth() + 1),
                dataColumns: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '签到时间',
                        key: 'signTime'
                    }
                ],
                tableData: [
                    {name: 'charlee', signTime: '19:09'},
                    {name: 'peachy', signTime: '12:39'},
                    {name: 'violet', signTime: '15:19'},
                ],
                curMonRecord: [],
                luckyGuy: []
            }
        },
        filters: {
            formatDate(val) {
                return val.replace(/\d{4}-/, '');
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
            },

            curMonRecordLimit3() {
                if (this.curMonRecord.length > 3)
                    return this.curMonRecord.slice(0, 3);
                else
                    return this.curMonRecord;
            },

            luckyListLimit2() {
                if (this.curMonRecord.length > 2)
                    return this.luckyGuy.slice(0, 2);
                else
                    return this.luckyGuy;
            }
        },
        created() {
            this.getWxAccountInfo();
            this.getDutyListToday();
        },
        methods: {
            getWxAccountInfo() {
                getAccountInfo().then(res => {
                    console.log(res);
                    let ac;
                    if (res.data && res.data.nickname) {
                        ac = res.data;
                    } else {
                        this.$Modal.error({content: '获取账号信息失败，使用测试账号'});
                        ac = {
                            nickname: '测试账号',
                            headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLEFYUUkTeIXBHXPUibMDMCVDDorQefrHDT2epDiaG1HlnQ8r2Ad3vo53aoTVpu7xt5AibIfDslh9Hbg/132',
                            openid: 'oBSeU0mcE1ud-lwIW9E7T-8_aqGA'
                        };
                    }
                    this.account = ac;
                    this.isSignToday(this.account.openid);
                    this.getCurMonthRecord(this.account.openid);
                });
            },
            getDutyListToday() {
                return getDutyListToday().then(res => {
                    this.luckyGuy = res.data.data;
                    console.log(res);

                })
            },
            sign() {
                if (!this.signed) {
                    this.signed = true;
                    this.signedCount++;
                    sign(this.account.nickname, this.account.openid, 1);
                }

            },
            isSignToday(id) {
                isSignToday(id).then((res) => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$Modal.error({content: res.data.msg});
                        return;
                    }
                    if (res.data.data.count > 0)
                        this.signed = true;
                    else
                        this.signed = false;
                })
            },
            getCurMonthRecord(id) {
                getCurMonthRecordById(id).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$Modal.error({content: res.data.msg});
                        return;
                    }
                    this.curMonRecord = res.data.data.list;
                    this.signedCount = this.curMonRecord.length;
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 5px;
    }

    .ava {
        padding: 25px;
        border: 1px solid #eaeaea;
        border-radius: 20px;
        width: 80%;
        margin: 0 auto 15px;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 3px 1px #ccc;
    }

    .display {
        margin-top: 20px;
    }

    .container {
        /*background-color: #fff;*/
    }

    thead {
        font-size: 12px;

    }

</style>