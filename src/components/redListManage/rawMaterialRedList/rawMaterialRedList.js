import React,{Component} from 'react';
import {Form,Table,Popconfirm,Divider} from 'antd';
import DeleteByIds from './deleteByIds';
import RawMaterialRedListAddModal from './redListAddModal';
const data=[];
for(let i=0;i<20;i++){
  data.push({
      //index:i,
      id:i+1,//序号
      lotNumber:'EcT/300',//批号
      name:'钴锰矿',//货品名称
      model:'钴锰矿一号',//货品型号
      number:'5袋',//损失数量
      weight:'10千克',//损失重量
      person:'周月',//申请人
      date:'2018年11月29日',//申请日期
      status:'已通过',//审核状态
  });
}

class RawMaterialRedList extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:data,
            selectedRowKeys:[],
        };
        this.columns=[{
          title:'序号',
          dataIndex:'id',
          key:'id',
          sorter:(a,b)=>a.id-b.id,
          align:'center',
          width:'6%'
        },{
            title:'批号',
            dataIndex:'lotNumber',
            key:'lotNumber',
            align:'center',
            width:'10%'
        },{
            title:'货品名称',
            dataIndex:'name',
            key:'name',
            align:'center',
            width:'10%'
        },{
            title:'货品型号',
            dataIndex:'model',
            key:'model',
            align:'center',
            width:'10%'
        },{
            title:'损失数量',
            dataIndex:'number',
            key:'number',
            align:'center',
            width:'10%'
        },{
            title:'损失重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'10%'
        },{
            title:'申请人',
            dataIndex:'person',
            key:'person',
            align:'center',
            width:'10%'
        },{
            title:'申请日期',
            dataIndex:'date',
            key:'date',
            align:'center',
            width:'13%'
        },{
            title:'审核状态',
            dataIndex:'status',
            key:'status',
            align:'center',
            width:'8%'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            align:'center',
            render:(text,record)=>{
               return(//onConfirm是点击确认时的事件回调
                   <span>

                        <Divider type='vertical'/>
                       <Popconfirm title='确定删除？' onConfirm={()=>this.handleDelete(record.id)} okText='确定'cancelText='取消'>
                         <a href='#'>删除</a>
                       </Popconfirm>
                      
                   </span>
               );
            }
        }];
        this.onSelectChange=this.onSelectChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }
    handleDelete(id){//处理单条记录删除
          const dataSource=this.state.dataSource;
          this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    }
    onSelectChange(selectedRowKeys){
       this.setState({selectedRowKeys:selectedRowKeys});
    }
    render(){
        const rowSelection={
         onChange:this.onSelectChange,
    };
      
        return(
            <div style={{padding:'15px'}}>
                <RawMaterialRedListAddModal />
                <DeleteByIds selectedRowKeys={this.state.selectedRowKeys}/>
                <Table
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        rowSelection={rowSelection}
                        bordered
                        size='small'
                        scroll={{y:400}}
                    >
                
                </Table>
            </div>
        );
    }
}
export default RawMaterialRedList; 