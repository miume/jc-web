import React from 'react';
import {Divider, Switch} from 'antd';
import PackTable from './packTable';
import SearchCell from '../BlockQuote/search';
import PackGenerateModal from './packGenerateModal';
import axios from "axios";
import './purchaseCheckReport.css';

// const data = [];
// for(var i=0;i<20;i++){
//     data.push({
//         index:i,
//         deliveringDate:'2',
//         deliverName:'3',
//         manufacturerName:'4',
//         serialNumber:'5',
//         testItemString:'6',
//         exceptionHandle:'7',
//     })
// }


class Pack extends React.Component {
    rowSelection;
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
            selectedRowKeys: [],    //多选框key
            loading: false,
            searchContent:'',
            searchText: '',
            generateVisible: false,
            unGenerateDate: true, //未生成数据--true为显示未生成数据，false为显示所有数据

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
        this.modifySelectedRowKeysData = this.modifySelectedRowKeysData.bind(this);
        this.handleGenerateModal = this.handleGenerateModal.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    };
    render() {
        const { selectedRowKeys,unGenerateDate } = this.state;
        if(this.props.tabFlag === 1){
            this.fetch({
                pageSize:10,
                pageNumber:1,
            });
            this.props.modifyTabFlag();
        }
        this.rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.isGenerate !== 0,
            })
        };
        // if(unGenerateDate===true){
        //     this.rowSelection = {
        //         selectedRowKeys,
        //         onChange: this.onSelectChange,
        //     };
        // }else{
        //     this.rowSelection = {
        //         selectedRowKeys,
        //         onChange: this.onSelectChange,
        //         getCheckboxProps: record => ({
        //             disabled: record.isGenerate !== 0,
        //         })
        //     };
        // }
        return(
            <div>
                <div>
                    <PackGenerateModal
                        fetch={this.fetch}
                        url={this.props.url}
                        menuList={this.props.menuList}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                    <div style={{float:'right'}}>
                        <span style={{marginRight:'10px',fontSize:'10px'}}>仅显示未生成的数据</span>
                        <Switch onChange={this.urgentChange} size='small' defaultChecked style={{width:'35px',marginBottom:'2px',background:''}}/>
                        <Divider type="vertical" style={{height:'35px'}}/>
                        <span style={{float:'right',paddingBottom:'8px'}}>
                            <SearchCell
                                name='请输入送检人名称'
                                searchContentChange={this.searchContentChange}
                                searchEvent={this.searchEvent}
                                fetch={this.fetch}
                            />
                        </span>
                    </div>
                </div>

                <div className='clear' ></div>
                <PackTable
                    fetch={this.fetch}
                    unGenerateDate={this.state.unGenerateDate}
                    url={this.props.url}
                    status={this.props.status}
                    data={this.state.dataSource}
                    rowSelection={this.rowSelection}
                    pagination={this.pagination}
                    modifySelectedRowKeysData={this.modifySelectedRowKeysData}
                    handleTableChange={this.handleTableChange}
                />
            </div>
        )
    };

    /**展示生成按钮Modal */
    handleGenerateModal = () => {
        this.setState({
            generateVisible: true,
        });
    };
    /**获取未生成的所有数据 unGenerated */
    handleTableChange = (pagination) => {
        const pageChangeFlag = this.state.pageChangeFlag;
        if(pageChangeFlag===0){
            this.fetch({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                orderField: 'id',
                orderType: 'desc',
            });
        }else{
            this.searchEvent({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
            })
        }
    };
    /**未生成和已生成的所有数据进行判断调用结构 */
    // judgeGetAll = () => {
    //     if(this.state.unGenerateDate===true){
    //         this.fetch({
    //             isGenerate: 0,
    //             pageSize:10,
    //             pageNumber:1,
    //         });
    //     }else{
    //         this.fetch({
    //             pageSize:10,
    //             pageNumber:1,
    //         });
    //     }
    // };
    fetch = (params = {}) => {
        const unGenerateDate = this.state.unGenerateDate;
        if(unGenerateDate === true){
            var newParam = 'isGenerate';
            params[newParam] = 0;
        }
        console.log(params);
        axios({
            url: `${this.props.url.purchaseCheckReport.rawPages}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            if(res&&res.list){
                const {pagination} = this.state;
                pagination.total=res.total;
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                // const searchFlag = this.state.searchFlag;
                this.setState({
                    dataSource: res.list,
                    selectedRowKeys: [],
                    pagination:pagination,
                    // searchContent:'',
                });
                // if(searchFlag === 0){
                //     this.setState({
                //         dataSource: res.list,
                //         selectedRowKeys: [],
                //         pageChangeFlag:1,
                //     });
                // }else{
                //     this.setState({
                //         dataSource: res.list,
                //         selectedRowKeys: [],
                //         pageChangeFlag:0,
                //         searchContent:'',
                //     });
                // }
            }
        });
    };
    /**---------------------- */
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
    /**实现生成功能 */
    /**---------------------- */
    /** 根据送样时间子段分页查询*/
    searchEvent(){
        this.setState({
            pageChangeFlag:1
        });
        this.fetch({
            personName:this.state.searchContent
        });
        // this.fetch({
        //     personName:this.state.searchContent,
        //     pageSize: params.pageSize,
        //     pageNumber: params.pageNumber,
        // });
        // this.setState({
        //     searchFlag:0,
        // },()=>{
        //     this.fetch({
        //         personName:this.state.searchContent,
        //         pageSize: params.pageSize,
        //         pageNumber: params.pageNumber,
        //     });
        // })
    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    };
    /**---------------------- */
    /**实现选择是否只展现未生成的数据功能 */
    urgentChange = (checked) => {
        this.setState({
            unGenerateDate: checked
        },()=>{
            this.fetch();
        })
    };
    /**---------------------- */
    /**实现selectedRowKeys里的数据改变功能 */
    modifySelectedRowKeysData = (batchNumberId) => {
        var flag = 0;
        const selectedRowKeys = this.state.selectedRowKeys;
        for(var i=0; i<selectedRowKeys.length; i++){
            if(selectedRowKeys[i]===batchNumberId){
                flag = 1;
            }
        }
        if(flag === 0){
            this.setState({
                selectedRowKeys:[...this.state.selectedRowKeys,batchNumberId]
            });
        }

    };
    /**---------------------- */
}

export default Pack;
