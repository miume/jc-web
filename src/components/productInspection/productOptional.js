import React from 'react';

class ProductOptional extends React.Component{
    render() {
        console.log(this.props.optionalStatus)
        switch (this.props.optionalStatus) {
            case 0:
                return(
                    <div
                        className="productOptionalImag"
                    >
                        <span>{this.props.optionalStatus}</span>
                    </div>
                );
            case 1:
                return(
                    <div
                        className="productOptionalImag"
                    >
                        <span>{this.props.optionalStatus}</span>
                    </div>
                );
            case 2:
                return(
                    <div
                        className="productOptionalImag"
                    >
                        <span>{this.props.optionalStatus}</span>
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