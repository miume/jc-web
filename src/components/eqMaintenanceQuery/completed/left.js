import React from "react";
import { Menu, Icon } from 'antd';

class Left extends React.Component{
    constructor(props) {
        super(props);

    }
    handleClick = e => {
        console.log('click ', e);

    };

    render() {
        const { SubMenu } = Menu;
        return (  //按下之后icon变一下
            <div>
                <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                >

                <SubMenu
                key="sub1"
                title={
                    <span>
              <Icon type="plus-square" />
              <span>制造一、二部</span>
            </span>
                }
                >
                <Menu.Item key="1">锂电一车间</Menu.Item>
                <Menu.Item key="2">锂电二车间</Menu.Item>
                    <Menu.Item key="3">锂电三车间</Menu.Item>
                    <Menu.Item key="4">镍氢车间</Menu.Item>
                    <Menu.Item key="5">前驱体车间</Menu.Item>
                    <Menu.Item key="6">mvr</Menu.Item>
                </SubMenu>

                    <SubMenu
                        key="sub2"
                        title={
                            <span>
              <Icon type="plus-square" />
              <span>制造三、四部</span>
            </span>
                        }
                    >
                        <Menu.Item key="7">一、二单元</Menu.Item>
                        <Menu.Item key="8">三、四单元</Menu.Item>
                        <Menu.Item key="9">五、六单元</Menu.Item>
                        <Menu.Item key="10">七、八单元</Menu.Item>
                        <Menu.Item key="11">产线一</Menu.Item>
                        <Menu.Item key="12">产线二</Menu.Item>
                        <Menu.Item key="13">产线三</Menu.Item>
                        <Menu.Item key="14">产线四</Menu.Item>
                        <Menu.Item key="15">智能仓库</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub3"
                        title={
                            <span>
              <Icon type="plus-square" />
              <span>动力保障部</span>
            </span>
                        }
                    >
                        <Menu.Item key="16">铜官基地</Menu.Item>
                        <Menu.Item key="17">麓谷基地</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub4"
                        title={
                            <span>
              <Icon type="plus-square" />
              <span>麓谷基地</span>
            </span>
                        }
                    >
                        <Menu.Item key="18">一车间</Menu.Item>
                        <Menu.Item key="19">二车间</Menu.Item>
                        <Menu.Item key="18">三车间</Menu.Item>
                        <Menu.Item key="19">四车间</Menu.Item>
                        <Menu.Item key="18">五车间</Menu.Item>
                    </SubMenu>

                <SubMenu
                key="sub5"
                title={
                    <span>
              <span>基建部</span>
            </span>
                }
                >
                </SubMenu>

                    <SubMenu
                        key="sub6"
                        title={
                            <span>
              <span>质量一部</span>
            </span>
                        }
                    >
                    </SubMenu>

                    <SubMenu
                        key="sub7"
                        title={
                            <span>
              <span>质量二部</span>
            </span>
                        }
                    >
                    </SubMenu>

                </Menu>
                );
            }
            }
            </div>
        );
    }

}
export default Left