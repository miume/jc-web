import React from 'react';
import './interProduct.css';
import AllTester from '../BlockQuote/allTester';

class DetailStateModal extends React.Component {
    render() {
        switch (this.props.data.examineStatus) {
            case -1: //待审核
                return(
                    <div className="interStateDefaultModal">
                        已保存未提交
                    </div>
                );
            case 0: //未申请
                return(
                    <div className="interStateDefaultModal">
                        已提交未审核
                    </div>
                );
            case 1: //审核中
                return(
                    <div className="interStateDefaultModal">
                        审核中
                    </div>
                );
            case 2: //已通过
                return(
                    <AllTester
                        hide={1}
                        dataId={this.props.data.batchNumberId}
                        examineData={this.props.data.examineData}
                    />
                );

            case 3: //不通过
                return(
                    <AllTester
                        hide={1}
                        dataId={this.props.data.batchNumberId}
                        examineData={this.props.data.examineData}
                    />
                );
            case 4: //代办事项中显示
                return(
                    <div className="interStateNoModal">
                    </div>
                );
            default:
                return(
                    <div className="interStateDefaultModal">
                        没有进行审核过程
                    </div>
                );
        }
    }
}

export default DetailStateModal