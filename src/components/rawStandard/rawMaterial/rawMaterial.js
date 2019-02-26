import React, { Component } from 'react';
import {message,Modal,Divider} from 'antd';
import axios from 'axios';
import SearchCell from '../../BlockQuote/search';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
import RawMaterialAddModal from './addModal'; 
import '../block.css';
import DataPart from '../div';

class RawMaterial extends Component{
      url;
      componentDidMount(){
          this.fetch();
          this.getAllTestItem();
          
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
              visible:false,
              inputContent:'',//新增输入框最开始没有内容
              items:[],
              testItems:[],
              rawData:[],//新增获取所有原材料
          }
          this.onBlockChange=this.onBlockChange.bind(this);
          this.searchContentChange=this.searchContentChange.bind(this);
          this.searchEvent=this.searchEvent.bind(this);
          this.fetch=this.fetch.bind(this);
           this.addClick=this.addClick.bind(this);
          this.addEvent=this.addEvent.bind(this);
          this.handleCancel=this.handleCancel.bind(this);
          this.getAllTestItem=this.getAllTestItem.bind(this);
          this.checkboxChange=this.checkboxChange.bind(this);
     
      }
     fetch=()=>{
       axios({
         url:`${this.props.url.rawStandard.getRaw}`,
         method:'get',
         headers:{
             'Authorization':this.props.url.Authorization
         }
       })
       .then((data)=>{
          //console.log(data);
          const res=data.data.data;
          if(res){
            this.setState({
                data:res,
                searchContent:''
        });
          }
       });
     }
     getAllRawMaterial(){
         
     }

    //监听原材料那个块块是否被选中
    onBlockChange(e){
        const rawMaterialId = e.target.id.split('-')[0];
        const name = e.target.id.split('-')[1];
       this.props.onBlockChange(2,name,rawMaterialId);
    }
    checkboxChange(value){
         this.setState({testItems:value});
    }
    addClick(){//点击新增,弹出modal
        this.setState({
           visible:true
        });
    }
    addEvent(){//新增事件
        const value=this.formRef.getItemsValue();
        //console.log(value);
        //console.log(this.state.testItems.length);
        if(!value['name']||this.state.testItems.length===0){
            message.info('信息填写不完整!');
            return
        }
        axios({
            url:`${this.props.url.rawStandard.addRaw}?testItemIds=${this.state.testItems.toString()}`,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:value
        }).then(data=>{
            //console.log(data);
            message.info(data.data.message);
            this.fetch();
        }).catch(()=>{
            message.info('新增失败，请联系管理员！');
        });
        this.setState({
            visible:false
        });
    }
    handleCancel(){
        this.setState({
            visible:false
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
          url:`${this.props.url.rawStandard.getRaw}`,
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
           message.info('查询失败，请联系管理员！ ');
       });
    }  
    getAllTestItem(){
        axios({
           url:`${this.props.url.testItems.testItems}`,
           method:'get',
           headers:{
               'Authorization':this.props.url.Authorization
           }
        }).then(data=>{
            const res=data.data.data;
            if(res){
                this.setState({items:res});
            }
          }            
        )
      }
      render(){
        //  this.url=JSON.parse(localStorage.getItem('url'));
          return(
              <div>
                  <div style={{padding:'15px'}}>
                    <span className='product-standrad-middle-text'>请选择原材料</span>
                     <span style={{float:'right' }}>
                       <SearchCell name='请输入原材料名称'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                            type={this.props.type}
                        />
                     </span>
                     <Divider type='horizontal' />
                   </div>
                   <div className='rawStanstdardParent1'>
                   <div className='rawStanstdardParent'>
                       {
                           this.state.data.map(d=>
                            <DataPart  key={d.id} name={d.name} id={d.id}  onBlockChange={this.onBlockChange}/>)
                       }
                      <span > <DataPart  flag={1} onBlockChange={this.addClick}   name='新增原材料' name1='原材料'/></span>
                      <Modal
                            visible={this.state.visible}
                            title="新增"
                            closable={false} maskClosable={false} centered={true}
                            width='360px'
                            footer={[
                            <CancleButton   key='cancel' handleCancel={this.handleCancel} />,
                            <NewButton key='ok' handleClick={this.addEvent} name='确定'  className='fa fa-check'/>,
                            ]}
                    >
                      <RawMaterialAddModal rawData={this.state.rawData} items={this.state.items} checkboxChange={this.checkboxChange} wrappedComponentRef={(form) => this.formRef = form}/>
                    </Modal>
                   </div>
                   </div>
              </div>
          );
      }
}
export default RawMaterial;