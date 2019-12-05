import React from 'react';

class Impurities extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        return (
            <div>
                <div className='process-parameters-add-div'>
                    <div>
                        <span>Ca：</span>
                        <span>{data['ca']}</span>
                    </div>
                    <div>
                        <span>Mg：</span>
                        <span>{data['mg']}</span>
                    </div>
                    <div>
                        <span>Fe：</span>
                        <span>{data['fe']}</span>
                    </div>
                    <div>
                        <span>Zn：</span>
                        <span>{data['zn']}</span>
                    </div>
                    <div>
                        <span>Cd：</span>
                        <span>{data['cd']}</span>
                    </div>
                </div>
                <div className='process-params-detail-text'>
                    {data['comment']}
                </div>
            </div>
        )
    }
}

export default Impurities;
