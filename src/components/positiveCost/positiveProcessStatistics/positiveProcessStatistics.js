import React,{Component} from 'react'
import {Spin,Tabs,message} from 'antd'
import Blockquote from '../../BlockQuote/blockquote'
import NewButton from '../../BlockQuote/newButton'
import Search from './search'
import PositivePendSubmit from './positivePendSubmit/positivePentSubmit'
import PositiveStatisticDone from './positiveStatisticDone/positiveStatisDone'
import axios from 'axios'
import {judgeOperation,getSecondsOperations} from '../../commom/getOperations'
const { TabPane } = Tabs;
class PositiveProcessStatistics extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            loadingStatis:false,
            loadingSubmit:false,
            head:{},// 主界面选择的时间，周期等
            tabKey:'1'
        }
        this.getPeriod=this.getPeriod.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.confirm=this.confirm.bind(this);
        this.getLine=this.getLine.bind(this);
        this.getPendSubmit=this.getPendSubmit.bind(this);
        this.getStatisticPage=this.getStatisticPage.bind(this);
        this.getPagination=this.getPagination.bind(this);
        this.handleTableChange=this.handleTableChange.bind(this)
        this.tabChange=this.tabChange.bind(this);
    }
    componentDidMount() {
        this.getPeriod()
        this.getLine()
        this.getPendSubmit()
        let {menuId}=this.current,operations=getSecondsOperations(menuId)
        this.setState({
            addFlag:judgeOperation(operations,'SAVE'),
            deleteFlag:judgeOperation(operations,'DELETE'),
            updateFlag:judgeOperation(operations,'UPDATE')
        })
    }
    componentWillUnmount() {
        this.setState=()=>{
            return
        }
    }
    /**获取统计周期*/
    getPeriod(){
        axios({
            url:this.url.positiveStatic.all,
            method:'get',
            headers:{
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res.length){
                this.setState({
                    periodStatis:res,
                    periodCode:res[0].code,
                    length:res[0].length,
                    time:res[0].startTime
                })
            }
        })
    }
    /**获取产线*/
    getLine(){
        axios({
            url:this.url.positiveProductline.all,
            method:'get',
            headers: {
                'Authorization':this.url.Authorization
            }
        }).then(data=>{
            let res=data.data.data
            if(res){
                this.setState({
                    line:res,
                    lineCode:res[0].code
                })
            }
        })
    }
    /**获取待提交和已统计的分页对象*/
    getPagination(tabKey,pagination){
        if(tabKey==='1'){
            this.setState({
                pagination:pagination
            })
        }
        else{
            this.setState({
                paginationStatis:pagination
            })
        }
    }
    tabChange(key){
        let {pagination,head,paginationStatis}=this.state
        this.setState({
                tabKey:key
            })
            if(key==='1'){
                this.getPendSubmit(head,pagination)
            }
            if(key==='2'){
                this.getStatisticPage(head,paginationStatis)
            }
    }
    handleTableChange(pagination){
        let {tabKey,head}=this.state
        this.setState({
            pagination:pagination
        })
        if(tabKey==='1'){
            this.getPendSubmit(head,pagination)
        }
        else{
            this.getStatisticPage(head,pagination)
        }
    }
    /**主界面的确认按钮*/
    confirm(params){
        let {tabKey}=this.state
        this.setState({
            head:params
        })
        if(tabKey==='1'){
            this.getPendSubmit(params)
        }
        else{
            this.getStatisticPage(params)
        }
    }
    /**获取待提交表格数据*/
    getPendSubmit(params,pagination){
        let size=pagination?pagination.pageSize:10,page=pagination?pagination.current:1
        params=params?params:{}
        this.setState({
            loadingSubmit: true
        })
        axios({
            url: `${this.url.positiveProcessStatis.unCommitPage}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data:params,
            params:{
                size:size,
                page:page
            }
        }).then((data) => {
            let res = data.data.data
            if(res&&res.list){
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = (res.page - 1) * res.size + (i + 1)
                }
                this.setState({
                    dataSubmit: res.list,
                    pagination: { current: res.page ? res.page : 0, total: res.total ? res.total : 0 },
                })
            }
            this.setState({
               loadingSubmit:false
           })
        })
    }
    /**获取已统计表格数据*/
    getStatisticPage(params,pagination){
        let size=pagination?pagination.pageSize:10,page=pagination?pagination.current:1,
        da={
            periodCode:this.state.periodCode,
            lineCode:this.state.lineCode
        }
        params=(params['periodCode']||params['startTime']||params['endTime']||params['lineCode'])?params:da
        this.setState({
            loadingStatis:true
        })
        axios({
            url: `${this.url.positiveProcessStatis.commitPage}`,
            method: 'post',
            headers: {
                'Authorization': this.url.Authorization
            },
            data:params,
            params:{
                size:size,
                page:page
            }
        }).then((data) => {
            let res = data.data.data
            if(res&&res.list){
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i]['index'] = (res.page - 1) * res.size + (i + 1)
                }
                this.setState({
                    dataStatistic: res.list,
                    paginationStatis: { current: res.page ? res.page : 0, total: res.total ? res.total : 0 },
                })
            }
            this.setState({
                loadingStatis:false
            })
        })
    }
 
    handleAdd(){
        let {periodStatis,line}=this.state
        this.props.history.push({
            pathname:'/positiveAdd',
            periodStatis:periodStatis,
            line:line,
        })
    }


    render(){
        let {periodStatis,periodCode,time,length,line,lineCode,dataStatistic,dataSubmit,head,tabKey}=this.state
        this.current=JSON.parse(localStorage.getItem('current'))
        this.url=JSON.parse(localStorage.getItem('url'))
        return(
            <div>
                <Blockquote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <span className={this.state.addFlag?'':'hide'}>
                          <NewButton name='新增' className='fa fa-plus' handleClick={this.handleAdd} />
                    </span>
                    {/* <NewButton name='统计分析' handleClick={this.statisticalAnalysis}/> */}
                    <Search flag={true} periodStatis={periodStatis} line={line} tabKey={tabKey} getPendSubmit={this.getPendSubmit} getStatisticPage={this.getStatisticPage}
                            periodCode={tabKey === '2' ? periodCode : undefined} time={time} length={length} confirm={this.confirm} lineCode={tabKey === '2' ? lineCode : undefined}/>
                    <div className='clear'></div>
                    <Tabs defaultActiveKey='1' onChange={this.tabChange}>
                        <TabPane tab='待提交' key='1'>
                            <PositivePendSubmit history={this.props.history} deleteFlag={this.state.deleteFlag} updateFlag={this.state.updateFlag} loadingSubmit={this.state.loadingSubmit}  head={head}
                                url={this.url} getPagination={this.getPagination} pagination={this.state.pagination} getPendSubmit={this.getPendSubmit}
                                handleTableChange={this.handleTableChange} dataSubmit={dataSubmit} line={line} periodStatis={periodStatis}
                            />
                        </TabPane>
                        <TabPane tab='已统计' key='2'>
                            <PositiveStatisticDone loadingStatis={this.state.loadingStatis} 
                                url={this.url} getPagination={this.getPagination} pagination={this.state.paginationStatis}
                                handleTableChange={this.handleTableChange}  dataStatistic={dataStatistic}
                            />
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        );
    }
}
export default PositiveProcessStatistics