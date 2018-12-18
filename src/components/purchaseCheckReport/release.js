import React from 'react';
import '../Home/page.css';
import SearchCell from '../BlockQuote/search';
import ReleaseTable from "./releaseTable";
import DeleteByIds from "../BlockQuote/deleteByIds";
import axios from "axios";


const data =[];
for (let i = 0; i < 20; i++) {
    data.push({
        index: i,
        id:i,
        a: '测试',
        b: '测试',
        c: '启东北新',
        d: '2019年1月10号',
        e: '李小红',
        f: '2018年11月27日',
        g: '李小红',
        h: '2018年11月27日',
        type: '进货检验',
        state:'0',
        isUrgent:'紧急',
    });
}


class Release extends React.Component {
    url
    constructor(props) {
        super(props);
        this.state = {
            dataSource: data,
            selectedRowKeys: [],    //多选框key
            pagination:{},
            searchContent:'',
            searchText: '',
            loading: false,
        };
        this.deleteByIds = this.deleteByIds.bind(this);
        this.confrimCancel = this.confrimCancel.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showTotal(total) {
                return `共${total}条记录`
            },
            showSizeChanger: true,
        }
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <DeleteByIds
                    selectedRowKeys={this.state.selectedRowKeys}
                    deleteByIds={this.deleteByIds}
                    cancel={this.confrimCancel}
                />
                <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell
                            name='请输入搜索内容'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                <div className='clear' ></div>
                <ReleaseTable
                    data={this.state.dataSource}
                    pagination={this.pagination}
                    rowSelection={rowSelection}
                    fetch={this.fetch}
                    handleTableChange={this.handleTableChange}
                />
            </div>
        )
    }
    /**获取所有数据 getAllByPage */
    handleTableChange = (pagination) => {
        this.fetch({
            size: pagination.pageSize,
            page: pagination.current,
            orderField: 'id',
            orderType: 'desc',

        });
    };
    fetch = (params = {}) => {

    };
    componentDidMount() {
        this.fetch();
    }
    /**---------------------- */
    /** 根据角色名称分页查询*/
    searchEvent(){

    };
    /**获取查询时角色名称的实时变化 */
    searchContentChange(e){
        const value = e.target.value;
        this.setState({searchContent:value});
    }
    /**---------------------- */
    /**对应于批量删除时，确认取消删除 并实现checkbox选中为空 */
    confrimCancel(){
        this.setState({
            selectedRowKeys:[]
        })
    }
    /**批量删除 */
    deleteByIds(){
        // const ids = this.state.selectedRowKeys;
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**---------------------- */
    /**实现全选功能 */
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    /**---------------------- */
}
export default Release