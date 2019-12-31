import React from 'react';
import BlockQuote from "../../BlockQuote/blockquote";
import './stockOut.css';
import {Tabs} from "antd";
import Application from "./stockOutApplication/application";
import Query from "./stockOutQuery/query";
const {TabPane} = Tabs;

class OtherStockOut extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let current = JSON.parse(localStorage.getItem('current'));
        return (
            <div>
                <BlockQuote name={current.menuName} menu={current.menuParent}></BlockQuote>
                <Tabs defaultActiveKey={'1'}>
                    <TabPane key={'1'} tab={'出库申请'}>
                        <Application/>
                    </TabPane>
                    <TabPane key={'2'} tab={'出库单查询'}>
                        <Query />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default OtherStockOut;
