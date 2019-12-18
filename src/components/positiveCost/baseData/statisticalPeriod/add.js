import React,{Component} from 'react'
import NewButton from '../../../BlockQuote/newButton'
import CancleButton from '../../../BlockQuote/cancleButton'
import  {Input,Row,Col,Modal ,message, TimePicker} from 'antd'
import axios from 'axios'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
class StatisticalPeriodAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            cycleName:undefined,
            defaultDuration:undefined,
            startTime:undefined,
            time:undefined
        }
        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.init=this.init.bind(this);
        this.dateChange=this.dateChange.bind(this);
    }

    showModal(){
        this.init()
        this.setState({
            visible:true
        })
    }
    handleOk(){
        if(this.props.data.length>=7){
            message.error('数据不能大于7条!')
            return
        }
        let {cycleName,defaultDuration,startTime}=this.state;
        if(!cycleName||!defaultDuration||!startTime){
            message.info('信息填写不完整!')
            return
        }
        let params = {
            code:this.props.editflag?this.props.code:'',
            name:cycleName,
            length:defaultDuration,
            startTime:startTime
        };
        axios({
            url:this.props.editflag?this.props.url.positiveStatic.update:this.props.url.positiveStatic.add,
            method:this.props.editflag?'put':'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:params
        }).then(data=>{
            if(data.data.code===0){
                message.info('操作成功!')
                this.props.getTableData()
            }
            else{
                message.info(data.data.message)
            }
        }).catch(error=>{
            message.error('操作失败，请联系管理员!')
        })
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
    dateChange(time,timeString){
        this.setState({
            startTime:timeString,
            time:time
        })
    }
    init(){//点击取消时，将填写的内容置空
        if(this.props.editflag){//根据editflag判断是新增还是编辑
            this.setState({
                cycleName:this.props.record.name,
                defaultDuration:this.props.record.length,
                startTime:this.props.record.startTime,
                time:moment(this.props.record.startTime, "HH:mm:ss")
            })
        }
        else{
            this.setState({
                cycleName:undefined,
                defaultDuration:undefined,
                startTime:undefined,
                time:undefined
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
                        <Col span={18}><TimePicker locale={locale} placeholder='请输入开始时刻' value={this.state.time} style={{width:'307px'}}   onChange={this.dateChange}/></Col>
                    </Row>
                 </div>
                </Modal>
            </span>
        );
    }
}
export default StatisticalPeriodAdd