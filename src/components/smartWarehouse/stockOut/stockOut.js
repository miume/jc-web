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
            url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <BlockQuote name={current ? current.menuName : ''} menu={current ? current.menuParent : ''}></BlockQuote>
                <Tabs defaultActiveKey={'1'}>
                    <TabPane key={'1'} tab={'出库申请'}>
                        <Application url={url}/>
                    </TabPane>
                    <TabPane key={'2'} tab={'出库单查询'}>
                        <Query url={url}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default OtherStockOut;
