import React from 'react';
import {Modal, Table, Divider} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";
import {columns1,columns2,columns3} from './columns';

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
        this.getFooter = this.getFooter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
    }
    render() {
        let {head,processes} = this.state;
        return(
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'900px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div className='excipient-statistics-detail-display'>
                        <div><b>周期：</b>{head ? head.periodName : ''}</div>
                        <div><b>期数：</b>{head ? head.periods : ''}</div>
                        <div><b>区域：</b>{head ? head.processName : ''}</div>
                    </div>
                    <div className='excipient-statistics-detail-display'>
                        <div><b>开始时间：</b>{head ? head.startTime : ''}</div>
                        <div><b>结束时间：</b>{head ? head.endTime : ''}</div>
                        <div></div>
                    </div>
                    <Divider />
                    <Table rowKey={record => record.process.code} dataSource={processes} columns={this.columns}
                           size={"small"} bordered pagination={false} footer={this.getFooter}/>
                </Modal>
            </span>
        )
    }

    /**点击详情按钮*/
    handleClick() {
        let {code,type} = this.props;
        if(type === 7) {
            this.columns = columns1;  //入库量
        } else if(type === 8 || type === 9) {
            this.columns = columns2;  //罐区和车间
        }  else {
            this.columns = columns3;  //辅料消耗量
        }
        this.getDetailData(code);
        this.setState({
            visible: true
        })
    }

    getDetailData(code) {
        axios({
            url: `${this.props.url.auxiliary.detail}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res) {
                let {head,processTotal,processes} = res;
                head['periodName'] = res['periodName'];
                head['processName'] = res['processName'];
                for(let i = 0; i < processes.length; i++) {
                    processes[i]['index'] = i + 1;
                }
                this.setState({
                    head,
                    processes,
                    processTotal
                })
            }
        })
    }

    getFooter() {
        let {processTotal} = this.state;
        return (
            <div className='excipient-statistics-detail-footer'>
                <div>小计</div>
                <div>{`重量：${processTotal ? processTotal['totals'] : ''}`}</div>
                <div>{`氨量：${processTotal ? processTotal['ammoniaValue'] : ''}`}</div>
                <div>{`碱量：${processTotal ? processTotal['alkaliValue'] : ''}`}</div>
            </div>
        )
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default Detail
