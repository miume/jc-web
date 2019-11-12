import React,{Component} from 'react'
import {Modal,Table} from 'antd'
import CancleButton from '../../../BlockQuote/cancleButton'
import '../process.css'
import axios from 'axios'
const data=[{
    id:'1',
    solution:'Mn溶液',
    volume:'100',
    concentration:'5',
    metal:'5'
},{
    id:'2',
    solution:'Co溶液',
    volume:'100',
    concentration:'5',
    metal:'5'
},{
    id:'3',
    solution:'Ni溶液',
    volume:'100',
    concentration:'5',
    metal:'5'
}]
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            data:data
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id',

        },{
            title:'溶液',
            dataIndex:'solution',
            key:'solution',
        },{
            title:'体积 (m³)',
            dataIndex:'volume',
            key:'volume',
        },{
            title:'浓度 (g/L)',
            dataIndex:'concentration',
            key:'concentration',
        },{
            title:'金属量 (kg)',
            dataIndex:'metal',
            key:'metal',
        },]
        this.showModal=this.showModal.bind(this);
        this.detail=this.detail.bind(this);
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

        })
    }
    showModal(){
        this.setState({
            visible:true
        })
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
                    <CancleButton flag={true} handleCancel={this.back}/>
                ]}>
                    <div className='process-statisDone-detail'>
                        <span >周期 : {this.props.record.periodType}</span>
                        <span >期数 : {this.props.record.period}</span>
                        <span>开始时间 : {this.props.record.beginTime}</span>
                        <span>结束时间 : {this.props.record.endTime}</span>
                        <span>过程工序 : {this.props.record.process}</span>
                    </div>
                    <div style={{marginTop:'30px'}}></div>
                    <Table
                    dataSource={this.state.data}
                    rowKey={record=>record.id}
                    columns={this.columns}
                    footer={() => {
                        return(
                            <div className='process-statisDone-detail1'>
                                <span >小计</span>
                               <span style={{float:'right'}}> 
                                   <span >体积 : 100m³</span>
                                <span >Ni : 5T</span>
                                <span >Co : 5T</span>
                                <span >Mn : 5T</span>
                                </span>
                            </div>
                        );
                    }}
                    size='small'
                    bordered/>
                </Modal>
            </span>
        )
    }
}
export default Detail