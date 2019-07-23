import React from "react";
import {message,Tree,Card,Layout} from "antd";
import Right from "./right";
import axios from "axios";
import DepTree from "./depTree";
import Home from "../../Home/home";

class Completed extends React.Component{
    url;
    operation
    componentDidMount() {
        // this.fetch({
        //     pageSize:10,
        //     pageNumber:1,
        // });
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            editingKey: '',
            searchContent:'',
            searchText: '',
            eff_flag:1,
            dateOneMonth:{},
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
        this.getLastMonthTime=this.getLastMonthTime.bind(this)
    }
    // onSelect = (selectedKeys, info) => {
    //     console.log('selected', selectedKeys, info);
    // };

    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const {  Sider, Content } = Layout;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="eqQueryCompleted">
                <Layout>
                    <Sider theme='light' classname="eqQueryCompleted-left" style={{paddingRight:5}}>

                        <Card headStyle={{marginLeft:"30px"}} title="所属部门" width="100"  type="innner">
                            <div className="eqQueryCompleted-left-over">
                            <DepTree
                                url={this.url}
                                getTableData={this.props.getTableData}
                                getLastMonthTime={this.getLastMonthTime}
                            />
                        </div>
                        </Card>&nbsp;&nbsp;
                    </Sider>
                    <Content margin-left={600} theme="light">
                        <Right
                          //  style={{marginLeft:10}}
                            url={this.url}
                            data={this.state.dataSource}
                            pagination={this.state.pagination}
                            fetch={this.fetch}
                            modifyDataSource={this.modifyDataSource}
                            handleTableChange={this.handleTableChange}
                            handleDelete={this.handleDelete}
                            judgeOperation = {Home.judgeOperation}
                            operation = {this.operation}
                            rightTableData={this.props.rightTableData}
                            getTableData={this.props.getTableData}
                            depCode={this.props.depCode}
                            getLastMonthTime={this.getLastMonthTime}
                        />
                    </Content>
                </Layout>
            </div>

        );
    }

    getLastMonthTime = (month) =>{
        var selectDate = this.state.selectDate

        var date=new Date();
        var strYear = date.getFullYear();
        var strDay = date.getDate();
        var strMonth = date.getMonth()+1;
        var NowDate= strYear+"-"+strMonth+"-"+strDay;
        //  1    2    3    4    5    6    7    8    9   10    11   12月
        var daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
        if (((strYear % 4) === 0) && ((strYear % 100)!==0) || ((strYear % 400)===0)){
            daysInMonth[2] = 29;
        }
        if(month===1){
            if(strMonth - 1 === 0) //二、解决跨年问题
            {
                strYear -= 1;
                strMonth = 12;
            }
            else
            {
                strMonth -= month;
            }
        }
        else if(month===3){
            if(strMonth - month<= 0) //二、解决跨年问题
            {
                strYear -= 1;
                if(strMonth===1)strMonth=10;
                else if(strMonth===2)strMonth=11;
                else if(strMonth===3)strMonth=12;
            }
            else
            {
                strMonth -= month;
            }
        }
        else if(month===12){
            strYear-=1;
        }
        // strYear=2000;
        // strMonth=2;
        // strDay=31;
//  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
        strDay = Math.min(strDay,daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30
        if(strMonth<10)//给个位数的月、日补零
        {
            strMonth="0"+strMonth;
        }
        if(strDay<10)
        {
            strDay="0"+strDay;
        }
        var datastr = strYear+"-"+strMonth+"-"+strDay;
        return {
            NowDate:NowDate,
            datastr:datastr
        }
    }

    /**---------------------- */
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.searchContent,
                deptId:parseInt(this.state.depCode),
                deviceId:this.props.record.code
                // pageSize:pagination.pageSize,
                // pageNumber:pagination.current,
                // departmentName:this.state.searchContent
            })
        }else{
            this.fetch({
                size:pagination.pageSize,
                page:pagination.current,
                condition:this.state.depCode,
                deptId:parseInt(this.state.code),
                deviceId:this.props.record.code
                // pageSize:pagination.pageSize,
                // pageNumber:pagination.current,
            })
        }
    };


    fetch = (params ,flag) => {
        /**flag为1时，清空搜索框的内容 以及将分页搜索位置0 */
        if(flag) {
            var {pagination} = this.state;
            pagination.current = 1;
            pagination.total = 0;
            this.setState({
                pageChangeFlag:0,
                searchContent:'',
                pagination:pagination
            })
        }
        axios({
            url: ' ' ,
            method: 'get',
            params: params,
        }).then((data) => {
            const res = data.data.data?data.data.data:[];
            if(res&&res.list){
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=(res.prePage)*10+i;
                }
                const {pagination} = this.state;
                pagination.total=res.total;
                this.setState({
                    dataSource: res.list,
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: []
                })
            }
        });
    };
}
export default Completed

