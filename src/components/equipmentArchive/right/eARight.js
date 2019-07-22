import React, {Component} from 'react';
import {Tabs} from 'antd';
import '../equipmentArchive.css'
import EARightBottom from './eARightBottom'
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
        console.log(this.props.rightTopData)
        return (
            <div className="eA-right-top">
                <Tabs onChange={this.returnEquKey}>
                    {this.renderEquipmentName(this.props.rightTopData)}
                </Tabs>
                <EARightBottom
                    getRightData={this.props.getRightData}
                    deviceName={this.props.deviceName}
                    depCode={this.props.depCode}
                    getTableData={this.props.getTableData}
                    url={this.props.url}
                    operation={this.props.operation}
                    comFlag={false}
                    dataSource={this.props.rightTableData}

                    searchName="编码、设备名称、ID卡号"
                    handleTableChange={this.props.handleTableChange}
                    pagination={this.props.pagination}
                    searchContent={this.props.searchContent}
                    modifySearchContent={this.props.modifySearchContent}
                    searchEvent={this.props.searchEvent}
                    searchReset={this.props.searchReset}
                />
            </div>
        )
    }

    // 通过key获取到设备名称
    renderEquipmentName = (data) => data.map((item) => {
        console.log(this.props.rightTopData)
        return (
            <Tabs.TabPane key={item.name} tab={item.name + '(' + item.count + ')'}>
            </Tabs.TabPane>
        )
    });
    // 通过回调函数，获得标签页表格中的数据
    returnEquKey = name => {
        // this.props.getTableData(this.props.depCode, name)
        const params = {
            deptId: parseInt(this.props.depCode),
            deviceName: name
        }
        this.props.getTableData(params, {})
    };

}

export default EARight