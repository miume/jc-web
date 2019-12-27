import React from 'react';
import {Input} from "antd";

class Others extends React.Component {

    render() {
        let {inputChange,data} = this.props;
        return (
            <div className='process-parameters-add-div'>
                <div>
                    <span>补水液位高度：</span>
                    <Input name={'highStandard-int'} value={data['highStandard']} onChange={inputChange} style={{width:100}}/>
                    <span className='process-params-table-part-symbol'>±</span>
                    <Input name={'highBias-int'} value={data['highBias']} onChange={inputChange} style={{width:100}}/>
                </div>
                <div>
                    <span>温度(°C)：</span>
                    <Input name={'temperatureStandard-int'} value={data['temperatureStandard']} onChange={inputChange} style={{width:100}}/>
                    <span className='process-params-table-part-symbol'>±</span>
                    <Input name={'temperatureBias-int'} value={data['temperatureBias']} onChange={inputChange} style={{width:100}}/>
                </div>
                <div>
                    <span>搅拌时间(min)：</span>
                    <Input name={'stirTimeStandard-int'} value={data['stirTimeStandard']} onChange={inputChange} style={{width:100}}/>
                    <span className='process-params-table-part-symbol'>±</span>
                    <Input name={'stirTimeBias-int'} value={data['stirTimeBias']} onChange={inputChange} style={{width:100}}/>
                </div>
            </div>

        )
    }
}

export default Others;
