import React from 'react';
class CheckModal extends React.Component{
    render(){
        return( 
            <div style={{cursor:'pointer'}}>
                <div onClick={this.props.qualified} className={this.props.flag?'qulified':'checkMOdal'}>
                    <span>合格</span>
                </div>
                <div onClick={this.props.failed} className={this.props.fail?'failed':'checkMOdal'}>
                    <span>不合格</span>
                </div>
            </div>
            );
        }
}
export default CheckModal;