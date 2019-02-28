import React, { Component } from 'react';
import {message,Divider} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import '../block.css';
import DataPart from '../div'

class Manufacturer extends Component{
    
    componentDidMount(){
      this.fetch();
    //   this.getAllFactory();
    }
    constructor(props){
      super(props);
      this.state={
          data:[],
          searchContent:'',
          flag1:false,//用来判断新增框是否变为输入框
          inputContent:'',
          factoryData:[],
          checkSelectData:-1,//下拉框最开始没选，
      }
      this.fetch=this.fetch.bind(this);
      this.onBlockChange=this.onBlockChange.bind(this);
      this.addChange=this.addChange.bind(this);
      this.addClick=this.addClick.bind(this);
      this.addEvent=this.addEvent.bind(this);
      this.searchContentChange=this.searchContentChange.bind(this);
      this.searchEvent=this.searchEvent.bind(this);
      this.checkRaw=this.checkRaw.bind(this);
    //   this.getAllFactory=this.getAllFactory.bind(this);
      this.selectChange=this.selectChange.bind(this);
    }
    fetch=()=>{
      axios({
         url:`${this.props.url.rawStandard.getFactory}`,
         method:'get',
         headers:{
             'Authorization':this.props.url.Authorization
         }
      }).then(data=>{
          //console.log(data);
          const res=data.data.data;
          if(res){
            this.setState({
                data:res,
                flag1:false,
                searchContent:''
            });
          }
      });
    }

    onBlockChange(e){
       //console.log(e.target);
       //console.log(JSON.parse(localStorage.getItem('menuList')));
       const factoryId=e.target.id.split('-')[0];
       const factoryName=e.target.id.split('-')[1];
       axios({
           url:`${this.props.url.rawStandard.getStandard}`,
           method:'get',
           headers:{
               'Authorization':this.props.url.Authorization
           },
           params:{
               // name:JSON.parse(localStorage.getItem('menuList')).name,//创建人姓名即用户
                materialId:this.props.rawMaterialId,
                factoryId:factoryId
           },
           type:'json'
       })
       .then(data=>{
          // console.log(data);
           const res=data.data.data;
           //console.log(res);
           if(res){
            this.props.onBlockChange(3,factoryName,factoryId); 
           }
           else{
            this.props.onBlockChange(4,factoryName,factoryId);
           }
       });
    }
      //监听厂家下拉框变化
      selectChange=(value)=>{
        //console.log(value);//得到的是id
        this.setState({checkSelectData:value});
    }
    addClick(e){//点击新增变为输入框
        this.setState({
            flag1:true
        });
    }
    addChange(e){//监听新增输入框的变化
            this.setState({
                inputContent:e.target.value
            });
    }
    addEvent(){//新增事件
        if(!this.state.inputContent){
            message.info('工厂名称不能为空!');
            return
        }
         axios({
           url:`${this.props.url.rawStandard.addFactory}`,
           method:'post',
           headers:{
               'Authorization':this.props.url.Authorization
           },
           data:{
              name:this.state.inputContent
           },
           type:'json'
        }).then(data=>{
             message.info(data.data.message);
             this.fetch();
             this.setState({
                 flag1:false
             });
        }).catch(()=>{
            message.info('新增失败，请联系管理员！');
        });
    }
    /**---------------------- */
    //获取查询时用户名称的实时变化
    searchContentChange(e){
        const value=e.target.value;
        this.setState({
            searchContent:value
        });
     }
    searchEvent(){
        const name=this.state.searchContent;
        axios({
            url:`${this.props.url.rawStandard.getFactory}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
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
               });
            }
        })
        .catch(()=>{
            message.info('搜索失败，请联系管理员！');
        });
    }
  
    checkRaw(e){//点击重新选择原材料调用的函数
        this.props.onBlockChange(1,'选择生产厂家',this.props.rawMaterialId);//跳回生产厂家界面后，就不可以点击那个面板了
    }

    render(){
        // this.url=JSON.parse(localStorage.getItem('url'));
        return(
          <div style={{position:'relative'}}>
              <div style={{padding:'15px'}}>
              <span className='product-standrad-middle-text'>请选择生产厂家</span>
                <span  className='fr'>
                 <SearchCell name='请输入工厂名称'
                    searchEvent={this.searchEvent}
                    searchContentChange={this.searchContentChange}
                    fetch={this.fetch}
                    type={this.props.type}
                 />
                </span>
                <Divider type='horizontal'/>
              </div>
              <div className='rawStanstdardParent'>
                  {
                      this.state.data.map(d=>
                    <DataPart  key={d.id} name={d.name} id={d.id} onBlockChange={this.onBlockChange}/>
                    )
                  }
                    
                       <DataPart flag1={this.state.flag1}  flag={1} name='新增工厂' name1='工厂' onBlockChange={this.addClick} addChange={this.addChange} addEvent={this.addEvent}/>
              </div>
              
                  <span className='rawStandardPosition' onClick={this.checkRaw}>重新选择原材料</span>
              
          </div>
        );
    }
}
export default  Manufacturer ;//生产厂家