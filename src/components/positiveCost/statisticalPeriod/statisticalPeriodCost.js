import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider} from 'antd'
import Blockquote from '../../BlockQuote/blockquote'
import StatisticalPeriodAdd from './add'
const data=[{
    id:1,
    index:1,
    cycleName:'日',
    defaultDuration:'1',
    startTime:'08:00'
},{
    id:2,
    index:2,
    cycleName:'日',
    defaultDuration:'1',
    startTime:'08:00'
}]
class StatisticalPeriodCost extends Component{
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
            title:'周期名称',
            dataIndex:'cycleName',
            key:'cycleName',
            width:'18%',
            align:'center'
        },{
            title:'默认时长(天)',
            dataIndex:'defaultDuration',
            key:'defaultDuration',
            width:'18%',
            align:'center'
        },{
            title:'开始时刻',
            dataIndex:'startTime',
            key:'startTime',
            width:'18%',
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
                        <StatisticalPeriodAdd editflag={true} record={record}/>
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
                <Blockquote menu={current.menuParent} name='统计周期' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <StatisticalPeriodAdd/>
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
export default StatisticalPeriodCost;