import React from 'react';
import {Modal,message} from 'antd';
import './permissionManagement.css';
import axios from 'axios';
import PermissionThead from './thead';
import PermissinTbody from './tbody';
import CancleButton from '../../BlockQuote/cancleButton';
class PermissionManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allMenus:[],    //存取所有菜单
            visible: false,
            operations:[],  //存取所有操作
            roleAuth:[],     //存取该角色的所有权限
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.change = this.change.bind(this);
        this.getAllAuth = this.getAllAuth.bind(this);
        this.getAuthByRoleId = this.getAuthByRoleId.bind(this);
        this.getAllMenus = this.getAllMenus.bind(this);
        this.addOneOperation = this.addOneOperation.bind(this);
        this.deleteOneOperation = this.deleteOneOperation.bind(this);
    }
    /**显示权限分配弹出框 */
    showModal() {
        this.setState({
          visible: true
        });
        this.getAllAuth();
        this.getAuthByRoleId();
        this.getAllMenus();
      }
    /**获取所有菜单 */
    getAllMenus(){
        const url = `${this.props.url.menu.getAll}`;
        axios({
            url:url,
            type:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data=>{
            this.setState({
                allMenus:data.data?data.data.data:[]
            })
        })
    }
    /** 获取所有操作权限*/
    getAllAuth(){
        const url = `${this.props.url.operation.getAll}`;
        axios({
            url:url,
            type:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data=>{
            const operations = data.data.data;
            this.setState({
                operations:operations
            })
        })
    }
    /** 通过角色id获取角色菜单权限*/
    getAuthByRoleId(){
        const url = `${this.props.url.role.role}/${this.props.value}`;
        axios({
            url:url,
            type:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data=>{
            var res = data.data.data;
            var roleAuth = res?data.data.data.authorities:[];
            this.setState({
                roleAuth:roleAuth
            })
        })
    }
    handleOk() {
        this.setState({
          visible: false
        });
    }
    // handleCancel() {
    //     this.setState({
    //       visible: false
    //     });
    //   }
    change(event) {
        const target = event.target;
        /**获取操作id 二级菜单id */
        const operationId =  target.value;
        const menuId = target.id;
        const data = {
            roleId:parseInt(this.props.value),
            menuId:parseInt(menuId),
            operationId:parseInt(operationId)
        }
        //实现新增权限的功能
        if(target.checked === true ){
            this.addOneOperation(data)
        }
        //实现删除权限的功能
        else {
            this.deleteOneOperation(data)
        }
    }
    //实现新增权限的功能
    addOneOperation(data){
        axios({
            url:`${this.props.url.role.addOneOperation}`,
            method:'post',
            params:data,
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data =>{
            if(data.data.code === 0)
                message.info('权限新增成功！')
        })
        .catch(()=>{
            message.info('权限新增失败，请联系管理员！')
        })
    }
    //实现删除权限的功能
    deleteOneOperation(data){
        axios({
            url:`${this.props.url.role.deleteOneOperation}`,
            method:'Delete',
            params:data,
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data =>{
            if(data.data.code === 0)
                message.info('权限删除成功！')
        })
        .catch(()=>{
            message.info('权限删除失败，请联系管理员！')
        })
    }
    render() {
        return (
            <span>
                <span  className='blue' onClick={this.showModal} value={this.state.value}>权限管理</span>
                <Modal title='编辑权限' visible={this.state.visible} centered={true}
                closable={false} maskClosable={false} destroyOnClose='true' width={820}
                footer={[
                    <CancleButton key='back' handleCancel={this.handleOk} flag={1}/>
                  ]}
                   >
                <div className='permissionContanier'>
                {/**实现用div布局，显示table */}
                    <div className='permissionTable'>
                        <PermissionThead />
                        <PermissinTbody allMenus={this.state.allMenus} roleAuth={this.state.roleAuth}
                           operations={this.state.operations} change={this.change} />
                    </div>
                </div>

                </Modal>
            </span>
        );
    }
}
export default PermissionManagement;

