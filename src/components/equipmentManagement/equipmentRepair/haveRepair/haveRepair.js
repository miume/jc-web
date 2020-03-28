import React from "react";
import DepTree from "../../../BlockQuote/department";
import SearchCell from "../../../BlockQuote/search";
import TheTable from "./theTable";
import {Button, DatePicker, Spin, message} from 'antd';
import moment from "moment";
import axios from "axios";

const {RangePicker} = DatePicker;

class HaveRepair extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pageChangeFlag:'',
            searchContent:'',
            startTime: '',
            endTime: '',
            dateFormat: 'YYYY-MM-DD'
        };
        this.pagination = {
            showSizeChanger: true,//是否可以改变 pageSize
            showTotal: (total) => `共${total}条记录`,//显示共几条记录
            pageSizeOptions: ["10","20","50","100"]
        };
        this.download = this.download.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }

    render() {
        this.pagination.total = this.props.rightTableData.total;
        const {startTime, endTime, dateFormat} = this.state;
        const value = startTime === '' || endTime === '' ? null : [moment(startTime,dateFormat), moment(endTime,dateFormat)];
        return(
            <div className='equipment-query'>
                <DepTree
                    key="depTree"
                    treeName={'所属部门'}
                    url={this.props.url}
                    getTableData={this.getTableData}
                />
                <Spin spinning={this.props.loading} wrapperClassName='equipment-right'>
                    <div>
                        <RangePicker style={{marginRight: 10}}
                                     onChange={this.dateChange}
                                     placeholder={['开始时间','结束时间']} value={value}/>
                        <span className='searchCell' style={{marginLeft: 10}}>
                            <Button onClick={this.download} type='ant-btn ant-btn-primary'>
                            <i className='fa fa-download' aria-hidden="true" style={{color:'white',fontWeight:'bolder'}}></i>
                                &nbsp;导出
                            </Button>
                        </span>
                        <SearchCell
                            name='请输入设备名称'
                            flag={true}
                            fetch={this.searchReset}
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            type={3}
                        />

                    </div>
                    <div className='clear' ></div>
                    <TheTable
                        url={this.props.url}
                        rightTableData={this.props.rightTableData}
                        pagination={this.pagination}
                        handleTableChange={this.handleTableChange}
                    />
                </Spin>
            </div>

        );
    }

    getTableData = (params) => {
        params['repairStatus'] = 3;
        this.props.getTableData(params)
    };

    /**跟踪日期变化*/
    dateChange(date,dateString) {
        this.setState({
            startTime: dateString[0],
            endTime: dateString[1]
        });
    }

    /**点击导出按钮*/
    download() {
        let {searchContent,startTime,endTime} = this.state;
        const params={
            secondDeptId: this.props.secondDeptId,
            repairStatus: 3,
            condition: searchContent,
            startTime: startTime,
            endTime: endTime
        };
        axios({
            url: `${this.props.url.equipmentRepair.export}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            let url = `${this.props.url.equipmentRepair.download}${data.data.data}`;
            let a = document.createElement('a');
            a.href = url;
            a.click();
            message.info(data.data.message)
        })
    }

    /**跟踪搜索事件变化 */
    searchContentChange=(e)=>{
        const value = e.target.value;
        this.setState({searchContent:value});
    };

    /**绑定搜索事件 */
    searchEvent = () => {
        let {searchContent,startTime,endTime} = this.state;
        const params={
            secondDeptId: this.props.secondDeptId,
            repairStatus: 3,
            condition: searchContent,
            startTime: startTime,
            endTime: endTime,
            page: this.pagination.current,
            size: this.pagination.pageSize
        };
        this.props.getTableData(params)
    };

    /**重置时重新加载数据*/
    searchReset=()=>{
        this.setState({
            searchContent:'',
            startTime: '',
            endTime: ''
        });
        this.props.getTableData(
            {
                secondDeptId:this.props.secondDeptId,
                repairStatus:3,
            }
        )
    };
    /**分页查询*/
    handleTableChange = (page) => {
        this.pagination = page;
        let {searchContent,startTime,endTime} = this.state;
        let params = {
            secondDeptId:this.props.secondDeptId,
            repairStatus:3,
            condition: searchContent,
            startTime: startTime,
            endTime: endTime,
            page: page.current,
            size: page.pageSize
        };
        this.props.getTableData(params)
    };
}
export default HaveRepair
