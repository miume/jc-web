import React, { Component } from 'react';
import { Tabs } from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import CancleButton from '../../../BlockQuote/cancleButton'
import SaveButton from '../../../BlockQuote/saveButton'
import NewButton from '../../../BlockQuote/newButton'
import Search from './addSearch'
import OnlineIngredients from './onlineIngredients/onlineIngredients'
import PremixedCoulterMixed from './pemixedCoulterMixed/premixedCoulterMixed'
import PremixedStorageBin from './pemixedCoulterMixed/premixedCoulterMixed'
import PreBuring from './preBurningKiln/preBurning'
import Crush from './crush/crush'
import SecondMix from './secondMix/secondMix'
import SecondBuring from './secondBurning/secondBuring'
import Package from './package/package'
import WorkShopMaterial from './workShopMaterials/workShopMaterials'
import WareHouseMaterial from './wareHouseMaterial/wareHouseMaterial'
import axios from 'axios'
const { TabPane } = Tabs;

class PositiveAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.back = this.back.bind(this);
        this.getAllProcess = this.getAllProcess.bind(this);
        this.addConfirm = this.addConfirm.bind(this);
        this.tabChange = this.tabChange.bind(this);
    }
    componentDidMount() {
        this.getAllProcess()
        let { location } = this.props,
            periodStatis = location.periodStatis,
            line = location.line
        this.setState({
            periodStatis: periodStatis,
            line: line,
            periodCode: periodStatis && periodStatis[0] && periodStatis[0].code ? periodStatis[0].code : undefined,
            length: periodStatis && periodStatis[0] && periodStatis[0].length ? periodStatis[0].length : undefined,
            time: periodStatis && periodStatis[0] && periodStatis[0].startTime ? periodStatis[0].startTime : undefined,
        })
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }
    getAllProcess() {//获取新增标签页的所有工序标签
        axios({
            url: this.url.positiveProcess.all,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            }
        }).then((data) => {
            let res = data.data.data;
            if (res) {
                console.log(res)
                this.setState({
                    processData: res
                })
            }
        })
    }
    /**新增的确认*/
    addConfirm() {

    }
    tabChange() {

    }
    back() {
        this.props.history.push({ pathname: '/positiveProcess' })
    }
    render() {
        let { processData, periodStatis, periodCode, line } = this.state
        this.url = JSON.parse(localStorage.getItem('url'))
        this.tabData = [
            { component: <OnlineIngredients /> },
            { component: <PremixedCoulterMixed /> },
            { component: <PremixedStorageBin /> },
            { component: <PreBuring /> },
            { component: <Crush /> },
            { component: <SecondMix /> },
            { component: <SecondBuring /> },
            { component: <Package /> },
            { component: <WorkShopMaterial /> },
            { component: <WareHouseMaterial /> },
        ]

        return (
            <div>
                <Blockquote name={this.props.location.editFlag ? '编辑数据' : '新增数据'} menu='正极成本' menu2='在制品管理' returnDataEntry={this.back} />
                <div className='rightDiv-content'>
                    <Search url={this.url} addConfirm={this.addConfirm} periodStatis={periodStatis}
                        lineData={line} periodCode={periodCode}
                    />
                    <div>
                        {this.state.processData ? <Tabs defaultActiveKey='1'>
                            {
                                this.state.processData ? this.state.processData.map((data, index) => {
                                    return (
                                        <TabPane key={data.code.toString()} tab={data.processName}>{this.tabData[index] && this.tabData[index].component ? this.tabData[index].component : undefined}</TabPane>
                                    )
                                }) : null
                            }
                        </Tabs> : null
                        }
                    </div>
                    <span style={{ bottom: '10px', position: 'absolute', left: '15px' }}><CancleButton /></span>
                    <span style={{ bottom: '0', position: 'absolute', right: '15px' }}>
                        <SaveButton />
                        <NewButton name='提交' />
                    </span>
                </div>
            </div>
        )
    }
}
export default PositiveAdd