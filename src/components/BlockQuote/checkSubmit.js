import React from 'react';
import axios from 'axios';
import {Popover,Button,Select, Switch} from 'antd';
const Option = Select.Option;
class Submit extends React.Component{
    componentDidMount(){
        this.getAllProcess();
    }
    constructor(props){
        super(props);
        this.state = {
            urgent:0,        //用来监控送审紧急还是正常
            process:-1,      //用来监控下拉框送审流程的变化
            visible:false,   //用来控制送审界面显示与否
            allProcess : [], //用来存取所有送审流程
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.getAllProcess = this.getAllProcess.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }
    /**点击送审按钮 弹出送审气泡 */
    handleVisibleChange(visible){
        this.setState({
            visible:visible
        })
    }
    /**获取所有送审流程 */
    getAllProcess(){
        axios.get(`${this.props.url.process.process}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            this.setState({
                allProcess:data.data?data.data.data:[]
            })
        })
    }
     /**监控是否紧急 1代表紧急 0代表正常 */
     urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**点击取消送审 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    /**点击确定送审 */
    handleOk(){
        this.handleCancel();
        /**调用父组件传过来的送审函数 */
        const {process,urgent} = this.state;
        this.props.applySaveAndReview(process,urgent);
    }
    /**渲染气泡卡片 Popover */
    render(){
        const Content = (
            <div style={{width:'300px',height:'130px'}}>
                <div>
                    <Select placeholder='请选择审核流程' style={{width:'240px',height:'40px'}} onChange={this.selectChange}>
                    {
                        this.state.allProcess? this.state.allProcess.map(p=>{
                            return (
                                <Option key={p.commonBatchNumber.id} value={p.commonBatchNumber.id}>{p.commonBatchNumber.description}</Option>
                            );
                        }):''
                    }
                    </Select>
                </div>
                <div style={{padding:'10px'}} className='submit'>
                    <span style={{paddingRight:'10px'}}>是否紧急</span><Switch onChange={this.urgentChange} style={{width:'40px'}}></Switch>
                </div>
                <div style={{padding:'10px 10px 0px 10px',float:'right'}}>
                    <Button key='back' type='ghost' size='small' onClick={this.handleCancel} className='button' >取消</Button>
                    <Button key='submit' type='primary' size='small' onClick={this.handleOk} className={this.state.process>-1?'button':'grey-button'} disabled={this.state.process>-1?false:true} id='saveButton'>确定</Button>
                </div>
            </div>
        )
        return (
            <Popover title="设置审批细节"
            placement="topRight"
            content = {Content}
            trigger="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            >
                <Button type='primary' size='default' className='button'><i className="fa fa-check"></i><span> 送审</span></Button>
            </Popover>
        );
    }
}
export default Submit;
