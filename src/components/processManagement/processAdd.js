import React from 'react';
import {Button,Modal,Select,Input,Table,Popconfirm} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import Tr from './tr';

const Option = Select.Option;

class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            count: 1,
            data : [1]
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    /**处理新增一条记录 */
    handleAdd = () => {
        this.setState({
          visible: true
        });
      }
    handleOk() {
        this.setState({
        visible: false
        });
    }
    handleCancel() {
        this.setState({
        visible: false
        });
    }
    /**新增一条数据 */
 
    addData() {
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
        console.log(this.state)
    }
    /**删除一条数据 */
    deleteRow(value){
        const {count,data} = this.state;
        this.setState({
            count:count-1,
            data:data.filter(d=>d.toString()!==value)
        })
    }
    render(){
        return(
            <span>
                <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={this.handleAdd} >新增</Button>
                <Modal title="新增" visible={this.state.visible}
                    onCancel={this.handleCancel}  width='1200px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                    <table style={{width:'100%'}}>
                        <thead className='thead'>
                            <tr>
                                <td>负责人</td>
                                <td>职责</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.data.map((m) => { return <Tr key={m.toString()} deleteRow={this.deleteRow} value={m.toString()}></Tr> })
                        }
                        </tbody>
                    </table>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
                    </div>
                </Modal>
            </span>
        )
    }
}

export default Add