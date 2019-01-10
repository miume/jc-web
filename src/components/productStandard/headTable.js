import React from 'react';
class HeadTable extends React.Component{
    render(){
        const data = this.props.data;
        return (
            <div className='rawStandardTop'>
                <table>
                    <thead>
                    <tr>
                        <th>批号</th>
                        <th>产品</th>
                        <th>型号</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.batchNumber}</td>
                            <td>{data&&data[1]?data[1][1]:''}</td>
                            <td>{data&&data[1]?data[2][1]:''}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
        )
    }
}
export default HeadTable;