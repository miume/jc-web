import React from 'react';
import {Popconfirm} from "antd";

class DeletaSpan extends React.Component {
    render() {
        return (
            <span>
                <Popconfirm
                    title="确认删除?"
                    onConfirm={() => this.props.handleDelete(this.props.record.id)}
                    okText="确定" cancelText="取消" >
                    <a
                        href="#"
                    >删除</a>
                </Popconfirm>
            </span>
        )
    }
    handleDelete = (key) => {
        console.log("++++++")
        console.log(key);
        // const dataSource = this.state.dataSource;
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
}

export default DeletaSpan;
