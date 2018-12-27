import React from 'react';
import {withRouter} from 'react-router-dom';
class TodoPart extends React.Component{
    render(){
        const dataType=JSON.parse(localStorage.getItem('dataType'));
        const data = this.props.data;
        return (
            <div className='drawer-part'>
                <p className='drawer-date'>{dataType?dataType[data.dataType.toString()]+'  '+data.batchNumber:''}</p>
                <p className='drawer-data'>{this.props.contents}</p>
                <div className='drawer-flex'>
                    <div className={data.isUrgent?'drawer-flex11':'drawer-flex1'}>{data.isUrgent?'紧急':'正常'}</div>
                    <div className='drawer-flex2'>{data?data.createTime:''}</div>
                    <div className='drawer-flex3' onClick={this.props.gotodolist}>前往 <i className='fa fa-angle-right'></i></div>
                </div>
            </div>
        )
    }
}
export default withRouter(TodoPart);