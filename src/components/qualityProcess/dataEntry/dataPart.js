import React from 'react';
import './data.css';
class DataPart extends React.Component{
    render(){
        return (
            <div className='nav-card dataPart'  id={this.props.path} onClick={this.props.click}>
                <div className='nav-card-child dataPart-child'>
                    <div className='dataPart-child-div'>
                        <p><i className={this.props.className}></i></p>
                    </div>
                    <div className='dataPart-child-bottom'>
                        <p className='hover'>{this.props.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default DataPart;
