import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {message} from "antd";
import Search from "./search";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddTable from "./addTable";
import FeedData from "./feedData";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';
import axios from 'axios';

// const mixedSalt = [{
//     code: 1,
//     materialName: '混合盐'
// }];
//
// const crystalData = [{
//     code: 1,
//     materialName: 'Ni晶体',
// },{
//     code: 2,
//     materialName: 'Co晶体',
// }];
//
// const singleCrystalData = [{
//     code: 1,
//     materialName: 'Ni溶液',
// },{
//     code: 2,
//     materialName: 'Co溶液',
// }];
// const data = {
//     code: 1,
//     index: 1,
//     periodName: '周',
//     dataType: '补料',
//     density:1,
//     lineName: 2,
//     start: '2019-10-01',
//     end: '2019-10-01',
//     materialName: '物料名称',
//     weight: 20,
//     NiConcentration: 1,
//     CoConcentration: 1,
//     MnConcentration: 1,
//     NiMetallicity: 1,
//     CoMetallicity: 1,
//     MnMetallicity: 1,
//     mixedSalt:mixedSalt,
//     crystal: crystalData,
//     singleCrystal: singleCrystalData
// };

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            headVisible: false,
            data: []
        };
        this.selectChange = this.selectChange.bind(this);
        this.getFeedData = this.getFeedData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getStockOutData = this.getStockOutData.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.feedDataChange = this.feedDataChange.bind(this);
        this.getPreLineName = this.getPreLineName.bind(this);
        this.getPreviousConcentration = this.getPreviousConcentration.bind(this);
    }

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据', {data,staticPeriod,lineName,currentStaticPeriod,visible,headVisible} = this.state;
        return (
            <div>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-add-content'}>
                    <Search flag={true} staticPeriod={staticPeriod} currentStaticPeriod={currentStaticPeriod} lineName={lineName}
                            selectChange={this.selectChange} inputChange={this.inputChange} searchEvent={this.searchEvent}/>
                    <AddTable visible={headVisible} inputChange={this.inputChange}/>
                    <FeedData flag={visible} data={data} feedDataChange={this.feedDataChange}/>
                </div>
                <div className='raw-material-add-footer-bottom'>
                    <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                    <div>
                        <SaveButton key='save'/>
                        <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleSave}/>
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
            staticPeriod: staticPeriod,
            currentStaticPeriod: currentStaticPeriod
        });
        if(currentStaticPeriod && currentStaticPeriod.code) {
            this.getPreLineName(currentStaticPeriod.code);
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
            let lineName = data.data ? data.data.data : '';
            this.setState({
                lineName: lineName
            })
        })
    }

    /**监控统计周期下拉框的变化*/
    selectChange(value,option) {
        let name = option.props.name.split('-'), {currentStaticPeriod} = this.state;
        currentStaticPeriod['code'] = value;
        currentStaticPeriod['startTime'] = name[0];
        currentStaticPeriod['length'] = name[1];
        this.setState({
            currentStaticPeriod: currentStaticPeriod
        });
    }

    searchEvent(params) {
        console.log(params)
        this.setState({
            headVisible: true
        });
        this.getStockOutData(params)
        // axios({
        //     url: `${this.url.rawMaterial.getAddData}`,
        //     method: 'post',
        //     headers: {
        //         'Authorization': this.url.Authorization
        //     },
        //     data: params
        // }).then((data) => {
        //     let code = data.data.data;
        //     console.log(code)
        //     if(code) {
        //         this.setState({
        //             code: code,   //表示返回的统计编码
        //             headVisible: true
        //         });
        //         this.getStockOutData(params)
        //     } else {
        //         message.info('存在不一致的统计周期！')
        //     }
        // })
    }

    /**点击补料按钮*/
    getFeedData() {
        this.setState({
            visible: true
        })
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
            console.log(res)
        })
    }

    /**获取上期浓度*/
    getPreviousConcentration() {

    }

    /**点击取消新增*/
    handleCancel() {
        this.props.history.push({pathname: '/rawMaterial'})
    }

    /**点击保存新增*/
    handleSave() {
        this.handleCancel();
    }

    /**监控NiSO4溶液、CoSO4溶液、MnSO4溶液量的变化*/
    inputChange(e) {
        let name = e.target.name, value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    /**补料数据变化*/
    feedDataChange(e) {
        let target = e.target, name = target.name.split('-'), value= target.value;
        console.log(name,value)
    }

    /**销毁组件*/
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default AddModal
