import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import Search from "../../rawMaterial/addModal/search";
import axios from "axios";
import AddTabs from "./addTabs";
import {message, Spin} from "antd";

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            disabled: false,
            loading: false
        };
        this.checkArr = this.checkArr.bind(this);
        this.checkObj = this.checkObj.bind(this);
        this.getVolume = this.getVolume.bind(this);
        this.addConfirm = this.addConfirm.bind(this);
        this.afterConfirm = this.afterConfirm.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveOrCommit = this.saveOrCommit.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getPreLineName = this.getPreLineName.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.getVolumeOrWeight = this.getVolumeOrWeight.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.tableDataProcessing = this.tableDataProcessing.bind(this);
        this.inputNumberChange = this.inputNumberChange.bind(this);
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据',
            {staticPeriod,periods,currentStaticPeriod,visible,ammValue,alkValue,gqDetails2,cjDetails3,fcDetails4,disabled,head,loading,endDate} = this.state;
        return(
            <Spin spinning={loading}>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-add-content'}>
                    <Search flag={true} staticPeriod={staticPeriod} currentStaticPeriod={currentStaticPeriod} periods={periods} disabled={disabled} head={head}
                            selectChange={this.selectChange} searchEvent={this.searchEvent} inputChange={this.inputChange} disabledDate={endDate}/>
                    <div className={visible ? '' : 'hide'}>
                        <AddTabs ammValue={ammValue} alkValue={alkValue} gqDetails2={gqDetails2} cjDetails3={cjDetails3} fcDetails4={fcDetails4}
                                 inputChange={this.inputChange} getVolume={this.getVolume}/>
                    </div>
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
        let location = this.props.location;
        if(location) {
            let path = location.pathname.split('/'),
                code = path.length >= 2 ? path[2] : '', staticPeriod = location.state.staticPeriod ? location.state.staticPeriod : [],
                currentStaticPeriod = staticPeriod ? staticPeriod[0] : {};
            this.setState({
                code: code,
                staticPeriod: staticPeriod
            });
            if(code) {
                this.afterConfirm(code);
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

    /**根据周期获取上期期数*/
    getPreLineName(periodCode) {
        axios({
            url: `${this.url.auxiliary.nextPeroidNumber}?periodId=${periodCode}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
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
        this.addConfirm(params)
    }

    /**监控所有input输入框的变化*/
    inputChange(e) {
        let tar = e.target.name.split('-'), value = e.target.value,
            name = tar[0], index = tar[1] ? tar[1] : '', type = tar[2] ? parseInt(tar[2]) : '',
            {gqDetails2,cjDetails3,fcDetails4} = this.state;

        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        // if(value[value.length-1] !== '.')
        //     value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型

        // if(type && name !== 'monPotency') {
        //     value = this.inputNumberChange(value);
        //     if(value === undefined) {
        //         return
        //     }
        // }
        if(index) {
            index = parseInt(index)-1;
            if(type === 2) {   //更新罐区input的数据
                gqDetails2[index][name] = value;
                this.setState({
                    gqDetails2: gqDetails2
                })
            } else if(type === 3) { //更新车间input的数据
                cjDetails3[index][name] = value;
                this.setState({
                    cjDetails3: cjDetails3
                })
            } else {              //更新辅料消耗量input的数据
                fcDetails4[index][name] = value;
                this.setState({
                    fcDetails4: fcDetails4
                })
            }
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    /**监控浓度变化，只能输入0到1*/
    inputNumberChange(value) {
        if(value < 0 || value > 1) {
            message.info('只能输入0到1之间的数字！');
            return undefined
        }
        return value;
    }

    /**表头新增*/
    addConfirm(da) {
        axios({
            url: `${this.url.auxiliary.addConfirm}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: da
        }).then((data) => {
            let res = data.data.data;
            if(res.code > 0) {
                da['code'] = res.code;
                this.setState({
                    head: da
                });
                this.afterConfirm();
            } else {
                message.info(res.message);
            }
        })
    }

    /**表头新增成功之后获取表格数据*/
    afterConfirm(id) {
        let url = id ? `${this.url.auxiliary.afterConfirm}?id=${id}` : `${this.url.auxiliary.afterConfirm}`;
        axios({
            url: url,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res && res['processDTOS']) {
                this.tableDataProcessing(res);
            }
        })
    }

    /**对获取表格数据进行处理*/
    tableDataProcessing(res) {
        let {processDTOS} = res,ammValue,alkValue,gqDetails2 = [],cjDetails3 = [],fcDetails4 = [];
        if(processDTOS.length) {
            ammValue = processDTOS[0]['materialDetails'][0] ? processDTOS[0]['materialDetails'][0]['weight'] : 0; //氨入库量
            alkValue = processDTOS[0]['materialDetails'][1] ? processDTOS[0]['materialDetails'][1]['weight'] : 0; //碱入库量
            gqDetails2 = processDTOS[1]['materialDetails'];          //罐区
            cjDetails3 = processDTOS[2]['materialDetails'];           //车间
            fcDetails4 = processDTOS[3]['materialDetails'];           //辅材消耗量
        }
        this.setState({
            res: res,
            visible: true,
            ammValue: ammValue,
            alkValue: alkValue,
            gqDetails2: this.dataProcessing(gqDetails2),
            cjDetails3: this.dataProcessing(cjDetails3),
            fcDetails4: this.dataProcessing(fcDetails4),
            disabled: true
        });
        if(res['head']) {
            this.setState({
                head: res['head']
            })
        }
    }

    /**给表格数据加index字段*/
    dataProcessing(data) {
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
        }
        return data
    }

    /**
     * 点击获取体积值，获取重量值按钮，获取数据，更新表格数据
     * index 代表第几条数据
     * type === 'volume' 代表获取体积值 'weight' 代表获取重量值
     * */
    getVolume(index,type) {
        index = parseInt(index) - 1;
        let {res} = this.state;
        if (!res['processDTOS'].length) {
            return
        }
        let processId = res['processDTOS'][index]['processId'];
        axios({
            url: `${this.url.auxiliary.getVolumeWeight}?processId=${processId}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if(res.length) {
                this.getVolumeOrWeight(res,index,type);
            }
        })
    }

    getVolumeOrWeight(data,index,type) {
        let {gqDetails2,cjDetails3,fcDetails4} = this.state, temp, name = '';
        if(index === 1) {         //罐区
            temp = gqDetails2;
            name = 'gqDetails2';
        } else if (index === 2) { //车间
            temp = cjDetails3;
            name = 'cjDetails3';
        } else {                  //辅料消耗量
            temp = fcDetails4;
            name = 'fcDetails4';
        }
        for(let i = 0; i < temp.length; i++) {
            temp[i][type] = data[i]['value']
        }
        this.setState({
            [name]: temp
        })

    }

    /**点击取消新增*/
    handleCancel() {
        this.props.history.push({pathname: "/excipientStatistics"})
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
        let {res,ammValue,alkValue,gqDetails2,cjDetails3,fcDetails4,head} = this.state;
        res['processDTOS'][0]['materialDetails'][0]['weight'] = ammValue;
        res['processDTOS'][0]['materialDetails'][1]['weight'] = alkValue; //碱入库量
        res['processDTOS'][1]['materialDetails'] = gqDetails2;         //罐区
        res['processDTOS'][2]['materialDetails'] = cjDetails3;          //车间
        res['processDTOS'][3]['materialDetails'] = fcDetails4;
        res['head'] = head;
        if(ammValue === '' || alkValue === '') {
            message.info('请填写氨入库量和碱入库量！');
            return;
        }
        if(!this.checkArr(gqDetails2) || !this.checkArr(cjDetails3) || !this.checkArr(fcDetails4)) {
            message.info('请确定表格数据都填写完整！');
            return;
        }
        this.saveOrCommit(res,flag);
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
    saveOrCommit(data,flag) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.auxiliary.saveOrCommit}?flag=${flag}`,
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

export default AddModal
