import React from "react"
import {Table, Switch, message} from 'antd'

class PlanSwitch extends React.Component {
    constructor(props) {
        super(props);

    }
    effFlagChange = (e) => {
        console.log(e)
        console.log(this.props.record.code)
        console.log(this.props.deptCode)
        console.log(this.props.deviceName)

    }

    render() {
        return (
            <div>
                <Switch checkedChildren="开" unCheckedChildren="关"
                        defaultChecked={this.props.record.effFlag ? false : true}
                        onChange={this.effFlagChange}
                />
            </div>
        );
    }
}
export default PlanSwitch