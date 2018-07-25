<template>
    <div class="container">
    	<div v-if="account" class="text-center">
    		<Avatar :src="account.headimgurl" size="large"  />
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
        <FormItem label="报警地点" prop="callAddress">
            <Input v-model="formValidate.callAddress" placeholder="报警地点"></Input>
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
            <Input v-model="formValidate.saveMeasure" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="补救措施"></Input>
        </FormItem>
        <FormItem label="战评" prop="evaluation">
            <Input v-model="formValidate.evaluation" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="战评"></Input>
        </FormItem>
        <FormItem label="建议" prop="advice">
            <Input v-model="formValidate.advice" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="建议"></Input>
        </FormItem>


        <FormItem>
            <Button 
            type="primary" 
            @click="handleSubmit('formValidate')">提交</Button>
            <Button 
            type="ghost" 
            @click="handleReset('formValidate')" 
            style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
	import {getAccountInfo} from "../api/wx";
	import {getNowFormatDate} from "../utils/common";

    let curDateTime = getNowFormatDate();

    export default {
        data () {
            return {
                account:null,
                formValidate: {
                    name: '消防大队出警报告',
                    fireAddress: '',
                    callAddress:'',
                    callMan:'',
                    force:'',
                    fireObj:'',
                    burnedArea:'',
                    lose:'',

                    arrivedDate: '',
                    arrivedTime: '',
                    backDate:'',
                    backTime:'',
                    repDate:curDateTime[0],
                    repTime:curDateTime[1],
                    saveMeasure:'',
                    evaluation:'',
                    advice:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '报告标题不能为空', trigger: 'blur' }
                    ],
                    fireAddress: [
                        { required: true, message: '火灾地点不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '详情介绍不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    callAddress: [
                        { required: true, message: '报警地点不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '报警地点不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    callMan: [
                        { required: true, message: '报警人姓名不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '报警人姓名不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    force: [
                        { required: true, message: '出警力量不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '出警力量不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    fireObj: [
                        { required: true, message: '燃烧物质不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '燃烧物质不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    burnedArea: [
                        { required: true, message: '过火面积不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '过火面积不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    lose: [
                        { required: true, message: '火灾损失不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '火灾损失不得少于2字', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],


                    arrivedDate: [
                        { required: true, type: 'date', message: '请填写到达时间', trigger: 'change' }
                    ],
                    arrivedTime: [
                        { required: true, type: 'string', message: '请填写到达时间', trigger: 'change' }
                    ],
                    backDate: [
                        { required: true, type: 'date', message: '请填写归队时间', trigger: 'change' }
                    ],
                    backTime: [
                        { required: true, type: 'string', message: '请填写归队时间', trigger: 'change' }
                    ],
                    repDate: [
                        { required: true, type: 'date', message: '请填写报告时间', trigger: 'change' }
                    ],
                    repTime: [
                        { required: true, type: 'string', message: '请填写报告时间', trigger: 'change' }
                    ],



                    saveMeasure: [
                        { required: true, message: '扑救措施不能为空', trigger: 'blur' },
                        { type: 'string', min: 10, message: '详情介绍不得少于20字', trigger: 'blur' }
                    ],
                    evaluation: [
                        { required: true, message: '战评不能为空', trigger: 'blur' },
                        { type: 'string', min: 10, message: '战评不得少于10字', trigger: 'blur' }
                    ],
                    advice: [
                        { required: true, message: '建议不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '建议不得少于2字', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
        	this.getWxAccountInfo();
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        console.log(this.formValidate);
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('请按提示完整填写表单!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getWxAccountInfo() {
                getAccountInfo().then(res => {
                    console.log(res);
                    res = {
                        nickname: '山姆渔',
                        headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLEFYUUkTeIXBHXPUibMDMCVDDorQefrHDT2epDiaG1HlnQ8r2Ad3vo53aoTVpu7xt5AibIfDslh9Hbg/132'
                    };
                    this.account = res;
                });
            }
        }
    }
</script>
