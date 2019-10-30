import React,{Component} from 'react'
import {Spin,Table} from 'antd'
import Search from '../processStatis/processSearch'
class ProductLineStatis extends Component{//产品线统计
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'周期类型',
            dataIndex:'periodType',
            key:'periodType'
        },{
            title:'期数',
            dataIndex:'period',
            key:'period'
        },{
            title:'开始时间',
            dataIndex:'beginTime',
            key:'beginTime'
        },{
            title:'结束时间',
            dataIndex:'endTime',
            key:'endTime'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine'
        },{
            title:'Ni金属量(T)',
            dataIndex:'Nimetal',
            key:'Nimetal'
        },{
            title:'Co金属量(T)',
            dataIndex:'Cometal',
            key:'Cometal'
        },{
            title:'Mn金属量(T)',
            dataIndex:'Mnmetal',
            key:'Mnmetal'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation'
        }]
    }
    render(){
        return(
            <div>
                <Spin spinning={this.state.loading} wrapperClassName='rightContent-Div'>
                    <Search flag={true}/>
                    <Table
                    columns={this.columns}
                    size='small'
                    bordered/>
                </Spin>
            </div>
        );
    }
}
export default ProductLineStatis;