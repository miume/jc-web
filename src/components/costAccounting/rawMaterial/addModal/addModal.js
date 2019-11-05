import React from 'react';
import NewButton from "../../../BlockQuote/newButton";
import {Button, Divider} from "antd";
import Search from "./search";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddTable from "./addTable";
import FeedData from "./feedData";
import SaveButton from "../../../BlockQuote/saveButton";
import BlockQuote from '../../../BlockQuote/blockquote';

const mixedSalt = [{
    code: 1,
    materialName: '混合盐'
}];

const crystalData = [{
    code: 1,
    materialName: 'Ni晶体',
},{
    code: 2,
    materialName: 'Co晶体',
}];

const singleCrystalData = [{
    code: 1,
    materialName: 'Ni溶液',
},{
    code: 2,
    materialName: 'Co溶液',
}];
const data = {
    code: 1,
    index: 1,
    periodName: '周',
    dataType: '补料',
    density:1,
    lineName: 2,
    start: '2019-10-01',
    end: '2019-10-01',
    materialName: '物料名称',
    weight: 20,
    NiConcentration: 1,
    CoConcentration: 1,
    MnConcentration: 1,
    NiMetallicity: 1,
    CoMetallicity: 1,
    MnMetallicity: 1,
    mixedSalt:mixedSalt,
    crystal: crystalData,
    singleCrystal: singleCrystalData
};

class AddModal extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    componentDidMount() {
        let location = this.props.location, path = location.pathname.split('/'), periodCode = '',
            code = path.length >= 2 ? path[2] : -1, staticPeriod = location.state.staticPeriod ? location.state.staticPeriod : [];
        this.setState({
            code: code,
            staticPeriod: staticPeriod,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.getFeedData = this.getFeedData.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getStockOutData = this.getStockOutData.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.feedDataChange = this.feedDataChange.bind(this);
        this.getPreviousConcentration = this.getPreviousConcentration.bind(this);
    }

    render() {
        this.current = JSON.parse(localStorage.getItem('current'));
        let name = this.state.code > -1 ? '编辑数据' : '新增数据';
        return (
            <div>
                <BlockQuote name={name} menu={this.current.menuName}
                            menu2={this.current.menuParent} returnDataEntry={this.handleCancel}/>
                <div className={'rightDiv-content'}>
                    <Search flag={true} staticPeriod={this.state.staticPeriod} periodCode={this.state.periodCode}/>
                    <div className={'raw-material-add-margin'}>
                        <NewButton name={'获取出库数据'} handleClick={this.getStockOutData}/>
                        <Button className='white-button' onClick={this.getPreviousConcentration}>上期浓度</Button>
                        <Button className='white-button' style={{width:86}} onClick={this.getFeedData}>补料</Button>
                    </div>
                    <AddTable inputChange={this.inputChange}/>
                    <FeedData flag={this.state.visible} data={data} feedDataChange={this.feedDataChange}/>
                    <Divider type="horizontal" />
                    <div className='raw-material-add-footer-bottom'>
                        <CancleButton key='back' handleCancel={this.handleCancel} flag={1}/>
                        <div>
                            <SaveButton key='save'/>
                            <NewButton name={'提交'} key='submit' className='fa fa-check' handleClick={this.handleSave}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    /**点击补料按钮*/
    getFeedData() {
        this.setState({
            visible: true
        })
    }

    /**点击获取上期浓度*/
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

    /**获取出库数据*/
    getStockOutData() {

    }

    /**监控NiSO4溶液、CoSO4溶液、MnSO4溶液量的变化*/
    inputChange(e) {
        let name = e.target.name, value = e.target.value;
        console.log(name,value);
        this.setState({
            [name]: value
        })
    }

    /**补料数据变化*/
    feedDataChange(e) {
        let target = e.target, name = target.name.split('-'), value= target.value;
        console.log(name,value)
    }
}

export default AddModal
