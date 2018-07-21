<template>
    <div v-if="account" class="container">
        <div class="text-center">
            <div class="ava">
                <img :src="account.headimgurl" style="border-radius:50% " alt="">
                <p>{{account.nickname}}</p>
            </div>
            <p>周签到次数：{{dayProgress}} / 7</p>
            <Progress :percent="dayProgressPer>>0"></Progress>
            <p>月签到次数：{{signedCount}} / {{monthTotalDays}}</p>
            <Progress :percent="monProgressPer"></Progress>
            <Button :type="signed?'dashed':'info'" @click="sign">{{signed?'已签到':'签到'}}</Button>
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
                monthTotalDays: getLastDay(new Date().getFullYear(), new Date().getMonth() + 1)
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
    }
</style>