import React from 'react';
import {Modal,message} from 'antd';
import CancleButton from "../BlockQuote/cancleButton";
import SaveButton from "../BlockQuote/saveButton";
import Submit from "../BlockQuote/submit";
import NewButton from "../BlockQuote/newButton";
import PurchaseModal from './purchaseModal';
import axios from 'axios';


class PackGenerateModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subVisible: false,
            visible: false,
            process:-1,
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
    }
    render() {
        return(
            <span>
                <NewButton handleClick={this.handlePack} name='打包' className='fa fa-cube' />
                <Modal
                    title="打包数据"
                    visible={this.state.visible}
                    width="1030px"
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <CancleButton
                            handleCancel = {this.handleCancel}
                            key='cancel'
                        />,
                        <SaveButton
                            onClick={this.handleOk}
                            key='save'
                        />,
                        <Submit
                            key='submit'
                            visible={this.state.subVisible}
                            handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange}
                            urgentChange={this.urgentChange}
                            url={this.props.url}
                            process={this.state.process}
                            handleCancel={this.handleCancelApply}
                            handleOk={this.handleOkApply}
                        />
                    ]}
                >
                <div style={{height:500}}>
                        <PurchaseModal
                            clickState ={0}
                        />
                </div>
            </Modal>
            </span>
        )
    }
    handlePack = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel() {
        this.setState({
            visible: false,
            data : [1]
        });
    }
    /** 送审*/
    /**监控送审界面的visible */
    handleVisibleChange(visible){
        this.setState({
            subVisible:visible
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked?0:-1
        })
    }
    /**监听送审select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            subVisible:false
        })
    }
    /**点击送审 */
    handleOkApply(){
        this.applyOut(1);
    }
    /**点击保存送审 */
    handleSave(){
        this.applyOut(0);
    }
    applyOut(status){
        const details = this.state.addApplyData;
        console.log(details)
        for(var i = 0; i < details.length; i++){
            delete details[i].id;
            var e = details[i].procedureTestRecord;
            for(var j in e){
                if( e[j]==='' || e[j] === -1 || e[j] === []){
                    message.info('新增数据不能为空，请填写完整！');
                    return
                }
            }
        }
        this.setState({
            visible:false,
            visible1:false
        })
        const createPersonId = JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber = {
            createPersonId:createPersonId,
            // status:status,
            // isUrgent:this.state.urgent
        }
        axios.post(`${this.props.url.procedure.procedureTestRecord}`,{
            commonBatchNumber:commonBatchNumber,
            details:details
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            // params:{
            //     taskId:taskId
            // }
        }).then((data)=>{
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }
            else{
                message.info(data.data.message);
                this.props.fetch();
            }

        }).catch(()=>{
            message.info('操作失败，请联系管理员！')
        })
    }
    /**保存后送审送审 */
    applyReview(dataId){
        //const taskId = this.state.process === -1?'':this.state.process;
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            message.info(data.data.message);
            this.props.fetch();
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
}

export default PackGenerateModal;