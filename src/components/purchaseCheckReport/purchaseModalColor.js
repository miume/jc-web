import React from 'react';

class PurchaseModalColor extends React.Component {
    render() {
        switch (this.props.purchaseStatus) {
            case 0:
                return(
                    <div style={{border:'5px solid #FF3B30',width:'200px',float:'left'}}>
                        <span style={{display:'block',textAlign:'center',height:'50px',border:'1px solid #FF3B30',color:'#FF3B30',margin:'2px',fontSize:'30px'}}>不合格</span>
                    </div>
                    // <div style={{ background:'white', color:'red',float:'left',marginLeft:20,border:'5px solid red ',width:150,padding:10,textAlign:'center'}}>
                    //     <span style={{fontSize:20}}>
                    //         {this.props.purchaseStatus}
                    //     </span>
                    // </div>
                );
            case 1:
                return(
                    <div style={{border:'5px solid #4BD863',width:'200px',float:'left'}}>
                        <span style={{display:'block',textAlign:'center',height:'50px',border:'1px solid #4BD863',color:'#4BD863',margin:'2px',fontSize:'30px'}}>合格</span>
                    </div>
                    // <div style={{ background:'white', color:'#99FF00',float:'left',marginLeft:20,border:'5px solid #99FF00 ',width:150,padding:10,textAlign:'center'}}>
                    //     <span style={{fontSize:20}}>
                    //         {this.props.purchaseStatus}
                    //     </span>
                    // </div>
                );
            default:
                return(
                    <div style={{border:'5px solid #999999',width:'200px',float:'left'}}>
                        <span style={{display:'block',textAlign:'center',height:'50px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'30px'}}>待定</span>
                    </div>
                    // <div style={{ background:'white', color:'gray',float:'left',marginLeft:20,border:'5px solid gray ',width:150,padding:10,textAlign:'center'}}>
                    //     <span style={{fontSize:20}}>
                    //         {this.props.purchaseStatus}
                    //     </span>
                    // </div>
                );
        }
        // return(
        //     <div></div>
        // )
    }
}
export default PurchaseModalColor;