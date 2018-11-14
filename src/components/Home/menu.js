import React from 'react';
import { Menu,Icon} from 'antd';
import {withRouter} from "react-router-dom";
const SubMenu = Menu.SubMenu;
class Menu1List extends React.Component {
  constructor(props){
    super(props);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  onOpenChange(){
    
  }
  render() {
    const menu = [
      {
          id: 1,
          title:"userRights",
          icon: 'boss',
          name: '用户权限',
          menu2: [
            {name: '操作管理',id:1,path: '/api'},
            {name: '菜单管理',id:2,path: '/menu',},
            {name: '角色管理',id:3,path: '/role'},
            {name: '用户管理',id:4,path: '/user'},
            {name: '部门管理',id:5,path: '/departManagement'}
          ]
      }, 
      {
          id: 2,
          icon: 'job',
          title:"information",
          name: '质量流程',
          menu2 : [
            {name: '数据录入',id:6,path: '/dataEntry'},
            // {name: '制程检验',id:7,path: '/processInspection'},
            {name: '流程管理',id:8,path: '/management'},
            {name: '流程创建',id:9,path: '/process',},
            {name: '任务执行',id:10,path: '/role'}
          ]
      }
    ];
    return (
      <div>
        <Menu mode="inline" theme="dark" onOpenChange={this.onOpenChange}>
            {
              menu.map(v=> (
                <SubMenu key={v.title} title={<span className="submenu-title-wrapper"><Icon type={v.icon} />{v.name}</span>}>
                {
                    v.menu2.map(v1 => 
                      <Menu.Item key={v1.id} onClick={() => { this.props.history.push(v1.path) }}>{v1.name}</Menu.Item>
                  )
                }
                </SubMenu>
              ))
            }
        </Menu>
      </div>
   
    );
  }
}
export default withRouter(Menu1List);