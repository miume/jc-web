import React,{Component} from 'react'
import {Spin,Table,Divider,Popconfirm} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import NewButton from '../../../BlockQuote/newButton'
import ProductLineAdd from './add'
const data=[{
    id:1,
    index:1,
    productLineName:'F#生产线'
}]
class ProductLinePositiveCost extends Component{
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
            title:'产线名称',
            dataIndex:'productLineName',
            key:'productLineName',
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
                        <ProductLineAdd record={record} editflag={true}/>
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
                <Blockquote menu={current.menuParent} name='生产线' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <ProductLineAdd />
                    <Table
                    rowKey={record=>record.id}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>

                
            </div>
        );
    }
}
export default ProductLinePositiveCost;