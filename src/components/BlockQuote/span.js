import React from 'react';
class Span extends React.Component {
    render() {
        return (
            <span style={{fontSize:'20px',color:'#1E9FFF',paddingRight:'30PX', }} >
                {this.props.name}
            </span>
        );
    }
}
export default Span;