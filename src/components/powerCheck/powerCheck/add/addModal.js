import React from 'react';
import axios from 'axios';
import NewButton from "../../../BlockQuote/newButton";
import {Modal, Select, Table, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddTableModal from "../../checkTemplate/tableAdd/addModal";
const {Option} = Select;

// const placeData = [{
//         code: 1,
//         place: '地点一'
//     },{
//         code: 2,
//         place: '地点二'
//     },{
//         code: 3,
//         place: '地点三'
//     }],
//     tableData = [{
//         code: 1,
//         modelName: '模版名称',
//         frequency: '1次/天',
//         batchNumber: 'DL-JL023',
//         effectiveDate: '2019-12-01'
//     },{
//         code: 2,
//         modelName: '模版名称2',
//         frequency: '1次/天',
//         batchNumber: 'DL-JL023',
//         effectiveDate: '2019-12-01'
//     },{
//         code: 3,
//         modelName: '模版名称2',
//         frequency: '1次/天',
//         batchNumber: 'DL-JL023',
//         effectiveDate: '2019-12-01'
//     }];

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: []
        };
        this.columns = [{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width: '10%'
        },{
            title:'模版名称',
            key:'modelName',
            dataIndex:'modelName',
            width: '20%'
        },{
            title:'点检频率',
            key:'frequency',
            dataIndex:'frequency',
            width: '20%'
        },{
            title:'编号',
            key:'batchNumber',
            dataIndex:'batchNumber',
            width: '20%'
        },{
            title:'生效日期',
            key:'effectiveDate',
            dataIndex:'effectiveDate',
            width: '30%'
        }];
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.getAllCheckSite = this.getAllCheckSite.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,selectedRowKeys,siteCode,data,siteData} = this.state, {title,flag} = this.props, disabled = title !== '新增' ? true : false,
            rowSelection = {
                type: 'radio',
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
        return (
            <span className={flag ? '' : 'hide'}>
                {this.renderButton(title)}
                <Modal title={'选择点检内容'} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={700}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <AddTableModal key={'save'} title={'保存'} flag={true} url={this.props.url} getTableParams={this.props.getTableParams} id={selectedRowKeys[0]} handleCancel={this.handleSave}/>
                       ]}>
                    <div className='check-template-add'>
                        <div>点检站点：</div>
                        <Select disabled={disabled} value={siteCode} onChange={this.selectChange} style={{width: 150}} placeholder={'请选择点检站点'}>
                            {
                                siteData ? siteData.map(e => <Option key={e.code} name={'siteCode'} value={e.code}>{e.siteName}</Option>) : null
                            }
                        </Select>
                    </div>

                    <Table dataSource={data} columns={this.columns} rowKey={record => record.code}
                           pagination={false} scroll={{y:200}} rowSelection={rowSelection}
                           bordered size={'small'}/>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>选择</span>
        )
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {siteCode,item,index} = record;
            this.setState({
                siteCode,
                item,
                index
            })
        }
        this.getAllCheckSite();
        this.setState({
            visible: true
        });
    }

    /**获取所有点检站点*/
    getAllCheckSite() {
        axios({
            url: `${this.props.url.checkSite.all}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    siteData: res
                })
            }
        })
    }

    /**监控地点、设备名/点检项目下拉框变化*/
    selectChange(value) {
        this.setState({
            siteCode: value
        });
        this.getTableData(value);
    }

    getTableData(code) {
        axios({
            url: `${this.props.url.checkModel.bySiteCode}?siteCode=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] = i + 1;
                }
                this.setState({
                    data: res
                })
            }
        })
    }

    /**监控表格多选*/
    onSelectChange(selectedRowKeys,selectedRows) {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    /**点击保存接口*/
    handleSave() {
        this.handleCancel();
        this.props.getTableParams()
    }

    /**处理保存数据*/
    saveDataProcessing() {
        let {selectedRows,siteCode} = this.state;
        if(siteCode && selectedRows.length) {
            let params = {
                    selectedRows,
                    siteCode
            };
            return params;
        } else {
            message.info('信息不完整！');
            return false
        }
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }
}

export default AddModal;
