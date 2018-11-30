import React from 'react';

class QualifiedJudge extends React.Component {
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
                    <div id={this.props.idTd} onClick={this.modifyQualifiedType}>
                        {/*<span value='pass' onClick={this.modifyQualifiedType}>合格</span>*/}
                        合格
                    </div>
                );
            case 1:
                return(
                    <div>
                        <span value='pass' style={{background:'#4BD863'}}>合格</span>
                        {/*<span value="nopass" onClick={this.modifyNoQualified} style={{background:'#999999'}}>不合格</span>*/}
                    </div>
                );
            default:
                return(
                    <div></div>
                )
        }
    }
    /**实现选择合格:1与不合格:0功能 */
    modifyQualifiedType = (e) => {
        const id = e.target.id;
        var tdId = document.getElementById(id).parentNode;
        tdId.style.background = 'red';
        // this.setState({
        //     qualifiedType:1
        // })
    };
    modifyNoQualified = () => {
        // this.setState({
        //     qualifiedType:2
        // })
    };
    /**---------------------- */
}

export default QualifiedJudge;