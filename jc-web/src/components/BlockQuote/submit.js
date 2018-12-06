import React from 'react';
import {Popover,Button,Select, Switch} from 'antd';
import axios from 'axios';
const Option = Select.Option;
class Submit extends React.Component{
    server
    Authorization
    componentDidMount(){
        axios({
            url:`${this.server}/jc/common/batchAuditTask/getAll`,
            method:'get',
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            const res = data.data.data
            //console.log(res)
            this.setState({
                processdata:res
            })
        })
    }
    constructor(props){
        super(props);
        this.state = {
            processdata:[]
        }
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        // this.handleCancel = this.handleCancel.bind(this);
        // this.handleOk = this.handleOk.bind(this);
        // this.urgentChange = this.urgentChange.bind(this);
        // this.selectChange = this.selectChange.bind(this);
    }
    // handleVisibleChange=(visible)=>{
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
    // /**点击送审 */
    // handleOk(){
    //     this.setState({
    //         visible:false
    //     })
    //     const userId = JSON.parse(localStorage.getItem('menuList')).userId;
    //     console.log(userId)
    //     var details = [];
    //     this.props.data.forEach(d=>{
    //         details.push({
    //             stockId:d.id,
    //             quality:d.outQuantity,
    //             weight:d.outWeight
    //         })
    //     })
    //     var commonBatchNumber ={
    //         userId:userId,
    //         urgent:this.state.urgent?1:0
    //     }
    //     const data = {
    //         taskId:parseInt(this.state.process),
    //         batchRepoSendOutDetail:{
    //             commonBatchNumber:commonBatchNumber,
    //             details:details
    //         }

    //     }
    //     console.log(data)
    // }
    // /**点击取消送审 */
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
                        this.state.processdata.map(p=>{
                            return (
                                <Option key={p.batchNumberId} value={p.batchNumberId}>{p.name}</Option>
                            );
                        })
                    }
                    </Select>
                </div>
                <div style={{padding:'10px'}}>
                    <span style={{paddingRight:'10px'}}>是否紧急</span><Switch onChange={this.props.urgentChange} style={{width:'40px'}}></Switch>
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