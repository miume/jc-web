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
        this.callback = this.callback.bind(this)

    }
    callback=(key)=>{
        console.log(key)
    }

    render() {
        const { TabPane } = Tabs;

        return (
            <div className="eA-right-top">
                <Tabs defaultActiveKey="部件" onChange={this.callback}>
                    <TabPane tab="部件" key="部件">
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
                    </TabPane>
                    <TabPane tab="配件" key="配件">
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
                    </TabPane>

                </Tabs>

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