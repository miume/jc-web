import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Table,Spin,Switch,message} from 'antd'
import axios from "axios";
import Edit from "./edit";
import './rule.css'
class FireSerialRule extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            searchContent:'',
            dataCode:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index'
        },{
            title:'编号字段',
            dataIndex:'word',
            key:'word'
        },{
            title:'编号代码',
            dataIndex:'demo',
            key:'demo'
        },{
            title:'是否启用',
            dataIndex:'issEnable',
            key:'issEnable',
            render:(text,record)=>{
                return (
                    <Switch checked={record.issEnable} onChange={()=>this.switchChange(record.position)}/>
                )
            }
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            render:(text,record)=>{
                return(
                    <span>
                            <Edit getTableData={this.getTableData} record={record} url={this.url}/>
                    </span>
                )
            }
        }]

        this.back=this.back.bind(this);
        this.switchChange=this.switchChange.bind(this);
        this.getTableData=this.getTableData.bind(this);
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }
    getTableData(){
        this.setState({
            loading:true,
            dataCode:[]
        })
        axios({
            url:`${this.url.fireMageNumber}/getHead`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data,{dataCode}=this.state
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=(i+1)
                    dataCode.push(res[i].demo)
                }
                this.setState({
                    dataSource:res,
                    loading:false,
                    dataCode:dataCode
                })
            }
        })
    }

    switchChange(position){
        axios({
            url:`${this.url.fireMageNumber}/isEnable`,
            method:"put",
            headers:{
                'Authorization': this.url.Authorization
            },
            params:{
                position:position
            }
        }).then((data)=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.getTableData();
            }
            else{
                message.error('操作失败，请联系管理员!')
            }
        })
    }
    back(){
        this.props.history.push({pathname:"/fireBasicData"})
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        let {loading,dataSource,dataCode}=this.state
        return(
            <div>
                <BlockQuote name={'编号规则'} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <strong className={'fire-rule-font-code'}>代码示例：</strong>
                    {
                        dataCode?dataCode.map((item,index)=>{
                            return(
                                <span key={index} className={((index%2)!==0)?'fire-rule-font-red fire-rule-font-code':'fire-rule-font-code'}><strong>{item}</strong>&nbsp;&nbsp;&nbsp;</span>
                            )
                        }):null
                    }
                    <br/>
                    <Table dataSource={dataSource} rowKey={record => record.position} pagination={false} columns={this.columns} style={{marginTop:'10px'}} bordered size={'small'}/>
                </Spin>
            </div>
        )
    }
}
export default FireSerialRule
