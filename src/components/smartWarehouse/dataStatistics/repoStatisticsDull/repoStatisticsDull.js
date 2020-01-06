import React from 'react';
import BlockQuote from "../../../BlockQuote/blockquote";
import {Spin, message, Table, Tabs, Popconfirm, Divider} from "antd";
import axios from 'axios';
import Search from './search'
import RightTable from './table'
import LeftPie from './pie'
import "./repoStatisticsDull.css"
import {getOperations,judgeOperation} from "../../../commom/getOperations";

var data1 = []
for (var i = 0; i < 20; i++) {
    data1.push({
        col1: i+1,
        col2: 'xx-aa-bbb-ccc-dd-eee',
        col3: '300Kg',
        col4: '2019年12月18日',
        col5: '142天',

    })
}


class RepoStatisticsDull extends React.Component {

    componentDidMount = () => {
        // this.getTableParams();
    }
    componentWillUnmount = () => {
        this.setState(() => {
            return;
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchContent: '',
            dataSource:[],
            condition1: null,
            condition2: null,
            condition3: null,

            pieOption:{}
        };
        this.operations = [];
        this.pagination = {
            pageSize: 10,
            current: 1,
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10", "20", "50", "100"]
        };
    }

    render() {
        this.current = JSON.parse(localStorage.getItem('dataEntry'));
        this.url = JSON.parse(localStorage.getItem('url'));
        return (
            <div>
                <BlockQuote name={this.current.menuName} menu={this.current.menuParent} menu2='返回' returnDataEntry={this.back}/>
                <Spin spinning={this.state.loading} wrapperClassName='rightDiv-content'>
                    <Search
                        getCondition1={this.getCondition1}
                        getCondition2={this.getCondition2}
                        getCondition3={this.getCondition3}
                        searchEvent={this.searchEvent}
                        save={this.save}
                        condition1={this.state.condition1}
                        condition2={this.state.condition2}
                        condition3={this.state.condition3}
                    />
                    <div className='clear'></div>
                    <div className="repoStatisticsDull_bottom">
                        <LeftPie
                            pieOption = {this.state.pieOption}
                        />
                        <Divider type="vertical" className="repoStatisticsDull_divider"/>
                        <RightTable
                            dataSource={this.state.dataSource}

                        />
                    </div>
                </Spin>
            </div>
        );
    }

    getOption = () => {

        const data = [{
            value: 400,
            name: "正常"
        },{
            value: 600,
            name: "呆滞"
        }]

        const option = {
            title:{
                text: "呆滞占比图",
                left: 'center'
            },
            tooltip:{
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['正常', '呆滞']
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.setState({
            pieOption: option
        })
    };



    /**获取表格数据*/
    getTableData = () => {
        this.setState({
            dataSource:data1
        })


        // this.setState({
        //     loading: true
        // });
        // axios({
        //     url: `${this.url.checkSite.page}`,
        //     method: 'get',
        //     headers: {
        //         'Authorization': this.url.Authorization
        //     },
        //     params
        // }).then(data => {
        //     let res = data.data.data;
        //     if(res && res.list) {
        //         this.pagination.total = res['total'] ? res['total'] : 0;
        //         for(let i = 0; i < res.list.length; i++) {
        //             res['list'][i]['index'] = (res['page'] - 1) * 10 + i + 1;
        //         }
        //         this.setState({
        //             dataSource: res.list
        //         })
        //     }
        //     this.setState({
        //         loading: false
        //     })
        // })
    }


    /** 获取搜索条件 */
    getCondition1 = (value,option) => {
        this.setState({
            condition1: value,
        })
    }
    getCondition2 = (value,option) => {
        this.setState({
            condition2: value,
        })
    }
    getCondition3 = (e) => {
        this.setState({
            condition3: e.targer.value,
        })
    }

    /**搜索事件*/
    searchEvent = () => {
        const {condition1,condition2,condition3} = this.state;
        console.log(condition1)
        console.log(condition2)
        console.log(condition3)

        this.getOption();
        this.getTableData();


        // this.setState({
        //     searchContent
        // });
    }

    /**保存事件*/
    save = () => {
        console.log(this.state.condition3)

        this.setState({
            condition1:null,
            condition2:null,
            condition3:null,
            pieOption:{},
            dataSource:[]
        });
    }

    back = () => {
        this.props.history.push('/repoStatistics');
    }

}

export default RepoStatisticsDull;
