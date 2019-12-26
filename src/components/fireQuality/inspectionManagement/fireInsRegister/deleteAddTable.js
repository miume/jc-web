import React, {Component} from 'react'
import {Icon} from 'antd'


class DeleteAddTable extends Component {
    constructor(props) {
        super(props)
        this.getDetail = this.getDetail.bind(this);
    }

    render() {
        return (
            <span>
                <span className={'blue'} onClick={this.getDetail}><Icon style={{fontSize:"20px",color:"red"}} type="close" /></span>
            </span>
        )
    }

    getDetail = () => {
        this.props.deleteTableData(this.props.record.col1)

    }
}

export default DeleteAddTable