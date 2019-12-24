import React from 'react';
import axios from 'axios';
import NewButton from "../../BlockQuote/newButton";
import {Input, Modal, Select, message} from "antd";
import CancleButton from "../../BlockQuote/cancleButton";
import SaveButton from "../../BlockQuote/saveButton";
const {Option} = Select;

// const siteData = [{
//     code: 1,
//     siteName: '点检站点1'
// },{
//     code: 2,
//     siteName: '点检站点2'
// },{
//     code: 3,
//     siteName: '点检站点3'
// }];
//
// const placeData1 = [{
//     code: 1,
//     place: '地点1'
// },{
//     code: 2,
//     place: '地点2'
// },{
//     code: 3,
//     place: '地点3'
// }];

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 0,
            placeData: [],     //存取地点数据
        };
        this.siteChange = this.siteChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.getPlaceBySite = this.getPlaceBySite.bind(this);
        this.getAllCheckSite = this.getAllCheckSite.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
    }

    render() {
        let {visible,siteCode,dataType,place,checkItem,checkContent,frequency,placeData,siteData,disabled} = this.state, {title} = this.props;
        return (
            <span>
                { this.renderButton(title) }
                <Modal title={title} visible={visible} maskClosable={false} closable={false}
                       centered={true} width={400}
                       footer={[
                           <CancleButton key={'cancel'} handleCancel={this.handleCancel}/>,
                           <SaveButton key={'save'} handleSave={this.handleSave}/>
                       ]}
                >
                    <div className={'check-item'}>
                        <div className={'check-item-div'}>点检站点：</div>
                        <Select onChange={this.siteChange} value={siteCode} style={{width:200}} placeholder={'请选择点检项目'} disabled={disabled}>
                            {
                                siteData ? siteData.map(e => <Option key={e.code} value={e.code}>{e.siteName}</Option>) : null
                            }
                        </Select>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>地点：</div>
                        {
                            placeData.length ?
                                <Select onChange={this.selectChange} value={place} style={{width:200}} placeholder={'请选择地点'}>
                                    {
                                        placeData ? placeData.map((e,index) => <Option name={'place'} key={index} value={e}>{e}</Option>) : null
                                    }
                                </Select> :
                                <Input placeholder={'请输入地点'} name={'place'} value={place} style={{width:200}} onChange={this.inputChange} disabled={disabled}/>
                        }
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>设备名/点检项目：</div>
                        <Input placeholder={'请输入设备名/点检项目'} name={'checkItem'} value={checkItem} style={{width:200}} onChange={this.inputChange} disabled={disabled}/>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>点检内容：</div>
                        <Input placeholder={'请输入点检内容'} name={'checkContent'} value={checkContent} style={{width:200}} onChange={this.inputChange} />
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>输入类型：</div>
                        <Select onChange={this.selectChange} value={dataType} style={{width:200}} placeholder={'请选择输入类型'}>
                            <Option name={'dataType'} value={0}>勾选</Option>
                            <Option name={'dataType'} value={1}>输入</Option>
                        </Select>
                    </div>

                    <div className={'check-item'}>
                        <div className={'check-item-div'}>频率：</div>
                        <Input placeholder={'请输入，例：1次/天'} name={'frequency'} value={frequency} style={{width:200}} onChange={this.inputChange} />
                    </div>
                </Modal>
            </span>
        );
    }

    renderButton(title) {
        return (
            title === '新增'?
                <NewButton name='新增' className='fa fa-plus' handleClick={this.handleClick}/> :
                <span className={'blue'} onClick={this.handleClick}>编辑</span>
        )
    }

    /**点击新增事件*/
    handleClick() {
        let {record} = this.props;
        if(record) {
            let {siteCode,place,checkItem,checkContent,dataType,frequency,code} = record;
            this.setState({
                siteCode,
                place,
                checkItem,
                checkContent,
                frequency,
                code,
                dataType,
                disabled: true
            });
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

    /**取消事件*/
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    /**监控点检站点的编号*/
    siteChange(value) {
        this.setState({
            siteCode: value,
            placeData: []
        });
        this.getPlaceBySite(value);
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

    selectChange(value,option) {
        let name = option.props.name;
        this.setState({
            [name]: value
        })
    }

    inputChange(e) {
        let tar = e.target, name = tar.name, value = tar.value;
        this.setState({
            [name]: value
        })
    }

    handleSave() {
        let params = this.saveDataProcessing();
        console.log(params)
        if(params) {
            let {data,method,url} = params;
            axios({
                url: url,
                method: method,
                headers: {
                    'Authorization': this.props.url.Authorization
                },
                data
            }).then((data) => {
                this.handleCancel();
                message.info(data.data.message);
                this.props.getTableParams();
            })
        }
    }

    saveDataProcessing() {
        let {place,frequency,siteCode,checkContent,dataType,checkItem,code} = this.state,
            data = {
                code,
                siteCode,
                place,
                checkItem,
                checkContent,
                dataType,
                frequency
            },method = 'post', url = this.props.url.checkItem.add;
        if(!siteCode || !place || !checkItem || !checkContent || dataType === undefined || !frequency) {
            message.info('请将新增信息填写完整！')
            return false
        }
        if(code) {
            method = 'put';
            url = this.props.url.checkItem.update;
        }
        return {data,method,url};
    }
}

export default AddModal;
