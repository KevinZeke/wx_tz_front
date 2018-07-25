<template>
    <div>
        <Card v-if="true">
            <p slot="title">
                <Icon type="person-add"></Icon>
                今日值班人员
            </p>
            <a href="#" slot="extra" @click.prevent="canModify = !canModify">
                <Icon type="wrench"></Icon>
                {{canModify?'取消修改':'修改'}}
            </a>
            <div class="row" v-if="luckyGuy.length">
                <div v-for="idx in luckyGuy" class="text-center luck-list" style="display:inline-block;padding-left:8px">
                    <!-- <span style="margin-right: 2px;">{{policeList[idx].name}}</span>
                    <Icon v-if="canModify" @click="removeGuy(idx)" type="close" size="10">
                    </Icon> -->
                    <Tag type="dot" 
                        @on-close="removeGuy(idx)"
                        :closable="canModify" color="blue">{{policeList[idx].name}}</Tag>
                </div>
            </div>
            <div v-if="luckyGuy.length" class="row" style="padding-top: 2px;margin-top:5px;">
                
                <button class="btn-sm btn-default btn btn-success pull-right" @click="submit">确定</button>
                <router-link 
                class="btn-sm btn-default btn pull-right" 
                style="margin-right:10px;"
                :to="{name:'zhiriDetail'}">查看历史</router-link>

            </div>
            <div v-else>
                <p>暂无人员</p>
            </div>
        </Card>
        <Table :columns="columns" align="center" :data="policeList"></Table>
    </div>
</template>
<script>
    import {getDutyListToday, signOnduty} from "../api/service";

    export default {
        data() {
            return {
                canModify: false,
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        sortable: true,
                    },
                    {
                        title: '所属',
                        key: 'dd',
                        sortable: true,
                    },
                    {
                        title: '添加',
                        key: 'add',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.success('添加成功');
                                            this.addGuy(params.index)
                                        }
                                    }
                                }, '添加'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {

                                            this.$Message.success('移除成功');
                                            this.removeGuy(params.index);

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                policeList: [
                    
                ],
                luckyGuy: []
            }
        },
        created() {
            this.getPoliceList();
            this.getDutyListToday();
        },
        methods: {
            getDutyListToday() {
                return getDutyListToday().then(res => {
                    // this.luckyGuy = res.data.data;
                    console.log(res);
                    res.data.data.forEach(lucky => {
                        this.policeList.forEach((item, idx) => {
                            //console.log(item.name ,lucky.name,item.name==lucky.name)
                            if (item.name == lucky.name) this.addGuy(idx);
                        })
                    })

                })
            },

            getPoliceList() {
                let names = getRandomName();
                for (let i = 0; i < names.length; i++) {
                    this.policeList.push({
                        name: names[i],
                        dd: 'test',
                    });
                }
            },
            addGuy(idx) {
                // if(this.luckyGuy.indexOf(idx))
                let index = this.luckyGuy.indexOf(idx);
                if (index == -1)
                    this.luckyGuy.push(idx);

            },
            removeGuy(idx) {
                let index = this.luckyGuy.indexOf(idx);
                if (index != -1)

                    this.luckyGuy.splice(index, 1);
            },
            submit() {
                this.$Modal.success({
                    content: '提交成功'
                });
                this.canModify = false;

                let q = [];
                this.luckyGuy.forEach((i) => {
                    q.push(this.policeList[i].name);
                })
                signOnduty(q, this.luckyGuy);

            }
        }
    }


function getRandomName(){

return [
'汤乐', '马淼', '顾国栋', '傅夫子', '滕瑞堂', '滕甜', '齐敏', '安尚', '柳国贤', '金贺祥', '费晨涛',
'孟轩', '倪轩', '傅益辰', '傅方', '益冉', '瑾春', '滕瑾昆', '春齐', '杨郝', '郝文'
];
    
}

</script>
<style>
    .ivu-table .demo-table-info-row td {
        background-color: #2db7f5;
        color: #fff;
    }

    .ivu-table .demo-table-error-row td {
        background-color: #ff6600;
        color: #fff;
    }

    .ivu-table td.demo-table-info-column {
        background-color: #2db7f5;
        color: #fff;
    }

    .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }

    .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }

    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>