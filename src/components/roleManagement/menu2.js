import React from 'react';
import AuthInput from './authInput';
import PermissionMenu1 from './menu1';
class PermissionMenu2 extends React.Component{
    constructor(props){
        super(props);
        this.getCurrentMenu2 = this.getCurrentMenu2.bind(this);
    }
    render(){
        const menu2List = this.props.menu2List;
        //auth 存取当前角色的所有菜单权限
        const auth = this.props.roleAuth; 
        return (
            <div>
            {
                this.getCurrentMenu2(menu2List,auth)
            }
            </div>
        )
  }
  
  getCurrentMenu2(menu2List,auth){
      /**遍历二级菜单 */
      var menu2 = []
      if(menu2List.length > 0){ 
        menu2 = menu2List.map(m2=>{ 
            return <PermissionMenu1 key={m2.menuId} flag={2} menu2Name={m2.menuName} />
            // var menuList = auth.filter(au=>au.menuId === m2.menuId);
            // console.log(menu2List)
            // if(menuList.length ){
            //     var menu = menuList[0];
                
            // }
        })
      } 
      return menu2
  }
}
export default PermissionMenu2;