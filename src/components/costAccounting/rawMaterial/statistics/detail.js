import React from 'react';
import {Modal, Table, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import axios from "axios";

class Detail extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.columns4 = [{ //混合盐溶液
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '10%'
        }, {
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width: '10%'
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '10%'
        },{
            title: 'Ni浓度(g/L)',
            key: 'niConcentration',
            dataIndex: 'niConcentration',
            width: '10%'
        }, {
            title: 'Co浓度(g/L)',
            key: 'coConcentration',
            dataIndex: 'coConcentration',
            width: '10%'
        }, {
            title: 'Mn浓度(g/L)',
            key: 'mnConcentration',
            dataIndex: 'mnConcentration',
            width: '10%'
        }, {
            title: 'Ni金属量(T)',
            key: 'niMetallicity',
            dataIndex: 'niMetallicity',
            width: '10%'
        }, {
            title: 'Co金属量(T)',
            key: 'coMetallicity',
            dataIndex: 'coMetallicity',
            width: '10%'
        }, {
            title: 'Mn金属量(T)',
            key: 'mnMetallicity',
            dataIndex: 'mnMetallicity',
            width: '10%'
        }];

        this.columns5 = [{   //晶体
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '25%'
        }, {
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width: '25%'
        }, {
            title: '浓度(%)',
            key: 'concentration',
            dataIndex: 'concentration',
            width: '25%'
        }, {
            title: '金属量(T)',
            key: 'metalTotal',
            dataIndex: 'metalTotal',
            width: '25%'
        }];

        this.columns6 = [{   //单晶体
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '20%'
        }, {
            title: '重量(T)',
            key: 'weights',
            dataIndex: 'weights',
            width: '20%'
        }, {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '20%'
        }, {
            title: '浓度(%)',
            key: 'concentration',
            dataIndex: 'concentration',
            width: '20%'
        }, {
            title: '金属量(T)',
            key: 'metalTotal',
            dataIndex: 'metalTotal',
            width: '20%'
        }];

        this.columns = [{  //NiSO4溶液、CoSO4、MnSO4
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '5%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '8%'
        }, {
            title: '物料编码',
            key: 'materialCode',
            dataIndex: 'materialCode',
            width: '10%'
        },{
            title: '出库时间',
            key: 'deliveryTime',
            dataIndex: 'deliveryTime',
            width: '15%'
        },  {
            title: '出库量',
            key: 'weights',
            dataIndex: 'weights',
            width: '8%'
        }, {
            title: 'Ni浓度(%)',
            key: 'niConcentration',
            dataIndex: 'niConcentration',
            width: '9%'
        }, {
            title: 'Co浓度(%)',
            key: 'coConcentration',
            dataIndex: 'coConcentration',
            width: '9%'
        }, {
            title: 'Mn浓度(%)',
            key: 'mnConcentration',
            dataIndex: 'mnConcentration',
            width: '9%'
        }, {
            title: 'Ni金属量(T)',
            key: 'niMetallicity',
            dataIndex: 'niMetallicity',
            width: '10%'
        }, {
            title: 'Co金属量(T)',
            key: 'coMetallicity',
            dataIndex: 'coMetallicity',
            width: '10%'
        }, {
            title: 'Mn金属量(T)',
            key: 'mnMetallicity',
            dataIndex: 'mnMetallicity',
            width: '10%'
        }]
    }

    render() {
        let {head,materialTypeCode} = this.props, {data} = this.state;
        if(head) {
            var {name, lineName, startTime, endTime} = head
        }
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'1100px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div className={'raw-material-detail'}>
                        <div className={'raw-material-detail-head'}>
                            <div>{`周期：` + name}</div>
                            <div>{`期数：` + lineName}</div>
                            <div>{`开始时间：` + startTime}</div>
                            <div>{`结束时间：` + endTime}</div>
                        </div>
                        <Table rowKey={record => record.code} dataSource={data} columns={this.renderColumns(materialTypeCode)}
                               size={"small"} bordered pagination={false} scroll={{y:200}}/>
                    </div>
                </Modal>
            </span>
        )
    }

    /**点击详情按钮*/
    handleClick() {
        let {materialTypeCode,statisticCode} = this.props;
        this.getDetailData(materialTypeCode,statisticCode);
    }

    getDetailData(materialTypeCode,statisticCode) {
        let params = {
            materialTypeCode,
            statisticCode
        };
        axios({
            url: `${this.props.url.rawMaterial.statDetail}`,
            method:'get',
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params
        }).then((data)=> {
            let res = data.data.data;
            if(data.data.code === 0) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] = i + 1;
                    res[i]['concentration'] = res[i]['niConcentration'] + res[i]['coConcentration'] + res[i]['mnConcentration'];
                    res[i]['metalTotal'] = res[i]['niMetallicity'] + res[i]['coMetallicity'] + res[i]['mnMetallicity'];
                }
                this.setState({
                    visible: true,
                    data: res
                })
            } else {
                message.info('查询数据异常，请联系管理员！');
            }
        })
    }

    renderColumns(type) {
        switch (type) {
            case 1 : return this.columns;    //NiSO4溶液
            case 2 : return this.columns;    //CoSO4溶液
            case 3 : return this.columns;    //MnSO4溶液
            case 4 : return this.columns4;    //混合盐溶液
            case 5 : return this.columns5;    //晶体
            case 6 : return this.columns6;    //单晶体溶液
            default: return null;
        }
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }
}

export default Detail;
