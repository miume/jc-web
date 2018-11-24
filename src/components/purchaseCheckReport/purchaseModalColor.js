import React from 'react';

class PurchaseModalColor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        switch (this.props.purchaseStatus) {
            case '待定':
                return(
                    <div style={{ background:'white', color:'gray',float:'left',marginLeft:20,border:'5px solid gray ',width:150,padding:10,textAlign:'center'}}>
                        <span style={{fontSize:20}}>
                            {this.props.purchaseStatus}
                        </span>
                    </div>
                );
                break;
            case '不合格':
                return(
                    <div style={{ background:'white', color:'red',float:'left',marginLeft:20,border:'5px solid red ',width:150,padding:10,textAlign:'center'}}>
                        <span style={{fontSize:20}}>
                            {this.props.purchaseStatus}
                        </span>
                    </div>
                );
                break;
            case '合格':
                return(
                    <div style={{ background:'white', color:'#99FF00',float:'left',marginLeft:20,border:'5px solid #99FF00 ',width:150,padding:10,textAlign:'center'}}>
                        <span style={{fontSize:20}}>
                            {this.props.purchaseStatus}
                        </span>
                    </div>
                );
                break;
        }
        // return(
        //     <div></div>
        // )
    }
}
export default PurchaseModalColor;