import React,{Component} from 'react'
import {Modal,Table} from 'antd' 
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'

class ReadRecipe extends Component{//读取配方
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'工艺参数名称',
            dataIndex:'processParameter',
            key:'processParameter'
        },{
            title:'使用车间',
            dataIndex:'useWorkshop',
            key:'useWorkshop'
        },{
            title:'工序',
            dataIndex:'process',
            key:'process'
        },{
            title:'生效日期',
            dataIndex:'effectiveDate',
            key:'effectiveDate'
        },{
            title:'生产品种',
            dataIndex:'productVariety',
            key:'productVariety'
        },{
            title:'Ni(g/L)',
            dataIndex:'',
            key:'Ni'
        },{
            title:'Co(g/L)',
            dataIndex:'Co',
            key:'Co'
        },{
            title:'Mn(g/L)',
            dataIndex:'Mn',
            key:'Mn'
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
                columns={this.columns}
                size='small'
                bordered/>
                </Modal>
            </span>
        );
    }
}
export default ReadRecipe