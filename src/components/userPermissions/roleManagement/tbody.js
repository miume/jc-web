import React from 'react';
import PermissionMenu1 from './menu1';
import AuthInput from './authInput';
class PermissionThead extends React.Component{
    constructor(props){
        super(props);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.getCurrentMenu2 = this.getCurrentMenu2.bind(this);
    }
    moveLeft(e){
        const id = e.target.getAttribute('value')
        this.handleMove(-1,id);
    }
    moveRight(e){
        const id = e.target.getAttribute('value')
        this.handleMove(1,id);
    }
    handleMove(number,id) {
        var middle = document.getElementById(`menu-${id}`)
        let count = 560;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                }
                if(count <= 0 || pre === middle.scrollLeft) {
                    clearInterval(interval);
                }
            },1)
        }else if(gap > 0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                count -= 1;
                middle.scrollLeft += (number === 1 ? 1 : -1);
                // tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    }
    /**
     *
     * @param {*代表二级菜单} menu2List
     * @param {*代表所有操作权限} operations
     * @param {*代表当前角色的所有菜单权限} auth
     * @param {*代表是否要隐藏向左向右icon 操作权限是否大于8} flag
     */
    getCurrentMenu2(menu2List,operations,auth,flag){
        /**遍历二级菜单 */
        let menu2 = [];
        if(menu2List.length > 0){
          menu2 = menu2List.map(m2=>{
              //若二级菜单没有子菜单，则依次渲染二级菜单
              if(m2.menuList.length === 0)
                 return this.menuAccordingToRoleAuth(m2,auth,operations,flag)
              else{
                  //若二级菜单有子菜单则如下面渲染 先渲染二级菜单，在渲染其子菜单
                  let menu3 = [
                    <PermissionMenu1 key={m2.menuId} flag={2} menu2Name={m2.menuName} />
                  ];
                  m2.menuList.map(m3 => {
                      let menu = this.menuAccordingToRoleAuth(m3,auth,operations,flag)
                      menu3.push(menu)
                  })
                  return menu3
              }
          })
        }
        return menu2
    }
    //根据当前角色的权限选择二级和三级菜单的渲染方式
    menuAccordingToRoleAuth(menu,auth,operations,flag){
        var menuList = auth.filter(au=>au.menuId === menu.menuId)[0];
        const arg = menuList != undefined ? menuList : menu;
        const menuFlag = menu.menuType === 3 ? 0 : 1 ;
        return (
            <div className='divborder' key={arg.menuId}>
                <div className='rightBorder menu2Label'><i className={menuFlag?"fa fa-level-up fa-flip-horizontal":'fa fa-circle'}></i>&nbsp;&nbsp;&nbsp;{arg.menuName}</div>
                <div className={flag?'displayI':'hide'}><i className='fa fa-lg fa-caret-left' value={arg.menuId}  onClick={this.moveLeft}></i></div>
                <div id={`menu-${arg.menuId}`}  className='operationSpan'>
                    <div className='displayScroll'>
                        {this.judgeInputAccordingToOperations(arg,operations)}
                    </div>
                </div>
                <div className={flag?'displayI':'hide'}><i className='fa fa-lg fa-caret-right' value={arg.menuId} onClick={this.moveRight}></i></div>
            </div>
            )
    }
    //根据当前用户角色在子菜单下的操作权限 来确定input是否选中
    judgeInputAccordingToOperations(menu,operations){
        let inputStyle = operations?operations.map(op => {
            let isChecked = menu.operations?menu.operations.find(mop => mop.id === op.id):false;
            return <AuthInput key={op.id} value={op.id} id={menu.menuId.toString()} operationName={op.operationName}
                   checked={isChecked?true:false} change={this.props.change} />
        }):null
        return inputStyle;
    }
    render(){
        const auth = this.props.roleAuth;
        const operations = this.props.operations;
        const flag = operations?(operations.length > 8 ? true : false):false;
        return (
            <div className='PM-tableBody'>
            {
                this.props.allMenus?this.props.allMenus.map(m1=>{
                    return (
                        /**先显示一级菜单*/
                        <div key={m1.menuId}>
                            <PermissionMenu1 flag={1} menu1Name={m1.menuName} />
                            {this.getCurrentMenu2(m1.menuList,operations,auth,flag)}
                        </div>
                    );
                }): null
            }
            </div>
        )
    }
}
export default PermissionThead;
