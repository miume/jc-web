import React from 'react';
import ProcessParametersTable from './processParametersTable';

class ProcessParaMeter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ProcessParametersTable />
                <p className='process-parameters-detail-p'>备注：</p>

            </div>
        )
    }
}

export default ProcessParaMeter;
