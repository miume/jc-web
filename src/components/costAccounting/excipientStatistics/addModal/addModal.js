import React from "react";
import NewButton from "../../../BlockQuote/newButton";
import CancleButton from "../../../BlockQuote/cancleButton";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import Search from "../../rawMaterial/addModal/search";
import axios from "axios";
import AddTabs from "./addTabs";
import {message} from "antd";

class AddModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            disabled: false
        };
        this.addConfirm = this.addConfirm.bind(this);
        this.afterConfirm = this.afterConfirm.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveOrCommit = this.saveOrCommit.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.getPreLineName = this.getPreLineName.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.tableDataProcessing = this.tableDataProcessing.bind(this);
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据',
            {staticPeriod,periods,currentStaticPeriod,visible,ammValue,alkValue,gqDetails2,cjDetails3,fcDetails4,disabled,head} = this.state;
        return(
            <div>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-add-content'}>
                    <Search flag={true} staticPeriod={staticPeriod} currentStaticPeriod={currentStaticPeriod} periods={periods} disabled={disabled} head={head}
                            selectChange={this.selectChange} searchEvent={this.searchEvent}/>
                    <div className={visible ? '' : 'hide'}>
                        <AddTabs ammValue={ammValue} alkValue={alkValue} gqDetails2={gqDetails2} cjDetails3={cjDetails3} fcDetails4={fcDetails4} inputChange={this.inputChange}/>
                    </div>
                </div>
                <div className='raw-material-add-footer-bottom'>
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                    <div>
                        <SaveButton key='save' handleSave={this.handleSave}/>
                        <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleCommit}/>
                    </div>
                </div>
            </div>
        )
    }

    /**获取路由传递的数据*/
    componentDidMount() {
        let location = this.props.location, path = location.pathname.split('/'),
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

    /**根据周期获取上期期数*/
    getPreLineName(periodCode) {
        axios({
            url: `${this.url.auxiliary.nextPeroidNumber}?periodId=${periodCode}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorizaion
            }
        }).then((data) => {
            let periods = data.data ? data.data.data : '';
            this.setState({
                periods: periods
            })
        })
    }

    /**编辑 通过id获取表格数据*/
    getDetailData(code) {
        console.log(code)
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
        if(index) {
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

    /**表头新增*/
    addConfirm(data) {
        axios({
            url: `${this.url.auxiliary.addConfirm}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data
        }).then((data) => {
            let res = data.data.data;
            if (res === null || res === undefined) {
                message.info('存在不一致的统计周期，需要进行修改！')
            }
            else {
                this.setState({
                    head: data
                });
                this.afterConfirm();
            }
        })
    }

    /**表头新增成功之后获取表格数据*/
    afterConfirm(id = null) {
        axios({
            url: `${this.url.auxiliary.afterConfirm}?id=${id}`,
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
            ammValue = processDTOS[0]['materialDetails'][0]['ammValue']; //氨入库量
                alkValue = processDTOS[0]['materialDetails'][1]['alkValue']; //碱入库量
                gqDetails2 = processDTOS[1]['materialDetails'];          //罐区
                cjDetails3 = processDTOS[1]['materialDetails'];           //车间
                fcDetails4 = processDTOS[1]['materialDetails'];           //辅材消耗量
        }
        this.setState({
            res: res,
            visible: true,
            ammValue: ammValue,
            alkValue: alkValue,
            head: res['head'],
            periods: res['head']['periods'],
            gqDetails2: this.dataProcessing(gqDetails2),
            cjDetails3: this.dataProcessing(cjDetails3),
            fcDetails4: this.dataProcessing(fcDetails4),
            disabled: true
        })
    }

    /**给表格数据加index字段*/
    dataProcessing(data) {
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
        }
        return data
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
        let {res,ammValue,alkValue,gqDetails2,cjDetails3,fcDetails4} = this.state;
        res['processDTOS'][0]['materialDetails'][0]['ammValue'] = ammValue;
        res['processDTOS'][0]['materialDetails'][1]['alkValue'] = alkValue; //碱入库量
        res['processDTOS'][1]['materialDetails'] = gqDetails2;         //罐区
        res['processDTOS'][2]['materialDetails'] = cjDetails3;          //车间
        res['processDTOS'][3]['materialDetails'] = fcDetails4;
        console.log(res)
        this.saveOrCommit(res,flag);
    }

    /**保存或提交*
     * flag = 1 - 提交
     * flag = 0 -保存
     */
    saveOrCommit(data,flag) {
        axios({
            url: `${this.url.auxiliary.saveOrCommit}?flag=${flag}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data
        }).then((data) => {
            message.info(data.data.message);
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
