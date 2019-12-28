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
            width:'10%'
        },{
            title:'物料种类',
            dataIndex:'materialName',
            key:'materialName',
            width:'30%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'30%'
        },{
            title:'领料量',
            dataIndex:'receive',
            key:'receive',
            width:'25%'
        },]
        this.columns1=[{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'物料类型',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'20%'
        },{
            title:'已混量(kg)',
            dataIndex:'mix',
            key:'mix',
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
            title:'物料类型',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'20%'
        },{
            title:'进料量(kg)',
            dataIndex:'inMat',
            key:'inMat',
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
            title:'物料类型',
            dataIndex:'materialName',
            key:'materialName',
            width:'20%'
        },{
            title:'产线',
            dataIndex:'productLine',
            key:'productLine',
            width:'20%'
        },{
            title:'入炉排数',
            dataIndex:'intoFurnace',
            key:'intoFurnace',
            width:'20%'
        },{
            title:'出炉排数',
            dataIndex:'outFurnace',
            key:'outFurnace',
            width:'20%'
        }]
       
        this.showModal=this.showModal.bind(this);
        this.detail=this.detail.bind(this);
        this.back=this.back.bind(this);
        this.getColumns=this.getColumns.bind(this);
        this.getFooter=this.getFooter.bind(this)
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    getColumns(id){
        if(id===1){//在线原料
            return this.columns
        }
        else if(id===2||id===8){//预混(犁刀混),包装
            return this.columns1
        }
        else if(id===3||id===5||id===6){//预混(暂存仓),粉碎,二混
            return this.columns2
        }
        else if(id===4||id===7){//预烧,二烧
            return this.columns3
        }
    }
    getFooter(id){
        if(id===1){//在线原料
            return (
                <span style={{float:'right'}}> 
                    <span >总领料量 : 10kg</span>
                    <span >总消耗量 : 10kg</span>
                    <span >总结存量 : 10kg</span>
                </span>
            )
        }
        else if(id===2||id===8){//预混(犁刀混),包装
            return this.columns1
        }
        else if(id===3||id===5||id===6){//预混(暂存仓),粉碎,二混
            return this.columns2
        }
        else if(id===4||id===7){//预烧,二烧
            return this.columns3
        }
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
                        <span >周期 : {this.props.record.periodName}</span>
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
                    columns={this.getColumns()}
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