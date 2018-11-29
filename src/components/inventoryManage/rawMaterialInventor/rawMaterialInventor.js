//入库管理的原材料入库
import React,{Component} from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';



const data=[{
    key:'1',
    id:'1',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
  
},{
    key:'2',
    id:'2',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
   
},{
    key:'3',
    id:'3',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
   
},{
    key:'4',
    id:'4',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
   
},{
    key:'5',
    id:'5',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
  
},{
    key:'6',
    id:'6',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
   
},{
    key:'7',
    id:'7',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
   
},{
    key:'8',
    id:'8',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
  
},{
    key:'9',
    id:'9',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    
},{
    key:'10',
    id:'10',
    name:'钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    
}];
class RowMaterialInventor extends Component{
    constructor(props){
         super(props);
         this.state={
             searchContent:'',
             dataSource:data,
         }
         
         this.columns=[{
            title:'序号',
            dataIndex:'id',
            width:'10%',
            align:'center'
        },{
           title:'货物名称',
           dataIndex:'name',
           width:'18%',
           align:'center'
        },{
            title:'货物型号',
            dataIndex:'model',
            width:'18%',
            align:'center'
        },{
           title:'批号',
           dataIndex:'lotNumber',
           width:'20%',
           align:'center'
        },{
           title:'数量',
           dataIndex:'number',
           width:'10%',
           align:'center'
        },{
           title:'重量',
           dataIndex:'weight',
           width:'10%',
           align:'center'
        },];
        this.pagination={
            total:this.state.dataSource.length,
            showTotal:(total)=>`共${total}条记录`,//显示共几条记录
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {//current是当前页数，pageSize是每页条数
                //console.log('Current: ', current, '; PageSize: ', pageSize);
              },
              onChange(current) {//跳转，页码改变
                //console.log('Current: ', current);
              }
        }
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
    }
    
    searchContentChange(e){
       const  value=e.target.value;//此处显示的是我搜索框填的内容
         this.setState({searchContent:value});
    }
    searchEvent(){
      const name=this.state.searchContent;
     //console.log(name);//此处显示的是我搜索框填的内容
    }
    render(){
       
        return(
            <div>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入搜索内容'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                    >
                    </SearchCell>
                </span>
                <div className='clear'  ></div>
                <Table
                rowKey={record=>record.id}
                columns={this.columns}
                dataSource={data}
                pagination={this.pagination}
                bordered
                size='small'
                scroll={{y:600}}
                ></Table>
            </div>
        );
    }
}
export default  RowMaterialInventor;