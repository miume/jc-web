import React,{Component} from 'react'
import {Modal,Table,Divider} from 'antd'
import CancleButton from '../../../BlockQuote/cancleButton'
import './detai.css'
import axios from 'axios'

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            sub:{}
        }
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'领料量',
            dataIndex:'receive',
            key:'receive',
            width:'25%'
        },{
            title:'消耗量(kg)',
            dataIndex:'consum',
            key:'consum',
            width:'20%'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
            width:'20%'
        }]
        this.columns1=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'已混量(kg)',
            dataIndex:'mix',
            key:'mix',
            width:'20%'
        },{
            title:'消耗量(kg)',
            dataIndex:'consum',
            key:'consum',
            width:'20%'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
            width:'20%'
        }]
        this.columns2=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'进料量(kg)',
            dataIndex:'receive',
            key:'receive',
            width:'20%'
        },{
            title:'消耗量(kg)',
            dataIndex:'consum',
            key:'consum',
            width:'20%'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
            width:'20%'
        }]
   
        this.columns3=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName',
            width:'15%'
        },{
            title:'入炉排数',
            dataIndex:'intoFurnace',
            key:'intoFurnace',
            width:'15%'
        },{
            title:'出炉排数',
            dataIndex:'outFurnace',
            key:'outFurnace',
            width:'15%'
        },{
            title:'进料量(kg)',
            dataIndex:'receive',
            key:'receive',
            width:'15%'
        },{
            title:'消耗量(kg)',
            dataIndex:'consum',
            key:'consum',
            width:'15%'
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
            width:'15%'
        }]
       
        this.showModal=this.showModal.bind(this);
        this.getDetail=this.getDetail.bind(this);
        this.back=this.back.bind(this);
        this.getColumns=this.getColumns.bind(this);
        this.getFooter=this.getFooter.bind(this)
    }
    showModal(){
        this.setState({
            visible:true
        })
        this.getDetail()
    }
    getDetail(){
        axios({
            url:this.props.url.positiveProcessStatis.commitDetail,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                totalsId:this.props.record.totals.code
            }
        }).then((data)=>{
            let res=data.data.data,newData=[],dataBottom=[],length=0
            if(res){
               if(res.mats){
                   for(let i=0;i<res.mats.length;i++){
                       res.mats[i]['index']=i+1
                       if( res.mats[i]['flag']===true){
                        res.mats[i]['index'] = i + 1
                        newData.push(res.mats[i])
                    }   
                    else{
                        dataBottom.push(res.mats[i])
                    }
                   }
                   this.setState({
                       data:newData,
                       dataBottom:dataBottom
                   })
               }
               this.setState({
                   sub:res
               })
            }
        })
    }
    getColumns(id){
        if(id===1){//在线原料
            return this.columns
        }
        else if(id===2){//预混(犁刀混)
            return this.columns1
        }
        else if(id===3||id===5||id===6||id===8){//预混(暂存仓),粉碎,二混,包装
            return this.columns2
        }
        else if(id===4||id===7){//预烧,二烧
            return this.columns3
        }
    }
    getFooter(id){
        let {sub,dataBottom}=this.state
        if(id===1){//在线原料
            return (
                <span >  
                        {
                            dataBottom?dataBottom.map(item=>{
                                return(
                                    <span  key={item.code}>{item.materialName} : {item.value}</span>
                                )
                            }):null
                        }
                </span>
            )
        }
        else if(id===2){//预混(犁刀混)
            return (
                <div>
                    {/* <span style={{fontWeight:'650',fontSize:'13px'}}>小计 : </span> */}
                    <span style={{float:'right'}}> 
                        <span >总已混量 : {sub&&sub.tCom!==undefined?sub.tCom:undefined}</span>
                        <span >总消耗量 : {sub&&sub.tCom!==undefined?sub.tCom:undefined}</span>
                        <span >总结存量 : {sub&&sub.tBal!==undefined?sub.tBal:undefined}</span>
                    </span>
                </div>
            )
        }
        else if(id===3||id===5||id===6||id===8){//预混(暂存仓),粉碎,二混,包装
            return (
                <div >
                     <div style={{float:'left'}}>  
                        <span className={id===8?'':'hide'}>
                            <span style={{marginRight:'20px'}}>周期内包装袋数 : {sub&&sub.bags!==undefined?sub.bags:undefined}</span>
                            <span style={{marginRight:'20px'}}>产成品入库 : {sub&&sub.productStorage!==undefined?sub.productStorage:undefined}</span>
                        </span>
                        {
                            dataBottom?dataBottom.map((item,index)=>{
                                return(
                                    <span  key={index} style={{marginRight:'20px'}}>{item.materialName} : {item.value} </span>
                                )
                            }):null
                        }
                    </div>
                   <span className={dataBottom&&dataBottom.length!==0?'':'hide'}> <Divider  style={{margin:'10px 0'}}/></span>
                    <div>
                        <span style={{fontWeight:'650',fontSize:'13px'}}>小计 : </span>
                        <span style={{float:'right'}}> 
                            <span >总进料量 : {sub&&sub.tFee!==undefined?sub.tFee:undefined}</span>
                            <span >总消耗量 : {sub&&sub.tCom!==undefined?sub.tCom:undefined}</span>
                            <span >总结存量 : {sub&&sub.tBal!==undefined?sub.tBal:undefined}</span>
                        </span>
                    </div>
                </div>
            )
        }
        else if(id===4||id===7){//预烧,二烧
            return (
               <span>
                    <span >  
                        {
                            dataBottom?dataBottom.map(item=>{
                                return(
                                    <span  key={item.code}>{item.materialName} : {item.value}</span>
                                )
                            }):null
                        }
                    </span>
                    <span style={{float:'right'}}> 
                        <span style={{fontWeight:'650',fontSize:'13px'}}>小计 : </span>
                        {id===7?<span>
                                    <span >总入炉排数 : {sub&&sub.tIn!==undefined?sub.tIn:undefined}</span>
                                    <span >总出炉排数 : {sub&&sub.tOut!==undefined?sub.tOut:undefined}</span>
                               </span>
                               :null
                        }
                        <span >总进料量 : {sub&&sub.tFee!==undefined?sub.tFee:undefined}</span>
                        <span >总消耗量 : {sub&&sub.tCom!==undefined?sub.tCom:undefined}</span>
                        <span >总结存量 : {sub&&sub.tBal!==undefined?sub.tBal:undefined}</span>
                    </span>
               </span>
            )
        }
    }
 
    /**车间和仓库的界面*/
    getContent(id){
        let {dataBottom,sub}=this.state
        return(
            <div className={id===9?'positive-process-detail-workShop-div positive-process-detail-height1':'positive-process-detail-workShop-div positive-process-detail-height2'}>
                <span className='positive-process-detail-workShop'>
                    {
                        dataBottom?dataBottom.map((item,index)=>{
                            return(
                                <span className='positive-process-add-onLine-font' key={index} style={{padding:'1%'}}>
                                    <span className={'positive-process-add-span'}> {item.materialName}</span> : <span className={'positive-process-add-crush-span'}>{item.value}</span>
                                </span>
                            )
                        }):null
                    }
                </span>
                <Divider/>
                <span style={{float:'right',marginRight:'10px'}}> 
                    <span style={{fontWeight:'650',fontSize:'13px'}}>小计 : {sub&&sub.tBal!==undefined?sub.tBal:undefined}</span>&nbsp;&nbsp;
                </span>
            </div>
        )
    }
   
    back(){
        this.setState({
            visible:false
        })
    }
    render(){
        return(
            <span>
                <span className='blue' onClick={this.showModal}>详情</span>
                <Modal
                 title='在制品管理详情'
                 width='1000px'
                 visible={this.state.visible}
                 closable={false} maskClosable={false} 
                 centered={true} 
                 footer={[
                    <CancleButton key='cancel' flag={true} handleCancel={this.back}/>
                ]}>
                    <div className='process-statisDone-detail'>
                        <span >周期 : {this.props.record.periodName}</span>
                        <span>开始时间 : {this.props.record.head.beginTime}</span>
                        <span>结束时间 : {this.props.record.head.endTime}</span>
                    </div>
                    <div className='process-statisDone-detail'>
                        <span>过程工序 : {this.props.record.processName}</span>
                        <span >产线 : {this.props.record.lineName}</span>
                        <span>产品型号 : {this.props.record.typeName}</span>
                    </div>
                    <div style={{marginTop:'30px'}}></div>
                   
                   {
                       this.props.record.totals.processCode===9||this.props.record.totals.processCode===10?this.getContent(this.props.record.totals.processCode):
                       <Table
                       dataSource={this.state.data}
                       rowKey={record=>record.index}
                       columns={this.getColumns(this.props.record.totals.processCode)}
                       footer={() => {
                           return(
                               <div >
                                  {this.getFooter(this.props.record.totals.processCode)}
                               </div>
                           );
                       }}
                       scroll={{y:300}}
                    //    style={{flex:'1',height:'50vh'}}
                       pagination={false}
                       size='small'
                       bordered/>
                   }
                   
                </Modal>
            </span>
        )
    }
}
export default Detail