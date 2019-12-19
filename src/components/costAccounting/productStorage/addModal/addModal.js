import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import {Spin, message} from "antd";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import Search from "../../rawMaterial/addModal/search";
import AddTable from "./addTable";
import axios from 'axios';

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            disabled: false,
            loading: false,
            data: [],
            batchData: [], //存储所有批次信息
        };
        this.addItem = this.addItem.bind(this);
        this.checkArr = this.checkArr.bind(this);
        this.checkObj = this.checkObj.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getAllBatch = this.getAllBatch.bind(this);
        this.batchChange = this.batchChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveOrCommit = this.saveOrCommit.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.getPreLineName = this.getPreLineName.bind(this);
        this.inputNumberChange = this.inputNumberChange.bind(this);
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let {staticPeriod,periods,currentStaticPeriod,visible,disabled,head,loading,data,batchData,id,endDate} = this.state,
            name = id > -1 ? '编辑数据' : '新增数据';
        return(
            <Spin spinning={loading}>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-add-content'}>
                    <Search flag={true} staticPeriod={staticPeriod} currentStaticPeriod={currentStaticPeriod} periods={periods} disabled={disabled} head={head}
                            selectChange={this.selectChange} searchEvent={this.searchEvent} inputChange={this.inputChange} disabledDate={endDate}/>
                    <AddTable visible={visible} data={data} batchData={batchData} batchChange={this.batchChange} add={this.addItem} i
                              inputChange={this.inputChange} inputNumberChange={this.inputNumberChange}/>
                </div>
                <div className='raw-material-add-footer-bottom'>
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                    <div>
                        <SaveButton key='save' handleSave={this.handleSave}/>
                        <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleCommit}/>
                    </div>
                </div>
            </Spin>
        )
    }

    /**获取路由传递的数据*/
    componentDidMount() {
        this.getAllBatch();
        let location = this.props.location;
        if(location) {
            let path = location.pathname.split('/'),
                id = path.length >= 2 ? path[2] : '', staticPeriod = location.state.staticPeriod ? location.state.staticPeriod : [],
                currentStaticPeriod = staticPeriod ? staticPeriod[0] : {};
            this.setState({
                id: id,
                staticPeriod: staticPeriod
            });
            if(id) {
                this.getDetailData(id);
            } else {
                this.setState({
                    currentStaticPeriod: currentStaticPeriod
                });
                if(currentStaticPeriod && currentStaticPeriod.code) {
                    this.getPreLineName(currentStaticPeriod.code);
                }
            }
        }
    }

    getDetailData(code) {
        axios({
            url: `${this.url.productStorage.editDetail}?id=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorizaion
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res['head']) {
                let {head, pageInfo} = res;
                for(let i = 0; i < pageInfo.length; i++) {
                    pageInfo[i]['index'] = i + 1;
                }
                this.setState({
                    data: pageInfo,
                    head: head,
                    visible: true,
                    disabled: true
                })
            }
        })
    }

    /**根据周期获取上期期数*/
    getPreLineName(periodCode) {
        axios({
            url: `${this.url.productStorage.nextPeriod}?periodId=${periodCode}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorizaion
            }
        }).then((data) => {
            let res = data.data ? data.data.data : {};
            this.setState({
                periods: res['period'],
                endDate: res['endTime']
            })
        })
    }

    /**监控统计周期下拉框的变化*/
    selectChange(value,option) {
        let name = option.props.name.split('-'),
            currentStaticPeriod = {
                code: value,
                startTime: name[0],
                length: parseInt(name[1])
            };
        this.setState({
            currentStaticPeriod: currentStaticPeriod
        });
        this.getPreLineName(value);
    }

    searchEvent(params) {
        params['lineName'] = params['periods'];
        delete params['periods'];
        this.addConfirm(params);
    }

    /**监控所有input输入框的变化*/
    inputChange(e) {
        let tar = e.target.name.split('-'), value = e.target.value,
            name = tar[0], index = tar[1] ? tar[1] : '', type = tar[2] ? tar[2] : '',
            {data} = this.state;
        if(typeof value === 'number') value = value.toString();
        if(type === 'int') {
            value =  value.replace(/[^\d\.]/g, "");  //只准输入数字
            value = value === '' ? '' : parseInt(value);  //将字符串转为整型
        } else if (type === 'float') {
            value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
            if(value[value.length-1] !== '.')
                value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        }
        if(index === '') {
            this.setState({
                [name]: value
            })
        } else {
            data[index-1][name] = value;
            this.setState({
                data
            })
        }
    }

    /**监控镍钴锰浓度变化，只能输入0到1*/
    inputNumberChange(e) {
        let tar = e.target.name.split('-'), value = e.target.value,
            name = tar[0], index = tar[1] ? tar[1] : '',
            {data} = this.state;
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        if(value[value.length-1] !== '.')        //若输入最后一位为. 则不转换为浮点型
            value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        if(value < 0 || value > 1) {
            message.info('只能输入0到1之间的数字！');
            return
        }
        data[index-1][name] = value;
        this.setState({
            data
        })
    }

    /**监控批号的变化*/
    batchChange(value,option) {
        let name = option.props.name.split('-'), index = name[0], {data} = this.state;
        value = name[1];
        data[index-1]['batch'] = value;
        this.setState({
            data
        })

    }

    /**表头新增*/
    addConfirm(da) {
        axios({
            url: `${this.url.productStorage.addConfirm}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: da
        }).then((data) => {
            let res = data.data.data;
            if(res && res.code > 0) {
                this.setState({
                    id: res.code,
                    visible: true,
                    disabled: true
                })
            } else {
                message.info(res.message);

            }
        })
    }

    /**获取所有批号*/
    getAllBatch() {
        axios({
            url: `${this.url.productStorage.getAllBatch}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
        }).then((data) => {
            let res = data.data.data;
            if(res && res.length) {
                this.setState({
                    batchData: res
                })
            }
        })
    }

    addItem() {
        let {data} = this.state,
            item = {
                "index": data.length+1,
                "batch": undefined,
                "coConcentration": 0,
                "coMetallicity": 0,
                "code": 0,
                "lineCode": 0,
                "mnConcentration": 0,
                "mnMetallicity": 0,
                "niConcentration": 0,
                "niMetallicity": 0,
                "productionTypeName": "",
                "statisticCode": 0,
                "weights": 0
            };
        data.push(item);
        this.setState({
            data
        })
    }

    /**点击取消新增*/
    handleCancel() {
        this.props.history.push({pathname: "/productStorage"})
    };

    /**点击保存新增*/
    handleSave() {
        this.saveDataProcessing(0);
    };

    /**点击保存新增*/
    handleCommit() {
        this.saveDataProcessing(1);
    };

    saveDataProcessing(flag) {
        let {data,id} = this.state;
        if(!this.checkArr(data)) {
            message.info('请将表格新增数据填写完整！');
            return
        }
        this.saveOrCommit(data,flag,id);
    }

    checkArr(arr) {
        if(arr && arr.length) {
            for(let i in arr) {
                if(!this.checkObj(arr[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**检验对象中属性值是否有为空*/
    checkObj(obj) {
        if(obj === {}) return false;
        for(let i in obj) {
            if(obj[i] === '' || obj[i] === undefined) {
                return false;
            }
        }
        return true;
    }

    /**保存或提交*
     * flag = 1 - 提交
     * flag = 0 -保存
     */
    saveOrCommit(data,flag,id) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.productStorage.saveOrCommit}?flag=${flag}&id=${id}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data
        }).then((data) => {
            message.info(data.data.message);
            this.setState({
                loading: false
            });
            if(data.data.code === 0) {
                this.handleCancel();
            }
        })
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddModal;
