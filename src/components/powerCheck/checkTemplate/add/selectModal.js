import React from 'react';
import axios from 'axios';
import NewButton from "../../../BlockQuote/newButton";
import {Modal, Select, Table, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
const {Option} = Select;

// const placeData = [{
//     code: 1,
//     place: '地点一'
// },{
//     code: 2,
//     place: '地点二'
// },{
//     code: 3,
//     place: '地点三'
// }],
//     itemData = [{
//         code: 1,
//         item: '地点一'
//     },{
//         code: 2,
//         item: '地点二'
//     },{
//         code: 3,
//         item: '地点三'
//     }];

class SelectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRowKeys: [],
            selectedRows: []
        };
        this.columns = [{
            title:'序号',
            key:'index',
            dataIndex:'index',
            width: '10%'
        },{
            title:'点检内容',
            key:'checkContent',
            dataIndex:'checkContent',
            width: '50%'
        },{
            title:'输入类型',
            key:'dataType',
            dataIndex:'dataType',
            width: '20%',
            render: (text) => {
                return text ? '输入' : '勾选';
            }
        },{
            title:'频率',
            key:'frequency',
            dataIndex:'frequency',
            width: '20%',
        }];
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.getCheckItem = this.getCheckItem.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.checkItemChange = this.checkItemChange.bind(this);
        this.getCheckItemDetail = this.getCheckItemDetail.bind(this);
    }

    render() {
        let {visible,selectedRowKeys,place,checkItem,placeData,itemData,data} = this.state, {title,disabledCode} = this.props, disabled = title !== '新增' ? true : false,
            rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
                getCheckboxProps: record => ({
                    disabled: disabledCode && disabledCode.length &&disabledCode.includes(record.itemCode)
                }),
            };
        return (
            <span>
                {this.renderButton(title)}
                <Modal title={'选择点检内容'} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={650}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel} flag={1}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}>
                    <div className='check-template-add'>
                        <div>地点：</div>
                        <Select disabled={disabled} value={place} onChange={this.selectChange} style={{width: 200}} placeholder={'请选择点检站点'}>
                            {
                                placeData ? placeData.map((e,index) => <Option key={index} name={'place'} value={e}>{e}</Option>) : null
                            }
                        </Select>
                        <div className={'check-template-add-item'}>设备名/点检项目：</div>
                        <Select disabled={disabled} value={checkItem} onChange={this.checkItemChange} style={{width: 200}} placeholder={'请选择点检站点'}>
                            {
                                itemData ? itemData.map((e,index) => <Option key={index} value={e['codeList'].join(',')}>{e.checkItem}</Option>) : null
                            }
                        </Select>
                    </div>

                    <Table dataSource={data} columns={this.columns} rowKey={record => record.itemCode}
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
        let {record,siteCode} = this.props;
        if(!siteCode) {
            message.info('请先选择点检站点');
            return
        }
        this.getPlaceBySite(siteCode);
        if(record) {  //处理编辑时初始数据
            let {place,checkItem,index,code} = record;
            this.setState({
                place,
                checkItem,
                index,
                code
            });
            this.getCheckItem(place,checkItem)
            // this.getCheckItemDetail(ids);
        }
        this.setState({
            visible: true
        });
    }

    /**根据点检站点搜索地点*/
    getPlaceBySite(code) {
        axios({
            url: `${this.props.url.checkItem.getPlace}?siteCode=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    placeData: res
                })
            }
        })
    }

    /**监控地点下拉框变化*/
    selectChange(value) {
        this.setState({
            place: value
        });
        this.getCheckItem(value);
    }

    /**监控设备名/点检项目下拉框变化*/
    checkItemChange(value) {
        this.setState({
            checkItem: value
        });
        let ids = value.split(',').map(e => parseInt(e))
        this.getCheckItemDetail(ids);
    }

    /**根据站点code和地点获取点检项目*/
    getCheckItem(place,checkItem) {
        let {siteCode} = this.props;
        axios({
            url: `${this.props.url.checkItem.getItems}?siteCode=${siteCode}&place=${place}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    itemData: res
                });
                if(checkItem) {
                    let ids = res.filter(e => e.checkItem === checkItem)[0]['codeList'];
                    this.getCheckItemDetail(ids);
                }
            }
        })
    }

    getCheckItemDetail(ids) {
        axios({
            url: `${this.props.url.checkItem.byIds}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: ids
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                for(let i = 0; i < res.length; i++) {
                    res[i]['index'] = i + 1;
                    res[i]['itemCode'] = res[i]['code'];
                    delete res[i]['code'];
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
        let {selectedRows} = this.state;
        if(selectedRows.length) {
            this.handleCancel();
            this.props.addItem(selectedRows)
        } else {
            message.info('请至少选择一条数据！')
        }
    }

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false,
            selectedRows: [],
            selectedRowKeys: []
        });
    }
}

export default SelectModal;
