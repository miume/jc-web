import React from 'react';
import {Tabs} from "antd";
import MainIngredient from "./mainIngredient";
import Others from "./others";
import Impurities from "./impurities";

class Liquid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {url,code,components,zyDetail,add,deleteItems,inputChange,liquidChange} = this.props;
        return (
            <div className={code === 48 ? '' : 'hide' }>
                <Tabs onChange={this.returnEquKey} >
                    <Tabs.TabPane key={1} tab={(<b>主成分</b>)}>
                        <MainIngredient data={components} add={add} inputChange={inputChange} liquidChange={liquidChange}
                                        delete={deleteItems} zyDetail={zyDetail}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab={(<b>杂质成分</b>)}>
                        <Impurities inputChange={liquidChange} url={url} data={zyDetail}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={3} tab={(<b>其它</b>)}>
                        <Others inputChange={liquidChange} data={zyDetail}/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => null)
    }
}

export default Liquid;
