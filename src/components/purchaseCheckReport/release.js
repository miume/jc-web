import React from 'react';
import SearchCell from '../BlockQuote/search';
import ReleaseTable from "./releaseTable";
import axios from "axios";
import OperationTable from "../operationManagement/operationTable";


class Release extends React.Component {
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            searchContent:'',
            searchText: '',

            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
    }
    render() {
        if(this.props.tabFlag === 3){
            this.fetch({
                pageSize:10,
                pageNumber:1,
            });
            this.props.modifyTabFlag();
        }
        return(
            <div>
                <SearchCell
                    name='请输入创建人名称'
                    searchEvent={this.searchEvent}
                    searchContentChange={this.searchContentChange}
                    fetch={this.fetch}
                    type={3}
                    flag={this.props.judgeOperation(this.props.operation,'QUERY')}
                />
                <div className='clear' ></div>
                <ReleaseTable
                    fetch={this.fetch}
                    menuList={this.props.menuList}
                    url={this.props.url}
                    status={this.props.status}
                    data={this.state.dataSource}
                    pagination={this.state.pagination}
                    handleTableChange={this.handleTableChange}
                    judgeOperation = {this.props.judgeOperation}
                    operation = {this.props.operation}
                />
            </div>
        )
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.setState({
            pagination:pagination
        })
        const {pageChangeFlag} = this.state;
        /**分页查询 */
        if(pageChangeFlag){
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
                personName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
    };
    fetch = (params ,flag) => {
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
            url: `${this.props.url.purchaseCheckReport.releasePages}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            if(res&&res.list){
                const {pagination} = this.state;
                pagination.total = res.total;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                this.setState({
                    dataSource: res.list,
                    pagination:pagination
                });
            }else{
                this.setState({
                    dataSource: [],
                });
            }
        });
    };
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        })
        this.fetch({
            personName:this.state.searchContent
        })
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**---------------------- */
}
export default Release