import React from 'react';
import {Modal,Button,Input,Table,Select} from 'antd';
import WhiteSpace from '../BlockQuote/whiteSpace';
import Tr from './tr'

class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            count : 1,
            dataSource:[],
            data:[1]
        }
        this.handleDetail = this.handleDetail.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    /**处理一条编辑记录 */
    handleDetail() {
        console.log(this.props.value)
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
    /**编辑中新增按钮 */
    addData() {
        const {count,data} = this.state;
        this.setState({
            count: count+1,
            data: [...data, count+1],
        })
        console.log(this.state)
    }
    deleteRow(value){
        // const value = event.target.value;
        // console.log(value)
        const {count,data} = this.state;
        this.setState({
            count: count-1,
            data: data.filter(d => d.toString()!==value)
        })
        // console.log(this.state.data)
    }
    render(){
        return(
            <span>
                <a onClick={this.handleDetail} >编辑</a>
                <Modal title='编辑' visible={this.state.visible}
                    onCancel={this.handleCancel} width='1000px'
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.handleOk}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
                    ]}>
                    <div style={{height:'400px'}}>
                         <div>
                             <Input value={this.props.value.name} style={{width:200}}/>
                             <WhiteSpace />
                             <Input value={"xxx的工艺"} style={{width:200}}/>
                             <WhiteSpace />
                             <Input value={this.props.value.type} style={{width:200}}/>
                         </div>
                         <WhiteSpace />
                         <div>
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
                         </div>
                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
                    </div>
                >

                </Modal>
            </span>
        );
    }
}

export default Editor