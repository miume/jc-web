import React from 'react';
import {Table,Icon,Tooltip} from 'antd';
import SearchCell from '../../BlockQuote/search';

const data = [{
    key : 1,
    id : 1,
    name : '钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/139',
    recordNum: 23,
    realNum:23,
    recordWeig:43,
    realWeig:43
},{
    key : 2,
    id : 2,
    name : '钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/139',
    recordNum: 23,
    realNum:23,
    recordWeig:43,
    realWeig:43
},{
    key : 3,
    id : 3,
    name : '钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/139',
    recordNum: 23,
    realNum:23,
    recordWeig:43,
    realWeig:43
},{
    key : 4,
    id : 4,
    name : '钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/139',
    recordNum: 23,
    realNum:23,
    recordWeig:43,
    realWeig:43
},{
    key : 5,
    id : 5,
    name : '钴锰矿',
    model:'钴锰矿一号',
    lotNumber:'ECT/139',
    recordNum: 23,
    realNum:23,
    recordWeig:43,
    realWeig:43
},]

class Material extends React.Component{
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
            title:'批号',
            dataIndex:'lotNumber',
            width:'10%',
            align:'center'
         },{
            title:'货物名称',
            dataIndex:'name',
            width:'10%',
            align:'center'
        },{
            title:'货物型号',
            dataIndex:'model',
            width:'10%',
            align:'center'
        },{
            title:'记录数量',
            dataIndex:'recordNum',
            width:'10%',
            align:'center'
        },{
            title:'实际数量',
            dataIndex:'realNum',
            width:'10%',
            align:'center'
        },{
            title:'记录重量(kg)',
            dataIndex:'recordWeig',
            width:'10%',
            align:'center'
        },{
            title:'实际重量(kg)',
            dataIndex:'realWeig',
            width:'10%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                    return(//onConfirm是点击确认时的事件回调
                        <span>
                            <a href='#'><i className='fa fa-balance-scale'></i>&nbsp;提交差异</a>
                        </span>
                    );
                }
        }];
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
        return (
            <div style={{padding:'0 15px'}}>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入搜索内容'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                    >
                    </SearchCell>
                </span>
                <div className='clear'></div>
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
        )
    }
}

export default Material