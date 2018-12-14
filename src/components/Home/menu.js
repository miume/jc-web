import React from 'react';
import { Menu} from 'antd';
import {withRouter} from "react-router-dom";
import Auth from '../auth/Auth';
const SubMenu = Menu.SubMenu;

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
    console.log('openKeys:'+openKeys)
    /**找到当前展开的菜单id */
    const latestOpenKeys = openKeys.find(key=>this.state.openKeys.indexOf(key)===-1);
    // console.log('latestOPenKeys:'+latestOpenKeys)
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
    const path = event.key;
    const menuName = event.item.props.children;
    const menuParent = event.item.props.name;
    const current = {
      openKeys:localStorage.getItem('defaultOpenKeys'),
      menuName:menuName,
      menuParent:menuParent,
      path:path
    }
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
    /**每次点击二级菜单 都重新跟新快速访问 */
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
    //console.log(this.state.defaultOpenKeys)
    const openKeys = localStorage.getItem('defaultOpenKeys')?[localStorage.getItem('defaultOpenKeys')]:[];
    console.log(openKeys)
    return (
      /**判断localStorage中的数据是否存在，存在则渲染菜单，否则渲染验证组件 */
      <div>
        <Menu mode="inline" theme="dark" selectedKeys={localStorage.getItem('selectedKeys')?[localStorage.getItem('selectedKeys')]:[]} openKeys={this.state.openKeys}  onOpenChange={this.onOpenChange} style={{width:130}}>
            {
              localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')).menuList.map(v=> (
                <SubMenu style={{backgroundColor: '#333333'}} key={v.menuId} title={<span style={{marginLeft:'-5px',color:'white',width:'80px',fontWeight:'bold'}}>{v.menuName}</span>}>
                {
                    v.menuList.map(v1 => 
                      <Menu.Item key={v1.path} name={v.menuName} style={{color:'white',fontWeight:'bold'}} onClick={this.menuClick}>{v1.menuName}</Menu.Item>
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