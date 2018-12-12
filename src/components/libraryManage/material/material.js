import React from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';
import Difference from './difference'
import axios from 'axios'
import NewButton from "../../BlockQuote/newButton";

const forkData = [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,]

class Material extends React.Component{
    server
    Authorization
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return ;
        }
      }
    constructor(props){
        super(props);
        this.state={
            searchContent:'',
            dataSource:[],
        }

        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:"repoStock.id",
            sorter: (a, b) => a.repoStock.id - b.repoStock.id,
            width:'10%',
            align:'center'
        },{
            title:'批号',
            dataIndex:'repoBaseSerialNumber.serialNumber',
            key:"repoBaseSerialNumber.serialNumber",
            width:'10%',
            align:'center'
         },{
            title:'货物名称',
            dataIndex:'name',
            width:'10%',
            align:'center'
        },{
            title:'货物型号',
            dataIndex:'manterialClass',
            key:'manterialClass',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                switch(record.manterialClass){
                    case 1:return "原材料";
                    case 2:return "中间品";
                    case 3:return '产品';
                }
            }
        },{
            title:'记录数量',
            dataIndex:'repoStock.quantity',
            key:'repoStock.quantity',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                if(record.repoStock.quantity !== record.realNum){
                    return (<div style={{color:"red"}}>{record.repoStock.quantity}</div>)
                }else{
                    return (<div style={{color:"blue"}}>{record.repoStock.quantity}</div>)
                }
            }
        },{
            title:'实际数量',
            dataIndex:'realNum',
            key:'realNum',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                return (<div style={{color:"blue"}}>{record.realNum}</div>)
            }
        },{
            title:'记录重量(kg)',
            dataIndex:'repoStock.weight',
            key:'repoStock.weight',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                if(record.repoStock.weight !== record.realWeig){
                    return(<div style={{color:"red"}}>{record.repoStock.weight}</div>)
                }else{
                    return (<div style={{color:"blue"}}>{record.repoStock.weight}</div>)
                }
            }
        },{
            title:'实际重量(kg)',
            dataIndex:'realWeig',
            key:'realWeig',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                return (<div style={{color:"blue"}}>{record.realWeig}</div>)
            }
        },{
            title:'操作',
            dataIndex:'operation',
            width:'10%',
            align:'center',
            render:(text,record)=>{
                    return(//onConfirm是点击确认时的事件回调
                        <span>
                            <Difference />
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
    componentDidMount() {
        this.getAllData();
    }
    /**获取所有父菜单 */
  getAllData(){
    axios({
      url:`${this.server}/jc/common/RepoStock`,
      method:'get',
      headers:{
        'Authorization': this.Authorization
        },
        params: {materialType:1},
    }).then((data)=>{
      const res = data.data.data;
      for(var i = 1; i<=res.length; i++){
        res[i-1]['index']=i;
        res[i-1]["realNum"]=forkData[i-1]
        res[i-1]["realWeig"]=forkData[i-1]
    }
      this.setState({
        dataSource:res
      })
    })
  }
    searchContentChange(e){
        const  value=e.target.value;//此处显示的是我搜索框填的内容
          this.setState({searchContent:value});
     }
    searchEvent(){
        const name=this.state.searchContent;
       //console.log(name);//此处显示的是我搜索框填的内容
    }
    handleClick(){
        console.log(111)
    }
    render(){
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return (
            <div style={{padding:'0 15px'}}>
                <NewButton handleClick={this.handleClick} style={{float:'left'}} name="一键盘库" className="fa fa-balance-scale"/>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入搜索内容'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                    >
                    </SearchCell>
                </span>
                <div className='clear'></div>
                <Table
                rowKey={record=>record.repoStock.id}
                columns={this.columns}
                dataSource={this.state.dataSource}
                pagination={false}
                bordered
                size='small'
                scroll={{y:600}}
                ></Table>
                {/* <div style={{position:"absolute",top:"108.4px",left:"670px",color:"white"}}>记录数量</div> */}
                {/* <div style={{position:"absolute",}}>实际数量</div>
                <div style={{position:"absolute",}}>记录重量</div>
                <div style={{position:"absolute",}}>实际重量</div> */}
                <div style={{position:"absolute",top:"90px",left:"619px",width:"602px",height:"50px",backgroundColor:"#0079FE"}}>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"40px"}}>记录数量</div>
                    <div style={{position:"absolute",color:"white",top:"20px",left:"142px"}} className="fa fa-balance-scale"></div>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"200px"}}>实际数量</div>
                    <div style={{position:"absolute",backgroundColor:"#FFFFFF",height:"30px",width:"3px",top:"16px",left:"300px"}}></div>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"340px"}}>记录重量</div>
                    <div style={{position:"absolute",color:"white",top:"20px",left:"445px"}} className="fa fa-balance-scale"></div>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"500px"}}>实际重量</div>
                </div>
                <div style={{position:"absolute",top:"140px",left:"619px",width:"602px",height:"382.2px",border:"2px solid #0079FE"}}></div>
            </div>
        )
    }
}

export default Material