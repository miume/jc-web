import React from 'react';
import {Tabs} from "antd";
import Storage from "./storage/storage";
import WorkShop from "./workShop/workShop";
import Consumption from "./consumption/consumption";
const {TabPane} = Tabs;

class AddTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {ammValue,alkValue,gqDetails2,cjDetails3,fcDetails4,inputChange} = this.props;
        return (
            <Tabs defaultActiveKey={'1'}>
                <TabPane tab={'入库量'} key={'1'}>
                    <Storage ammValue={ammValue} alkValue={alkValue} inputChange={inputChange}/>
                </TabPane>
                <TabPane tab={'灌区'} key={'2'}>
                    <WorkShop data={gqDetails2} inputChange={inputChange} status={2}/>
                </TabPane>
                <TabPane tab={'车间'} key={'3'}>
                    <WorkShop data={cjDetails3} inputChange={inputChange} status={3}/>
                </TabPane>
                <TabPane tab={'辅料消耗量'} key={'4'}>
                    <Consumption data={fcDetails4} inputChange={inputChange}/>
                </TabPane>
            </Tabs>
        )
    }
}

export default AddTabs;
