import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import './stockOut.css';
import {Tabs} from "antd";
import Application from "./stockOutApplication/application";
import Query from "./stockOutQuery/query";
const {TabPane} = Tabs;

class OtherStockOut extends React.Component {

    render() {
        let current = JSON.parse(localStorage.getItem('current')),
            menuName = current ? current.menuName : '', url = JSON.parse(localStorage.getItem('url')),
            type = menuName === '火法出库' ? 'fire' : 'wet';
        return (
            <div>
                <BlockQuote name={menuName} menu={current ? current.menuParent : ''}></BlockQuote>
                <Tabs defaultActiveKey={'1'}>
                    <TabPane key={'1'} tab={`${menuName}申请`}>
                        <Application url={url} type={type}/>
                    </TabPane>
                    <TabPane key={'2'} tab={`${menuName}查询`} type={type}>
                        <Query url={url} type={type}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default OtherStockOut;
