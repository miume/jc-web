import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {message, Spin} from "antd";
import Search from "./search";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddTable from "./addTable";
import FeedData from "./feedData";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import axios from 'axios';

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            headVisible: false,
            feedLoading: false,
            data: [],
            endDate: '',
            stockOutDTOS: [],           //出库数据
            saltMixtureLiquorDTOS: [],  //混合盐
            crystalsDTOS: [],           //晶体
            singleCrystalLiquorDTOS: [],//单晶体
            rawMaterialData: []
        };
        this.addItem = this.addItem.bind(this);
        this.checkArr = this.checkArr.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.getFeedData = this.getFeedData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.getDetailData = this.getDetailData.bind(this);
        this.saveDataProcessing = this.saveDataProcessing.bind(this);
        this.saveOrCommit = this.saveOrCommit.bind(this);
        this.getStockOutData = this.getStockOutData.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.outStockTime = this.outStockTime.bind(this);
        this.feedDataChange = this.feedDataChange.bind(this);
        this.getPreLineName = this.getPreLineName.bind(this);
        this.addIndexToTable = this.addIndexToTable.bind(this);
        this.materialNameChange = this.materialNameChange.bind(this);
        this.inputNumberChange = this.inputNumberChange.bind(this);
        this.getPrecursorRawMaterial = this.getPrecursorRawMaterial.bind(this);
        this.getPreviousConcentration = this.getPreviousConcentration.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据',
            {staticPeriod,lineName,currentStaticPeriod,visible,headVisible,rawMaterialData,head,niConcentration,coConcentration,mnConcentration,
                endDate, stockOutDTOS,saltMixtureLiquorDTOS,crystalsDTOS,singleCrystalLiquorDTOS,disabled,feedLoading,loading} = this.state;
        return (
            <div>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <Spin spinning={loading}>
                    <div className={'rightDiv-add-content'}>
                        <Search flag={true} staticPeriod={staticPeriod} currentStaticPeriod={currentStaticPeriod} periods={lineName} disabledDate={endDate}
                                selectChange={this.selectChange} inputChange={this.inputChange} searchEvent={this.searchEvent} head={head} disabled={disabled}/>
                        <AddTable visible={headVisible} data={stockOutDTOS} rawMaterialData={rawMaterialData} materialNameChange={this.materialNameChange} outStockTime={this.outStockTime}
                                  inputChange={this.inputChange} addItem={this.addItem} getFeedData={this.getFeedData} getPreviousConcentration={this.getPreviousConcentration}
                                  niConcentration={niConcentration} coConcentration={coConcentration} mnConcentration={mnConcentration}/>
                        <FeedData flag={visible} loading={feedLoading} saltMixtureLiquorDTOS={saltMixtureLiquorDTOS} crystalsDTOS={crystalsDTOS} singleCrystalLiquorDTOS={singleCrystalLiquorDTOS} feedDataChange={this.feedDataChange}/>
                    </div>
                    <div className='raw-material-add-footer-bottom'>
                        <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                        <div>
                            <SaveButton key='save' handleSave={this.handleSave}/>
                            <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleCommit}/>
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }

    /**获取路由传递的数据*/
    componentDidMount() {
        let location = this.props.location;
        if(location) {
            let path = location.pathname.split('/'),
                code = path.length >= 2 ? path[2] : '', staticPeriod = location.state.staticPeriod ? location.state.staticPeriod : [],
                currentStaticPeriod = staticPeriod ? staticPeriod[0] : {};

            this.getPrecursorRawMaterial();
            if(code) {
                this.getDetailData(code);
                this.setState({
                    code: code
                });
            } else {
                this.setState({
                    staticPeriod: staticPeriod,
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
            url: `${this.url.rawMaterial.period}?periodCode=${periodCode}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorizaion
            }
        }).then((data) => {
            let res = data.data ? data.data.data : '';
            if(res && res.length) {
                let {periods,entDate} = res[0];
                this.setState({
                    endDate: entDate,
                    lineName: periods,
                })
            }
        })
    }

    getDetailData(code) {
        axios({
            url: `${this.url.rawMaterial.detail}?statisticCode=${code}`,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then((data)=>{
            let res = data.data.data;
            if(res) {
                let {crystalsDTOS,singleCrystalLiquorDTOS,head,periodName,
                    stockOutDTOS,mnConcentration,coConcentration,niConcentration,saltMixtureLiquorDTOS} = res;
                head['periodName'] = periodName;
                this.setState({
                    visible: true,
                    headVisible: true,
                    head: head,
                    coConcentration: coConcentration,
                    crystalsDTOS: this.addIndexToTable(crystalsDTOS),
                    mnConcentration: mnConcentration,
                    niConcentration: niConcentration,
                    stockOutDTOS: this.addIndexToTable(stockOutDTOS),
                    saltMixtureLiquorDTOS: this.addIndexToTable(saltMixtureLiquorDTOS),
                    singleCrystalLiquorDTOS: this.addIndexToTable(singleCrystalLiquorDTOS),
                })
            }
        })
    }

    /**获取成本核算-原材料名称*/
    getPrecursorRawMaterial() {
        axios({
            url: `${this.url.precursorRawMaterial.byDataType}?flag=0`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorizaion
            }
        }).then((data) => {
            let res = data.data ? data.data.data : [];
            this.setState({
                rawMaterialData: res
            })
        })
    }

    /**监控统计周期下拉框的变化*/
    selectChange(value,option) {
        let name = option.props.name.split('-'),
            currentStaticPeriod = {
                code: value,
                startTime: name[0],
                length: name[1]
            };
        this.setState({
            currentStaticPeriod: currentStaticPeriod
        });
        this.getPreLineName(value);
    }

    materialNameChange(value,option) {
        let val = option.props.name.split('-'), index = val[0], materialName = val[1], materialTypeCode = val[2], {stockOutDTOS} = this.state;
        stockOutDTOS[index-1]['materialCode'] = parseInt(value);
        stockOutDTOS[index-1]['materialName'] = materialName;
        stockOutDTOS[index-1]['materialTypeCode'] = materialTypeCode;
        this.setState({
            stockOutDTOS
        })
    }

    /**监控出库数据的变化*/
    outStockTime(index,dateString) {
        let {stockOutDTOS} = this.state;
        stockOutDTOS[index-1]['outStockTime'] = dateString;
        this.setState({
            stockOutDTOS
        })
    }

    searchEvent(params) {
        params['lineName'] = params['periods'];
        delete params['periods'];
        axios({
            url: `${this.url.rawMaterial.getAddData}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data: params
        }).then((data) => {
            let code = data.data.data;
            if(code === '-1') {
                message.info('存在同一期数未提交的数据，不能新增！');
            } else if(code) {
                this.setState({
                    code: code,   //表示返回的统计编码
                    headVisible: true,
                    disabled: true,
                    periodCode: params['periodCode']
                });
                //this.getStockOutData(params)
            } else {
                message.info('存在不一致的统计周期！')
            }
        })
    }

    /**点击补料按钮*/
    getFeedData() {
        this.setState({
            visible: true,
            feedLoading: true
        });
        let {currentStaticPeriod,head} = this.state, code =  currentStaticPeriod ? currentStaticPeriod['code'] : head['periodCode'];
        axios({
            url: `${this.url.rawMaterial.supplementary}?periodCode=${code}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then(data => {
            let res = data.data.data;
            if(res && res.length) {
                let saltMixtureLiquorDTOS = this.addIndexToTable(res[0]),
                    crystalsDTOS = this.addIndexToTable(res[1]),
                    singleCrystalLiquorDTOS = this.addIndexToTable(res[2]);
                this.setState({
                    saltMixtureLiquorDTOS,  //混合盐
                    crystalsDTOS,           //晶体
                    singleCrystalLiquorDTOS,//单晶体
                })
            }
            this.setState({
                feedLoading: false
            })
        })
    }

    /**给表格数据加index字段*/
    addIndexToTable(data) {
        for(let i = 0; i < data.length; i++) {
            data[i]['index'] = i + 1;
        }
        return data;
    }

    /**点击获取出库数据*/
    getStockOutData(params) {
        axios({
            url: `${this.url.rawMaterial.getStockOutData}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params
        }).then(data => {
            let res = data.data.data;
        })
    }

    /**点击取消新增*/
    handleCancel() {
        this.props.history.push({pathname: '/rawMaterial'})
    }

    /**监控NiSO4溶液、CoSO4溶液、MnSO4溶液量的变化*/
    inputChange(e) {
        let val = e.target.name.split('-'), name = val[0], index = val[1] ? val[1] : -1, type = val[2] ? val[2] : '',
            value = e.target.value, {stockOutDTOS} = this.state;
        if(!type) {
            if(typeof value === 'number') value = value.toString();
            value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
            if(value[value.length-1] !== '.')
                value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        }
        if(index > -1) {
            stockOutDTOS[index-1][name] = value;
            this.setState({
                stockOutDTOS
            });
        } else {
            value = this.inputNumberChange(value); //保证浓度在0～1之间
            if(value === undefined) {
                return
            }
            this.setState({
                [name]: value
            })
        }
    }

    /**补料数据变化*/
    feedDataChange(e) {
        let target = e.target, val = target.name.split('-'),
            type = val[0], index = val[1], name = val[2],
            value= target.value, {saltMixtureLiquorDTOS,crystalsDTOS,singleCrystalLiquorDTOS} = this.state;

        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        if(value[value.length-1] !== '.')
            value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型

        if(type === 'mixedSalt') {        //混合盐
            saltMixtureLiquorDTOS[index-1][name] = value;
            this.setState({
                saltMixtureLiquorDTOS
            })
        } else if(type === 'crystal') {  //晶体
            if(name === 'concentration') {
                value = this.inputNumberChange(value); //保证浓度在0～1之间
                if(value === undefined) {
                    return
                }
            }
            crystalsDTOS[index-1][name] = value;
            this.setState({
                crystalsDTOS
            })
        } else {                        //单晶体
            singleCrystalLiquorDTOS[index-1][name] = value;
            this.setState({
                singleCrystalLiquorDTOS
            })
        }
    }

    /**监控浓度变化，只能输入0到1*/
    inputNumberChange(value) {
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        if(value[value.length-1] !== '.')
            value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
        if(value < 0 || value > 1) {
            message.info('只能输入0到1之间的数字！');
            return undefined
        }
        return value;
    }

    /**出库数据新增*/
    addItem() {
        let {stockOutDTOS} = this.state,
            item = {
            "index": stockOutDTOS.length+1,
            "callMaterialPoint": "",
            "materialBatch": "",
            "materialCode": undefined,
            "materialName": "",
            "materialTypeCode": 0,
            "outStockTime": "",
            "weight": ""
        };
        stockOutDTOS.push(item);
        this.setState({
            stockOutDTOS
        })
    }

    /**根据统计周期code获取上期浓度*/
    getPreviousConcentration() {
        let {currentStaticPeriod,head} = this.state, code =  currentStaticPeriod ? currentStaticPeriod['code'] : head['periodCode'];
        axios({
            url: `${this.url.rawMaterial.lastPeriodConcentrations}?periodCode=${code}`,
            methods: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data => {
            let res = data.data.data;
            if(res) {
                let {niConcentration,coConcentration,mnConcentration} = res;
                this.setState({
                    niConcentration,
                    coConcentration,
                    mnConcentration
                })
            }
        }))
    }

    /**点击保存新增*/
    handleSave() {
        this.saveDataProcessing(0);
    };

    /**点击保存新增*/
    handleCommit() {
        this.saveDataProcessing(1);
    };

    /**保存或提交数据处理*/
    saveDataProcessing(flag) {
        let {stockOutDTOS,saltMixtureLiquorDTOS,crystalsDTOS,singleCrystalLiquorDTOS,coConcentration,mnConcentration,niConcentration,lineName,code,head} = this.state,
            data = {
                coConcentration: coConcentration,
                crystalsDTOS: crystalsDTOS,
                flag: flag,
                mnConcentration: mnConcentration,
                niConcentration: niConcentration,
                periods: lineName ? lineName : head['lineName'],
                saltMixtureLiquorDTOS: saltMixtureLiquorDTOS,
                singleCrystalLiquorDTOS: singleCrystalLiquorDTOS,
                stockOutDTOS: stockOutDTOS,
                statisticCode: parseInt(code)
            };
        //验证数据非空
        if(flag) {
            if(!coConcentration || !mnConcentration || !niConcentration) {
                message.info('请将NiSO4溶液、CoSO4溶液、MnSO4溶液浓度填写完整！');
                return
            }
            if(!this.checkArr(stockOutDTOS)) {
                return;
            }
            if(!this.checkArr(crystalsDTOS)) {
                return;
            }
            if(!this.checkArr(saltMixtureLiquorDTOS)) {
                return;
            }
            if(!this.checkArr(singleCrystalLiquorDTOS)) {
                return;
            }
        }
        this.saveOrCommit(data);
    }

    /**检查数组字段是否为空*/
    checkArr(data) {
        if(!data.length) {
            message.info('请确保出库和补料都至少有一条数据!')
            return false;
        }
        for(let i = 0; i < data.length; i++) {
            for(let j in data[i]) {
                if(j === 'density' && data[i][j] === 0) {
                    message.info('补料数据密度不能为0，请注意！');
                    return false;
                }
                if( j !== 'callMaterialPoint' && (data[i][j] === '' || data[i][j] === undefined)) {
                    message.info('提交时，请确定数据全部填写完整！');
                    return false;
                }
            }
        }
        return true;
    }

    /**保存或提交*
     * flag = 1 - 提交
     * flag = 0 -保存
     */
    saveOrCommit(data) {
        this.setState({
            loading: true
        });
        axios({
            url: `${this.url.rawMaterial.saveOrCommit}`,
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

    /**销毁组件*/
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddModal
