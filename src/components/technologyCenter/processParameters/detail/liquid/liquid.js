import React from 'react';
import {Tabs} from "antd";
import MainIngredient from "./mainIngredient";
import Others from "./others";
import Impurities from "./impurities";

class LiquidDetail extends React.Component {

    render() {
        let {zy} = this.props,{components, detail} = zy;
        return (
            <div style={{height: 300}}>
                <Tabs onChange={this.returnEquKey} >
                    <Tabs.TabPane key={1} tab={(<b>主成分</b>)}>
                        <MainIngredient data={components} zyDetail={detail}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab={(<b>杂质成分</b>)}>
                        <Impurities data={detail}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={3} tab={(<b>其它</b>)}>
                        <Others data={detail}/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

export default LiquidDetail;
