import React from 'react';
import {Modal, Table} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";

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
        this.columns = [{
            title: '物料名称',
            key: 'materialName',
            dataIndex: 'materialName',
            width: '7%'
        }, {
            title: '重量(T)',
            key: 'weight',
            dataIndex: 'weight',
            width: '7%'
        },  {
            title: '密度(g/ml)',
            key: 'density',
            dataIndex: 'density',
            width: '7%'
        },{
            title: 'Ni浓度',
            key: 'NiConcentration',
            dataIndex: 'NiConcentration',
            width: '7%'
        }, {
            title: 'Co浓度',
            key: 'CoConcentration',
            dataIndex: 'CoConcentration',
            width: '7%'
        }, {
            title: 'Mn浓度',
            key: 'MnConcentration',
            dataIndex: 'MnConcentration',
            width: '7%'
        }, {
            title: 'Ni金属量(T)',
            key: 'NiMetallicity',
            dataIndex: 'NiMetallicity',
            width: '7%'
        }, {
            title: 'Co金属量(T)',
            key: 'CoMetallicity',
            dataIndex: 'CoMetallicity',
            width: '7%'
        }, {
            title: 'Mn金属量(T)',
            key: 'MnMetallicity',
            dataIndex: 'MnMetallicity',
            width: '7%'
        }]
    }

    render() {
        const {periodName, lineName, start, end} = this.props.data;
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>详情</span>
                <Modal visible={this.state.visible} title={'详情'} maskClosable={false}
                       width={'900px'} centered={true} closable={false}
                       footer={[<CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>]}
                >
                    <div className={'raw-material-detail'}>
                        <div className={'raw-material-detail-head'}>
                            <div>{`周期：` + periodName}</div>
                            <div>{`期数：` + lineName}</div>
                            <div>{`开始时间：` + start}</div>
                            <div>{`结束时间：` + end}</div>
                        </div>
                        <Table rowKey={record => record.code} dataSource={[this.props.data]} columns={this.columns}
                               size={"small"} bordered pagination={false}/>
                    </div>
                </Modal>
            </span>
        )
    }

    /**点击详情按钮*/
    handleClick() {
        this.setState({
            visible: true
        })
    }

    /**点击取消按钮*/
    handleCancel() {
        this.setState({
            visible: false
        })
    }
}

export default Detail;
