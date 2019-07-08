import React, {Component} from 'react';
import {Tabs, Radio} from 'antd';
import '../equipmentArchive.css'
import EARightBottom from './eARightBottom'

const {TabPane} = Tabs;

class EARight extends Component {
    topData = [
        {
            key: 0,
            name: "反应弧",
            count: 11
        }, {
            key: 1,
            name: "计量类",
            count: 30
        }
    ];
    tableData = [
        {
            key: 12,
            data: '121212'
        }, {
            key: 13,
            data: '131313'
        }
    ];

    constructor(props) {
        super(props)
        this.state = {
            topData: this.topData,
            tableData: this.tableData
        }
        this.returnEquKey = this.returnEquKey.bind(this)
        this.renderEquipmentName = this.renderEquipmentName.bind(this)

    }

    render() {
        return (
            <div className="eA-right-top">
                <Tabs onChange={this.returnEquKey}>
                    {this.renderEquipmentName(this.state.topData)}
                </Tabs>
            </div>
        )
    }

    // 通过key获取到设备名称
    renderEquipmentName = data => data.map((item) => {
        return (
            <TabPane key={item.key} tab={item.name + '(' + item.count + ')'}>
                <EARightBottom
                    data={this.state.tableData}
                />
            </TabPane>
        )
    })
    // 通过回调函数，获得标签页表格中的数据
    returnEquKey = key => {
        console.log("return:---------")
        console.log(key)
    }

}

export default EARight