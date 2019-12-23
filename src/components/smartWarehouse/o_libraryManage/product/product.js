import React from 'react';
import SearchCell from '../../../BlockQuote/search';
import axios from 'axios'
import NewButton from "./button";
import "../material/difference.css"
import {Spin} from "antd";

const forkData = [2000,2200,2130,2100,1211,1110,2001,2100,2001,1001,201010,12002,2202,2023,2000,2001,2000,1100,1100,1100,1100,2000,1200,1003,1002,1004,1005,1006,1007,1007,]

class Product extends React.Component{
    ob
    url
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
            height:[],
            loading:true
        }
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getAllData = this.getAllData.bind(this);
    }
    componentDidMount() {
        this.getAllData();
    }
    /**获取所有父菜单 */
  getAllData(){
    axios({
      url:`${this.url.libraryManage.stock}`,
      method:'get',
      headers:{
        'Authorization': this.url.Authorization
        },
        params: {materialClass:3},
    }).then((data)=>{
      const res = data.data.data;
      if(res){
        for(var i = 1; i<=res.length; i++){
            res[i-1]['index']=i;
            res[i-1]["realNum"]=forkData[i-1]
            res[i-1]["realWeig"]= -1
        }
          this.setState({
              dataSource:res,
              searchContent:'',
              loading: false
          })
      }
    })
  }
    searchContentChange(e){
        const value=e.target.value;//此处显示的是我搜索框填的内容
          this.setState({searchContent:value});
     }
    searchEvent(){
        const name=this.state.searchContent;
        // console.log(name)
        axios({
            url:`${this.url.libraryManage.stock}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                materialName:name,
                materialClass:3
            },
            type:"json",
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                for(var i = 1; i<=res.length; i++){
                    res[i-1]['index']=i;
                    res[i-1]["realNum"]=forkData[i-1]
                    // res[i-1]["realWeig"]= -1
                }
                this.setState({
                    dataSource:res
                  })
            }
        })
    }
    handleClick(){
        this.setState({
            loading:true
        })
        let parent = document.getElementById("parent")
        let $this = this;
        var index = 0;
        var myInterval = setInterval(() => {
            let current = this.state.dataSource[index];
            // console.log(current)
            if (current !== undefined) {
                axios.post(`${this.url.libraryManage.oneKeyStock}`,
                    {},
                    {
                        params: {
                            'id': current.id,
                            // 'materialName': current.materialName,
                            // 'weight': current.realWeig,
                            'creator': this.ob.userId
                        }
                    }
                ).then((res) => {
                    // console.log(res)
                    let newDataSource = [...$this.state.dataSource]
                    // newDataSource[index]['quantity'] = res.data.data.realQuantity;
                    newDataSource[index]['weight'] = res.data.data.realWeight;
                    newDataSource[index]['realWeig'] = res.data.data.realWeight;
                    $this.setState({dataSource: newDataSource})
                    var row = "row"+index
                    var Frow = "row"+(index-1)
                    if(index === 0){
                        let col = document.getElementsByClassName(row)
                        for(var i=0;i<col.length;i++){
                            col[i].classList.add("nowChange")
                        }
                    }else if(index >=0){
                        let col = document.getElementsByClassName(row)
                        let Fcol = document.getElementsByClassName(Frow)
                        for(var t=0;t<col.length;t++){
                            col[t].classList.add("nowChange")
                            Fcol[t].classList.remove("nowChange")
                        }
                    }
                    setTimeout(()=>{
                        parent.scrollTop = 37.8*index;
                    },500)
                    index++;
                });
            }
            if (index === this.state.dataSource.length) {
                parent.scrollTop = 0
                var row = "row"+(index-1)
                let col = document.getElementsByClassName(row)
                for(var i=0;i<col.length;i++){
                    col[i].classList.remove("nowChange")
                }
                this.setState({
                    loading:false
                })
                clearInterval(myInterval);
            }
        }, 1000);
    }
    render(){
        this.ob = JSON.parse(localStorage.getItem('menuList'))
        this.url = JSON.parse(localStorage.getItem('url'));
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return (
            <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                {this.props.check?<NewButton handleClick={this.handleClick} style={{float:'left'}} name="一键盘库" className="fa fa-balance-scale" loading={this.state.loading}/>:null}
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell name='请输入货品名称'
                        searchContentChange={this.searchContentChange}
                        searchEvent={this.searchEvent}
                        fetch={this.getAllData}
                        type={this.props.type}
                        flag={this.props.flag}
                    >
                    </SearchCell>
                </span>
                <div className='clear'></div>
                <div className='LM-tableHeadContainer' style={{verticalAlign:"baseline"}}>
                <div className="LM-tableHead" style={{width:"10%"}}>序号</div>
                <div className="LM-tableHead" style={{width:"18%"}}>批次号</div>
                <div className="LM-tableHead" style={{width:"18%"}}>货品名称</div>
                <div className="LM-tableHead" style={{width:"18%"}}>货品型号</div>
                {/* <div className="LM-blueTableHead LM-tableHead" style={{width:"18%"}}>记录数量</div>
                <div className="LM-blueTableHead LM-tableHead" style={{width:"18%"}}>实际数量</div> */}
                <div className="LM-blueTableHead LM-tableHead" style={{width:"18%"}}>记录重量</div>
                <div className="LM-blueTableHead LM-tableHead" style={{width:"18%"}}>实际重量</div>
                </div>
                <div className="LM-parent" id="parent">
                    <div className="one col">

                {
                    this.state.dataSource.map((m ,index)=>{
                        return <div className={"border-down row"+index} key={index}>
                                    {m.index}
                                </div>
                    })
                }
                    </div>
                    <div className="two col">

                {
                    this.state.dataSource.map((m,index)=>{
                        return <div title={m.serialNumber} className={"border-down row"+index} key={index}>
                                    {m.serialNumber}
                                </div>
                    })
                }
                    </div>
                    <div className="three col">

                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className={"border-down row"+index} key={index}>
                                    {m.materialName}
                                </div>
                    })
                }
                    </div>
                    <div className="four col">

                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className={"border-down row"+index} key={index}>
                                    成品
                                </div>
                    })
                }
                    </div>
                    <div className="seven col">
                {
                    this.state.dataSource.map((m,index)=>{
                        if(m.weight !== m.realWeight){
                            return <div className={"border-down row"+index} style={{color:"red"}} key={index}>
                            {m.weight}
                        </div>
                        }else{ return <div className={"border-down row"+index} key={index}>
                        {m.weight}
                    </div>}

                    })
                }
                    </div>
                    <div className="eight col">

                {
                    this.state.dataSource.map((m,index)=>{
                        return m.realWeight>0?<div className={"border-down row"+index} key={index}>
                                    {m.realWeight}
                                </div>:<div style={{color:'white'}} className={"border-down row"+index} key={index}>
                                    {m.realWeight}
                                </div>
                    })
                }
                    </div>
                </div>
            </Spin>
        )
    }
}

export default Product