import React from 'react';
import axios from 'axios'
import {Modal, message} from "antd";
import CancleButton from '../../../BlockQuote/cancleButton';
import ProcessParams from "./synthesis/processParams";
import AgedWashingDeatil from "./ageWashingDetail";
import LiquidDetail from "./liquid/liquid";
import DetailContent from "./detailContent";
import AllTester from "../../../BlockQuote/allTester";

class DetailModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            examineData: []
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getAllTester = this.getAllTester.bind(this);
        this.getDetailById = this.getDetailById.bind(this);
    }
    render() {
        let {visible,head,zy,hc,ch,examineData} = this.state;
        return (
            <span>
                <span className='blue' onClick={this.handleAdd}>详情</span>
                <Modal title={'详情'} visible={visible} closable={false} maskClosable={false}
                       centered={true} width='1100px'
                       footer={[
                           <CancleButton key='back' flag={1} handleCancel={this.handleCancel}/>,
                       ]}>
                    <div>
                        <DetailContent head={head} zy={zy} hc={hc} ch={ch} url={this.props.url}/>
                        <AllTester examineData={examineData} dataId='1'/>
                    </div>
                </Modal>
            </span>
        );
    }

    /**点击新增，显示弹出框*/
    handleAdd() {
        let {code,status} = this.props;
        this.getDetailById(code,status);
    }

    /**编辑*/
    getDetailById(id,status) {
        axios({
            url: `${this.props.url.processParam.detail}?id=${id}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if (data.data.code === 0) {
                let head = res['head'], {processCode} = head,
                    proAndLine = res['proAndLine'], {lineNames, productClassName} = proAndLine;
                head['deptName'] = res['deptName'];
                head['lines'] = lineNames.join(',');
                head['auditName'] = res['auditName'];
                head['prepareName'] = res['prepareName'];
                head['processName'] = res['processName'];
                head['productClassName'] = productClassName;

                //已通过，已驳回，已发布都需要显示审核人和审核意见
                if(status === '3' || status === '4' || status === '5') {
                    this.getAllTester(head['approvalProcessCode'])
                }

                if (processCode === 48) {
                    this.setState({
                        zy: res['zy']
                    });
                } else if (processCode === 50) {
                    this.setState({
                        ch: res['ch']
                    });
                } else {
                    this.setState({
                        hc: res['hc']
                    });
                }
                this.setState({
                    head: head,
                    processCode: processCode,
                    visible: true
                })
            } else {
                message.info('查询失败，请联系管理员！');
            }
        })
    }

    /**通过batchNumberId 查询审核人 */
    getAllTester(dataId){
        axios({
            url:`${this.props.url.toDoList}/${dataId}/result`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then(data=>{
            const res = data.data.data;
            if(res){
                this.setState({
                    examineData : res
                })
            }
        })
    }

    renderTable() {
        let {head,devices,chMoment,exceptionDisposes,mediate,mediateMemo,detail,processParamsMemo,proAndLines,components,zyDetail} = this.state,
            processCode = head ? head['processCode'] : '';
        if(processCode === 49) {
            return <ProcessParams detail={detail} proAndLines={proAndLines} processParamsMemo={processParamsMemo}
                                  exceptionDisposes={exceptionDisposes} mediate={mediate} mediateMemo={mediateMemo}/>
        } else if(processCode === 48) {
            return <LiquidDetail components={components} zyDetail={zyDetail}/>
        } else if (processCode === 50){
            return <AgedWashingDeatil data={devices} chMoment={chMoment}/>
        } else {
            return null;
        }
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
