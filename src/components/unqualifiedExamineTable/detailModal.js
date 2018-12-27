import React from 'react';

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
                    <div className="unDetailModalPass">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>{'审核意见：不错不错啊啊啊啊啊啊啊啊啊啊啊啊啊啊'}</div>
                                        <div className="unDetailModalPassLast">
                                            <div>
                                                {'审核人：周脂肪'}
                                            </div>
                                            <div>
                                                {'审核日期：2018年11月12日'}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{'接收意见：不错不错'}</div>
                                        <div className="unDetailModalPassLast">
                                            <div>
                                                {'接收人：周脂肪'}
                                            </div>
                                            <div>
                                                {'审核日期：2018年11月12日'}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>{'审批结论：不错不错'}</div>
                                        <div className="unDetailModalPassLast">
                                            <div>
                                                {'结论人：周脂肪'}
                                            </div>
                                            <div>
                                                {'审核日期：2018年11月12日'}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{'批准：不错不错'}</div>
                                        <div className="unDetailModalPassLast">
                                            <div>
                                                {'批准人：周脂肪'}
                                            </div>
                                            <div>
                                                {'审核日期：2018年11月12日'}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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