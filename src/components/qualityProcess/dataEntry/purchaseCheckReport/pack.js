import React from 'react';
import {Divider, Switch} from 'antd';
import PackTable from './packTable';
import SearchCell from '../../../BlockQuote/search';
import PackGenerateModal from './packGenerateModal';
import axios from "axios";
import './purchaseCheckReport.css';

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
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            loading: false,
            searchContent:'',
            generateVisible: false,
            unGenerateDate: true, //未生成数据--true为显示未生成数据，false为显示所有数据

            pagination : {
                showTotal(total) {
                    return `共${total}条记录`
                },
                showSizeChanger:true
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
        const { selectedRowKeys } = this.state;
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
        return(
            <div>
                <div>
                    <PackGenerateModal
                        fetch={this.fetch}
                        url={this.props.url}
                        menuList={this.props.menuList}
                        selectedRowKeys={this.state.selectedRowKeys}
                        flag={this.props.judgeOperation(this.props.operation,'SAVE')}
                    />
                    <div style={{float:'right'}}>
                        <span style={{marginRight:'10px',fontSize:'10px'}}>仅显示未生成的数据</span>
                        <Switch onChange={this.urgentChange} size='small' defaultChecked style={{width:'35px',marginBottom:'2px',background:''}}/>
                        <Divider type="vertical" style={{height:'35px'}}/>
                        <SearchCell
                            name='请输入送检人名称'
                            searchContentChange={this.searchContentChange}
                            searchEvent={this.searchEvent}
                            fetch={this.fetch}
                            type={1}
                            flag={this.props.judgeOperation(this.props.operation,'QUERY')}
                        />
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
                    pagination={this.state.pagination}
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
        this.setState({
            pagination:pagination
        });
        const {pageChangeFlag} = this.state;
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
    /**未生成和已生成的所有数据进行判断调用结构 */
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
        const unGenerateDate = this.state.unGenerateDate;
        if(unGenerateDate === true){
            var newParam = 'isGenerate';
            params[newParam] = 0;
        }
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
                this.setState({
                    dataSource: res.list,
                    selectedRowKeys: [],
                    pagination:pagination,
                });
            }else{
                this.setState({
                    dataSource: [],
                    selectedRowKeys: [],
                });
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
            if(checked===true){
                this.fetch({
                    pageSize:10,
                    pageNumber:1,
                });
            }else{
                var flag = 1;
                this.fetch({
                    pageSize:10,
                    pageNumber:1,
                },flag);
            }
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
