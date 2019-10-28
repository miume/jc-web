import React from 'react';
import axios from 'axios'
import {Modal,message} from "antd";
import RoleModal from './roleModal';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
class Add extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false
        }
        this.handleOk = this.handleOk.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    //点击新增，显示弹出框
    handleAdd(){
        this.setState({
            visible : true
        })
    }
    /**新增一条记录 */
    handleOk() {
        let roleName = this.formRef.props.form.getFieldValue('roleName')
        if(roleName === ''){
            message.info('角色名称不能为空！');
            return
        }
        this.add()
        this.handleCancel()
    }
    /**对应新增确认取消 */
    handleCancel() {
        this.setState({
            visible: false,
        });
        /**清空新增form组件的内容 */
        this.formRef.props.form.resetFields()
    }
    add(){
        axios({
            url : `${this.props.url.role.role}`,
            method:'post',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:this.formRef.props.form.getFieldsValue(),
            type:'json'
        }).then((data) => {
            message.info(data.data.message);
            this.props.fetch({
                pageNumber: 1,
                sortField: 'id',
                sortType: 'desc',
            });
            //this.pagination.current = 1;  //新增之后到第一页，不然会保持新增之前的界面页数
        })
            .catch(function () {
                message.info('新增失败，请联系管理员！');
            });
    }
    render() {
        return (
            <span className={this.props.flag?'':'hide'}>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                <Modal title="新增" visible={this.state.visible} closable={false} className='modal modal-sm' maskClosable={false}
                       centered={true}
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                       ]}>
                    <RoleModal wrappedComponentRef={(form) => this.formRef = form} reset={this.state.reset}></RoleModal>
                </Modal>
            </span>
        );
    }
}
export default Add;
