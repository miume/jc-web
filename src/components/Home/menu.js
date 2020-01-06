import React from 'react';
import { Menu} from 'antd';
import {withRouter} from "react-router-dom";
import Auth from '../auth/Auth';
const SubMenu = Menu.SubMenu;

/**
 * current 用来存取最近一次访问的2级菜单
 * selectedKeys 用来存取最近一次访问2级菜单的路径
 * defaultOpenKeys 用来存取默认展开一级菜单
 */
class Menu1List extends React.Component {
  componentDidMount(){
     /**实现刷新后保持最后一次点击界面 */
     const cur = localStorage.getItem('current')?JSON.parse(localStorage.getItem('current')).path :'';
     if(cur){
        this.props.history.push(cur);
     }
  }
  constructor(props){
    super(props);
    this.state = {
      selectedKeys : localStorage.getItem('selectedKeys')?[localStorage.getItem('selectedKeys')]:[],
      openKeys:localStorage.getItem('defaultOpenKeys')?[localStorage.getItem('defaultOpenKeys')]:[],
      current : localStorage.getItem('current')?localStorage.getItem('current').path:'',
    }
    this.onOpenChange = this.onOpenChange.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }
  /**只展开当前父级菜单 */
  onOpenChange(openKeys){
    /**找到当前展开的菜单id */
    const latestOpenKeys = openKeys.find(key=>this.state.openKeys.indexOf(key)===-1);
    /**如果展开当前一级菜单和以前的不一样 */
    if(this.state.openKeys !== latestOpenKeys){
        this.setState({
          openKeys : [latestOpenKeys]
        });
        localStorage.setItem('defaultOpenKeys',[latestOpenKeys])
    }
  }
  /**点击二级菜单 存取6个访问的二级菜单*/
  menuClick(event){
    let path = event.key,
        menuName = event.item.props.children,
        menuParent = event.item.props.name,
        menuId = event.item.props.id;
    const current = {
      openKeys: parseInt(localStorage.getItem('defaultOpenKeys')),
      menuName:menuName,
      menuParent:menuParent,
      path:path,
      menuId: menuId
    };
    /**selectedKeys 用来实时控制点击的二级菜单选中 */
    localStorage.setItem('selectedKeys',path)
    /**存取最近一次访问的二级菜单 */
    localStorage.setItem('current',JSON.stringify(current));
    var menuClick = localStorage.getItem('quickAccess')?JSON.parse(localStorage.getItem('quickAccess')):[];
    if(menuClick){
        var repeat = menuClick.find(m=>m.menuName===menuName);
        /**实现每次访问，最近一次点击都在最后显示 */
        if(repeat && menuClick.length === 6){
          menuClick = menuClick.filter(m=>m.menuName!== menuName);
          menuClick.push(current)
        }
        if(!repeat && menuClick.length === 6){
          /**删除第一条，然后添加最新的访问记录 */
          menuClick.splice(0,1);
          menuClick.push(current)
      }
        if(!repeat && menuClick.length<6){
          menuClick.push(current)
        }
        /**如果之前没有访问过，且localStorage已经有6条访问记录 */
    }
    else{
      menuClick = [];
      menuClick.push(current)
    }
    /**每次点击二级菜单 都重新更新快速访问 */
    localStorage.setItem('quickAccess',JSON.stringify(menuClick))
    this.props.history.push(path);
  }

  render() {

    return (
      /**判断localStorage中的数据是否存在，存在则渲染菜单，否则渲染验证组件 */
      <div className={localStorage.getItem('menuList')?'':'hide'}>
        <Menu mode="inline" theme="dark"
              selectedKeys={localStorage.getItem('selectedKeys')?[localStorage.getItem('selectedKeys')]:[]}
              openKeys={localStorage.getItem('defaultOpenKeys')?[localStorage.getItem('defaultOpenKeys')]:[]}
              onOpenChange={this.onOpenChange} style={{width:130}}>
            {
              localStorage.getItem('menuList') && JSON.parse(localStorage.getItem('menuList')).menuList ? JSON.parse(localStorage.getItem('menuList')).menuList.map(v=> (
                <SubMenu style={{backgroundColor: '#333333'}} key={v.menuId} title={<span style={{marginLeft:'-5px',color:'white',width:'80px',fontWeight:'bold'}}>{v.menuName}</span>}>
                {
                    v.menuList.map(v1 =>
                      <Menu.Item key={v1.path} id={v1.menuId} name={v.menuName} style={{color:'white',fontWeight:'bold'}} onClick={this.menuClick}>{v1.menuName}</Menu.Item>
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
