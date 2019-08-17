import React from "react";
import Blockquote from "../BlockQuote/blockquote";
import axios from "axios";
import { Table,Popconfirm,Divider,message,Switch,Icon } from 'antd';
import Edit from "./edit";

class BatchRule extends React.Component{
    url
    constructor(props){
        super(props)
        this.state = {
            dataSource:[],
            year:"",
            productType:"",
            month:"",
            serialNum:"",
            productModel:"",
            productLine:"",
            materialType:"",
            process:"",
            slot:"",
            slotNumber:""
        }
        this.columns=[{
            title: '序号',
            dataIndex: 'index',
            key: 'code',
            align:'center',
            width: '6%',
        },{
            title: '批次字段',
            dataIndex: 'ruleName',
            key: 'ruleName',
            align:'center',
            width: '6%',
        },{
            title: '批次代码',
            dataIndex: 'defaultValue',
            key: 'defaultValue',
            align:'center',
            width: '6%',
        },{
            title: '是否启用',
            dataIndex: 'index',
            key: 'index',
            align:'center',
            width: '6%',
            render:(text,record)=>{
                // console.log(record)
                return(
                    <Switch checked={record.ruleFlag} onChange={this.switchChange.bind(this,record)} checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}/>
                )
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width: '6%',
            render:(text,record)=>{
                return(
                    <span>
                        <Edit getTableData={this.getTableData} code={record.code}/>
                    </span>
                )
            }
        }]
    }
    componentDidMount() {
        this.getTableData();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }
    switchChange = (info,e)=>{
        // console.log(e,info)
        axios({
            url:`${this.url.productionBatchRule.updateState}`,
            method:"put",
            headers:{
                'Authorization': this.Authorization
            },
            params:{
                code:info.code,
                flag:e
            }
        }).then((data)=>{
            this.getTableData();
        })
    }
    getTableData = ()=>{
        axios({
            url: `${this.url.productionBatchRule.getAll}`,
            method: 'get',
            headers:{
                'Authorization': this.Authorization
            },
            // params: params,
            // type: 'json',
        }).then((data)=>{
            var res = data.data.data;
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
            // console.log(res);
            this.setState({
                dataSource:res,
                year:res[0].defaultValue,
                productType:res[1].defaultValue,
                month:res[2].defaultValue,
                serialNum:res[3].defaultValue,
                productModel:res[4].defaultValue,
                productLine:res[5].defaultValue,
                materialType:res[6].defaultValue,
                process:res[7].defaultValue,
                slot:res[8].defaultValue,
                slotNumber:res[9].defaultValue
            })
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        this.operation = JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null;
        return (
            <div>
                <Blockquote menu={current.menuParent} name="批次规则" />
                <div style={{padding: '15px'}}>
                    <strong>代码示例：</strong><strong>{this.state.year}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.productType}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.month}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.serialNum}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.productModel}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.productLine}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.materialType}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.process}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.slot}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.slotNumber}</strong>
                    <Table columns={this.columns} dataSource={this.state.dataSource} scroll={{ y: 400 }} rowKey={record => record.code} size="small" bordered/>
                </div>
            </div>
        )
    }
}

export default BatchRule