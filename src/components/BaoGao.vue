<template>
    <div class="container">
        <router-link :to="{name:'baogaoCheck'}" style="position: absolute;right: 5px;top: 5px;">
            <Icon type="document-text"></Icon>
            历史报告
        </router-link>
        <div v-if="account" class="text-center">
            <Avatar :src="account.headimgurl" size="large"/>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem label="报告标题" prop="name">
                <Input v-model="formValidate.name" placeholder="报告标题"></Input>
            </FormItem>
            <FormItem label="报告时间">
                <Row>
                    <Col span="8">
                        <FormItem prop="repDate">
                            <DatePicker type="date"
                                        placeholder="报告日期"
                                        v-model="formValidate.repDate">
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="9">
                        <FormItem prop="repTime">
                            <TimePicker
                                    format="HH:mm"
                                    type="time"
                                    placeholder="报告时间"
                                    v-model="formValidate.repTime"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="接警时间">
                <Row>
                    <Col span="8">
                        <FormItem prop="acceptDate">
                            <DatePicker type="date"
                                        placeholder="接警日期"
                                        v-model="formValidate.acceptDate">
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="9">
                        <FormItem prop="acceptTime">
                            <TimePicker
                                    format="HH:mm"
                                    type="time"
                                    placeholder="接警时间"
                                    v-model="formValidate.acceptTime"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="接警中队" prop="acceptObject">
                <Input v-model="formValidate.acceptObject" placeholder="接警中队"></Input>
            </FormItem>

            <FormItem label="报警电话" prop="callAddress">
                <Input v-model="formValidate.callAddress" placeholder="报警电话"></Input>
            </FormItem>
            <FormItem label="报警人" prop="callMan">
                <Input v-model="formValidate.callMan" placeholder="报警人"></Input>
            </FormItem>
            <FormItem label="火灾地点" prop="fireAddress">
                <Input v-model="formValidate.fireAddress" placeholder="火灾地点"></Input>
            </FormItem>
            <FormItem label="出警力量" prop="force">
                <Input v-model="formValidate.force" placeholder="出警力量"></Input>
            </FormItem>
            <FormItem label="燃烧物质" prop="fireObj">
                <Input v-model="formValidate.fireObj" placeholder="燃烧物质"></Input>
            </FormItem>
            <FormItem label="过火面积" prop="burnedArea">
                <Input v-model="formValidate.burnedArea" placeholder="过火面积"></Input>
            </FormItem>

            <FormItem label="到达">
                <Row>
                    <Col span="8">
                        <FormItem prop="arrivedDate">
                            <DatePicker type="date"
                                        placeholder="到达火场日期"
                                        v-model="formValidate.arrivedDate">
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="9">
                        <FormItem prop="arrivedTime">
                            <TimePicker
                                    format="HH:mm"
                                    type="time"
                                    placeholder="到达火场时间"
                                    v-model="formValidate.arrivedTime"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="归队">
                <Row>
                    <Col span="8">
                        <FormItem prop="backDate">
                            <DatePicker type="date"
                                        placeholder="归队日期"
                                        v-model="formValidate.backDate">
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="9">
                        <FormItem prop="backTime">
                            <TimePicker
                                    format="HH:mm"
                                    type="time"
                                    placeholder="归队时间"
                                    v-model="formValidate.backTime"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>

            <FormItem label="火灾损失" prop="lose">
                <Input v-model="formValidate.lose" placeholder="火灾损失"></Input>
            </FormItem>

            <FormItem label="补救措施" prop="saveMeasure">
                <Input v-model="formValidate.saveMeasure" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="补救措施"></Input>
            </FormItem>
            <FormItem label="战评" prop="evaluation">
                <Input v-model="formValidate.evaluation" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="战评"></Input>
            </FormItem>
            <FormItem label="建议" prop="advice">
                <Input v-model="formValidate.advice" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="建议"></Input>
            </FormItem>


            <FormItem>
                <Button
                        type="primary"
                        @click="handleSubmit('formValidate')">提交
                </Button>
                <Button
                        type="ghost"
                        @click="handleReset('formValidate')"
                        style="margin-left: 8px">重置
                </Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import {getAccountInfo} from "../api/wx";
    import {getNowFormatDate, yyyMMdd} from "../utils/common";
    import {addChujingReport} from "../api/service";

    let curDateTime = getNowFormatDate();

    export default {
        data() {
            return {
                account: null,
                formValidate: {
                    name: '消防大队出警报告',
                    fireAddress: '',
                    callAddress: '',
                    callMan: '',
                    force: '',
                    fireObj: '',
                    burnedArea: '',
                    lose: '',

                    acceptObject: '',
                    acceptDate: '',
                    acceptTime: '',
                    arrivedDate: '',
                    arrivedTime: '',
                    backDate: '',
                    backTime: '',
                    repDate: curDateTime[0],
                    repTime: curDateTime[1],
                    saveMeasure: '',
                    evaluation: '',
                    advice: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '报告标题不能为空', trigger: 'blur'}
                    ],
                    fireAddress: [
                        {required: true, message: '火灾地点不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '详情介绍不得少于2字', trigger: 'blur'}
                    ],
                    callAddress: [
                        {required: true, message: '报警电话不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '报警电话不得少于2字', trigger: 'blur'}
                    ],
                    callMan: [
                        {required: true, message: '报警人姓名不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '报警人姓名不得少于2字', trigger: 'blur'}
                    ],
                    force: [
                        {required: true, message: '出警力量不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '出警力量不得少于2字', trigger: 'blur'}
                    ],
                    fireObj: [
                        {required: true, message: '燃烧物质不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '燃烧物质不得少于2字', trigger: 'blur'}
                    ],
                    burnedArea: [
                        {required: true, message: '过火面积不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '过火面积不得少于2字', trigger: 'blur'}
                    ],
                    lose: [
                        {required: true, message: '火灾损失不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '火灾损失不得少于2字', trigger: 'blur'}
                    ],
                    acceptObject: [
                        {required: true, message: '接警中队不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '接警中队不得少于2字', trigger: 'blur'}
                    ],
                    acceptDate: [
                        {required: true, type: 'date', message: '请填写接警时间', trigger: 'change'}
                    ],
                    acceptTime: [
                        {required: true, type: 'string', message: '请填写接警时间', trigger: 'change'}
                    ],
                    arrivedDate: [
                        {required: true, type: 'date', message: '请填写到达时间', trigger: 'change'}
                    ],
                    arrivedTime: [
                        {required: true, type: 'string', message: '请填写到达时间', trigger: 'change'}
                    ],
                    backDate: [
                        {required: true, type: 'date', message: '请填写归队时间', trigger: 'change'}
                    ],
                    backTime: [
                        {required: true, type: 'string', message: '请填写归队时间', trigger: 'change'}
                    ],
                    repDate: [
                        {required: true, type: 'date', message: '请填写报告时间', trigger: 'change'}
                    ],
                    repTime: [
                        {required: true, type: 'string', message: '请填写报告时间', trigger: 'change'}
                    ],


                    saveMeasure: [
                        {required: true, message: '扑救措施不能为空', trigger: 'blur'},
                        {type: 'string', min: 10, message: '详情介绍不得少于20字', trigger: 'blur'}
                    ],
                    evaluation: [
                        {required: true, message: '战评不能为空', trigger: 'blur'},
                        {type: 'string', min: 10, message: '战评不得少于10字', trigger: 'blur'}
                    ],
                    advice: [
                        {required: true, message: '建议不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '建议不得少于2字', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getWxAccountInfo();
        },
        methods: {
            handleSubmit(name) {

                // console.log(yyyMMdd(this.formValidate.arrivedDate) + ' ' + this.formValidate.arrivedTime);
                // console.log(yyyMMdd(this.formValidate.backDate) + ' ' + this.formValidate.backTime);
                // console.log(yyyMMdd(this.formValidate.repDate) + ' ' + this.formValidate.repTime);

                this.$refs[name].validate((valid) => {
                    if (valid) {

                        console.log(this.formValidate);

                        let fire_address = this.formValidate.fireAddress,
                            call_address = this.formValidate.callAddress,
                            call_man = this.formValidate.callMan,
                            force = this.formValidate.force,
                            fire_obj = this.formValidate.fireObj,
                            lose = this.formValidate.lose,
                            arrived_datetime = yyyMMdd(this.formValidate.arrivedDate) + ' ' +
                                this.formValidate.arrivedTime,
                            back_datetime = yyyMMdd(this.formValidate.backDate) + ' ' +
                                this.formValidate.backTime,
                            rep_datetime = yyyMMdd(this.formValidate.repDate) + ' ' +
                                this.formValidate.repTime,
                            save_measure = this.formValidate.saveMeasure,
                            evaluation = this.formValidate.evaluation,
                            advice = this.formValidate.advice,
                            burned_area = this.formValidate.burnedArea,
                            accept_datetime = yyyMMdd(this.formValidate.acceptDate) + ' ' +
                                this.formValidate.acceptTime,
                            accept_object = this.formValidate.acceptObject
                        ;

                        addChujingReport(
                            accept_datetime,
                            accept_object,
                            fire_address,
                            call_address,
                            call_man,
                            force,
                            fire_obj,
                            lose,
                            arrived_datetime,
                            back_datetime,
                            rep_datetime,
                            save_measure,
                            evaluation,
                            advice,
                            burned_area
                        ).then(res => {
                            if (res.data.code != 0) {
                                this.$refs[name].resetFields();
                                this.$Modal.success({
                                    content: '提交成功!'
                                });
                            } else {
                                this.$Message.error(res.data.msg);
                            }
                        });

                    } else {
                        this.$Message.error('请按提示完整填写表单!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
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
                });
            }
        }
    }
</script>
