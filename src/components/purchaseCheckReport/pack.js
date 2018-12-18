import React from 'react';
import {Divider,Button,Switch} from 'antd';
import '../Home/page.css';
import PackTable from './packTable';
import SearchCell from '../BlockQuote/search';
import PackGenerateModal from './packGenerateModal';
import axios from "axios";
import NewButton from "../BlockQuote/newButton";
// import axios from "axios";
//
const data = [];
for (let i = 0; i < 20; i++) {
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
        status: '已通过'
    });
}


class Pack extends React.Component {
    url;
    componentDidMount() {
        this.fetch();
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            loading: false,
            searchContent:'',
            searchText: '',
            generateVisible: false,
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
        this.url = JSON.parse(localStorage.getItem('url'));
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <div>
                    <PackGenerateModal
                        url={this.url}
                    />
                    <div style={{float:'right'}}>
                        <span style={{marginRight:'10px',fontSize:'6px'}}>仅显示未生成的数据</span>
                        <Switch onChange={this.urgentChange} size='small' style={{width:'35px',marginBottom:'2px'}}/>
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
            url: `${this.url.purchaseCheckReport.unGenerated}` ,
            method: 'get',
            headers:{
                'Authorization': this.url.Authorization
            },
            params: params,
        }).then((data) => {
            const res = data.data.data;
            console.log('res',data);
            this.pagination.total=res?res.total:0;
            if(res&&res.list){
                const dataSource = this.dataAssemble(res);
                for(var i = 1; i<=res.list.length; i++){
                    res.list[i-1]['index']=res.prePage*10+i;
                }
                // this.setState({
                //     dataSource: res.list,
                // });
            }
        });
    };
    /**数据组装 */
    dataAssemble = (res) => {
        const dataSource = [];
        const list = res.list;
        for(var i = 0; i<list.length; i++){
            const testItem = list[i].testReportRecordDTO.testItemResultRecordDTOList;
            var testItemName;
            for(var j=0; j<testItem.length; j++){
                if(j===0){
                    testItemName = testItem.testItem.name;
                }else{
                    testItemName = testItemName + "," + testItem.testItem.name;
                }
            }
            dataSource.push({
                index:res.prePage*10+(i+1),
                id: list[i].testReportRecordDTO.testReportRecord.id,
                sampleDeliveringDate: list[i].sampleDeliveringRecordDTO.sampleDeliveringRecord.sampleDeliveringDate,
                deliverer: list[i].sampleDeliveringRecordDTO.deliverer.name,
                deliveryFactory: list[i].sampleDeliveringRecordDTO.deliveryFactory.name,
                serialNumberd: list[i].sampleDeliveringRecordDTO.repoBaseSerialNumber.serialNumber,
                testItem: testItemName,
                exceptionComment: list[i].sampleDeliveringRecordDTO.sampleDeliveringRecord.exceptionComment,
                type: '无用子段',
                acceptStatus: list[i].sampleDeliveringRecordDTO.sampleDeliveringRecord.acceptStatus,
                status: list[i].commonBatchNumberDTO.commonBatchNumber.status,
            })
        }
        return dataSource
    };

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
        // const ope_name = this.state.searchContent;
        // axios({
        //     url:`${this.server}/jc/auth/operation/getRolesByNameLikeByPage`,
        //     method:'get',
        //     headers:{
        //         'Authorization':this.Authorization
        //     },
        //     params:{
        //         size: this.pagination.pageSize,
        //         page: this.pagination.current,
        //         operationName:ope_name
        //     },
        //     type:'json',
        // }).then((data)=>{
        //     const res = data.data.data;
        //     this.pagination.total=res.total;
        //     for(var i = 1; i<=res.list.length; i++){
        //         res.list[i-1]['index']=(res.prePage)*10+i;
        //     }
        //     this.setState({
        //         dataSource: res.list,
        //     });
        // }).catch((error)=>{
        //     message.info(error.data.message)
        // })

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