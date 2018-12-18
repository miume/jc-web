import React from 'react';
import {Modal,Icon,message} from 'antd';
import './permissionManagement.css';
import axios from 'axios';
import NewButton from '../BlockQuote/newButton';
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
        // this.handleCancel = this.handleCancel.bind(this);
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
        const url = `${this.props.url.role.getAuths}?id=${this.props.value}`;
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
        //console.log(data)
        //实现新增权限的功能
        if(target.checked === true ){
            axios({
                url:`${this.props.url.role.addOneOperation}`,
                method:'post',
                params:data,
                headers:{
                    'Authorization':this.props.Authorization
                }
            }).then(data =>{
                message.info(data.data.message)
            })
            .catch(()=>{
                message.info('权限新增失败，请联系管理员！')
            })
        }
        //实现删除权限的功能
        else {
            axios({
                url:`${this.props.url.role.deleteOneOperation}`,
                method:'Delete',
                params:data,
                headers:{
                    'Authorization':this.props.Authorization
                }
            }).then(data =>{
                message.info(data.data.message)
            })
            .catch(()=>{
                message.info('权限删除失败，请联系管理员！')
            })
        }

    }
    isChecked(){
        return 1;
    }
    render() {
        // const api = [
        //     {id:3,name:'新增'},
        //     {id:1,name:'删除'},
        //     {id:2,name:'编辑'},
        //     {id:4,name:'搜索'},
        //     {id:5,name:'导出'}
        // ]
        // const mennus = [
        //     {id:1, name : '用户权限', prefix:'AUTH_', parent:-1},
        //     {id:2, name : '权限管理', prefix:'AUTH_ROLE_', parent:1},
        //     {id:3, name : '菜单管理', prefix:'AUTH_MENU_', parent:1},
        //     {id:4, name : '操作管理', prefix:'AUTH_OP_', parent:1},
        //     {id:5, name : '基础信息', prefix:'AUTH_', parent:-1},
        //     {id:6, name : '菜单管理', prefix:'AUTH_MENU_', parent:4},
        // ]
        return (
            <span>
                <span  className='blue' onClick={this.showModal} value={this.state.value}>权限管理</span>
                <Modal title='编辑权限' visible={this.state.visible} centered={true}
                closable={false} maskClosable={false} destroyOnClose='true' className='modal-lg'
                footer={[
                    <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                  ]}
                   >
                <div style={{height:'460px'}}>
                {/**实现用div布局，显示table */}
                    <div style={{height:'600px'}}>
                        <div className='tableHead'>
                            <span>子模块选择</span>
                            <span>操作</span>
                        </div>
                        <div className='PM-tableBody'>
                        {
                            this.state.allMenus.map(m1=>{
                                return (
                                    /**先显示一级菜单*/
                                    <div key={m1.menuId}>
                                        <div className='divborder'><span className='rightBorder menu1Label'><i class="fa fa-bookmark"></i>&nbsp;&nbsp;&nbsp;{m1.menuName}</span><span></span></div>
                                            <div>
                                            {
                                            /**遍历二级菜单 */
                                            m1.menuList.map(m2=>{
                                                var auth = this.state.roleAuth;
                                                var menuList = auth.filter(au=>au.id === m2.menuId);
                                                //console.log(menuList)
                                                if(menuList.length>0){
                                                    var menu = menuList[0];
                                                   return (
                                                       <div key={menu.id} className='divborder'><span className='rightBorder'><i class="fa fa-bookmark"></i>&nbsp;&nbsp;&nbsp;{menu.menuName}</span>
                                                           <span style={{display:'inline'}}>
                                                           {
                                                              this.state.operations.map(op=>{
                                                                  var isChecked = menu.operations.find(me=>me.id===op.id);
                                                                  if(isChecked){

                                                                      return (
                                                                        <span key={op.id} style={{display:'inline'}}>
                                                                          <input type='checkbox' key={op.id} value={op.id} id={menu.id.toString()} onChange={this.change} defaultChecked={true}/>&nbsp;&nbsp;&nbsp;{op.operationName}</span>
                                                                       // <AuthInput key={op.id} value={op.id} id={menu.id.toString()} change={this.change} operationName={op.operationName} checked={true} />
                                                                      );
                                                                  }else{
                                                                      return (
                                                                      <AuthInput key={op.id} value={op.id} id={menu.id.toString()} change={this.change} operationName={op.operationName}  />
                                                                      )}
                                                              })
                                                           }
                                                           </span>
                                                       </div>
                                                   );
                                                }else{
                                                    return (
                                                    <div key={m2.menuId} className='divborder'><span className='rightBorder'><i class="fa fa-level-up fa-flip-horizontal"></i>&nbsp;&nbsp;&nbsp;{m2.menuName}</span>
                                                        <span style={{display:'inline'}}>
                                                        {
                                                        this.state.operations.map(op=>{
                                                            return (
                                                                <AuthInput key={op.id} value={op.id} id={m2.menuId.toString()} change={this.change} operationName={op.operationName}  />
                                                            );
                                                        })
                                                        }
                                                        </span>
                                                    </div>
                                                    )}
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

class AuthInput extends React.Component{
    render(){
        return(
            <span style={{display:'inline'}}>
                <input type='checkbox' value={this.props.value} id={this.props.id} onChange={this.props.change} checked={this.props.checked} /> &nbsp;{this.props.operationName}</span>
        );
    }
}
