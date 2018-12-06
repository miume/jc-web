import React from 'react';
class TopIcon extends React.Component{
    render(){
        return (
            <div>
                <div onClick={ this.props.exitEvent} className='iconHover' >
                    <i className="fa fa-sign-out" aria-hidden="true" style={{padding:'10px'}}></i>
                </div>
                <div onClick={ this.props.exitEvent} className='iconHover'>
                    <i className="fa fa-bell-o" aria-hidden="true" style={{padding:'10px'}}></i>
                </div>
                <div onClick={ this.props.exitEvent} className='iconHover'>
                    <i className="fa fa-info" aria-hidden="true" style={{padding:'10px'}}></i>
                </div>
            </div>
        );
    }
}
export default TopIcon;