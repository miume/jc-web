import React,{Component} from 'react'
import Blockquote from '../../../BlockQuote/blockquote'
import MaterialTypeAdd from './add'
import {Spin,Table,Popconfirm,Divider} from 'antd'
import DeleteByIds from '../../../BlockQuote/deleteByIds'
import SearchCell from '../../../BlockQuote/search'
const data=[{
    id:1,
    index:1,
    materialTypeName:'1#犁刀混',
    ownProcess:'在线原料',
    dataType:'PLC读取',
    productline:'F#生产线，G#生产线'
},{
    id:2,
    index:2,
    materialTypeName:'1#犁刀混',
    ownProcess:'在线原料',
    dataType:'PLC读取',
    productline:'F#生产线，G#生产线'
}]
class MaterialTypePositive extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataSource:data,
            selectedRowKeys:[]
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'id',
            width:'10%',
            align:'center'
        },{
            title:'物料种类名称',
            dataIndex:'materialTypeName',
            key:'materialTypeName',
            width:'15%',
            align:'center'
        },{
            title:'所属工序',
            dataIndex:'ownProcess',
            key:'ownProcess',
            width:'15%',
            align:'center'
        },{
            title:'数据类型',
            dataIndex:'dataType',
            key:'dataType',
            width:'15%',
            align:'center'
        },{
            title:'产线',
            dataIndex:'productline',
            key:'productline',
            width:'15%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'15%',
            align:'center',
            render:(text,record)=>{
                return(
                    <span>
                        <MaterialTypeAdd editflag={true} record={record}/>
                        <Divider type='vertical'></Divider>
                        <Popconfirm title='确定删除?' okText='确定' cancelText='取消'>
                            <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                );
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
        this.judgeOperation=this.judgeOperation.bind(this);
    }
    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    onSelectChange(selectedRowKeys){//监听复选框是否被选中
        this.setState({
            selectedRowKeys:selectedRowKeys
        })
    }
    /*用来判断改用户有哪些操作权限*/
    judgeOperation(operation,operationCode){
        var flag=operation?operation.filter(e=>e.operationCode===operationCode):[];
        return flag.length>0?true:false
     }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));
        this.operation=JSON.parse(localStorage.getItem('menus'))?JSON.parse(localStorage.getItem('menus')).filter(e=>e.path===current.path)[0].operations:null 
        const {selectedRowKeys}=this.state;
        const rowSelection={
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        return(
            <div>
                <Blockquote menu={current.menuParent} name='物料种类' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <MaterialTypeAdd/>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} flag={true}/>
                    <SearchCell name='请输入物料种类' flag={true}/>
                    <Table
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource}
                    size='small'
                    columns={this.columns}
                    rowSelection={rowSelection}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default MaterialTypePositive;