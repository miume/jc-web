import React from "react"
import {Table, Switch, message} from 'antd'
import axios from "axios";

class PlanSwitch extends React.Component {
    constructor(props) {
        super(props);

    }
    effFlagChange = (e) => {
        axios({
            url: `${this.props.url.SpotcheckPlan.update}`,
            method: 'put',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: {
                planId:this.props.record.code
            },
        }).then((data) => {
            if (data.data.code===0) {
                this.props.getTableData({
                    deptId: this.props.deptCode,
                    deviceName: this.props.deviceName,
                })
                message.info('修改成功')
            } else {
                message.info('修改失败,请刷新页面')
            }
        }).catch(() => {
            message.info('修改失败,请刷新页面')
        });

    }

    render() {
        return (
            <div>
                <Switch checkedChildren="开" unCheckedChildren="关"
                        defaultChecked={this.props.record.effFlag?false:true}
                        onChange={this.effFlagChange}
                />
            </div>
        );
    }
}
export default PlanSwitch