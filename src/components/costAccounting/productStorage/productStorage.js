import React from 'react';
import {Button, Spin, Tabs} from "antd";
import BlockQuote from "../../BlockQuote/blockquote";
import NewButton from "../../BlockQuote/newButton";
import Submitted from './submit/submit';
import Statistics from './statistics/statistics';
import Search from "./search"

const {TabPane} = Tabs;
const data = [{
    code: 1,
    index: 1,
    periodName: '周',
    periodName: 2,
    start: '2019-10-01',
    end: '2019-10-01',
    name:"前驱体",
    productType:"5503",
    weight:"360",
    Ni:"7.5",
    Co:"7.1",
    Mn:"7.6"
}]

class ProductStorage extends React.Component{
    url;
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
            loading:false,
            flag: 1, //用来表示当前所在tab页
        };
        this.tabChange = this.tabChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
        this.getUnSubmittedData = this.getUnSubmittedData.bind(this);
        this.getStatisticsData = this.getStatisticsData.bind(this);
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        this.current = JSON.parse(localStorage.getItem('current'));
        return(
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <NewButton name={'新增'} className={'fa fa-plus'} handleClick={this.handleClick}/>
                    <Search flag={true}/>
                    <div className='clear' ></div>
                    <Tabs defaultActiveKey={'1'} onChange={this.tabChange}>
                        <TabPane tab={'待提交'} key={'1'}>
                            <Submitted data={data} handleClick={this.handleClick}/>
                        </TabPane>
                        <TabPane tab={'已统计'} key={'2'}>
                            <Statistics data={data}/>
                        </TabPane>
                    </Tabs>
                </Spin>
            </div>
        )
    }

    /**界面加载获取未提交数据*/
    getUnSubmittedData() {

    }

    /**获取已统计数据*/
    getStatisticsData() {

    }

    /**标签页切换*/
    tabChange(key) {
        console.log('标签页切换为：',key)
        this.setState({
            flag: key
        });
        if(key === '1') {
            this.getUnSubmittedData();
        } else {
            this.getStatisticsData();
        }
    }
    /**点击新增按钮
     * record用来区分编辑和新增
     * */
    handleClick(record = {}) {
        let pathName = record && record.code ? `/productAddModal/${record.code}` : '/productAddModal'
        this.props.history.push({pathname: pathName})
    }
}

export default ProductStorage