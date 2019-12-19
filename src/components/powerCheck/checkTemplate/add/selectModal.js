import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {Modal, Select, Table, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
const {Option} = Select;

const placeData = [{
    code: 1,
    place: '地点一'
},{
    code: 2,
    place: '地点二'
},{
    code: 3,
    place: '地点三'
}],
    itemData = [{
        code: 1,
        item: '地点一'
    },{
        code: 2,
        item: '地点二'
    },{
        code: 3,
        item: '地点三'
    }];

class SelectModal extends React.Component {
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
            title:'点检内容',
            key:'content',
            dataIndex:'content',
            width: '30%'
        },{
            title:'输入类型',
            key:'type',
            dataIndex:'type',
            width: '30%',
            render: (text) => {
                return text ? '输入' : '勾选';
            }
        },{
            title:'频率',
            key:'frequency',
            dataIndex:'frequency'
        }];
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,selectedRowKeys,place,item} = this.state, {title,data} = this.props, disabled = title !== '新增' ? true : false,
            rowSelection = {
                type: 'radio',
                selectedRowKeys,
                onChange: this.onSelectChange,
            };
        return (
            <span>
                {this.renderButton(title)}
                <Modal title={'选择点检内容'} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={600}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}>
                    <div className='check-template-add'>
                        <div>地点：</div>
                        <Select disabled={disabled} value={place} onChange={this.selectChange} style={{width: 150}} placeholder={'请选择点检站点'}>
                            {
                                placeData ? placeData.map(e => <Option key={e.code} name={'place'} value={e.code}>{e.place}</Option>) : null
                            }
                        </Select>
                        <div className={'check-template-add-item'}>设备名/点检项目：</div>
                        <Select disabled={disabled} value={item} onChange={this.selectChange} style={{width: 150}} placeholder={'请选择点检站点'}>
                            {
                                itemData ? itemData.map(e => <Option key={e.code} name={'item'} value={e.code}>{e.item}</Option>) : null
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
            let {place,item,index} = record;
            this.setState({
                place,
                item,
                index
            })
        }
        this.setState({
            visible: true
        });
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    /**监控地点、设备名/点检项目下拉框变化*/
    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
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
        let params = this.saveDataProcessing(), {title} = this.props, type = title === '新增' ? 'add' : '';
        if(params) {
            this.handleCancel();
            this.props.addItem(params,type)
        }
    }

    /**处理保存数据*/
    saveDataProcessing() {
        let {item,place,selectedRows,index} = this.state;
        if(item && place && selectedRows.length) {
            let {content,type,frequency} = selectedRows, params = {
                index,
                item,
                place,
                content,
                type,
                frequency
            };
            return params;
        } else {
            message.info('信息不完整！');
            return false
        }
    }
}

export default SelectModal;
