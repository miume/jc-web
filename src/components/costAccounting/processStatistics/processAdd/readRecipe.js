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
            key:'id',
            width:'7%'
        },{
            title:'工艺参数名称',
            dataIndex:'head.processName',
            key:'head.processName',
            width:'12%'
        },{
            title:'使用车间',
            dataIndex:'deptName',
            key:'deptName',
            width:'12%'
        },{
            title:'工序',
            dataIndex:'processName',
            key:'processName',
            width:'12%'
        },{
            title:'生效日期',
            dataIndex:'head.effectiveDate',
            key:'head.effectiveDate',
            width:'18%'
        },{
            title:'生产品种',
            dataIndex:'product',
            key:'product',
            width:'12%'
        },{
            title:'Ni(g/L)',
            dataIndex:'ni',
            key:'ni',
            width:'7%'
        },{
            title:'Co(g/L)',
            dataIndex:'co',
            key:'co',
            width:'7%'
        },{
            title:'Mn(g/L)',
            dataIndex:'mn',
            key:'mn',
            width:'8%'
        }]:[{
            title:'序号',
            dataIndex:'id',
            key:'id',
            width:'8%'
        },{
            title:'工艺参数名称',
            dataIndex:'head.processName',
            key:'head.processName',
            width:'13%'
        },{
            title:'使用车间',
            dataIndex:'deptName',
            key:'deptName',
            width:'12%'
        },{
            title:'工序',
            dataIndex:'processName',
            key:'processName',
            width:'12%'
        },{
            title:'生效日期',
            dataIndex:'head.effectiveDate',
            key:'head.effectiveDate',
            width:'20%'
        },{
            title:'生产品种',
            dataIndex:'product',
            key:'product',
            width:'12%'
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent',
            width:'15%'
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