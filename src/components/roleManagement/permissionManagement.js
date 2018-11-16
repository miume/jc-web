import React from 'react';
import {Modal,Icon,Checkbox} from 'antd';
import './permissionManagement.css';
import axios from 'axios';
class PermissionManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allMenus:[],
            visible: false,
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.change = this.change.bind(this);
        this.getAllAuth = this.getAllAuth.bind(this);
        this.getAuthByRoleId = this.getAuthByRoleId.bind(this);
        this.getAllMenus = this.getAllMenus.bind(this);
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
        const url = 'http://218.77.105.241:40080/jc/role/getAllAuths';
        axios({
            url:url,
            type:'get',
            headers:{
                'Authorization':this.props.Authorization
            }
        }).then(data=>{
            console.log(data.data)
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
            console.log(data.data.data)
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
        const menu = [
            {
              "menuId": 4,
              "menuName": "用户和权限",
              "prefix": "AUTH",
              "menuType": 1,
              "parent": -1,
              "menuDTOList": [
                {
                  "menuId": 1,
                  "menuName": "权限管理",
                  "prefix": "AUTH_AUTH",
                  "menuType": 2,
                  "parent": 4,
                  "menuDTOList": []
                },
                {
                  "menuId": 2,
                  "menuName": "菜单管理",
                  "prefix": "AUTH_MENU",
                  "menuType": 2,
                  "parent": 4,
                  "menuDTOList": []
                },
                {
                  "menuId": 3,
                  "menuName": "角色管理",
                  "prefix": "AUTH_ROLE",
                  "menuType": 2,
                  "parent": 4,
                  "menuDTOList": []
                },
                {
                  "menuId": 5,
                  "menuName": "用户管理",
                  "prefix": "AUTH_USER",
                  "menuType": 2,
                  "parent": 4,
                  "menuDTOList": []
                },
                {
                  "menuId": 6,
                  "menuName": "部门管理",
                  "prefix": "AUTH_DEPARTMENT",
                  "menuType": 2,
                  "parent": 4,
                  "menuDTOList": []
                }
              ]
            },
            {
              "menuId": 7,
              "menuName": "质量和流程",
              "prefix": "PROCESS",
              "menuType": 1,
              "parent": -1,
              "menuDTOList": [
                {
                  "menuId": 8,
                  "menuName": "数据录入",
                  "prefix": "PROCESS_DATA_IN",
                  "menuType": 2,
                  "parent": 7,
                  "menuDTOList": []
                },
                {
                  "menuId": 9,
                  "menuName": "流程管理",
                  "prefix": "PROCESS_PROCESS",
                  "menuType": 2,
                  "parent": 7,
                  "menuDTOList": []
                },
                {
                  "menuId": 10,
                  "menuName": "待办事项",
                  "prefix": "PROCESS_TASK",
                  "menuType": 2,
                  "parent": 7,
                  "menuDTOList": []
                },
                {
                  "menuId": 11,
                  "menuName": "基础数据",
                  "prefix": "PROCESS_BASE_DATA",
                  "menuType": 2,
                  "parent": 7,
                  "menuDTOList": []
                }
              ]
            },
            {
              "menuId": 16,
              "menuName": "dumin",
              "prefix": "",
              "menuType": 1,
              "parent": -1,
              "menuDTOList": []
            }
          ]
        return (
            <span>
                <a onClick={this.showModal} value={this.state.value}>权限管理</a>
                <Modal title='编辑权限' visible={this.state.visible} 
                onOk={this.handleOk} onCancel={this.handleCancel}
                okText='确定' cancelText='取消' width='650px' destroyOnClose='true' >
                <div style={{height:'500px'}}>
                    <div className='tableHead'>
                        <span>子模块选择</span>
                        <span>操作</span>
                    </div>
                    <div>
                    {
                        this.state.allMenus.map(m1=>{
                            return (
                                <div key={m1.menuId}>
                                    <div className='divborder'><span>{m1.menuName}</span><span></span></div>
                                        <div>
                                        {
                                        m1.menuList.map(m2=>{
                                            return (
                                                <div key={m2.menuId} className='divborder'><span>{m2.menuName}</span><span></span></div>
                                            );
                                        })
                                        }
                                        </div>
                                </div>
                            );
                        })
                    }
                    </div>
                    {/* <table className="tableHead">
                        <colgroup style={{width:'29.5%'}}></colgroup>
                        <colgroup style={{width:'63%'}}></colgroup>
                        <thead>
                            <tr>
                                <td>子模块选择</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                    </table>
                    <div className="tableDiv">
                        <table className="tableTbody">
                            <colgroup style={{width:'29.5%'}}></colgroup>
                            <colgroup style={{width:'63%'}}></colgroup>
                            <tbody>
                            {
                            this.state.allMenus.map(m1 => 
                                <tr key={m1.menuId}>
                                    <td style={{textAlign:'left',paddingLeft:'40px'}} ><Icon type="caret-down" theme="filled" />{m1.menuName}</td>
                                    <td></td><td></td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table> */}
                    </div>
               
                </Modal>
            </span>
        );
    }
}
export default PermissionManagement;