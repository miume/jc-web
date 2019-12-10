import React from 'react';
import ProcessParametersTable from './processParametersTable';

class ProcessParaMeter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {memo,data,proAndLines} = this.props;
        return (
            <div className='process-params-detail-table-overflow'>
                {
                    data ? data.map((e,index) => <ProcessParametersTable key={e.code} data={[e]} proAndLines={proAndLines[index]}/>) : null
                }
                <div style={{margin: 5}} className='process-params-detail-text'>
                    {memo}
                </div>
            </div>
        )
    }
}

export default ProcessParaMeter;
