import React from 'react';
import PermissionMenu1 from './menu1';
import PermissionMenu2 from './menu2';
class PermissionThead extends React.Component{
    constructor(props){
        super(props);
        this.getCurrentMenu2 = this.getCurrentMenu2.bind(this);
    }
    getCurrentMenu2(menu2List){
        /**遍历二级菜单 */
        var menu2 = [];
        if(menu2List.length > 0){ 
          menu2 = menu2List.map(m2=>{ 
              return <PermissionMenu1 key={m2.menuId} flag={2} menu2Name={m2.menuName} />
              // var menuList = auth.filter(au=>au.menuId === m2.menuId);
              // console.log(menuList)
              // if(menuList.length ){
              //     var menu = menuList[0];
              //     return <PermissionMenu1 flag={2} menu2Name={menu.menuName} />
              // }
          })
        } 
        return menu2
    }
    render(){
        return (
            <div className='PM-tableBody'>
            {
                this.props.allMenus.map(m1=>{
                    return (
                        /**先显示一级菜单*/
                        <div key={m1.menuId}>
                            <PermissionMenu1 flag={1} menu1Name={m1.menuName} />
                            {this.getCurrentMenu2(m1.menuList)}
                            {/* <PermissionMenu2 roleAuth={this.props.roleAuth} operations={this.props.operations}
                            menu2List={m1.menuList} /> */}
                        </div>
                    );
                })
            }
            </div>
        )
    }
}
export default PermissionThead;