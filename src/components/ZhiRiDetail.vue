<template>
	<div>
		
		<Card v-if="true">
            <p slot="title">
                <Icon type="person-add"></Icon>
                值班人员
            </p>
            <router-link :to="{name:'zhiri'}" slot="extra" @click.prevent>
                <Icon type="ios-arrow-back"></Icon>
                返回值日设置
            </router-link>
            <div class="row">
				<date-picker @timeChange="timeOnChange"></date-picker>
			</div>
            <div class="row" v-if="luckyGuy.length">
                <div v-for="item in luckyGuy" class="text-center luck-list" style="display:inline-block;padding-left:8px">
                	<hr>
            		<h5><strong>{{item.date}}</strong></h5>
                    <!-- <span style="margin-right: 2px;">{{policeList[idx].name}}</span>
                    <Icon v-if="canModify" @click="removeGuy(idx)" type="close" size="10">
                    </Icon> -->
                    <Tag type="dot" 
                    	v-for="(guy,idx) in item.list"
                        :key="idx"
                        :closable="false" color="blue">{{guy}}</Tag>
                </div>
            </div>
            <div v-else class="text-center">
                <hr>
                <p>暂无信息</p>
            </div>
        </Card>
	</div>
</template>
<script>
	import datePicker from './base/dateSwitchPicker';
 
	export default {
		data(){
			return {
				luckyGuy:[
					
				]
			}
		},
		created(){
			this.getDutyList();
		},
		methods:{
			timeOnChange(val){
				console.log(val);
			},
			getDutyList(date){
				this.luckyGuy = [
					{date:'2018-07-10',list:[
						'孟轩', '倪轩', '傅益辰', '傅方', '益冉', '瑾春', '滕瑾昆', '春齐', '杨郝'
					]},
					{date:'2018-07-9',list:[
						 '益冉', '瑾春', '滕瑾昆','孟轩', '倪轩', '傅益辰', '傅方', '春齐', '杨郝'
					]},
					{date:'2018-07-9',list:[
						'益冉', '瑾春', '滕瑾昆', '春齐', '杨郝'
					]},
				]
			}
		},
		components:{datePicker}
	}
</script>
<style>
	
</style>