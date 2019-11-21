import React from 'react';
import {Select} from "antd";
const {Option} = Select;

class SelectPeriod extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {periodCode,staticPeriod,disabled} = this.props;
        return (
            <Select className={'raw-material-select'} disabled={disabled}
                    style={{width: 150,marginRight: 10}} value={periodCode} onChange={this.props.selectChange}>
                {
                    staticPeriod ?
                        staticPeriod.map(e => <Option key={e.code} name={`${e.startTime}-${e.length}`} value={e.code}>{e.name}</Option>) : null
                }
            </Select>
            )
    }
}

export default SelectPeriod;
