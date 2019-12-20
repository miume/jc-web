import React,{Component} from 'react'
import {Modal,Table} from 'antd' 
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'

class ReadRecipe extends Component{//读取配方
    constructor(props){
        super(props);
        this.columns=!this.props.flag?[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'工艺参数名称',
            dataIndex:'head.processName',
            key:'head.processName'
        },{
            title:'使用车间',
            dataIndex:'deptName',
            key:'deptName'
        },{
            title:'工序',
            dataIndex:'processName',
            key:'processName'
        },{
            title:'生效日期',
            dataIndex:'head.effectiveDate',
            key:'head.effectiveDate'
        },{
            title:'生产品种',
            dataIndex:'product',
            key:'product'
        },{
            title:'Ni(g/L)',
            dataIndex:'ni',
            key:'ni'
        },{
            title:'Co(g/L)',
            dataIndex:'co',
            key:'co'
        },{
            title:'Mn(g/L)',
            dataIndex:'mn',
            key:'mn'
        }]:[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'工艺参数名称',
            dataIndex:'head.processName',
            key:'head.processName'
        },{
            title:'使用车间',
            dataIndex:'deptName',
            key:'deptName'
        },{
            title:'工序',
            dataIndex:'processName',
            key:'processName'
        },{
            title:'生效日期',
            dataIndex:'head.effectiveDate',
            key:'head.effectiveDate'
        },{
            title:'生产品种',
            dataIndex:'product',
            key:'product'
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent'
        }]

        
    }
   
  
    render(){
        return(
            <span>
                <NewButton name='读取配方' handleClick={this.props.showModal} flagConfirm={this.props.flagConfirm}/>
                <Modal 
                title='请选择您需要读取的配方数据'
                visible={this.props.visible}
                closable={false}
                maskClosable={false}
                centered={true}
                width='1000px'
                footer={[
                    <CancleButton key='cancel' handleCancel={this.props.handleCancel}/>,
                    <NewButton key='ok' handleClick={this.props.handleOk} name='确定'/>
                ]}>
                <Table
                dataSource={this.props.data}
                rowKey={record=>record.head.code}
                pagination={false}
                onChange={this.props.handleTableChange}
                columns={this.columns}
                rowSelection={this.props.rowSelection}
                scroll={{y:'250px'}}
                size='small'
                bordered/>
                </Modal>
            </span>
        );
    }
}
export default ReadRecipe