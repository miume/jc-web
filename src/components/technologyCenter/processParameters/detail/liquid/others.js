import React from 'react';

class Others extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        return (
            <div className='process-parameters-add-div'>
                <div>
                    <span>补水液位高度：</span>
                    <span>{`${data['highStandard']}±${data['highBias']}`}</span>
                </div>
                <div>
                    <span>温度(°C)：</span>
                    <span>{`${data['temperatureStandard']}±${data['temperatureBias']}`}</span>
                </div>
                <div>
                    <span>搅拌时间(min)：</span>
                    <span>{`${data['stirTimeStandard']}±${data['stirTimeBias']}`}</span>
                </div>
            </div>

        )
    }
}

export default Others;
