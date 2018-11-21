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
                      <Menu.Item key={v1.menuId} style={{color:'white',fontWeight:'bold'}}  onClick={() => { this.props.history.push(v1.path) }}>{v1.menuName}</Menu.Item>
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