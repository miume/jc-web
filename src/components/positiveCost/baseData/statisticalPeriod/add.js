import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import  {Input,Row,Col,Modal } from 'antd'
import AddModal from './addModal'
class StatisticalPeriodAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            cycleName:'',
            defaultDuration:'',
            startTime:''
        }
        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.init=this.init.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleOk(){
        this.setState({
            visible:false
        })
        let {cycleName,defaultDuration,startTime}=this.state;
        let params = {
            cycleName:cycleName,
            defaultDuration:defaultDuration,
            startTime:startTime
        };
       //console.log(params)
        this.handleCancel()
    }
    handleCancel(){
        this.setState({
            visible:false
        })
        this.init()
    }
    inputChange(e){
     let name=e.target.name;
     let  value=e.target.value;
     //console.log(name,value)
     this.setState({
         [name]:value
     })
    }
    init(){//点击取消时，将填写的内容置空
        if(this.props.editflag){//根据editflag判断是新增还是编辑
            this.setState({
                cycleName:this.props.record.cycleName,
                defaultDuration:this.props.record.defaultDuration,
                startTime:this.props.record.startTime
            })
        }
        else{
            this.setState({
                cycleName:'',
                defaultDuration:'',
                startTime:''
            })
        }
    }
    render(){
        let {cycleName,defaultDuration,startTime}=this.state;
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
                        <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                        <NewButton key='ok' handleClick={this.handleOk} className='fa fa-check' name='确定'/>
                    ]}
                >
                 <div >
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col className='imgRequire'>周期名称</Col>
                        <Col span={18}><Input placeholder='请输入周期' name='cycleName' value={cycleName} onChange={this.inputChange}/></Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col  className='imgRequire'>默认时长(天)</Col>
                        <Col span={18}><Input placeholder='请输入默认时长(天)' name='defaultDuration' value={defaultDuration} onChange={this.inputChange}/></Col>
                    </Row>
                    <Row style={{margin:'10px 0'}} type="flex" justify="space-between" align="middle" >
                        <Col  className='imgRequire'>开始时刻:</Col>
                        <Col span={18}><Input placeholder='请输入开始时刻' name='startTime' value={startTime} onChange={this.inputChange}/></Col>
                    </Row>
                 </div>
                </Modal>
            </span>
        );
    }
}
export default StatisticalPeriodAdd