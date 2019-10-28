import React from 'react';
import {Modal,message} from 'antd';
import Procedure from './procedure';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
import axios from 'axios';
// import axios from 'axios';
class DetailModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            reply:''
        }
        this.fail = this.fail.bind(this);
        this.pass = this.pass.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getReplyData = this.getReplyData.bind(this);
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
            message.info(data.data.message);
        }).catch(()=>{
            message.info('操作失败，请联系管理员！')
        })
        this.setState({
            visible:false
        })
    }
    render(){
        return (
            <span>
                <NewButton name='详情' className='fa fa-floppy-o' handleClick={this.handleCheck} ></NewButton>
                <Modal visible={this.state.visible} title='审核' width='1100px' centered={true}
                closable={false} maskClosable={false}
                footer={[
                    <CancleButton key='cancle' handleCancel={this.handleCancel} flag={1}/>,
                ]}
                >
                <Procedure url={this.props.url} dataId={this.props.dataId} getReplyData={this.getReplyData}/>
                </Modal>
            </span>
        );
    }
}
export default DetailModal;
