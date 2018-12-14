import React from 'react';
import {Table} from 'antd';
import SearchCell from '../../BlockQuote/search';
import Difference from "../product/difference"
import axios from "axios"
import "./table.css"

class ProductRecord extends React.Component{
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
            height:[]
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
            dataIndex:'serialNumber',
            key:"serialNumber",
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
            align:'center'
        },{
            title:'实际数量',
            dataIndex:'realNum',
            key:'realNum',
            width:'10%',
            align:'center'
        },{
            title:'记录重量(kg)',
            dataIndex:'repoStock.weight',
            key:'repoStock.weight',
            width:'10%',
            align:'center'
        },{
            title:'实际重量(kg)',
            dataIndex:'realWeig',
            key:'realWeig',
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
                            <Difference />
                        </span>
                    );
                }
        }];
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.getHeight = this.getHeight.bind(this)
    }
    componentDidMount() {
        this.getAllData();
        this.getHeight()
    }
    getHeight(){
        let height = document.getElementById("tbHeight")
        console.log(height.clientHeight)
        this.setState({
            height:height.clientHeight
        })
    }
    /**获取所有父菜单 */
  getAllData(){
    axios({
      url:`${this.server}/jc/common/RepoStock`,
      method:'get',
      headers:{
        'Authorization': this.Authorization
        },
        params: {materialClass:3},
    }).then((data)=>{
      const res = data.data.data;
      for(var i = 1; i<=res.length; i++){
        res[i-1]['index']=i;
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
    render(){
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
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
                {/* <Table
                rowKey={record=>record.repoStock.id}
                columns={this.columns}
                dataSource={this.state.dataSource}
                pagination={false}
                bordered
                size='small'
                scroll={{y:600}}
                ></Table> */}
                <table className="tableR">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>批号</td>
                            <td>货物名称</td>
                            <td>货物型号</td>
                            <td>记录数量</td>
                            <td>实际数量</td>
                            <td>记录重量</td>
                            <td>实际重量</td>
                        </tr>
                    </thead>
                    <tbody id="tbHeight">
                        {
                            this.state.dataSource.map((m)=>{
                                return (<tr key={m.index}>
                                    <td>{m.index}</td>
                                    <td>{m.serialNumber}</td>
                                    <td>{m.name}</td>
                                    <td>{m.manterialClass}</td>
                                    <td>{m.repoStock.quantity}</td>
                                    <td>{}</td>
                                    <td>{m.repoStock.weight}</td>
                                    <td>{}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <div style={{position:"absolute",top:"90px",left:"685.5px",width:"672px",height:"50px",backgroundColor:"#0079FE"}}>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"55px"}}>记录数量</div>
                    <div style={{position:"absolute",color:"white",top:"20px",left:"157px"}} className="fa fa-balance-scale"></div>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"215px"}}>实际数量</div>
                    <div style={{position:"absolute",backgroundColor:"#FFFFFF",height:"30px",width:"3px",top:"16px",left:"333px"}}></div>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"390px"}}>记录重量</div>
                    <div style={{position:"absolute",color:"white",top:"20px",left:"495px"}} className="fa fa-balance-scale"></div>
                    <div style={{position:"absolute",color:"white",top:"18px",left:"550px"}}>实际重量</div>
                </div>
                <div style={{position:"absolute",top:"140px",left:"685.5px",width:"672px",height:this.state.height,border:"2px solid #0079FE"}}></div>
            </div>
        )
    }
}

export default ProductRecord