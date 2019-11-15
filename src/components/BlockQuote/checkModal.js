import React from 'react';
class CheckModal extends React.Component{
    render(){
        let {flag} = this.props,
            failed = {
                borderColor: '#FF3B30',
                color:'#FF3B30'
            },
            qualified = {
                borderColor: '#4BD863',
                color:'#4BD863'
            };
        return(
            <div style={{cursor:'pointer'}}>
                <div onClick={this.props.qualified} style={flag === 1 ? qualified : {}} className={'rawTestReport-checkModal'}>
                    <span style={flag === 1 ? qualified : {}}>合格</span>
                </div>
                <div onClick={this.props.failed} style={flag === 0 ? failed : {}} className={'rawTestReport-checkModal'}>
                    <span style={flag === 0 ? failed : {}}>不合格</span>
                </div>
            </div>
            );
        }
}
export default CheckModal;
