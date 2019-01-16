import React from 'react';
class HeadTable extends React.Component{
    render(){
        const {flag,data,rawProductFlag} = this.props;
        return (
            <div className='rawStandardTop'>
            {
                flag?
                <table>
                    <thead>
                    <tr>
                        <th>批号</th>
                        <th>{rawProductFlag?'原材料':'产品'}</th>
                        <th>{rawProductFlag?'生产厂家':'型号'}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.batchNumber}</td>
                            <td>{data&&data[0]?data[0]:''}</td>
                            <td>{data&&data[1]?data[1]:''}</td>
                        </tr>
                    </tbody>
                </table>:
                <table>
                <thead>
                <tr>
                    <th>产品</th>
                    <th>型号</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data&&data[0]?data[0]:''}</td>
                        <td>{data&&data[1]?data[1]:''}</td>
                    </tr>
                </tbody>
            </table>
            }
                </div>
        )
    }
}
export default HeadTable;