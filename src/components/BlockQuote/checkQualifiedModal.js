import React from 'react';

class CheckQualifiedModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            qualifiedType: this.props.status,   //判断合格与不合格状态---1:未选，0：合格，1代表不合格
        }
    }
    render() {
        // 0:未选，1：合格，2代表不合格
        switch (this.state.qualifiedType) {
            case -1:
                return(
                    <div style={{cursor:'pointer',position:'absolute',bottom:'90px',right:'20px',display:'flex',flexDirection:'row',flexWrap: 'nowrap'}}>
                        <div style={{border:'3px solid #999999',width:'130px',flexGrow:'1'}}>
                            <span onClick={this.modifyQualifiedType} style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                        </div>
                        <div  style={{border:'3px solid #999999',width:'130px',flexGrow:'1'}}>
                            <span onClick={this.modifyNoQualified} style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                        </div>
                    </div>
                );
            case 0:
                return(
                    <div style={{cursor:'pointer',position:'absolute',bottom:'90px',right:'20px',display:'flex',flexDirection:'row',flexWrap: 'nowrap'}}>
                        <div style={{border:'3px solid #4BD863',width:'130px',flexGrow:'1'}}>
                            <span style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #4BD863',color:'#4BD863',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                        </div>
                        <div  style={{border:'3px solid #999999',width:'130px',flexGrow:'1'}}>
                            <span onClick={this.modifyNoQualified}  style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                        </div>
                    </div>
                );
            case 1:
                return(
                    <div style={{cursor:'pointer',position:'absolute',bottom:'90px',right:'20px',display:'flex',flexDirection:'row',flexWrap: 'nowrap'}}>
                        <div style={{border:'3px solid #999999',width:'130px',flexGrow:'1'}}>
                            <span onClick={this.modifyQualifiedType}  style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                        </div>
                        <div style={{border:'3px solid #FF3B30',width:'130px',flexGrow:'1'}}>
                            <span style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #FF3B30',color:'#FF3B30',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                        </div>
                    </div>
                );
            default:
                return(
                    <div style={{cursor:'pointer'}}></div>
                )
        }
    }
    /**实现选择合格:1与不合格:0功能 */
    modifyQualifiedType = () => {
        this.setState({
            qualifiedType:0
        },() => {
            this.props.clickIsQualified(0);
        })
    };
    modifyNoQualified = () => {
        this.setState({
            qualifiedType:1
        },() => {
            this.props.clickIsQualified(1);
        })
    };
    /**---------------------- */
}

export default CheckQualifiedModal;