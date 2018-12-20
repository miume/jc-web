import React from 'react';
class CheckModal extends React.Component{
    render(){
        switch(this.props.qualifiedType){
            case 0:
                return( 
                    <div style={{cursor:'pointer'}}>
                        <div onClick={this.props.qualified} className='checkMOdal'>
                            <span>合格</span>
                        </div>
                        <div onClick={this.props.failed} className='checkMOdal'>
                            <span>不合格</span>
                        </div>
                    </div>
                    );
            case 1:
            return( 
                <div style={{cursor:'pointer'}}>
                    <div onClick={this.props.qualified} className='checkMOdal'>
                        <span>合格</span>
                    </div>
                    <div onClick={this.props.failed} className='checkMOdal'>
                        <span>不合格</span>
                    </div>
                </div>
                );
            case 2:
            return( 
                <div style={{cursor:'pointer'}}>
                    <div onClick={this.props.qualified} className='checkMOdal'>
                        <span>合格</span>
                    </div>
                    <div onClick={this.props.failed} className='checkMOdal'>
                        <span>不合格</span>
                    </div>
                </div>
                );
        }
        }
}
export default CheckModal;