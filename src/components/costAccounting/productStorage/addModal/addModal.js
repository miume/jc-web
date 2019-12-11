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
            data: []
        };
        this.addItem = this.addItem.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.getPreLineName = this.getPreLineName.bind(this);
    };

    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据',
            {staticPeriod,periods,currentStaticPeriod,visible,disabled,head,loading,data} = this.state;
        return(
            <Spin spinning={loading}>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-content'}>
                    <Search flag={true} staticPeriod={staticPeriod} currentStaticPeriod={currentStaticPeriod} periods={periods} disabled={disabled} head={head}
                            selectChange={this.selectChange} searchEvent={this.searchEvent} inputChange={this.inputChange}/>
                    <AddTable visible={visible} data={data} add={this.addItem}/>
                </div>
                <div className='raw-material-add-footer-bottom'>
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                    <div>
                        <SaveButton key='save'/>
                        <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleSave}/>
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
                'Authorization': this.url.Authorizaion
            }
        }).then((data) => {
            let periods = data.data ? data.data.data : '';
            this.setState({
                periods: periods
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
        console.log(params)
        params['lineName'] = params['periods'];
        delete params['periods'];
        this.addConfirm(params)
    }

    /**监控所有input输入框的变化*/
    inputChange(e) {
        let tar = e.target.name.split('-'), value = e.target.value,
            name = tar[0], index = tar[1] ? tar[1] : '', type = tar[2] ? parseInt(tar[2]) : '',
            {gqDetails2,cjDetails3,fcDetails4} = this.state;
        if(typeof value === 'number') value = value.toString();
        value =  value.replace(/[^\d\.]/g, "");  //只准输入数字和小数点
        value = value === '' ? '' : parseFloat(value);  //将字符串转为浮点型
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
            if (res === null || res === undefined) {
                message.info('存在不一致的统计周期，需要进行修改！')
            }
            else {
                this.setState({
                    id: res
                })
            }
        })
    }

    addItem() {
        let {data} = this.state,
            item = {
                "batch": "",
                "coConcentration": 0,
                "coMetallicity": 0,
                "code": 0,
                "lineCode": 0,
                "mnConcentration": 0,
                "mnMetallicity": 0,
                "niConcentration": 0,
                "niMetallicity": 0,
                "productionTypeCode": "",
                "productionTypeName": "",
                "statisticCode": 0,
                "storageTime": "",
                "weights": 0
            };
        data.push(item);
        this.setState({
            data
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

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddModal;
