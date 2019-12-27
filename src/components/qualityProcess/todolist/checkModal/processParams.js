/**
 * author:yangmei
 * date:2019/12/05
 * 待办事项-工艺参数详情界面
 * */
import React from 'react';
import DetailContent from "../../../technologyCenter/processParameters/detail/detailContent";
import axios from "axios";
import {message} from "antd";

class ProcessParams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            head: {},
            zy: {},
            hc: {},
            ch: {}
        };
        this.getDetailData = this.getDetailData.bind(this);
    }

    render() {
        let {head,zy,hc,ch} = this.state;
        return (
            <DetailContent head={head} zy={zy} hc={hc} ch={ch}/>
        );
    }

    componentDidMount() {
        this.getDetailData()
    }

    getDetailData() {
        let {batchNumberId,url} = this.props;
        axios({
            url: `${url.processParam.detailByBatch}?batchId=${batchNumberId}`,
            method: 'get',
            headers: {
                'Authorization': url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if (data.data.code === 0 && res && res['head']) {
                let head = res['head'], {processCode} = head,
                    proAndLine = res['proAndLine'], {lineNames, productClassName} = proAndLine;
                head['deptName'] = res['deptName'];
                head['lines'] = lineNames.join(',');
                head['auditName'] = res['auditName'];
                head['prepareName'] = res['prepareName'];
                head['processName'] = res['processName'];
                head['productClassName'] = productClassName;
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
                    head: head
                })
            } else {
                message.info('查询失败，请联系管理员！');
            }
        })
    }
}
export default ProcessParams;
