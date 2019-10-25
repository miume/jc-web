import React,{Component} from 'react'
import {Spin,Table,Popconfirm,Divider} from 'antd'
import Blockquote from '../../BlockQuote/blockquote'
import  PLCAddressAdd from './add'
const data=[{
    id:1,
    index:1,
    plcAddressName:'plc地址',
    addressDescription:'1#料仓数量',  
},{
    id:2,
    index:2,
    plcAddressName:'plc地址',
    addressDescription:'1#料仓数量',
}]
class PLCAddress extends Component{
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
            title:'PLC地址',
            dataIndex:'plcAddressName',
            key:'cycleName',
            width:'18%',
            align:'center'
        },{
            title:'地址说明',
            dataIndex:'addressDescription',
            key:'addressDescription',
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
                        < PLCAddressAdd editflag={true} record={record}/>
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
                <Blockquote menu={current.menuParent} name='PLC地址表' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    < PLCAddressAdd/>
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
export default PLCAddress;