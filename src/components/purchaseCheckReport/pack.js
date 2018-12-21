import React from 'react';
import {Divider,Switch} from 'antd';
import PackTable from './packTable';
import SearchCell from '../BlockQuote/search';
import PackGenerateModal from './packGenerateModal';
import axios from "axios";
import './purchaseCheckReport.css';
// import axios from "axios";
//
const data = [];
for (let i = 0; i < 20; i++) {
    if(i%2===0){
        data.push({
            index:i,
            id: i,
            sampleDeliveringDate: '周小伟',
            deliverer: '启动',
            deliveryFactory: 'c',
            serialNumberd: 'd',
            testItem: 'e',
            exceptionComment: 'f',
            type: '无',
            acceptStatus: '无',
            status: '已通过',
            ungenerate: '1', //未生成为：0，已生成为1
        });
    }else{
        data.push({
            index:i,
            id: i,
            sampleDeliveringDate: '周小伟',
            deliverer: '启动',
            deliveryFactory: 'c',
            serialNumberd: 'd',
            testItem: 'e',
            exceptionComment: 'f',
            type: '无',
            acceptStatus: '无',
            status: '已通过',
            ungenerate: '0', //未生成为：0，已生成为1
        });
    }
}


class Pack extends React.Component {
    url;
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
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        }
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.ungenerate === '1',
            })

        };
        return(
            <div>
                <div>
                    <PackGenerateModal
                        url={this.url}
                    />
                    <div style={{float:'right'}}>
                        <span style={{marginRight:'10px',fontSize:'10px'}}>仅显示未生成的数据</span>
                        <Switch onChange={this.urgentChange} size='small' defaultChecked style={{width:'35px',marginBottom:'2px',background:''}}/>
                        <Divider type="vertical" style={{height:'35px'}}/>
                        <span style={{float:'right',paddingBottom:'8px'}}>
                            <SearchCell name='请输入搜索内容' searchContentChange={this.searchContentChange} searchEvent={this.searchEvent} fetch={this.fetch}/>
                        </span>
                    </div>
                </div>

                <div className='clear' ></div>
                <PackTable
                    data={this.state.dataSource}
                    rowSelection={rowSelection}
                    pagination={this.pagination}
                    modifySelectedRowKeysData={this.modifySelectedRowKeysData}
                    // fetch={this.fetch}
                />
            </div>
        )
    };
    /**展示生成按钮Modal */
    handleGenerateModal = () => {
        this.setState({
            generateVisible: true,
        });
    }
    /**获取未生成的所有数据 unGenerated */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'id',
            orderType: 'desc',

        });
    };
    fetch = (params = {}) => {
        axios({
            // url: `${this.server}/jc/auth/role/getRolesByPage`,
            url: `${this.props.url.purchaseCheckReport.unGenerated}` ,
            method: 'get',
            headers:{
                'Authorization': this.props.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            console.log('res',data);
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
    /**数据组装 */
    // dataAssemble = (res) => {
    //     const dataSource = [];
    //     const list = res.list;
    //     for(var i = 0; i<list.length; i++){
    //         const testItem = list[i].testReportRecordDTO.testItemResultRecordDTOList;
    //         var testItemName;
    //         for(var j=0; j<testItem.length; j++){
    //             if(j===0){
    //                 testItemName = testItem.testItem.name;
    //             }else{
    //                 testItemName = testItemName + "," + testItem.testItem.name;
    //             }
    //         }
    //         dataSource.push({
    //             index:res.prePage*10+(i+1),
    //             id: list[i].testReportRecordDTO.testReportRecord.id,
    //             sampleDeliveringDate: list[i].sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate,
    //             deliverer: list[i].sampleDeliveringRecordDTO.deliverer.name,
    //             deliveryFactory: list[i].sampleDeliveringRecordDTO.deliveryFactory.name,
    //             serialNumberd: list[i].sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber,
    //             testItem: testItemName,
    //             exceptionComment: list[i].sampleDeliveringRecordDTO.sampleDeliveringRecord.exceptionComment,
    //             type: '无用子段',
    //             acceptStatus: list[i].sampleDeliveringRecordDTO.sampleDeliveringRecord.acceptStatus,
    //             status: list[i].commonBatchNumberDTO.commonBatchNumber.status,
    //         })
    //     }
    //     return dataSource
    // };

    /**---------------------- */
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
    /**实现生成功能 */
    handleGenerateButton = () => {
        // console.log('selectedRowKeysselectedRowKeys',this.state.selectedRowKeys);
    };
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){


    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange = (e) => {
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
    /**实现选择是否只展现未生成的数据功能 */
    urgentChange = (checked) => {
        console.log(`switch to ${checked}`);

        // this.setState({
        //     checkSwitchData:checked
        // })
    }
    /**---------------------- */
    /**实现selectedRowKeys里的数据改变功能 */
    modifySelectedRowKeysData = (recordId) => {
        this.setState({
            selectedRowKeys:[...this.state.selectedRowKeys,recordId]
        });
    };
    /**---------------------- */
}

export default Pack;
