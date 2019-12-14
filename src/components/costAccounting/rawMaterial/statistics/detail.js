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
        this.columns = [{ //混合盐溶液
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '10%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '10%'
        },{
            title: 'Ni浓度(g/L)',
            key: 'NiConcentration',
            dataIndex: 'NiConcentration',
            width: '10%'
        }, {
            title: 'Co浓度(g/L)',
            key: 'CoConcentration',
            dataIndex: 'CoConcentration',
            width: '10%'
        }, {
            title: 'Mn浓度(g/L)',
            key: 'MnConcentration',
            dataIndex: 'MnConcentration',
            width: '10%'
        }, {
            title: 'Ni金属量(T)',
            key: 'NiMetallicity',
            dataIndex: 'NiMetallicity',
            width: '10%'
        }, {
            title: 'Co金属量(T)',
            key: 'CoMetallicity',
            dataIndex: 'CoMetallicity',
            width: '10%'
        }, {
            title: 'Mn金属量(T)',
            key: 'MnMetallicity',
            dataIndex: 'MnMetallicity',
            width: '10%'
        }];

        this.columns2 = [{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '25%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '25%'
        }, {
            title: '浓度(%)',
            key: 'concentration',
            dataIndex: 'concentration',
            width: '25%'
        }, {
            title: '金属量(T)',
            key: 'metal',
            dataIndex: 'metal',
            width: '25%'
        }];

        this.columns2 = [{  //混合盐溶液
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            width: '10%'
        },{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '10%'
        }, {
            title: '物料编码',
            key: 'weight',
            dataIndex: 'weight',
            width: '10%'
        },  {
            title: '物料编码',
            key: 'density',
            dataIndex: 'density',
            width: '10%'
        },{
            title: '出库时间',
            key: 'time',
            dataIndex: 'time',
            width: '10%'
        }, {
            title: 'Ni浓度(%)',
            key: 'niConcentration',
            dataIndex: 'niConcentration',
            width: '10%'
        }, {
            title: 'Co浓度(%)',
            key: 'coConcentration',
            dataIndex: 'coConcentration',
            width: '10%'
        }, {
            title: 'Mn浓度(%)',
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
        }]
    }

    render() {
        let {head} = this.props;
        if(head) {
            var {name, lineName, startTime, endTime} = head
        }
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'900px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div className={'raw-material-detail'}>
                        <div className={'raw-material-detail-head'}>
                            <div>{`周期：` + name}</div>
                            <div>{`期数：` + lineName}</div>
                            <div>{`开始时间：` + startTime}</div>
                            <div>{`结束时间：` + endTime}</div>
                        </div>
                        <Table rowKey={record => record.code} columns={this.columns}
                               size={"small"} bordered pagination={false}/>
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
            case 1 : return this.column1;    //NiSO4溶液
            case 2 : return this.column1;    //CoSO4溶液
            case 3 : return this.column1;    //MnSO4溶液
            case 4 : return this.column1;    //混合盐溶液
            case 5 : return this.column1;    //晶体
            case 6 : return this.column1;    //单晶体溶液
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
