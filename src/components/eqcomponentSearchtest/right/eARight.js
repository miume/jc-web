import React, {Component} from 'react';
import {Tabs} from 'antd';
import '../eqcomponentSearch.css'
import EARightBottom from './eARightBottom'
class EARight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightTableData: [],
        };
        this.renderEquipmentName = this.renderEquipmentName.bind(this)

    }

    render() {
        return (
            <div className="eA-right-top">
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
        return (
            <Tabs.TabPane key={item.name} tab={item.name + '(' + item.count + ')'}>
            </Tabs.TabPane>
        )
    });

}

export default EARight