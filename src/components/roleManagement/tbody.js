import React from 'react';
import PermissionMenu1 from './menu1';
import AuthInput from './authInput';
class PermissionThead extends React.Component{
    constructor(props){
        super(props);
        this.getCurrentMenu2 = this.getCurrentMenu2.bind(this);
    }
    getCurrentMenu2(menu2List,operations,auth){
        /**遍历二级菜单 */
        var menu2 = [];
        if(menu2List.length > 0){ 
          menu2 = menu2List.map(m2=>{
              //若二级菜单没有子菜单，则依次渲染二级菜单
              if(m2.menuList.length === 0) 
                 return this.menuAccordingToRoleAuth(m2,auth,operations)
              else{
                  //若二级菜单有子菜单则如下面渲染 先渲染二级菜单，在渲染其子菜单
                  let menu3 = [
                    <PermissionMenu1 key={m2.menuId} flag={2} menu2Name={m2.menuName} />
                  ];
                  m2.menuList.map(m3 => {
                      let menu = this.menuAccordingToRoleAuth(m3,auth,operations)
                      menu3.push(menu)
                    // menu3.push(<PermissionMenu1 key={m3.menuId} flag={2} menu2Name={m3.menuName} />)
                  })
                  return menu3
              }
          })
        } 
        return menu2
    }
    //根据当前角色的权限选择二级和三级菜单的渲染方式
    menuAccordingToRoleAuth(menu,auth,operations){
        var menuList = auth.filter(au=>au.menuId === menu.menuId)[0];
        if(menuList != undefined){
            return (
                <div className='divborder' key={menu.menuId}>
                    <span className='rightBorder menu2Label'><i className="fa fa-level-up fa-flip-horizontal"></i>&nbsp;&nbsp;&nbsp;{menuList.menuName}</span>
                    <span className='operationSpan'>{this.judgeInputAccordingToOperations(menuList,operations)}</span>
                </div>
            )
        }else{
            return (
                <div className='divborder' key={menu.menuId}>
                    <span className='rightBorder menu2Label'><i className="fa fa-level-up fa-flip-horizontal"></i>&nbsp;&nbsp;&nbsp;{menu.menuName}</span>
                    <span className='operationSpan'>
                        {/* <span><i className='fa fa-2x fa-caret-left'></i></span> */}
                        {this.judgeInputAccordingToOperations(menu,operations)}
                        {/* <span><i className='fa fa-2x fa-caret-right'></i></span> */}
                    </span>
                </div>
            )
        }
    }
    //根据当前用户角色在子菜单下的操作权限 来确定input是否选中
    judgeInputAccordingToOperations(menu,operations){
        let inputStyle = [];
        inputStyle = operations.map(op => {
            let isChecked = menu.operations?menu.operations.find(mop => mop.id === op.id):false;
            return <AuthInput key={op.id} value={op.id} id={menu.menuId.toString()} operationName={op.operationName} 
                   checked={isChecked?true:false} change={this.props.change} />
        }) 
        return inputStyle;
    } 
    render(){
        const auth = this.props.roleAuth;
        const operations = this.props.operations;
        return (
            <div className='PM-tableBody'>
            {
                this.props.allMenus?this.props.allMenus.map(m1=>{
                    return (
                        /**先显示一级菜单*/
                        <div key={m1.menuId}>
                            <PermissionMenu1 flag={1} menu1Name={m1.menuName} />
                            {this.getCurrentMenu2(m1.menuList,operations,auth)}
                        </div>
                    );
                }): null
            }
            </div>
        )
    }
}
export default PermissionThead;