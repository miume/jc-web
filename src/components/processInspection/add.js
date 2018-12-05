import React from 'react';
import {Button,Modal,} from 'antd';
import NewButton from '../BlockQuote/newButton';
import CancleButton from '../BlockQuote/cancleButton';
import WhiteSpace from '../BlockQuote/whiteSpace';
import './editor.css';
import Tr from './tr';
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
    render() {
        return (
            <span>
                <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />
                <Modal title="新增" visible={this.state.visible}
                    onCancel={this.handleCancel} width='1200px'
                    footer={[
                        <CancleButton key='back' handleCancel={this.handleCancel}/>,
                        <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
                    ]}>
                    <div style={{height:'400px'}}>
                    <p className='fr'>已录入{this.state.count}条数据</p>
                         <table style={{width:'100%'}}>
                             <thead className='thead'>
                                 <tr>
                                     <td>产品线</td>
                                     <td>工序</td>
                                     <td>样品检测点</td>
                                     <td>测试项目</td><td>测试频率</td>
                                     <td>采样人</td><td>检测人</td>
                                     <td>状态</td><td>备注</td><td>删除</td>
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
        );
    }
}
export default Add;