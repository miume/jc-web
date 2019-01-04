import React, { Component } from 'react';
import {message} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import '../block.css';
import DataPart from '../div'

class Manufacturer extends Component{
    url;
    componentDidMount(){
      this.fetch();
    }
    constructor(props){
      super(props);
      this.state={
          data:[],
          searchContent:'',
          f:true,//用来判断是否显示新增的块,
          flag1:false,//用来判断新增框是否变为输入框
      }
      this.fetch=this.fetch.bind(this);
      this.onBlockChange=this.onBlockChange.bind(this);
      this.add=this.add.bind(this);
      this.searchContentChange=this.searchContentChange.bind(this);
      this.searchEvent=this.searchEvent.bind(this);
      this.checkRaw=this.checkRaw.bind(this);
    }
    fetch=()=>{
      axios({
         url:`${this.url.rawStandard.getFactory}`,
         method:'get',
         headers:{
             'Authorization':this.url.Authorization
         }
      }).then(data=>{
          //console.log(data);
          const res=data.data.data;
          if(res){
            this.setState({
                data:res
            });
          }
      });
    }
    onBlockChange(e){
       //console.log(e.target);
       const id=e.target.id.split('-')[0];
       const name=e.target.id.split('-')[1];
       this.props.onBlockChange(3,name,true);
    }
    add(e){//新增一个块块
        this.setState({
            flag1:true
        });
       // console.log(e.target.value);
      
        // axios({
        //    url:`${this.url.rawStandard.addFactory}`,
        //    method:'post',
        //    headers:{
        //        'Authorization':this.url.Authorization
        //    },
        //    params:{
        //       name:
        //    }
        // }).then(data=>{

        // }).catch(()=>{
        //     message.info('新增失败，请联系管理员！');
        // });
      
   }


    searchContentChange(e){
        const value=e.target.value;
        this.setState({
            searchContent:value
        });
     }
    searchEvent(){
        const name=this.state.searchContent;
        axios({
            url:`${this.url.rawStandard.getFactory}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            },
            params:{
              name:name
            },
            type:'json'
        })
        .then(data=>{
            //console.log(data);
            const res=data.data.data;
            if(res){
               this.setState({
                   data:res,
                   f:false
               });
            }
        })
        .catch(()=>{
            message.info('搜索失败，请联系管理员！');
        });
    }
  
    checkRaw(e){//点击重新选择原材料调用的函数
        this.props.onBlockChange(1,'生产厂家',false);//跳回生产厂家界面后，就不可以点击那个面板了
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        return(
          <div style={{position:'relative'}}>
              <div style={{padding:'15px'}}>
               &nbsp; <h2 style={{display:'inline-block'}}>请选择生产厂家</h2>
                <span  className='fr'>
                 <SearchCell name='请输入搜索内容'
                 searchEvent={this.searchEvent}
                 searchContentChange={this.searchContentChange}
                 />
                </span>
              </div>
              <div className='rawStanstdardParent'>
                  {
                      this.state.data.map(d=>
                    <DataPart  key={d.id} name={d.name} id={d.id} onBlockChange={this.onBlockChange}/>
                    )
                  }
                   <span className={this.state.f?'show':'hide'}><DataPart flag1={this.state.flag1}  flag={1} name='新增' onBlockChange={this.add}/></span>
              </div>
              
                  <span className='rawStandardPosition' onClick={this.checkRaw}>重新选择原材料</span>
              
          </div>
        );
    }
}
export default  Manufacturer ;//生产厂家