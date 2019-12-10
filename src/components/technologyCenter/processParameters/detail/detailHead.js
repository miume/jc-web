import React from 'react';

class DetailHead extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        let {head} = this.props;
        if(head)
            var {processNum,edition,deptName,effectiveDate,expiryDate,prepareName,
                processName,auditName,dateOfFiling,prepareName,lines,productClassName} = head;
        return (
            <div className='process-parameters-detail'>
                <div className='process-parameters-detail-top'>
                    <div>{`编号：${processNum || ''}`}</div>
                    <div>{`版次：${edition || ''}`}</div>
                    <div>{`使用车间：${deptName || ''}`}</div>
                </div>
                <div className='process-parameters-detail-top'>
                    <div>{`生效日期：${effectiveDate || ''}`}</div>
                    <div>{`失效日期：${expiryDate || ''}`}</div>
                    <div>{`工序：${processName || ''}`}</div>
                </div>
                <div className='process-parameters-detail-top'>
                    <div>{`审核流程：${auditName || ''}`}</div>
                    <div>{`编制人：${prepareName || ''}`}</div>
                    <div>{`编制时间：${dateOfFiling || ''}`}</div>
                </div>
                <div className={productClassName ? 'process-parameters-detail-top' : 'hide'}>
                    <div>{`生产品种：${productClassName || ''}`}</div>
                    <div>{`生产线：${lines || ''}`}</div>
                    <div></div>
                </div>
            </div>
        )
    }
}
export default DetailHead;
