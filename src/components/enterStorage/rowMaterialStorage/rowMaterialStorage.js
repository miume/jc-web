//入库管理的原材料入库
import React,{Component} from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';
import { read } from 'fs';


const data=[{
    key:'1',
    id:'1',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'陈林林'
},{
    key:'2',
    id:'2',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'林下'
},{
    key:'3',
    id:'3',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'周艺轩'
},{
    key:'4',
    id:'4',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'李大新'
},{
    key:'5',
    id:'5',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'王小红'
},{
    key:'6',
    id:'6',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'陈林林'
},{
    key:'7',
    id:'7',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'林下'
},{
    key:'8',
    id:'8',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'周艺轩'
},{
    key:'9',
    id:'9',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'李大新'
},{
    key:'10',
    id:'10',
    name:'钴锰矿',
    lotNumber:'ECT/314314',
    number:'30袋',
    weight:'34kg',
    time:'2018年10月12日',
    person:'李大新'
}];
class RowMaterialStorage extends Component{
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
           title:'原材料名称',
           dataIndex:'name',
           width:'20%',
           align:'center'
        },{
           title:'批号',
           dataIndex:'lotNumber',
           width:'10%',
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
        },{
           title:'入库时间',
           dataIndex:'time',
           width:'20%',
           align:'center'
        },{
           title:'入库人',
           dataIndex:'person',
           width:'10%',
           align:'center'
        }];
        this.pagination={
            total:this.state.dataSource.length,
            showTotal:(total,range)=>`${range[0]}-${range[1]}`,
            showSizeChanger: true,
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
                ></Table>
            </div>
        );
    }
}
export default  RowMaterialStorage;