import React from "react";
import Blockquote from "../../BlockQuote/blockquote";
import axios from "axios";
import { Table,Switch,Icon,Spin } from 'antd';
import Edit from "./edit";
import {getSecondsOperations, judgeOperation} from "../../commom/getOperations";
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
            slotNumber:"",
            loading:true,
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
                let {updateFlag} = this.state;
                return(
                    <span>
                        <Edit getTableData={this.getTableData} updateFlag={updateFlag} code={record.code}/>
                    </span>
                )
            }
        }]
    }
    componentDidMount() {
        this.getTableData();
        let {menuId} = this.current, operations = getSecondsOperations(menuId);
        this.setState({
            updateFlag: judgeOperation(operations,'UPDATE'),
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
    }
    switchChange = (info,e)=>{
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
        }).then((data)=>{
            var res = data.data.data;
            for(var i = 1; i<=res.length; i++){
                res[i-1]['index']=i;
            }
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
                slotNumber:res[9].defaultValue,
                loading:false
            })
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current')) ;
        return (
            <div>
                <Blockquote menu={this.current.menuParent} name="批次规则" />
                <Spin spinning={this.state.loading}  wrapperClassName='rightDiv-content'>
                    <strong>代码示例：</strong><strong>{this.state.year}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.productType}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.month}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.serialNum}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.productModel}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.productLine}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.materialType}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.process}</strong>&nbsp;&nbsp;&nbsp;
                    <strong>{this.state.slot}&nbsp;&nbsp;&nbsp;</strong><strong style={{color:"red"}}>{this.state.slotNumber}</strong>
                    <Table pagination={{hideOnSinglePage:true}} columns={this.columns} dataSource={this.state.dataSource} scroll={{ y: 400 }} rowKey={record => record.code} size="small" bordered/>
                </Spin>
            </div>
        )
    }
}

export default BatchRule
