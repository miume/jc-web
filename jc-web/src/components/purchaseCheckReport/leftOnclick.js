import React from 'react';

class LeftOnclick extends React.Component {
    render() {
        const { dx, dy , detailShow } = this.props;
        return(
            <div className="" style={{display: detailShow}}>
                <i className="fa fa-chevron-left fa-2x"></i>
            </div>
        )
    }
}

export default LeftOnclick;