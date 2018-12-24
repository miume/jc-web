import React from 'react';
import BlockQuote from '../BlockQuote/blockquote';
import SearchCell from "../BlockQuote/search";
import ProductTable from "./productInspectionTable";

const data =[];
for(let i=0; i<20; i++){
    if(i%2===0){
        data.push({
            index:i,
            id: i,
            sampleDeliveringDate: '2018年10月11日',
            deliverer: '测试',
            deliveryFactory: '测试',
            batchNumber: '测试',
            testItems: '测试',
            urgentComment: '测试',
            type: '测试',
            h: '0',
            status: 3
        });
        continue;
    };
    if(i%3===0){
        data.push({
            index:i,
            id: i,
            sampleDeliveringDate: '2018年10月11日',
            deliverer: '测试',
            deliveryFactory: '测试',
            batchNumber: '测试',
            testItems: '测试',
            urgentComment: '测试',
            type: '测试',
            h: '0',
            status: 0
        });
        continue;
    };
    data.push({
        index:i,
        id: i,
        sampleDeliveringDate: '2018年10月11日',
        deliverer: '测试',
        deliveryFactory: '测试',
        batchNumber: '测试',
        testItems: '测试',
        urgentComment: '测试',
        type: '测试',
        h: '1',
        status: 2
    })
}
class ProductInspection extends React.Component {
    url;
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return ;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: data,
        };
        this.modifyDataSource=this.modifyDataSource.bind(this);
        this.fetch=this.fetch.bind(this);
        this.searchContentChange = this.searchContentChange.bind(this);
        this.searchEvent = this.searchEvent.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.returnDataEntry = this.returnDataEntry.bind(this);
        this.pagination = {
            total: this.state.dataSource.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                // console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                // console.log('Current: ', current);
            }
        };
    }
    render() {
        this.url = JSON.parse(localStorage.getItem('url'));
        const current = JSON.parse(localStorage.getItem('current')) ;
        return(
            <div>
                <BlockQuote name="成品检验" menu={current.menuParent} menu2='返回' returnDataEntry={this.returnDataEntry} flag={1}></BlockQuote>
                <div style={{padding:'15px'}}>
                    <SearchCell
                        name='请输入搜索内容'
                        searchEvent={this.searchEvent}
                        searchContentChange={this.searchContentChange}
                        fetch={this.fetch}
                    />
                    <div className='clear' ></div>
                    <ProductTable
                        data={this.state.dataSource}
                        // rowSelection={rowSelection}
                        pagination={this.pagination}
                        fetch={this.fetch}
                        modifyDataSource={this.modifyDataSource}
                        handleTableChange={this.handleTableChange}
                    />
                </div>
            </div>
        )
    }
    /**返回数据录入页面 */
    returnDataEntry(){
        this.props.history.push({pathname:'/dataEntry'});
    }
    /**实现修改state功能 */
    modifyDataSource = (data) => {
        this.setState({dataSource:data});
    };
    /**---------------------- */
    /**获取所有数据功能 */
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
}

export default ProductInspection;