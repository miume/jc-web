import React from 'react';
import {Modal,Icon,Checkbox} from 'antd';
import './permissionManagement.css';
import axios from 'axios';
class PermissionManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allMenus:[],    //存取所有菜单
            visible: false,
            operations:[],  //存取所有操作
            roleAuth:[]     //存取该角色的所有权限
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.change = this.change.bind(this);
        this.getAllAuth = this.getAllAuth.bind(this);
        this.getAuthByRoleId = this.getAuthByRoleId.bind(this);
        this.getAllMenus = this.getAllMenus.bind(this);
        // this.isChecked = this.isChecked.bind(this);
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
        const url = 'http://218.77.105.241:40080/jc/menu/getAllRecursive';
        axios({
            url:url,
            type:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data=>{
            const menu = data.data.data
            console.log(menu)
            this.setState({
                allMenus:menu
            })
        })
    }
    /** 获取所有操作权限*/
    getAllAuth(){
        const url = 'http://218.77.105.241:40080/jc/operation/getAll';
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
        const url = `http://218.77.105.241:40080/jc/role/getAuths?id=${this.props.value}`;
        axios({
            url:url,
            type:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data=>{
            var res = data.data.data;
            var roleAuth = res?data.data.data.menus:[];
            this.setState({
                roleAuth:roleAuth
            })
            //console.log(roleAuth)
        })
    }
    handleOk() {
        this.setState({
          visible: false
        });
    }
    handleCancel() {
        this.setState({
          visible: false
        });
      }
    change(event) {
        const target = event.target;
        const value =  target.value;
        const menuId = target.id;
        console.log(value)
        console.log(menuId)
        // if(target.checked === true )
        //     实现新增权限的功能
        // else 
        //     实现删除权限的功能
    }
    isChecked(value,id){
        // console.log(value)
        // console.log(menuId)
    }
    render() {
        const api = [
            {id:1,name:'新增'},
            {id:2,name:'删除'},
            {id:3,name:'编辑'},
            {id:4,name:'搜索'},
            {id:5,name:'导出'}
        ]
        const mennus = [
            {id:1, name : '用户权限', prefix:'AUTH_', parent:-1},
            {id:2, name : '权限管理', prefix:'AUTH_ROLE_', parent:1},
            {id:3, name : '菜单管理', prefix:'AUTH_MENU_', parent:1},
            {id:4, name : '操作管理', prefix:'AUTH_OP_', parent:1},
            {id:5, name : '基础信息', prefix:'AUTH_', parent:-1},
            {id:6, name : '菜单管理', prefix:'AUTH_MENU_', parent:4},
        ]
    //    console.log(this.state.roleAuth)
        return (
            <span>
                <a onClick={this.showModal} value={this.state.value}>权限管理</a>
                <Modal title='编辑权限' visible={this.state.visible} 
                onOk={this.handleOk} onCancel={this.handleCancel}
                okText='确定' cancelText='取消' width='780px' destroyOnClose='true' >
                <div style={{height:'500px',overflowY:'auto'}}>
                    <div style={{height:'600px'}}>
                        <div className='tableHead'>
                            <span>子模块选择</span>
                            <span>操作</span>
                        </div>
                        <div>
                        {
                            this.state.allMenus.map(m1=>{
                                return (
                                    <div key={m1.menuId}>
                                        <div className='divborder'><span className='rightBorder'><Icon type="caret-right" />{m1.menuName}</span><span></span></div>
                                            <div>
                                            {
                                            m1.menuList.map(m2=>{
                                                return (
                                                    <div key={m2.menuId} className='divborder'><span className='rightBorder'><Icon type="caret-down"  />{m2.menuName}</span>
                                                        <span style={{display:'inline'}}>
                                                            {
                                                            // this.state.operations.map(op=> {
                                                            //         if(this.state.roleAuth){
                                                            //             this.state.roleAuth.map(auth=>{
                                                            //                 console.log(auth)
                                                            //                 if(auth.id==m2.menuId) {
                                                            //                     console.log(auth.menuName)
                                                            //                     auth.operations.map(op1 =>{
                                                            //                         return (
                                                            //                             <span key={op1.id} style={{display:'inline'}}>
                                                            //                                <input type='checkbox' key={op1.id} value={op1.id} id={op1.id.toString()} onChange={this.change} checked/> {op1.operationName}</span>);
                                                            //                        })    
                                                            //                 }
                                                            //                       })
                                                            //             }
                                                            //             else{
                                                            //                 return (
                                                            //                     <span key={op.id} style={{display:'inline'}}>
                                                            //                        <input type='checkbox' key={op.id} value={op.id} id={op.id.toString()} onChange={this.change} /> {op.operationName}</span>);
         
                                                            //             }
                                                            //         })
                                                            this.state.operations.map(op=> {                                                           
                                                                return (
                                                                    // this.state.roleAuth && this.state.roleAuth
                                                                    <span key={op.id} style={{display:'inline'}}>
                                                                    <input type='checkbox' key={op.id} value={op.id} id={m2.menuId.toString()} onChange={this.change} checked={()=>this.isChecked(op.id,m2.menuId)} /> {op.operationName}</span>
                            
                                                                    );
                                                            } )
                                                            }
                                                            </span>
                                                        </div>
                                                );
                                            })
                                            }
                                            </div>
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>
                    </div>
               
                </Modal>
            </span>
        );
    }
}
export default PermissionManagement;