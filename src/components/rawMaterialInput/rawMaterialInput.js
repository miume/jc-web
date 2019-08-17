import React from 'react';
import BlockQuote from "../BlockQuote/blockquote";
import {message, Tabs,Table} from "antd";
import axios from "axios";
import Add from './add'


class RawMaterialInput extends React.Component{
    url
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            materialClass:1
        }

    }
    componentDidMount() {
        this.getRaw(1);
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            width: '10%',
            align:'center',
        },
        {
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            width: '20%',
            align:'center',
        },
        {
            title: '批号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: '30%',
            align:'center',
        },
        {
            title: '所属工厂',
            dataIndex: 'manufacturerName',
            key: 'manufacturerName',
            width: '20%',
            align:'center',
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            align:'center',
            render:(text,record) => {
                return(
                    <div>

                    </div>
                )
            }
        }
    ]

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <Tabs onChange={this.returnEquKey}>
                        <Tabs.TabPane key={1} tab="原材料录入">

                        </Tabs.TabPane>
                        <Tabs.TabPane key={3} tab="成品录入">

                        </Tabs.TabPane>
                    </Tabs>
                    <Add
                        url={this.url}
                        getRaw={this.getRaw}
                        materialClass={this.state.materialClass}
                    />
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        size="small"
                        bordered
                        columns={this.columns}
                        scroll={{ y: 450 }}
                    />
                </div>
            </div>
        );
    }
    returnEquKey = key => {
        this.setState({
            materialClass:key
        })
        this.getRaw(key)

    }
    getRaw = (materialClass) => {
        axios({
            url:`${this.url.serialNumber.serialNumber}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                materialClass:materialClass,
            }
        }).then((data)=>{
            message.info(data.data.message);
            var res = data.data.data
            if(res){
                for(var i = 0; i<res.length; i++){
                    res[i]['index']=i+1;
                }
                this.setState({
                    dataSource:res
                })
            }else{
                this.setState({
                    dataSource:[]
                })
            }
        }).catch(()=>{
            message.info('操作失败，请联系管理员！');
        });
    }

}

export default RawMaterialInput