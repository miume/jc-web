import React from 'react';
import {Modal,message} from 'antd';
import RawTest from './rawTest';
import Procedure from './procedure';
import RedList from './redlist';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import axios from 'axios';
class CheckModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            reply:''
        }
        this.fail = this.fail.bind(this);
        this.pass = this.pass.bind(this);
        this.judgeType = this.judgeType.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getReplyData = this.getReplyData.bind(this);
    }
    /**根据dataType判断是那种类型产品送审 */
    judgeType(type){
        switch(type){
            case 1:  return <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 2:  return <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 3:  return <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 4:  return <RawTest url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 5:  return <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 6:  return <RedList url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 7:  return <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 8:  return <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/>; break;
            case 9:  return <RawTest url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag} type={9}/>; break;
            case 10: return <RawTest url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag} type={10}/>; break;
            default: return null ; 
        }
    }
    /**点击审核 */
    handleCheck(){
        this.setState({
            visible:true
        })
    }
    /**根据batchNumberId 查询审核记录 */
    getReplyData(value){
        this.state.reply = value;
    }
    /**点击取消  */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    fail(){
        this.checkApply(0);
    }
    pass(){
        this.checkApply(1);
    }
    checkApply(status){
        const {reply} = this.state;
        if(reply===''){
            message.info('请输入审核意见！');
            return
        }
        const userId = JSON.parse(localStorage.getItem('menuList')).userId;
        axios.put(`${this.props.url.toDoList}/${this.props.dataId}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                userId:userId,
                reply:reply,
                isAccept:status
            }
        }).then((data)=>{
            this.props.fetch(userId)
            this.props.getHistory(userId)
            message.info(data.data.message);
        }).catch(()=>{
            message.info('操作失败，请联系管理员！')
        })
        this.setState({
            visible:false
        })
    }
    render(){
        const type = this.props.dataType.toString();
        const dataType = JSON.parse(localStorage.getItem('dataType'));
        return (
            <span>
                <NewButton name={this.props.flag?'详情':'审核'} className={this.props.flag?'fa fa-floppy-o':'fa fa-check'} handleClick={this.handleCheck} ></NewButton>
                <Modal visible={this.state.visible} title={this.props.flag?`${dataType[type]}`+'详情':`${dataType[type]}`+'审核'} centered={true}
                closable={false} maskClosable={false} className={this.props.dataType===2?'modal-xlg':'modal-md'}
                footer={[
                    <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                    <span key='check' className={this.props.flag?'hide':''} >
                        <NewButton key='fail' className='fa fa-times' name='不通过' handleClick={this.fail} />,
                        <NewButton key='pass' className='fa fa-check' name='通过' handleClick={this.pass} />,
                    </span>
                    
                ]}
                >
                {
                    this.judgeType(this.props.dataType)
                }
                {/* <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData} flag={this.props.flag}/> */}
                </Modal>
            </span>
        );
    }
}
export default CheckModal;