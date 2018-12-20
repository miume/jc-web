import React from 'react';
import axios from 'axios';
import {Modal,Table, Input} from 'antd';
import CancleButton from '../BlockQuote/cancleButton';
import SaveButton from '../BlockQuote/saveButton';
import CheckModal from '../BlockQuote/checkModal';
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
            dataSource:data,
            detail:[],
            topData:{}
        }
        this.save = this.save.bind(this);
        this.failed = this.failed.bind(this);
        this.qualified = this.qualified.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getEditorData = this.getEditorData.bind(this);
        this.recordChecking = this.recordChecking.bind(this);
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
                //<Input id={record.id} name='outQuantity' style={{border:'none',width:'100%',height:'30px'}} placeholder='请输入出库数量' onChange={this.save} />
                return <Input id={record.id} name='result' placeholder='请输入检测结果' style={{width:'100%',height:'30px',border:'none'}} onChange={this.save} />
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
        this.getEditorData();
        this.setState({
            visible:true,
            flag:0,       //1 表示合格 0 表示正常
            fail:0        //1表示不合格 0 表示正常
        })  
    }
    /**通过id获取数据 */
    getEditorData(){
        axios.get(`${this.props.url.rawTestReport.getById}?id=${this.props.value}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            var details  = [];
            var topData = {};
            if(res)
                // IsQualified = res.testReportRecord?res.testReportRecord.IsQualified:0;
                topData={
                    batchNumber: res.serialNumber?res.serialNumber:'',
                    materialName: res.materialName?res.materialName:'',
                    b:res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                if(res.testDTOS){
                    for(var i = 0; i < res.testDTOS.length; i++){
                        var e = res.testDTOS[i];
                            details.push({
                                index:`${i+1}`,
                                id:e.testItemResultRecord.id,
                                testItemId:e.testItemResultRecord.testItemId,
                                testItemName:e.name,
                                testResult:e.testItemResultRecord.testResult,
                                unit:'g/ml'
                            })
                    }   
                }
                this.setState({
                    detail:details,
                    topData:topData
                })
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
    /**点击合格 */
    qualified(){
        console.log(1)
        this.setState({
            flag:1,
            fail:0
        })
    }
    /**点击不合格 */
    failed(){
        this.setState({
            flag:0,
            fail:1
        })
    }
    render(){
        return (
            <span>
                <span className='blue' onClick={this.handleClick}>录检</span>
                <Modal title='数据录检' visible={this.state.visible} style={{top:20}} closable={false}
                maskClosable={false} centered={true}
                footer={[
                    <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    <SaveButton key='save' handleSave={this.handleSave} />,
                    <Submit key='submit' data = {this.state.dataSource} url={this.props.url} />                       
                ]}>
                <div style={{height:'500px'}}>
                <div className="interDrSpanModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>批号</th>
                            <th>原材料</th>
                            <th>送样日期</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.topData?this.state.topData.batchNumber:''}</td>
                            <td>{this.state.topData?this.state.topData.materialName:''}</td>
                            <td>{this.state.topData?this.state.topData.b:''}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="interDrSpanModalMiddle">
                       <div>
                           样品名称：<span>{this.state.topData?this.state.topData.materialName+'样品':''}</span>
                       </div>
                </div>
                
                <div style={{height:'350px'}}>
                    <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.dataSource} pagination={false} size='small' bordered scroll={{y:216}}></Table>
                </div>
                <CheckModal qualifiedType={this.state.flag} qualified={this.qualified} failed={this.failed}/>
                {/* <div style={{padding:'20px',height:'80px',fontSize:'15px'}}>
                    <CheckQualifiedModal />
                </div> */}
                </div>
                </Modal>
            </span>
        );
    }
}
export default RecordChecking;