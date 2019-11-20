import React,{Component} from 'react'
import {Modal,Table} from 'antd'
import CancleButton from '../../../BlockQuote/cancleButton'
import '../process.css'
import axios from 'axios'
// const data=[{
//     id:'1',
//     solution:'Mn溶液',
//     volume:'100',
//     concentration:'5',
//     metal:'5'
// },{
//     id:'2',
//     solution:'Co溶液',
//     volume:'100',
//     concentration:'5',
//     metal:'5'
// },{
//     id:'3',
//     solution:'Ni溶液',
//     volume:'100',
//     concentration:'5',
//     metal:'5'
// }]
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:[]
        }
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
            title:'金属量 (kg)',
            dataIndex:'metal',
            key:'metal',
            width:'20%'
        },]
        this.showModal=this.showModal.bind(this);
        this.back=this.back.bind(this);
        this.getDetail=this.getDetail.bind(this)
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
            if(res&&res.materials){
                for(let i=0;i<res.materials.length;i++){
                    res.materials[i]['index']=i+1
                }
                this.setState({
                    data:res.materials
                })
            }
        })
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
                    columns={this.columns}
                    footer={() => {
                        return(
                            <div className='process-statisDone-detail1'>
                                <span >小计</span>
                               <span style={{float:'right'}}> 
                                   <span >体积 : 100m³</span>
                                <span >Ni : {this.props.record.detail.niValue}</span>
                                <span >Co : {this.props.record.detail.coValue}</span>
                                <span >Mn : {this.props.record.detail.mnValue}</span>
                                </span>
                            </div>
                        );
                    }}
                    pagination={false}
                    size='small'
                    bordered/>
                </Modal>
            </span>
        )
    }
}
export default Detail