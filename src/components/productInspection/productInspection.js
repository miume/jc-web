import React from 'react';
import BlockQuote from "../BlockQuote/blockquote";
import SearchCell from "../BlockQuote/search";
import InterTable from "../intermediateProductTest/intermediateTable";

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
            h: '未发布',
            status: '不通过'
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
            h: '测试',
            status: '未申请'
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
        h: '未发布',
        status: '已通过'
    })
}
class ProductInspection extends React.Component {
    Authorization;
    server;
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
        this.Authorization = localStorage.getItem('Authorization');
        this.server = localStorage.getItem('remote');
        return(
            <div>
                <BlockQuote name="成品检验"  menu="质量与流程" menu2="数据录入"></BlockQuote>
                <div style={{padding:'15px'}}>
                    <span style={{float:'right',paddingBottom:'8px'}}>
                        <SearchCell
                            name='请输入搜索内容'
                            searchEvent={this.searchEvent}
                            searchContentChange={this.searchContentChange}
                            fetch={this.fetch}
                        />
                    </span>
                    <div className='clear' ></div>
                    <InterTable
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
}

export default ProductInspection;