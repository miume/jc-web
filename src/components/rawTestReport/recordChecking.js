import React from 'react';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import CheckQualifiedModal from '../BlockQuote/checkQualifiedModal';
import {Modal,Table, Input} from 'antd';
import Submit from '../BlockQuote/submit';
const data = [];
for(var i = 1; i <=10; i++){
    data.push({
        id:i,
        testItem:`Ca${i}`,
        result:'',
        unit:'g/ml'
    })
}
class RecordChecking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            dataSource:data
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.recordChecking = this.recordChecking.bind(this);
        this.save = this.save.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
            align:'center',
            width:'10%'
        },{
            title:'检测项目',
            dataIndex:'testItem',
            key:'testItem',
            align:'center',
            width:'20%'
        },{
            title:'检测结果',
            dataIndex:'result',
            key:'result',
            align:'center',
            width:'40%',
            render:(text,record)=>{
                return <Input id={record.id} name='result' placeholder='请输入检测结果' style={{width:'100%',height:'35px'}} onChange={this.save} />
            }
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            align:'center',
            width:'30%'
        },]
    }
    /**点击录检 弹出框显示 */
    handleClick(){
        this.setState({
            visible:true
        })  
    }
    /**点击取消按钮 */
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    /**点击保存按钮 */
    handleSave(){
        this.setState({
            visible:false
        })
    }
    /**点击录检按钮 */
    recordChecking(){
        this.setState({
            visible:false
        })
    }
    /**input框内容变化，实现自动保存数据 */
    save(e){
        const value = e.target.value;
        const name = e.target.name;
        const id = e.target.id
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item=> parseInt(id) === parseInt(item.id));
        newData[index][name] = value;
        this.setState({
            dataSource:newData
        })
    }
    render(){
        const value = this.props.value;
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>录检</span>
                <Modal title='数据录检' visible={this.state.visible} style={{top:20}} closable={false}
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    <SaveButton key='save' handleSave={this.handleSave} />,
                    <Submit key='submit' data = {this.state.dataSource}/>                       
                ]}>
                <div style={{height:'550px'}}>
                    <table>
                         <thead className='thead'>
                             <tr>
                                 <td>批号</td><td>原材料</td><td>送样日期</td>
                             </tr>
                         </thead>
                         <tbody className='tbody'>
                             <tr>
                                 <td>{value.factory}</td><td>{value.batchNumberId}</td><td>{value.date}</td>
                             </tr>
                         </tbody>
                     </table>
                     <div style={{padding:'10px'}}>
                         <span className='span'>样品名称：镍矿石样品</span>
                     </div>
                     <Table rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} pagination={false} size='small' bordered scroll={{y:330}}></Table>
                     <div style={{padding:'20px',height:'80px',fontSize:'15px'}}>
                         {/* <div style={{float:'left'}}>
                         <p className='span'>检验人：<span></span></p>
                             <p className='span'>检验时间：<span></span></p>
                         </div> */}
                         <CheckQualifiedModal />
                     </div>

                </div>
                </Modal>
            </span>
        );
    }
}
export default RecordChecking;