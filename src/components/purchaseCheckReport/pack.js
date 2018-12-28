import React from 'react';
import {Divider, Switch} from 'antd';
import PackTable from './packTable';
import SearchCell from '../BlockQuote/search';
import PackGenerateModal from './packGenerateModal';
import axios from "axios";
import './purchaseCheckReport.css';
// import axios from "axios";



class Pack extends React.Component {
    rowSelection;
    componentDidMount() {
        this.fetch();
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRowKeys: [],    //多选框key
            loading: false,
            searchContent:'',
            searchText: '',
            generateVisible: false,
            unGenerateDate: true, //未生成数据--true为显示未生成数据，false为显示所有数据
        };
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.modifySelectedRowKeysData = this.modifySelectedRowKeysData.bind(this);
        this.handleGenerateModal = this.handleGenerateModal.bind(this);
        this.generateFetch = this.generateFetch.bind(this);
        this.judgeGetAll = this.judgeGetAll.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            }
        }
    };
    render() {
        const { selectedRowKeys,unGenerateDate } = this.state;
        this.rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.testReportRecordDTO.testReportRecord.purchaseReportRecordId !== null,
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
        //             disabled: record.testReportRecordDTO.testReportRecord.purchaseReportRecordId !== null,
        //         })
        //
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
                                name='请输入送检日期'
                                searchContentChange={this.searchContentChange}
                                searchEvent={this.searchEvent}
                                fetch={this.judgeGetAll}
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
        if(this.state.unGenerateDate===true){
            this.fetch({
                size: pagination.pageSize,
                page: pagination.current,
                orderField: 'id',
                orderType: 'desc',
            });
        }else{
            this.generateFetch({
                size: pagination.pageSize,
                page: pagination.current,
                orderField: 'id',
                orderType: 'desc',
            });
        }
    };
    /**未生成和已生成的所有数据进行判断调用结构 */
    judgeGetAll = () => {
        if(this.state.unGenerateDate===true){
            this.fetch();
        }else{
            this.generateFetch();
        }
    };
    fetch = (params = {}) => {
        axios({
            url: `${this.props.url.purchaseCheckReport.unGenerated}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            if(res&&res.list){
                // const dataSource = this.dataAssemble(res);
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                this.setState({
                    dataSource: res.list,
                    selectedRowKeys: [],
                });
            }
        });
    };
    generateFetch = (params = {}) => {
        axios({
            url: `${this.props.url.purchaseCheckReport.generated}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            this.pagination.total=res?res.total:0;
            if(res&&res.list){
                // const dataSource = this.dataAssemble(res);
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                this.setState({
                    dataSource: res.list,
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
        const sampleDeliveringDate = this.state.searchContent;
        const unGenerateDate = this.state.unGenerateDate;
        if(unGenerateDate===true){
            //  未生成数据
            axios({
                url: `${this.props.url.purchaseCheckReport.sampleDeliveringDate}/unGenerated`,
                method:'get',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                params:{
                    size: this.pagination.pageSize,
                    page: this.pagination.current,
                    sampleDeliveringDate:sampleDeliveringDate
                },
                type:'json',
            }).then((data)=>{
                const res = data.data.data;
                this.pagination.total=res?res.total:0;
                if(res&&res.list){
                    // const dataSource = this.dataAssemble(res);
                    for(var i = 1; i<=res.list.length; i++){
                        res.list[i-1]['index']=res.prePage*10+i;
                    }
                    this.setState({
                        dataSource: res.list,
                    });
                }
            });
        }else{
            //  已生成数据
            axios({
                url: `${this.props.url.purchaseCheckReport.sampleDeliveringDate}/generated`,
                method:'get',
                headers:{
                    'Authorization':this.props.url.Authorization
                },
                params:{
                    size: this.pagination.pageSize,
                    page: this.pagination.current,
                    sampleDeliveringDate:sampleDeliveringDate
                },
                type:'json',
            }).then((data)=>{
                const res = data.data.data;
                this.pagination.total=res?res.total:0;
                if(res&&res.list){
                    // const dataSource = this.dataAssemble(res);
                    for(var i = 1; i<=res.list.length; i++){
                        res.list[i-1]['index']=res.prePage*10+i;
                    }
                    this.setState({
                        dataSource: res.list,
                    });
                }
            });
        }
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
            if(this.state.unGenerateDate===true){
                this.fetch()
            }else{
                this.generateFetch()
            }
        })
    };
    /**---------------------- */
    /**实现selectedRowKeys里的数据改变功能 */
    modifySelectedRowKeysData = (recordId) => {
        var flag = 0;
        const selectedRowKeys = this.state.selectedRowKeys;
        for(var i=0; i<selectedRowKeys.length; i++){
            if(selectedRowKeys[i]===recordId){
                flag = 1;
            }
        }
        if(flag === 0){
            this.setState({
                selectedRowKeys:[...this.state.selectedRowKeys,recordId]
            });
        }

    };
    /**---------------------- */
}

export default Pack;
