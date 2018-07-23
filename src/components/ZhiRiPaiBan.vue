<template>
    <div>
        <Card v-if="luckyGuy.length">
            <p slot="title">
                <Icon type="person-add"></Icon>
                值班人员
            </p>
            <a href="#" slot="extra" @click.prevent="luckyGuy = []">
                <Icon type="ios-loop-strong"></Icon>
                清空
            </a>
            <div class="row">
                <div v-for="idx in luckyGuy" class="col-xs-4 col-sm-4 luck-list">
                    <span style="margin-right: 2px;">{{policeList[idx].name}}</span>
                    <Icon @click="removeGuy(idx)" type="close" size="5"></Icon>
                </div>
            </div>
            <div class="row" style="padding-top: 2px;">
                <button class="btn-sm btn-default btn pull-right" @click="submit">确定</button>
            </div>
        </Card>
        <Table :columns="columns" align="center" :data="policeList"></Table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
                                            this.removeGuy(params.index);

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                policeList: [
                    {
                        name: 'A',
                        dd: 18,
                    }
                ],
                luckyGuy: []
            }
        },
        created() {
            this.getPoliceList();
        },
        methods: {
            getPoliceList() {
                for (let i = 0; i < 12; i++) {
                    this.policeList.push({
                        name: 'A' + i,
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
            submit(){
                this.$Modal.success({
                    content:'提交成功'
                })
            }
        }
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