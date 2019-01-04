import React, { Component } from 'react';
import {message} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import '../block.css';
import DataPart from '../div';

class RawMaterial extends Component{
      url;
      componentDidMount(){
          this.fetch();
      }
    //   componentWillMount(){
    //       this.setState=()=>{
    //           return;
    //       }
    //   }
      constructor(props){
          super(props);
          this.state={
              data:[],
              searchContent:'',
              f:true,//用来判断是否显示新增的块,
              flag1:false,
          }
          this.onBlockChange=this.onBlockChange.bind(this);
          this.searchContentChange=this.searchContentChange.bind(this);
          this.searchEvent=this.searchEvent.bind(this);
          this.fetch=this.fetch.bind(this);
          this.add=this.add.bind(this);
      }
     fetch=()=>{
       axios({
         url:`${this.url.rawStandard.getRaw}`,
         method:'get',
         headers:{
             'Authorization':this.url.Authorization
         }
       })
       .then((data)=>{
          //console.log(data);
          const res=data.data.data;
          if(res){
            this.setState({data:res});
          }
       });
     }
    //监听原材料那个块块是否被选中
    onBlockChange(e){
        const id = e.target.id.split('-')[0];
        const name = e.target.id.split('-')[1];
    //    console.log(id);
    //    console.log(name);
       this.props.onBlockChange(2,name,true);
    }
  add(){
      this.setState({//设置为true会显示输入框
          flag1:true
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
          url:`${this.url.rawStandard.getRaw}`,
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
           message.info('查询失败，请联系管理员！ ');
       });
    }
      render(){
         
         this.url=JSON.parse(localStorage.getItem('url'));
          return(
              <div>
                  <div style={{padding:'15px'}}>
                    &nbsp; <h2 style={{display:'inline-block'}}><span style={{width:'24px',height:'90px'}}>请选择原材料</span></h2>
                     <span style={{float:'right' }}>
                     <SearchCell name='请输入搜索内容'
                     searchEvent={this.searchEvent}
                     searchContentChange={this.searchContentChange}/>
                     </span>
                   </div>
                   <div className='rawStanstdardParent'>
                       {
                           this.state.data.map(d=>
                            <DataPart  key={d.id} name={d.name} id={d.id}  onBlockChange={this.onBlockChange}/>)
                       }
                      <span className={this.state.f?'show':'hide'}> <DataPart  flag={1} flag1={this.state.flag1} onBlockChange={this.add} name='新增'/></span>
                   </div>
                 
              </div>
          );
      }
}
export default RawMaterial;