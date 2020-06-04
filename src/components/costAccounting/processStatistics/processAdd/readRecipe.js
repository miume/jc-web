import React,{Component} from 'react'
import {Modal,Table,Button} from 'antd' 
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'

class ReadRecipe extends Component{//读取配方
    constructor(props){
        super(props);
        this.columns=!this.props.flag?[{
            title:'序号',
            dataIndex:'id',
            key:'id',
            width:'10%'
        },
        {
            title:'产品型号',
            dataIndex:'product',
            key:'product',
            width:'18%'
        },
        // {
        //     title:'工艺参数名称',
        //     dataIndex:'head.processName',
        //     key:'head.processName',
        //     width:'12%'
        // },{
        //     title:'使用车间',
        //     dataIndex:'deptName',
        //     key:'deptName',
        //     width:'12%'
        // },
        {
            title:'工序',
            dataIndex:'processName',
            key:'processName',
            width:'18%'
        },{
            title:'生效日期',
            dataIndex:'head.effectiveDate',
            key:'head.effectiveDate',
            width:'18%'
        },{
            title:'Ni(g/L)',
            dataIndex:'ni',
            key:'ni',
            width:'11%'
        },{
            title:'Co(g/L)',
            dataIndex:'co',
            key:'co',
            width:'11%'
        },{
            title:'Mn(g/L)',
            dataIndex:'mn',
            key:'mn',
            width:'11%'
        }]:[{
            title:'序号',
            dataIndex:'id',
            key:'id',
            width:'10%'
        },
        {
            title:'产品型号',
            dataIndex:'product',
            key:'product',
            width:'12%'
        },
        {
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
            title:'Ni(g/L)',
            dataIndex:'ni',
            key:'ni',
            width:'11%'
        },{
            title:'Co(g/L)',
            dataIndex:'co',
            key:'co',
            width:'11%'
        },{
            title:'Mn(g/L)',
            dataIndex:'mn',
            key:'mn',
            width:'11%'
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
                <span >{this.props.lineName} : </span>
               <Button id={this.props.buttonId} onClick={this.props.showModal} type='ant-btn ant-btn-primary'>
               <i className={this.props.className} aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>
               &nbsp;{this.props.name}</Button> &nbsp;
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