import React, { Component } from 'react';
import { Tabs ,message} from 'antd'
import Blockquote from '../../../BlockQuote/blockquote'
import CancleButton from '../../../BlockQuote/cancleButton'
import SaveButton from '../../../BlockQuote/saveButton'
import NewButton from '../../../BlockQuote/newButton'
import Search from './addSearch'
import OnlineIngredients from './onlineIngredients/onlineIngredients'
import PremixedCoulterMixed from './pemixedCoulterMixed/premixedCoulterMixed'
import PremixedStorageBin from './premixedStorageBin/premixedStorageBin'
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
        this.state={
            processData:[]
        }
        this.back = this.back.bind(this);
        this.getAllProcess = this.getAllProcess.bind(this);
        this.addConfirm = this.addConfirm.bind(this);
        this.tabChange = this.tabChange.bind(this);
        this.getPeriods=this.getPeriods.bind(this);
        this.afterConfirm=this.afterConfirm.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.save=this.save.bind(this);
        this.submit=this.submit.bind(this);
    }
    componentDidMount() {
        this.getAllProcess()
        let { location } = this.props,
        periodStatis = location.periodStatis,
        line = location.line
        this.setState({
            periodStatis: periodStatis,
            line: line
        })
        if(location.editFlag){ 
            this.afterConfirm(location.code)
        } 
        else{
            let periodCode= periodStatis && periodStatis[0] && periodStatis[0].code ? periodStatis[0].code : undefined,
                length= periodStatis && periodStatis[0] && periodStatis[0].length ? periodStatis[0].length : undefined,
                time= periodStatis && periodStatis[0] && periodStatis[0].startTime ? periodStatis[0].startTime : undefined,
                headPeriod={},
                lineCode=line&&line[0]&&line[0].code?line&&line[0]&&line[0].code:undefined
            headPeriod['periodCode']=periodCode
            headPeriod['length']=length
            headPeriod['time']=time
            headPeriod['lineCode']=lineCode
            this.setState({
                headPeriod:headPeriod
            })
            this.getPeriods(periodCode?periodCode:null,lineCode?lineCode:null)
        }
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
                this.setState({
                    processData: res
                })
            }
        })
    }
    /**根据周期和产线获取期数*/
    getPeriods(periodId,lineCode){
        axios({
            url: `${this.url.positiveProcessStatis.getNextPeriods}`,
            method: 'get',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                periodId: periodId,
                lineCode:lineCode
            }
        }).then(data => {
            let res = data.data.data
            if (res) {
                this.setState({
                    inputPeriod: res.periods,
                    // giveEndDate:res.endTime.split(' ')[0]
                    giveEndDate:res.endTime
                })
            }
        })
    }
    /**新增的确认*/
    addConfirm(params) {
        axios({
            url: `${this.url.positiveProcessStatis.addComfirm}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data:params
        }).then((data) => {
            let res = data.data.data;
             if(res.code<=0){
                 message.error(res.message)
                this.setState({
                    loading:false
                })
            }
            else {
                this.setState({
                    statisticId: res.code  //统计头表的code，即待提交表格数据的code
                })
                if (params['startTime'] && params['endTime'] && params['periodCode'] && params['inputPeriod']&&params['modelCode']) {//点击确定后不可再修改
                    this.setState({
                        flagConfirm:true
                    })
                }
                this.afterConfirm(res.code)
            }
        })
    }
    afterConfirm(code){
        this.setState({
            loading:true
        })
        axios({
            url: `${this.url.positiveProcessStatis.afterComfirm}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params:{
                id:code
            }
        }).then((data) => {
            let tagTable = data.data.data;
            //console.log(tagTable)
            this.setState({
                productLine:tagTable&&tagTable.line?tagTable.line:undefined
            })
            if (tagTable && tagTable.processes) {
                this.setState({
                    tagTableData: tagTable.processes,
                    addData: tagTable,
                    loading:false,
                })
                if(this.props.location.editFlag){
                    this.setState({
                        headEdit:tagTable.head,
                        inputPeriod:tagTable.head.periods
                    })
                }
            }
          
        })
    }
    tabChange(key) {
        this.setState({
            tabKey:key
        })
    }
    inputChange(e,key){
        let {addData}=this.state,value = e.target.value,
            inputData = e.target.name.split('-'),
            index = inputData[0],    //定位到是第几条数据
            name = inputData[1]  
        addData.processes[key-1].materials[index][name] =value
    }
    save(f) {
        this.setState({
            loading:true
        })
        let flag=(f===1?1:0)
        let {addData}=this.state
        // console.log(this.state.addData)
        axios({
            url: `${this.url.positiveProcessStatis.saveOrCommit}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            params: {
                id: this.props.location.editFlag?this.props.location.code:this.state.statisticId,
                flag: flag
            },
            data: this.state.addData

        }).then(data => {
            message.info(data.data.data)
            if(data.data.code===0){
                this.props.history.push({pathname:'/processStatistics'})
            }
            this.setState({
                loading:false
            })

        }).catch(()=>{
            message.info('新增失败!')
        })
    }
    submit() {//提交需要所有空缺都填完整
        let {addData}=this.state
        let data=addData.processes
        for(let i=0;i<data.length;i++){//第一层是遍历哪个tag
                    for(let j=0;j<data[i].materialDetails.length;j++){
                        for(let key in data[i].materialDetails[j]){
                            if(data[i].materials[j][key]===undefined||data[i].materialDetails[j][key]===null){
                                message.info('信息填写不完整!')
                                return
                            }
                        }
                    }
                
        }
    this.save(1)
}
    back() {
        this.props.history.push({ pathname: '/positiveProcess' })
    }
    render() {
        let { processData, periodStatis, line,headPeriod,inputPeriod,flagConfirm,productLine,tagTableData,headEdit,tabKey} = this.state
        this.url = JSON.parse(localStorage.getItem('url'))
        this.tabData = [
            { component: <OnlineIngredients productLine={productLine} tagTableData={tagTableData} processId={tabKey} /> },
            { component: <PremixedCoulterMixed productLine={productLine} tagTableData={tagTableData} processId={tabKey}/> },
            { component: <PremixedStorageBin productLine={productLine} tagTableData={tagTableData} processId={tabKey}/> },
            { component: <PreBuring productLine={productLine} tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
            { component: <Crush productLine={productLine} tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
            { component: <SecondMix productLine={productLine} tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
            { component: <SecondBuring productLine={productLine} tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
            { component: <Package productLine={productLine} tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
            { component: <WorkShopMaterial tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
            { component: <WareHouseMaterial tagTableData={tagTableData} processId={tabKey} inputChange={this.inputChange}/> },
        ]

        return (
            <div>
                <Blockquote name={this.props.location.editFlag ? '编辑数据' : '新增数据'} menu='正极成本' menu2='在制品管理' returnDataEntry={this.back} />
                <div className='rightDiv-content'>
                    <Search url={this.url} addConfirm={this.addConfirm} periodStatis={periodStatis} flagConfirm={this.props.location.editFlag?true:flagConfirm} headEdit={headEdit}
                        lineData={line} headPeriod={headPeriod} inputPeriod={inputPeriod} getNextPeriods={this.getPeriods} editFlag={this.props.location.editFlag}
                    />
                    <div>
                        {processData ? <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                            {
                                processData ? processData.map((data, index) => {
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