import React from 'react';
import {Popover,Button,Icon,Select, Switch} from 'antd';
const Option = Select.Option;
const process = [{
    id:1,
    name:'流程1'
},{
    id:2,
    name:'流程2'
},{
    id:3,
    name:'流程3'
},{
    id:4,
    name:'流程4'
},]
class Submit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            urgent : false,
            process : -1,
        }
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    handleVisibleChange=(visible)=>{
        console.log(this.props.data)
        this.setState({
            visible:visible
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked
        })
    }
    /**点击送审 */
    handleOk(){
        this.setState({
            visible:false
        })
        var data ={
            process:this.state.process,
            urgent:this.state.urgent
        }
        console.log(data)
    }
    /**点击取消送审 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    /**监听select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**渲染气泡卡片 Popover */
    render(){
        const Content = (
            <div style={{width:'300px',height:'130px'}}> 
                <div>
                    <Select placeholder='请选择审核流程' style={{width:'240px',height:'40px'}} onChange={this.selectChange}>
                    {
                        process.map(p=>{
                            return (
                                <Option key={p.id} value={p.id}>{p.name}</Option>
                            );
                        })
                    }
                    </Select>
                </div>
                <div style={{padding:'10px'}}>
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
                <Button type='primary' className='button'><Icon type="check" />送审</Button>  
            </Popover>
        );
    }
}
export default Submit;