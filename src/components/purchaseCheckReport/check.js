import React from 'react';
import CheckTable from './checkTable';
import SearchCell from '../BlockQuote/search';
import axios from "axios";

// const data = [];
// for(var i=0;i<20;i++){
//     data.push({
//         index:i,
//         commonBatchNumber:{
//             batchNumber:'2',
//             createTime:'7',
//             status:1,
//             isUrgent:0,
//             id:123
//         },
//         details:{
//             materialName:'3',
//             manufactureName:'4',
//             receiveDate:'5'
//         },
//         createPersonName:'6',
//         serialNumber:'5',
//         testItemString:'6',
//         exceptionHandle:'7',
//     })
// }
class Check extends React.Component {
    componentDidMount() {
        this.fetch({
            pageSize:10,
            pageNumber:1,
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            // dataSource: data,
            dataSource: [],
            searchContent:'',
            searchText: '',
            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                }
            },
            pageChangeFlag : 0,   //0表示分页 1 表示查询
        };
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);

    };
    render() {
        if(this.props.tabFlag === 2){
            this.fetch({
                pageSize:10,
                pageNumber:1,
            });
            this.props.modifyTabFlag();
        }


        return(
            <div>
                <span style={{float:'right',paddingBottom:'8px'}}>
                    <SearchCell
                        name='请输入原材料名称'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                </span>
                <div className='clear' ></div>
                <CheckTable
                    menuList={this.props.menuList}
                    url={this.props.url}
                    status={this.props.status}
                    data={this.state.dataSource}
                    pagination={this.state.pagination}
                    handleTableChange={this.handleTableChange}
                    fetch={this.fetch}
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
                materialName:this.state.searchContent
            })
        }else{
            this.fetch({
                pageSize:pagination.pageSize,
                pageNumber:pagination.current,
            })
        }
    };
    fetch = (params,flag) => {
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
            url: `${this.props.url.purchaseCheckReport.purchasePages}` ,
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
            materialName:this.state.searchContent
        })
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
}

export default Check;
