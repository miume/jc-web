import React,{Component} from 'react'
import {Modal,Table} from 'antd'
import CancleButton from '../../../BlockQuote/cancleButton'
import '../../../costAccounting/processStatistics/process.css'

const data=[{
    index:'1',
    materiaType:'前驱体',
    pick:'100',
    consume:'5',
    balance:'5'
},{
    index:'2',
    materiaType:'碳酸锂',
    pick:'100',
    consume:'5',
    balance:'5'
},{
    index:'3',
    materiaType:'布料袋',
    pick:'100',
    consume:'5',
    balance:'5'
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
            dataIndex:'index',
            key:'index',

        },{
            title:'物料种类',
            dataIndex:'materiaType',
            key:'materiaType',
        },{
            title:'领料量(kg)',
            dataIndex:'pick',
            key:'pick',
        },{
            title:'消耗量(kg)',
            dataIndex:'consume',
            key:'consume',
        },{
            title:'结存量(kg)',
            dataIndex:'balance',
            key:'balance',
        },]
        this.showModal=this.showModal.bind(this);
        this.detail=this.detail.bind(this);
        this.back=this.back.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    detail(){

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
                        <span >周期 : {this.props.record.periodType}</span>
                        <span>开始时间 : {this.props.record.beginTime}</span>
                        <span>结束时间 : {this.props.record.endTime}</span>
                    </div>
                    <div className='process-statisDone-detail'>
                        <span>过程工序 : {this.props.record.process}</span>
                        <span >产线 : {this.props.record.productLine}</span>
                        <span>产品型号 : {this.props.record.process}</span>
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
                                    <span >总领料量 : 10kg</span>
                                    <span >总消耗量 : 10kg</span>
                                    <span >总结存量 : 10kg</span>
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