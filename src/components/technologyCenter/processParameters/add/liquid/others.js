import React from 'react';
import {Input} from "antd";

class Others extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {inputChange} = this.props;
        return (
            <div className='process-parameters-add-div'>
                <div>
                    <span>补水液位高度：</span>
                    <Input name={'highStandard'} onChange={inputChange} style={{width:100}}/>
                    <span className='process-params-table-part-symbol'>±</span>
                    <Input name={'highBias'} onChange={inputChange} style={{width:100}}/>
                </div>
                <div>
                    <span>温度(°C)：</span>
                    <Input name={'temperatureStandard'} onChange={inputChange} style={{width:100}}/>
                    <span className='process-params-table-part-symbol'>±</span>
                    <Input name={'temperatureStandard'} onChange={inputChange} style={{width:100}}/>
                </div>
                <div>
                    <span>搅拌时间(min)：</span>
                    <Input name={'stirTimeStandard'} onChange={inputChange} style={{width:100}}/>
                    <span className='process-params-table-part-symbol'>±</span>
                    <Input name={'stirTimeStandard'} onChange={inputChange} style={{width:100}}/>
                </div>
            </div>

        )
    }
}

export default Others;
