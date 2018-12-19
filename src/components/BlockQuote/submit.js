import React from 'react';
import {Popover,Button,Select, Switch} from 'antd';
import axios from 'axios';
const Option = Select.Option;
// const process = [{
//     id:1,
//     name:'流程1'
// },{
//     id:2,
//     name:'流程2'
// },{
//     id:3,
//     name:'流程3'
// },{
//     id:4,
//     name:'流程4'
// },]
class Submit extends React.Component{
    componentDidMount(){
        axios.get(`${this.props.url.process.process}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            //console.log(data.data)
            this.setState({
                process:data.data?data.data.data:[]
            })
        })
    }
    constructor(props){
        super(props);
        this.state = {
            process : [],
        }
        // this.handleVisibleChange = this.handleVisibleChange.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
        // this.handleOk = this.handleOk.bind(this);
        // this.urgentChange = this.urgentChange.bind(this);
        // this.selectChange = this.selectChange.bind(this);
    }
    // handleVisibleChange=(visible)=>{
    //     console.log(this.props.data)
    //     this.setState({
    //         visible:visible
    //     })
    // }
    /**监控是否紧急 */
    // urgentChange(checked){
    //     this.setState({
    //         urgent:checked
    //     })
    // }
    /**点击送审 */
    // handleOk(){
    //     this.setState({
    //         visible:false
    //     })
    //     var data ={
    //         process:this.state.process,
    //         urgent:this.state.urgent
    //     }
    //     console.log(data)
    // }
    /**点击取消送审 */
    // handleCancel(){
    //     this.setState({
    //         visible:false
    //     })
    // }
    /**监听select变化事件 */
    // selectChange(value){
    //     this.setState({
    //         process:value
    //     })
    // }
    /**渲染气泡卡片 Popover */
    render(){
        const Content = (
            <div style={{width:'300px',height:'130px'}}> 
                <div>
                    <Select placeholder='请选择审核流程' style={{width:'240px',height:'40px'}} onChange={this.props.selectChange}>
                    {
                        this.state.process? this.state.process.map(p=>{
                            return (
                                <Option key={p.commonBatchNumber.id} value={p.commonBatchNumber.id}>{p.commonBatchNumber.description}</Option>
                            );
                        }):''
                    }
                    </Select>
                </div>
                <div style={{padding:'10px'}} className='submit'>
                    <span style={{paddingRight:'10px'}}>是否紧急</span><Switch defaultChecked={this.props.defaultChecked} onChange={this.props.urgentChange} style={{width:'40px'}}></Switch>
                </div>
                <div style={{padding:'10px 10px 0px 10px',float:'right'}}>
                    <Button key='back' type='ghost' size='small' onClick={this.props.handleCancel} className='button' >取消</Button>
                    <Button key='submit' type='primary' size='small' onClick={this.props.handleOk} className={this.props.process>-1?'button':'grey-button'} disabled={this.props.process>-1?false:true} id='saveButton'>确定</Button>
                </div>
            </div>
        )
        return (
            <Popover title="设置审批细节"
            placement="topRight"
            content = {Content}
            trigger="click"
            visible={this.props.visible}
            onVisibleChange={this.props.handleVisibleChange}
            >
                <Button type='primary' size='default' className='button'><i className="fa fa-check"></i><span> 送审</span></Button>
            </Popover>
        );
    }
}
export default Submit;