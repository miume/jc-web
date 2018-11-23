import React from 'react';
import { Menu} from 'antd';
import {withRouter} from "react-router-dom";
import Auth from '../auth/Auth';
const SubMenu = Menu.SubMenu;

class Menu1List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openKeys : [],
      // rootSubmenuKeys : menu.map(element => element.menuId)
    }
    this.onOpenChange = this.onOpenChange.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }
  /**只展开当前父级菜单 */
  onOpenChange(openKeys){
    // console.log('openKeys:'+openKeys)
    /**找到当前展开的菜单id */
    const latestOpenKeys = openKeys.find(key=>this.state.openKeys.indexOf(key)===-1);
    // console.log('latestOPenKeys:'+latestOpenKeys)
    /**如果展开当前一级菜单和以前的不一样 */
    if(this.state.openKeys != latestOpenKeys){
        this.setState({
          openKeys : [latestOpenKeys]
        });
    }
  }
  /**点击二级菜单 存取6个访问的二级菜单*/
  menuClick(event){
    const path = event.key;
    const menuName = event.item.props.children;
    var menuClick = localStorage.getItem('quickAccess')?JSON.parse(localStorage.getItem('quickAccess')):[];
    if(menuClick){
        var repeat = menuClick.find(m=>m.menuName==menuName);
        if(!repeat && menuClick.length === 6){
          /**删除第一条，然后添加最新的访问记录 */
          menuClick.splice(0,1);
          menuClick.push({
            menuName:menuName,
            path:path
          })
      }
        if(!repeat && menuClick.length<6){
          menuClick.push({
            menuName:menuName,
            path:path
          })
        }
        /**如果之前没有访问过，且localStorage已经有6条访问记录 */
        
    }
    else{
      menuClick = [];
      menuClick.push({
        menuName:menuName,
        path:path
      })
    }
    //console.log(localStorage.getItem('quickAccess'))
    localStorage.setItem('quickAccess',JSON.stringify(menuClick))
    this.props.history.push(path);
  }

  render() {
    //console.log(menu)
    // const menu = [
    //   {
    //       id: 1,
    //       title:"userRights",
    //       icon: 'boss',
    //       name: '用户权限',
    //       menu2: [
    //         {name: '操作管理',id:1,path: '/OperationManagement'},
    //         {name: '菜单管理',id:2,path: '/menu',},
    //         {name: '角色管理',id:3,path: '/role'},
    //         {name: '用户管理',id:4,path: '/user'},
    //         {name: '部门管理',id:5,path: '/departManagement'}
    //       ]
    //   }, 
    //   {
    //       id: 2,
    //       icon: 'job',
    //       title:"information",
    //       name: '质量流程',
    //       menu2 : [
    //         {name: '数据录入',id:6,path: '/dataEntry'},
    //         // {name: '制程检验',id:7,path: '/processInspection'},
    //         {name: '流程管理',id:8,path: '/management'},
    //         {name: '流程创建',id:9,path: '/process',},
    //         {name: '任务执行',id:10,path: '/role'},
    //         {name: '中间品检测',id:11,path: '/InterProduct'},
    //         {name: '进货检验报告',id:12,path: '/PurchaseCheckReport'},
    //         {name: '基本信息',id:13,path: '/baseInfo'},
    //         // {name: '样品送检',id:14,path: '/sampleInspection'},
    //       ]
    //  }
    // ];
    // console.log(this.state.openKeys)
  
    return (
      /**判断localStorage中的数据是否存在，存在则渲染菜单，否则渲染验证组件 */
      <div>
        <Menu mode="inline" theme="dark" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange} style={{width:130}}>
            {
              localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')).menuList.map(v=> (
                <SubMenu style={{backgroundColor: '#333333'}} key={v.menuId} title={<span style={{marginLeft:'-5px',color:'white',width:'80px',fontWeight:'bold'}}>{v.menuName}</span>}>
                {
                    v.menuList.map(v1 => 
                      <Menu.Item key={v1.path} style={{color:'white',fontWeight:'bold'}} onClick={this.menuClick}>{v1.menuName}</Menu.Item>
                  )
                }
                </SubMenu>
              )):<Auth/>
            }
        </Menu>
      </div>
   
    );
  }
}
export default withRouter(Menu1List);