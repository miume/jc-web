import React from 'react';

class ProductOptional extends React.Component{
    render() {
        console.log(this.props.optionalStatus)
        switch (this.props.optionalStatus) {
            case 0://不合格品
                return(
                    <div
                        className="productOptionalImag productBorderNoPass"
                    >
                        <span>不合格品</span>
                    </div>
                );
            case 1: //普通品
                return(
                    <div
                        className="productOptionalImag productBorderCommon"
                    >
                        <span>普通品</span>
                    </div>
                );
            case 2: //优品
                return(
                    <div
                        className="productOptionalImag productBorderPass"
                    >
                        <span>优品</span>
                    </div>
                );
            default:
                return(
                    <div
                        className="productOptionalImag"
                    >
                        <span>还未择优</span>
                    </div>
                );
        }
    }
}

export default ProductOptional;