import React from 'react';
import {Button,Popconfirm} from 'antd';
class DeleteByIds extends React.Component {
    render() {
        // console.log(this.props.selectedRowKeys.length>0)
        return (
            <span>
             <Popconfirm placement="rightBottom" title="确定要删除所选择的数据吗?" onConfirm={this.props.deleteByIds} onCancel={this.props.cancel} okText="确定" cancelText="取消">
             <Button type="primary" disabled={!this.props.selectedRowKeys.length>0} className={this.props.selectedRowKeys&&this.props.selectedRowKeys.length>0?'blue':'grey'}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;删除</Button>
            </Popconfirm>
            </span>
        );
    }
}
export default DeleteByIds;