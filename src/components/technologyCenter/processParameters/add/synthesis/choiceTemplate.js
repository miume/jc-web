import React from 'react';
import {Input, Modal, Table, message} from "antd";
import axios from "axios";
import CancleButton from "../../../../BlockQuote/cancleButton";
import NewButton from "../../../../BlockQuote/newButton";

class TemplateChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            dataSource: [],
            selectedRows: []
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a,b) => a.code - b.code,
            width: '15%'
        }, {
            title: '现象',
            dataIndex: 'phenomenon',
            key: 'phenomenon',
            width: '20%'
        }, {
            title: '原因',
            dataIndex: 'reason',
            key: 'reason',
            width: '20%'
        }, {
            title: '处理方式',
            dataIndex: 'process',
            key: 'process',
            width: '20%'
        }, {
            title: '相关产品处理',
            dataIndex: 'proProcess',
            key: 'proProcess',
            width: '20%'
        }];
        this.search = this.search.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.choiceTemplate = this.choiceTemplate.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    render() {
        let {selectedRowKeys,visible,dataSource} = this.state,
            rowSelection = {
                type: 'radio',
                selectedRowKeys,
                onChange: this.onSelectChange,
        };
        return (
            <span>
                <span className='blue' onClick={this.choiceTemplate}>模版选择</span>
                <Modal title='模版选择' visible={visible} centered={true} closable={false} maskClosable={false}
                       width={700}
                       footer={[
                           <CancleButton key='back' flag={1} handleCancel={this.handleCancel}/>,
                           <NewButton key='save' name={'确定'} className={'fa fa-check'} handleClick={this.handleSave}/>
                       ]}>
                    <div style={{height: 400}}>
                        <div style={{marginBottom: 10}}>
                            <Input placeholder={'请输入搜索内容'} onChange={this.search}/>
                        </div>
                        <Table rowKey={record => record.code} columns={this.columns} rowSelection={rowSelection}
                               dataSource={dataSource} pagination={false} size={'small'} bordered scroll={{y: 300}}/>
                    </div>
                </Modal>
            </span>
        )
    }

    choiceTemplate() {
        this.setState({
            visible: true
        });
        this.getTableData();
    }

    /**获取异常处理模版数据*/
    getTableData() {
        axios({
            url: `${this.props.url.techException.getAll}`,
            method: 'get',
            header: {
                'Authorization': this.props.url.Authorizaion
            }
        }).then((data) => {
            let res = data.data.data;
            for(let i = 0; i < res.length; i++) {
                res[i]['index'] = i + 1;
            }
            if(data.data.code === 0) {
                this.setState({
                    dataSource: res,
                    searchData: res
                })
            }
        })
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    search(e) {
        let value = e.target.value, {searchData} = this.state,
            data = value ? searchData.filter(e =>
                e['phenomenon'].includes(value) || e['reason'].includes(value)
                || e['process'].includes(value) || e['proProcess'].includes(value)) : searchData;
        this.setState({
            dataSource: data
        })
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    handleSave() {
        let {selectedRows} = this.state;
        if(!selectedRows.length) {
            message.info('请选择一条异常处理模版！');
            return;
        }
        let {index} = this.props,
            {phenomenon,reason,process,proProcess} = selectedRows[0],
            selected = {
                index: index,
                phenomenon: phenomenon,
                reason: reason,
                processMode: process,
                relatedProductionProcess: proProcess
            };
        this.handleCancel();
        this.props.choiceTemplate(index,selected);
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default TemplateChoice;
