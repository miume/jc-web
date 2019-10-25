import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider} from 'antd'
import Blockquote from '../../BlockQuote/blockquote'
import MaterialTypePLCMeterComAdd from './add'
const data=[{
    id:1,
    index:1,
    materialTypeName:'1#犁刀混',
    ownProcess:'在线原料',
    plcAddress:'PLC地址',
    productline:'F#生产线，G#生产线'
},{
    id:2,
    index:2,
    materialTypeName:'1#犁刀混',
    ownProcess:'在线原料',
    plcAddress:'PLC地址',
    productline:'F#生产线，G#生产线'
}]
class MaterialTypePLCMeterCom extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            dataSource:data
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'id',
            width:'10%',
            align:'center'
        },{
            title:'工序',
            dataIndex:'ownProcess',
            key:'ownProcess',
            width:'15%',
            align:'center'
        },{
            title:'物料种类名称',
            dataIndex:'materialTypeName',
            key:'materialTypeName',
            width:'15%',
            align:'center'
        },{
            title:'PLC地址',
            dataIndex:'plcAddress',
            key:'plcAddress',
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
            width:'18%',
            align:'center',
            render:(text,record)=>{
                return(
                    <span>
                        <MaterialTypePLCMeterComAdd editflag={true} record={record}/>
                        <Divider type='vertical'></Divider>
                        <Popconfirm title='确定删除?' okText='确定' cancelText='取消'>
                            <span className='blue'>删除</span>
                        </Popconfirm>
                    </span>
                );
            }
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
    }
    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));
        return(
            <div>
                <Blockquote menu={current.menuParent} name='物料种类PLC仪表对照表' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <MaterialTypePLCMeterComAdd/>
                    <Table
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource}
                    size='small'
                    columns={this.columns}
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default MaterialTypePLCMeterCom;