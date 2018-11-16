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

        return (
            <span>
                <a onClick={this.showModal} value={this.state.value}>权限管理</a>
                <Modal title='编辑权限' visible={this.state.visible} 
                onOk={this.handleOk} onCancel={this.handleCancel}
                okText='确定' cancelText='取消' width='650px' destroyOnClose='true' >
                <div style={{height:'400px'}}>
                    <table className="tableHead">
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
                                    <td></td>
                                </tr>
                                // {
                                // m1.menuDTOList.map(m2=>{
                                //     <tr key={m2.menuId}>
                                //         <td><Icon type="caret-right" theme="filled" />{m2.menuName}</td>
                                //         <td>
                                //         {
                                //             api.map(op=>{
                                //                 <span style={{paddingRight:'12px'}} key={op.id}>
                                //                 <Checkbox  value={op.name} id={m2.menuId.toString()} onChange={this.change}>{op.name}</Checkbox>
                                //                 </span>
                                //             })   
                                //         }
                                //         </td>
                                //     </tr>  
                                // })
                                // }
                            )
                                // mennus.map(v => {
                                //     return v.parent === -1 ? (
                                //         <tr key={v.id}>
                                //             <td style={{textAlign:'left',paddingLeft:'40px'}} ><Icon type="caret-down" theme="filled" />{v.name}</td>
                                //             <td></td>
                                //         </tr>
                                //     ):(
                                //         <tr key={v.id+'menu'}>
                                //             <td><Icon type="caret-right" theme="filled" />{v.name}</td>
                                //             <td>
                                //                 {
                                //                     api.map(v1 => {
                                //                         return (
                                //                             <span style={{paddingRight:'12px'}} key={v1.id} >  
                                //                             <Checkbox value={v1.id} id={v.id.toString()} onChange={this.change}>{v1.name}</Checkbox>
                                //                              {/* <span>{v1.name}</span> <input type='checkbox' value={v1.id} id={v.id} onChange={this.change} /> */}
                                //                             </span>             
                                //                         );
                                //                     })
                                //                 }
                                //             </td>
                                //         </tr>
                                //     );
                                // })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                </Modal>
            </span>
        );
    }
}
export default PermissionManagement;