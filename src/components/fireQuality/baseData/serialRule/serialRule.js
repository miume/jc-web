import React,{Component} from 'react'
import BlockQuote from "../../../BlockQuote/blockquote";
import {Table,Spin,Switch,message} from 'antd'
import axios from "axios";
import Edit from "./edit";
class FireSerialRule extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false
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
            loading:true
        })
        axios({
            url:`${this.url.fireMageNumber}/getHead`,
            method:'get',
            headers:{
                'Authorizaion':this.url.Authorizaion
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                for(let i=0;i<res.length;i++){
                    res[i]['index']=(i+1)
                }
                this.setState({
                    dataSource:res,
                    loading:false
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
        let {loading,dataSource}=this.state
        return(
            <div>
                <BlockQuote name={'编号规则'} menu={current.menuParent} menu2={'返回'} returnDataEntry={this.back}/>
                <Spin spinning={loading} wrapperClassName={'rightDiv-content'}>
                    <Table dataSource={dataSource} rowKey={record => record.position} pagination={false} columns={this.columns} bordered size={'small'}/>
                </Spin>
            </div>
        )
    }
}
export default FireSerialRule