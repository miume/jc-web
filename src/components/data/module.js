import React from 'react';
import {Table} from 'antd';
import SearchCell from '../BlockQuote/search';
import BlockQuote from '../BlockQuote/blockquote';
import DeleteByIds from '../BlockQuote/deleteByIds';
class Module extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props;
    }
    render(){
        return (
            <div>
                <BlockQuote ></BlockQuote>
                
                <DeleteByIds
                    selectedRowKeys={[1,2]}
                    // deleteByIds={this.deleteByIds}
                    // cancel={this.cancel} flag={this.judgeOperation(this.operation,'DELETE')}
                    />
                <SearchCell name='请输入物料名称' type={this.props.index} fetch={this.props.fetch}></SearchCell>
                <Table rowKey={record=>record.id} dataSource={this.props.data} columns={this.props.columns}  pagination={false} scroll={{ y: 398 }} bordered size='small'></Table>
            </div>
        )
    }
}
export default Module;