<template>
    <div class="container">
    	<div v-if="account" class="text-center">
    		<Avatar :src="account.headimgurl" size="large"  />
    	</div>
    	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem label="报告标题" prop="name">
            <Input v-model="formValidate.name" placeholder="报告标题"></Input>
        </FormItem>
        <FormItem label="地点" prop="mail">
            <Input v-model="formValidate.mail" placeholder="地点"></Input>
        </FormItem>
        <FormItem label="类型(Test)" prop="city">
            <Select v-model="formValidate.city" placeholder="类型">
                <Option value="beijing">A</Option>
                <Option value="shanghai">B</Option>
                <Option value="shenzhen">C</Option>
            </Select>
        </FormItem>
        <FormItem label="日期">
            <Row>
                <Col span="8">
                    <FormItem prop="date">
                        <DatePicker type="date" 
                        			placeholder="日期" 
                        			v-model="formValidate.date">
                        </DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="9">
                    <FormItem prop="time">
                        <TimePicker 
                        	type="time" 
                        	placeholder="时间" 
                        	v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="单选(Test)" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="A">A</Radio>
                <Radio label="B">B</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="测试" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="A"></Checkbox>
                <Checkbox label="B"></Checkbox>
                <Checkbox label="C"></Checkbox>
                <Checkbox label="D"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
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

    export default {
        data () {
            return {
                account:null,
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '报告标题不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: '详情介绍不得少于20字', trigger: 'blur' }
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
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
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
