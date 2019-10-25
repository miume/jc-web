import React,{Component} from 'react'
import NewButton from '../../BlockQuote/newButton'
import CancleButton from '../../BlockQuote/cancleButton'
import  {Input,Row,Col,Modal } from 'antd'
import AddModal from './addModal'
class StatisticalPeriodAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.showModal=this.showModal.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleAddCancel=this.handleAddCancel.bind(this);
        this.inputChange=this.inputChange.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleAdd(){
        this.setState({
            visible:false
        })
    }
    handleAddCancel(){
        this.setState({
            visible:false
        })
    }
    inputChange(e){
     let name=e.target.name;
     let  value=e.target.value;
     console.log(name,value)
     this.setState({
         [name]:value
     })
    }
    render(){
        
        return(
            <span>
                {this.props.editflag?<span className='blue' onClick={this.showModal}>编辑</span>
                :<NewButton name='新增周期' className='fa fa-plus' handleClick={this.showModal}/>}
                <Modal
                    title={this.props.editflag?'编辑周期':'新增周期'}
                    visible={this.state.visible}
                    closable={false}
                    maskClosable={false}
                    width='450px'
                    footer={[
                        <CancleButton key='cancel' handleCancel={this.handleAddCancel}/>,
                        <NewButton key='ok' handleClick={this.handleAdd} className='fa fa-check' name='确定'/>
                    ]}
                >
                 <div >
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>周期名称</Col>
                        <Col span={18}><Input placeholder='请输入周期' defaultValue={this.props.editflag?this.props.record.cycleName:''} onChange={this.inputChange}/></Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col  className='imgRequire'>默认时长(天)</Col>
                        <Col span={18}><Input placeholder='请输入默认时长(天)' defaultValue={this.props.editflag?this.props.record.defaultDuration:''} onChange={this.inputChange}/></Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col  className='imgRequire'>开始时刻:</Col>
                        <Col span={18}><Input placeholder='请输入开始时刻' defaultValue={this.props.editflag?this.props.record.startTime:''} onChange={this.inputChange}/></Col>
                    </Row>
                 </div>
                </Modal>
            </span>
        );
    }
}
export default StatisticalPeriodAdd