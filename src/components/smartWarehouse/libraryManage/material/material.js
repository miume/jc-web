import React from 'react';
import SearchCell from '../../../BlockQuote/search';
import axios from 'axios';
import NewButton from "./button";
import "../product/difference.css";
import {Spin} from "antd";

const forkData = [2000,1000,1000,2001,1010,1010,1000,2000,2000,2000,2000,2000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,]

class Material extends React.Component{
    ob
    server
    Authorization
    url
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
            loading: true,
        }
        this.searchContentChange=this.searchContentChange.bind(this);
        this.searchEvent=this.searchEvent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getAllData = this.getAllData.bind(this);
    }
    componentDidMount() {
        this.getAllData();
    }
    /**获取所有数据 */
  getAllData(){
    axios({
      url:`${this.url.libraryManage.stock}`,
      method:'get',
      headers:{
        'Authorization': this.url.Authorization
        },
        params: {materialClass:1},
    }).then((data)=>{
      const res = data.data.data;
      if(res){
        for(var i = 1; i<=res.length; i++){
            res[i-1]['index']=i;
            res[i-1]["realNum"]=forkData[i-1]
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
        axios({
            url:`${this.url.libraryManage.stock}`,
            method:"get",
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
                materialName:name,
                materialClass:1
            },
            type:"json",
        }).then((data)=>{
            const res = data.data.data;
            if(res){
                for(var i = 1; i<=res.length; i++){
                    res[i-1]['index']=i;
                    res[i-1]["realNum"]=forkData[i-1]
                    // res[i-1]["realWeig"]=-1
                }
                this.setState({
                    dataSource:res,
                  })
            }
        })
    }
    handleClick(){
        this.setState({
            loading:true
        })
        let parent = document.getElementById("Mparent")
        let $this = this;
        var index = 0;
        var myInterval = setInterval(() => {
            let current = this.state.dataSource[index];
            if (current !== undefined) {
                axios.post(`${this.url.libraryManage.oneKeyStock}`,
                    {},
                    {
                        params: {
                            'id': current.id,
                            'creator': this.ob.userId
                        }
                    }
                ).then((res) => {
                    let newDataSource = [...$this.state.dataSource]
                    newDataSource[index]['weight'] = res.data.data.realWeight;
                    newDataSource[index]['realWeig'] = res.data.data.realWeight;
                    $this.setState({dataSource: newDataSource})
                    var row = "Mrow"+index
                    var Frow = "Mrow"+(index-1)
                    if(index === 0){
                        let col = document.getElementsByClassName(row)
                        for(var i=0;i<col.length;i++){
                            col[i].classList.add("MnowChange")
                        }
                    }else if(index >=0){
                        let col = document.getElementsByClassName(row)
                        let Fcol = document.getElementsByClassName(Frow)
                        for(var t=0;t<col.length;t++){
                            col[t].classList.add("MnowChange")
                            Fcol[t].classList.remove("MnowChange")
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
                var row = "Mrow"+(index-1)
                let col = document.getElementsByClassName(row)
                for(var i=0;i<col.length;i++){
                    col[i].classList.remove("MnowChange")
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
        this.server = localStorage.getItem("remote");
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
                <div className="LM-tableHead" style={{width:"17.95%"}}>货品型号</div>
                {/* <div className="LM-blueTableHead LM-tableHead">记录数量</div>
                <div className="LM-blueTableHead LM-tableHead">实际数量</div> */}
                <div className="LM-blueTableHead LM-tableHead" style={{width:"18%"}}>记录重量</div>
                <div className="LM-blueTableHead LM-tableHead" style={{width:"18%"}}>实际重量</div>
                </div>
                <div className="Mparent" id="Mparent">
                    <div className="Mone Mcol">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className={"Mborder-down Mrow"+index} key={index}>
                                    {m.index}
                                </div>
                    })
                }
                    </div>
                    <div className="Mtwo Mcol">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div title={m.serialNumber} className={"Mborder-down Mrow"+index} key={index}>
                                    {/* {string} */}
                                    {m.serialNumber}
                                </div>
                    })
                }
                    </div>
                    <div className="Mthree Mcol">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className={"Mborder-down Mrow"+index} key={index}>
                                    {m.materialName}
                                </div>
                    })
                }
                    </div>
                    <div className="Mfour Mcol">
                {
                    this.state.dataSource.map((m,index)=>{
                        return <div className={"Mborder-down Mrow"+index} key={index}>
                                    原材料
                                </div>
                    })
                }
                    </div>
                    <div className="Mseven Mcol">
                        <div className='white-space space-left'></div>
                {
                    this.state.dataSource.map((m,index)=>{
                        if(m.weight !== m.realWeight){
                            return <div className={"Mborder-down Mrow"+index} key={index} style={{color:"red"}}>
                            {m.weight}
                        </div>
                        }else{ return <div className={"Mborder-down Mrow"+index} key={index}>
                        {m.weight}
                    </div>}
                    })
                }
                    </div>
                    <div className="Meight Mcol">
                {
                    this.state.dataSource.map((m,index)=>{
                        return m.realWeight>0?<div className={"Mborder-down Mrow"+index} key={index}>
                                    {m.realWeight}
                                </div>:<div style={{color:'white'}} className={"Mborder-down Mrow"+index} key={index}>
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

export default Material