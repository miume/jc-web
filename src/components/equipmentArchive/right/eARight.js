import React, {Component} from 'react';
import {Tabs} from 'antd';
import '../equipmentArchive.css'
import EARightBottom from './eARightBottom'
// const { TabPane } = Tabs;
class EARight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightTableData: [],
        };
        this.returnEquKey = this.returnEquKey.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this)

    }

    render() {
        return (
            <div className="eA-right-top">
                <Tabs onChange={this.returnEquKey}>
                    {this.renderEquipmentName(this.props.rightTopData)}
                </Tabs>
                <EARightBottom
                    comFlag={false}
                    data={this.props.rightTableData}
                />
            </div>
        )
    }

    // 通过key获取到设备名称
    renderEquipmentName = data => data.map((item) => {
        return (
            <Tabs.TabPane key={item.key} tab={item.name + '(' + item.count + ')'}>
            </Tabs.TabPane>
        )
    });
    // 通过回调函数，获得标签页表格中的数据
    returnEquKey = key => {
        // this.getTableData(this.props.depKey,key)
        this.props.getTableData(this.props.depKey, key)

    };

}

export default EARight