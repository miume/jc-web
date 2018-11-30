import React from 'react';
import { Button, Popconfirm } from 'antd';


class DeleteByIds extends React.Component {
    render() {
        return (
            <span>
                <Popconfirm placement="rightBottom" title="确定要删除所选择的数据吗?" loading={this.props.loading} onConfirm={this.props.start} onCancel={this.props.cancel} okText="确定" cancelText="取消">
                    <Button type="primary" size="small" disabled={!this.props.selectedRowKeys.length>0}>删除</Button>
                </Popconfirm>
            </span>
        );
    }
}
export default DeleteByIds;