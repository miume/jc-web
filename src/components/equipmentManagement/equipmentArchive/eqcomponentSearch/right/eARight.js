import React, {Component} from 'react';
import {Tabs} from 'antd';
import '../eqcomponentSearch.css'
import EARightBottom from './eARightBottom'
import EARightBottom1 from './eARightBottom1'

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
        if(key==="部件"){
        this.props.cleardata(0)}
        else {
            this.props.cleardata(1)
        }
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
                            getTableData={this.props.getTableData2}
                            url={this.props.url}
                            operation={this.props.operation}
                            comFlag={false}
                            dataSource={this.props.rightTableData2}
                            searchName="请输入搜索的部件名称"
                            handleTableChange={this.props.handleTableChange}
                            pagination={this.props.pagination}
                            searchContent={this.props.searchContent}
                            modifySearchContent={this.props.modifySearchContent}
                            searchEvent={this.props.searchEvent}
                            searchReset={this.props.searchReset}
                        />
                    </TabPane>
                    <TabPane tab="配件" key="配件">
                        <EARightBottom1
                            getRightData={this.props.getRightData}
                            deviceName={this.props.deviceName}
                            depCode={this.props.depCode}
                            getTableData2={this.props.getTableData}
                            url={this.props.url}
                            operation={this.props.operation}
                            comFlag={false}
                            dataSource={this.props.rightTableData}
                            searchName="请输入搜索的配件名称"
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