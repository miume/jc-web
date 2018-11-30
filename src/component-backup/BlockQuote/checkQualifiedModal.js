import React from 'react';

class CheckQualifiedModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            qualifiedType: 0,   //判断合格与不合格状态--0:未选，1：合格，2代表不合格
        }
    }
    render() {
        // 0:未选，1：合格，2代表不合格
        switch (this.state.qualifiedType) {
            case 0:
                return(
                    <div>
                        <div style={{border:'3px solid #999999',width:'130px',float:'right'}}>
                            <span onClick={this.modifyQualifiedType} style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                        </div>
                        <div  style={{border:'3px solid #999999',width:'130px',float:'right'}}>
                            <span onClick={this.modifyNoQualified} style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                        </div>
                    </div>
                );
                break;
            case 1:
                return(
                    <div>
                        <div style={{border:'3px solid #FF3B30',width:'130px',float:'right'}}>
                            <span style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #FF3B30',color:'#FF3B30',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                        </div>
                        <div  style={{border:'3px solid #999999',width:'130px',float:'right'}}>
                            <span onClick={this.modifyNoQualified}  style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                        </div>
                    </div>
                );
                break;
            case 2:
                return(
                    <div>
                        <div style={{border:'3px solid #999999',width:'130px',float:'right'}}>
                            <span onClick={this.modifyQualifiedType}  style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #999999',color:'#999999',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>合格</span>
                        </div>
                        <div style={{border:'3px solid #4BD863',width:'130px',float:'right'}}>
                            <span style={{display:'block',textAlign:'center',height:'55px',border:'1px solid #4BD863',color:'#4BD863',margin:'2px',fontSize:'25px',paddingTop:'8px'}}>不合格</span>
                        </div>
                    </div>
                );
                break;
        }
    }
    /**实现选择合格:1与不合格:0功能 */
    modifyQualifiedType = () => {
        this.setState({
            qualifiedType:1
        })
    };
    modifyNoQualified = () => {
        this.setState({
            qualifiedType:2
        })
    };
    /**---------------------- */
}

export default CheckQualifiedModal;