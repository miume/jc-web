import React from 'react';
import AllTester from '../BlockQuote/allTester';
class DetailModal extends React.Component{
    render() {
        switch (this.props.state) {
            case -1:
                return(
                    <div className="unDetailModal">
                        未申请
                    </div>
                );
            case 0:
                return(
                    <div className="unDetailModal">
                        待审核
                    </div>
                );
            case 1:
                return(
                    <div className="unDetailModal">
                        审核中
                    </div>
                );
            case 2:
                return(
                    <AllTester
                        hide={0}
                        examineData = {[{
                            name:'王大大',
                            detail:{
                                id: 100,
                                handler: 1,
                                handleTime: "2018-12-20 09:34:23",
                                handleReply: "我没意见我没意见我没意见",
                            }
                        },{
                            name:'兰亚戈',
                            detail:{
                                id: 101,
                                handler: 2,
                                handleTime: "2018-12-23 09:34:23",
                                handleReply: "同意",
                            }
                        },{
                            name:'方乐',
                            detail:{
                                id: 103,
                                handler: 3,
                                handleTime: "2018-12-23 09:34:23",
                                handleReply: "可以",
                            }
                        },{
                            name:'兰亚戈',
                            detail:{
                                id: 106,
                                handler: 4,
                                handleTime: "2018-12-24 09:34:23",
                                handleReply: "good",
                            }
                        },]}
                        // examineData={[]}
                        dataId={0}

                    />
                );
            case 3:
                return(
                    <div className="unDetailModal">
                        不通过
                    </div>
                );
            default:
                return(
                    <div className="unDetailModal">

                    </div>
                )
        }
    }
}

export default DetailModal;