import React from 'react';
import SearchCell from '../../BlockQuote/search';
import axios from 'axios'
import NewButton from "../../BlockQuote/newButton";

const forkData = [2000,2000,2000,2000,2000,2000,2000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,]
const userId = localStorage.getItem('menuList')
let ob = JSON.parse(userId)

class Product extends React.Component{
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
        axios({
            url:`${this.server}/jc/common/RepoStock/pages`,
            method:"get",
            headers:{
                'Authorization':this.Authorization
            },
            params:{
                materialName:name,
                materialClass:3
            },
            type:"json",
        }).then((data)=>{
            const res = data.data.data.list;
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
    handleClick(){
        this.state.dataSource.map((m)=>{
            console.log(m.id)
            axios({
                url:`${this.server}/jc/common/RepoStock/oneKeyStock`,
                method:'post',
                params:{
                    id:parseInt(m.id),
                    quantity:m.realNum,
                    weight:m.realWeig,
                    creator:parseInt(ob.userId)
                },
            }).then((data)=>{
                this.getAllData()
            })
        })
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
                        fetch={this.getAllData}
                    >
                    </SearchCell>
                </span>
                <div className='clear'></div>
                <div className="parent">
                    <div className="one">
                        <div className="border-down">序号</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="border-down">
                                    {m.index}
                                </div>    
                    })
                }
                    </div>
                    <div className="two">
                        <div className="border-down">批号</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="border-down">
                                    {m.serialNumber}
                                </div>    
                    })
                }
                    </div>
                    <div className="three">
                        <div className="border-down">货品名称</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="border-down">
                                    {m.materialName}
                                </div>    
                    })
                }
                    </div>
                    <div className="four">
                        <div className="border-down">货品型号</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="border-down">
                                    成品
                                </div>    
                    })
                }
                    </div>
                    <div className="five">

                            <div className="head-shadow">
                                <div className="border-down3">记录数量<div className="fa fa-balance-scale"></div></div>
                            </div>


                {
                    this.state.dataSource.map((m)=>{
                        if(m.quantity !== m.realNum){
                            return <div className="border-down" style={{color:"red"}}>
                        {m.quantity}  </div>    
                        }else{
                            return <div className="border-down">
                            {m.quantity}  </div>  
                        }
                    })
                }
                    </div>
                    <div className="six">
                        <div className="border-down1">实际数量</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="border-down">
                                    {m.realNum}
                                </div>    
                    })
                }
                    </div>
                    <div className="seven">
                        <div className="border-down2">记录重量</div>
                        <div className='white-space space-left'></div>
                {
                    this.state.dataSource.map((m)=>{
                        if(m.weight !== m.realWeig){
                            return <div className="border-down" style={{color:"red"}}>
                            {m.weight}
                        </div>
                        }else{ return <div className="border-down">
                        {m.weight}
                    </div>}
                       
                    })
                }
                    </div>
                    <div className="eight">
                        <div className="border-down4">实际重量</div>
                {
                    this.state.dataSource.map((m)=>{
                        return <div className="border-down">
                                    {m.realWeig}
                                </div>    
                    })
                }
                    </div>
                </div>
            </div>
        )
    }
}

export default Product