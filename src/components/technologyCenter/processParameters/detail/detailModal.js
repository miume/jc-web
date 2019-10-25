import React from 'react';
import axios from 'axios'
import {Modal, Tabs} from "antd";
import NewButton from '../../../BlockQuote/newButton';
import CancleButton from '../../../BlockQuote/cancleButton';
import ExceptionHandling from "../detail/exceptionHandling";
import ProductStandard from "../detail/productStandard";
import ProcessParaMeter from '../detail/processParameters';
const {TabPane} = Tabs;

class DetailModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    render() {
        let {processNum,edition,plantName,effectiveDate,expiryDate,
            processName,approvalProcessCode,dateOfFiling,preparer} = this.props.data;
        return (
            <span>
                <span className='blue' onClick={this.handleAdd}>详情</span>
                <Modal title={'详情'} visible={this.state.visible} closable={false} maskClosable={false}
                       centered={true} width='1100px'
                       footer={[
                           <CancleButton key='back' handleCancel={this.handleCancel}/>,
                           <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                       ]}>
                    <div className='process-parameters-detail'>
                        <div className='process-parameters-detail-top'>
                            <div>{`编号：${processNum}`}</div>
                            <div>{`版次：${edition}`}</div>
                            <div>{`使用车间：${plantName}`}</div>
                        </div>
                        <div className='process-parameters-detail-top'>
                            <div>{`生效日期：${effectiveDate}`}</div>
                            <div>{`失效日期：${expiryDate}`}</div>
                            <div>{`工序：${processName}`}</div>
                        </div>
                        <div className='process-parameters-detail-top'>
                            <div>{`审核流程：${approvalProcessCode}`}</div>
                            <div>{`编制人：${preparer}`}</div>
                            <div>{`编制时间：${dateOfFiling}`}</div>
                        </div>
                        <div className='process-parameters-detail-bottom'>
                            <Tabs defaultActiveKey={'1'}>
                                <TabPane tab={'工艺参数'} key={'1'}>
                                    <ProcessParaMeter />
                                </TabPane>
                                <TabPane tab={'异常处置'} key={'2'}>
                                    <ExceptionHandling />
                                </TabPane>
                                <TabPane tab={'中间品标准'} key={'3'}>
                                    <ProductStandard />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Modal>
            </span>
        );
    }

    /**点击新增，显示弹出框*/
    handleAdd(){
        this.setState({
            visible : true
        })
    }

    /**新增一条记录 */
    handleOk() {
        this.handleCancel()
    }

    /**对应新增确认取消 */
    handleCancel() {
        this.setState({
            visible: false
        });
    }

}
export default DetailModal;
