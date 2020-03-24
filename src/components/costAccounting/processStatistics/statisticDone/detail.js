import React,{Component} from 'react'
import {Modal,Table} from 'antd'
import CancleButton from '../../../BlockQuote/cancleButton'
import '../process.css'
import axios from 'axios'

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[],
            // sub:undefined
        }
        /**单晶体*/
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'溶液',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'体积 (m³)',
            dataIndex:'process.volumes',
            key:'process.volumes',
            width:'20%'
        },{
            title:'浓度 (g/L)',
            dataIndex:'concentration',
            key:'concentration',
            width:'20%'
        },{
            title:'金属量 (T)',
            dataIndex:'metal',
            key:'metal',
            width:'20%'
        }]
        /**混合盐*/
        this.columns1=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'溶液',
            dataIndex:'materialName',
            key:'materialName',
            width:'10%'
        },{
            title:'体积 (m³)',
            dataIndex:'process.volumes',
            key:'process.volumes',
            width:'10%'
        },{
            title:'Ni(g/L)',
            dataIndex:'process.niConcentration',
            key:'process.niConcentration',
            width:'10%'
        },{
            title:'Co(g/L)',
            dataIndex:'process.coConcentration',
            key:'process.coConcentration',
            width:'10%'
        },{
            title:'Mn(g/L)',
            dataIndex:'process.mnConcentration',
            key:'process.mnConcentration',
            width:'10%'
        },{
            title:'Ni(T)',
            dataIndex:'process.niMetallicity',
            key:'process.niMetallicity',
            width:'10%'
        },{
            title:'Co(T)',
            dataIndex:'process.coMetallicity',
            key:'process.coMetallicity',
            width:'10%'
        },{
            title:'Mn(T)',
            dataIndex:'process.mnMetallicity',
            key:'process.mnMetallicity',
            width:'10%'
        }]
        /**合成*/
        this.columns2=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'合成槽号',
            dataIndex:'materialName',
            key:'materialName',
            width:'11%'
        },{
            title:'体积 (m³)',
            dataIndex:'process.volumes',
            key:'process.volumes',
            width:'9%'
        },{
            title:'含固量（g/L）',
            dataIndex:'process.solidContainingContent',
            key:'process.solidContainingContent',
            width:'12%'
        },{
            title:'重量（T）',
            dataIndex:'process.weight',
            key:'process.weight',
            width:'9%'
        },{
            title:'Ni(g/L)',
            dataIndex:'process.niConcentration',
            key:'process.niConcentration',
            width:'9%'
        },{
            title:'Co(g/L)',
            dataIndex:'process.coConcentration',
            key:'process.coConcentration',
            width:'9%'
        },{
            title:'Mn(g/L)',
            dataIndex:'process.mnConcentration',
            key:'process.mnConcentration',
            width:'9%'
        },{
            title:'Ni(T)',
            dataIndex:'process.niMetallicity',
            key:'process.niMetallicity',
            width:'9%'
        },{
            title:'Co(T)',
            dataIndex:'process.coMetallicity',
            key:'process.coMetallicity',
            width:'9%'
        },{
            title:'Mn(T)',
            dataIndex:'process.mnMetallicity',
            key:'process.mnMetallicity',
            width:'9%'
        }]
        /**陈化*/
        this.columns3=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'物料点',
            dataIndex:'materialName',
            key:'materialName',
            width:'9%'
        },{
            title:'料浆体积 (m³)',
            dataIndex:'process.volumes',
            key:'process.volumes',
            width:'9%'
        },{
            title:'含固量（g/L）',
            dataIndex:'process.solidContainingContent',
            key:'process.solidContainingContent',
            width:'9%'
        },{
            title:'料浆重量（T）',
            dataIndex:'process.weight',
            key:'process.weight',
            width:'9%'
        },{
            title:'Ni(g/L)',
            dataIndex:'process.niConcentration',
            key:'process.niConcentration',
            width:'9%'
        },{
            title:'Co(g/L)',
            dataIndex:'process.coConcentration',
            key:'process.coConcentration',
            width:'9%'
        },{
            title:'Mn(g/L)',
            dataIndex:'process.mnConcentration',
            key:'process.mnConcentration',
            width:'9%'
        },{
            title:'Ni(T)',
            dataIndex:'process.niMetallicity',
            key:'process.niMetallicity',
            width:'9%'
        },{
            title:'Co(T)',
            dataIndex:'process.coMetallicity',
            key:'process.coMetallicity',
            width:'9%'
        },{
            title:'Mn(T)',
            dataIndex:'process.mnMetallicity',
            key:'process.mnMetallicity',
            width:'9%'
        }]
        /**烘干*/
        this.columns4=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'物料点',
            dataIndex:'materialName',
            key:'materialName',
            width:'10%'
        },{
            title:'重量（T）',
            dataIndex:'process.weight',
            key:'process.weight',
            width:'10%'
        },{
            title:'Ni(g/L)',
            dataIndex:'process.niConcentration',
            key:'process.niConcentration',
            width:'10%'
        },{
            title:'Co(g/L)',
            dataIndex:'process.coConcentration',
            key:'process.coConcentration',
            width:'10%'
        },{
            title:'Mn(g/L)',
            dataIndex:'process.mnConcentration',
            key:'process.mnConcentration',
            width:'10%'
        },{
            title:'Ni(T)',
            dataIndex:'process.niMetallicity',
            key:'process.niMetallicity',
            width:'10%'
        },{
            title:'Co(T)',
            dataIndex:'process.coMetallicity',
            key:'process.coMetallicity',
            width:'10%'
        },{
            title:'Mn(T)',
            dataIndex:'process.mnMetallicity',
            key:'process.mnMetallicity',
            width:'10%'
        }]
        /**其他*/
        this.columns5=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'5%'
        },{
            title:'名称',
            dataIndex:'materialName',
            key:'materialName',
            width:'10%'
        },{
            title:'重量',
            dataIndex:'process.weight',
            key:'process.weight',
            width:'10%'
        },{
            title:'Ni(g/L)',
            dataIndex:'process.niConcentration',
            key:'process.niConcentration',
            width:'10%'
        },{
            title:'Co(g/L)',
            dataIndex:'process.coConcentration',
            key:'process.coConcentration',
            width:'10%'
        },{
            title:'Mn(g/L)',
            dataIndex:'process.mnConcentration',
            key:'process.mnConcentration',
            width:'10%'
        },{
            title:'Ni(T)',
            dataIndex:'process.niMetallicity',
            key:'process.niMetallicity',
            width:'10%'
        },{
            title:'Co(T)',
            dataIndex:'process.coMetallicity',
            key:'process.coMetallicity',
            width:'10%'
        },{
            title:'Mn(T)',
            dataIndex:'process.mnMetallicity',
            key:'process.mnMetallicity',
            width:'10%'
        }]
        this.showModal=this.showModal.bind(this);
        this.back=this.back.bind(this);
        this.getDetail=this.getDetail.bind(this)
        this.getColumns=this.getColumns.bind(this);
    }
    getDetail(){
        axios({
            url:this.props.url.precursorGoodIn.statisticDetail,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                processDetailId:this.props.processDetailId
            }
        }).then((data)=>{
            let res=data.data.data;
            if(res){
               if(res.materials){
                   for(let i=0;i<res.materials.length;i++){
                       res.materials[i]['index']=i+1
                       if(this.props.processCode===1){
                           res.materials[i]['concentration']=res.materials[i]['process']['niConcentration']+res.materials[i]['process']['coConcentration']+res.materials[i]['process']['mnConcentration']
                           res.materials[i]['metal']=res.materials[i]['process']['niMetallicity']+res.materials[i]['process']['coMetallicity']+res.materials[i]['process']['mnMetallicity']
                       }
                   }
                   this.setState({
                       data:res.materials,
                   })
               }
               this.setState({
                   sub:res
               })
            }
        })
    }
    getColumns(id){
        if(id===1){
            return this.columns
        }
        else if(id===2){
            return this.columns1
        }
        else if(id===3){
            return this.columns2
        }
        else if(id===4){
            return this.columns3
        }
        else if(id===5){
            return this.columns4
        }
        else {
            return this.columns5
        }
    }
    showModal(){
        this.setState({
            visible:true
        })
       this.getDetail()
    }
  
    back(){
        this.setState({
            visible:false
        })
    }
    render(){
         let {sub}=this.state
        return(
            <span>
                <span className='blue' onClick={this.showModal}>详情</span>
                <Modal
                 title='在制品详情'
                 width='1000px'
                 visible={this.state.visible}
                 closable={false} maskClosable={false} 
                 centered={true} 
                 footer={[
                    <CancleButton key='cancel' flag={true} handleCancel={this.back}/>
                ]}>
                    <div className='process-statisDone-detail'>
                        <span >周期 : {this.props.record.periodName}</span>
                        <span >期数 : {this.props.record.head.lineName}</span>
                        <span>开始时间 : {this.props.record.head.startTime}</span>
                        <span>结束时间 : {this.props.record.head.endTime}</span>
                        <span>过程工序 : {this.props.record.processName}</span>
                    </div>
                    <div style={{marginTop:'30px'}}></div>
                    <Table
                    dataSource={this.state.data}
                    rowKey={record=>record.index}
                    columns={this.getColumns(this.props.processCode)}
                    footer={() => {
                        return(
                            <div className='process-statisDone-detail1'>
                                <span >小计</span>
                               <span style={{float:'right'}}> 
                                   <span >{this.props.processCode===1||this.props.processCode===2?`体积 : ${sub&&sub.total!==undefined&&sub.totalNi!==null?sub.total:undefined}`:`重量 : ${sub&&sub.total!==undefined&&sub.totalNi!==null?sub.total:undefined}`}</span>
                                <span >Ni : {sub&&sub.totalNi!==undefined&&sub.totalNi!==null?sub.totalNi:undefined}</span>
                                <span >Co : {sub&&sub.totalCo!==undefined&&sub.totalNi!==null?sub.totalCo:undefined}</span>
                                <span >Mn : {sub&&sub.totalMn!==undefined&&sub.totalNi!==null?sub.totalMn:undefined}</span>
                                </span>
                            </div>
                        );
                    }}
                    pagination={false}
                    size='small'
                    scroll={{y:'45vh'}}
                    bordered/>
                </Modal>
            </span>
        )
    }
}
export default Detail