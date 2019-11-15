import React from 'react';
import axios from 'axios';
import {Modal, Table, message, Divider, Input} from 'antd';
import CancleButton from '../../../BlockQuote/cancleButton';
import SaveButton from '../../../BlockQuote/saveButton';
import Submit from '../../../BlockQuote/submit';

// const data1 = [],isQualified = [];
// for(let i = 1; i <=20; i++){
//     isQualified.push('');
//     data1.push({
//         index: i,
//         id: i,
//         name:`Ca${i}`,
//         testResult:'',
//         unit:'g/ml',
//         value: `>${i}`,
//         isValid: ''
//     })
// }
const GREATER_OR_EQUAL_TO = '≥', GREATER = '>',
    LESS_THAN_OR_EQUAL_TO = '≤', LESS_THAN = '<',
    BETWEEN = '~',RANGE = '±';

class RecordChecking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            detail: [],
            topData:{},
            visible1:false,  //用来控制送审弹出框
            process:-1,      //审核流程
            urgent:0,         //紧急 1 正常 0
            isQualified: '',
            isQualifiedArr: []
        };
        this.save = this.save.bind(this);
        this.headData = this.headData.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.checkData = this.checkData.bind(this);
        this.getFooter = this.getFooter.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getEditorData = this.getEditorData.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.recordChecking = this.recordChecking.bind(this);
        this.checkIfQualified = this.checkIfQualified.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.columns = [{
            title:'序号',
            dataIndex:'index',
            key:'index',
            width:'10%'
        },{
            title:'检测项目',
            dataIndex:'name',
            key:'name',
            width:'20%'
        },{
            title:'检测结果',
            dataIndex:'testItemResultRecord.testResult',
            key:'testItemResultRecord.testResult',
            width:'20%',
            render:(text,record)=>{
                return <Input id={record.id} name={record.index} placeholder='请输入' defaultValue={text}
                              style={{width:'100%',height:'30px',border:'none'}} onChange={this.save} className='stock-out-input' />
            }
        },{
            title:'标准',
            dataIndex:'value',
            key:'value',
            width:'20%'
        },{
            title:'计量单位',
            dataIndex:'unit',
            key:'unit',
            width:'17%'
        },{
            title:'状态',
            dataIndex:'testItemResultRecord.isValid',
            key:'testItemResultRecord.isValid',
            width:'13%',
            render: (text) => {
                if(text === 0) {
                    return <span style={{color: 'red'}}>不合格</span>
                }
                if(text === 1) {
                    return <span style={{color: 'green'}}>合格</span>
                }
                return '';
            }
        }]
    }
    /**点击录检 弹出框显示 */
    handleClick(){
        this.getEditorData();
        this.setState({
            visible:true
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
            let topData = {};
            if(res) {
                let isQualified = res.testReportRecord ? res.testReportRecord.isQualified:0 ,isQualifiedArr = [];
                topData={
                    batchNumber: res.serialNumber?res.serialNumber:'',
                    materialName: res.materialName?res.materialName:'',
                    b:res.sampleDeliveringRecord?res.sampleDeliveringRecord.sampleDeliveringDate:''
                };
                if(res.testDTOS) {
                    for(let i = 0; i < res.testDTOS.length; i++) {
                        res.testDTOS[i]['index'] = i + 1;
                        isQualifiedArr.push(res.testDTOS[i].testItemResultRecord.isValid)
                        // let e = res.testDTOS[i];
                        //     details.push({
                        //         index:`${i+1}`,
                        //         id:e.testItemResultRecord.id,
                        //         testItemId:e.testItemResultRecord.testItemId,
                        //         name:e.name,
                        //         testResult:e.testItemResultRecord.testResult?e.testItemResultRecord.testResult:'',
                        //         unit:e.unit,
                        //         value: e.value,
                        //         isValid: e.testItemResultRecord.isValid //用来表示合格与不合格（默认为不合格）
                        //     })
                    }
                }
                this.setState({
                    detail: res.testDTOS,
                    topData: topData,
                    isQualified: isQualified,
                    isQualifiedArr: isQualifiedArr
                })
            }
        })
    }

    /**点击取消按钮 要将input框的内容置空*/
    handleCancel(){
        this.setState({
            visible:false
        });
    }
    /**input框内容变化，实现自动保存数据 */
    save(e){
        let target = e.target, value = target.value, index = e.target.name - 1,
            {detail,isQualifiedArr} = this.state, standard = detail[index]['value'], isValid = '';
        if(typeof e.target.value === 'number') value = value.toString();
        value = value.replace(/[^\d\.]/g, "");
        detail[index]['testItemResultRecord']['testResult'] = value;
        if(standard) {
            let flag = this.checkIfQualified(value,standard);
            isValid = flag ? '合格' : '不合格';
        }
        if(!value) {
            isValid = '';
        }
        detail[index]['isValid'] = isValid
        isQualifiedArr[index] = isValid;
        this.setState({
            detail: detail,
            isQualifiedArr: isQualifiedArr
        })
    }

    /**检验是否合格
     * value是否符合标准
     * */
    checkIfQualified(value,standard) {
        value = parseFloat(value);
        if(standard) {
            if(standard[0] === GREATER_OR_EQUAL_TO) {         //大于等于
                return value >= parseFloat(standard.slice(1));
            } else if(standard[0] === GREATER) {
                return value > parseFloat(standard.slice(1)); //大于
            } else if(standard[0] === LESS_THAN_OR_EQUAL_TO) {
                return value <= parseFloat(standard.slice(1));//小于等于
            } else if(standard[0] === LESS_THAN) {
                return value < parseFloat(standard.slice(1)); //小于
            } else if(standard.indexOf(RANGE) > -1) {         //a ± b
                let index = value.indexOf(RANGE), lowerLimit = parseFloat(standard.slice(0,index)), upperLimit = parseFloat(standard.slice(index + 1));
                return value >= (lowerLimit - upperLimit) && value <= (lowerLimit + upperLimit);
            } else {                                          //a~b
                let index = value.indexOf(BETWEEN), lowerLimit = parseFloat(standard.slice(0,index)), upperLimit = parseFloat(standard.slice(index + 1));
                return value >= lowerLimit && value <= upperLimit;
            }
        }
    }

    /**监控申请送审弹出框的visible */
    handleVisibleChange(visible){
        this.setState({
            visible1:visible
        })
    }
    /**监听select变化事件 */
    selectChange(value){
        this.setState({
            process:value
        })
    }
    /**监控是否紧急 */
    urgentChange(checked){
        this.setState({
            urgent:checked?1:0
        })
    }
    /**点击取消送审 */
    handleCancelApply(){
        this.setState({
            visible1:false,
        })
    }
    /**点击确定送审 */
    handleOkApply(){
        this.checkData(1);
   }
    /**点击保存按钮 */
    handleSave(){
        this.checkData(0);
    }

    /**检查保存数据*/
    checkData(status){
        let {detail,isQualified} = this.state;
        if(detail){
            let count = 0;
            for(let i = 0; i < detail.length; i++) {
                let e = detail[i]['testItemResultRecord'];
                if(e.isAudit === 0) {
                    isQualified = 0;
                }

                if(!e.testResult){
                    count++
                }
            }
            if(count === detail.length){
                message.info('必须录入一个检测结果！');
                return
            }
        }
        console.log(detail)
        //this.applyOut(status,testDTOS,isQualified);
    }
    /**保存 */
    applyOut(status,testDTOS,isQualified){
        const judger = JSON.parse(localStorage.getItem('menuList')).userId;
        axios.put(`${this.props.url.rawTestReport.rawTestReport}`,{
            testDTOS:testDTOS,
            sampleDeliveringRecord:{
                id:this.props.value
            },
            testReportRecord:{
                isQualified:isQualified,
                judger:judger
            },
        },{
            headers:{
                'Authorization':this.props.url.Authorization
            },
        }).then((data)=>{
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId);
            }else{
                message.info(data.data.message);
                this.props.tableRecord(this.props.value);
            }
        }).catch(()=>{
            message.info('保存失败，请联系管理员！')
        })
        this.setState({
            visible:false,
            visible1:false
        })
    }
    /**送审 */
    applyReview(dataId){
        axios.post(`${this.props.url.toDoList}/${parseInt(this.state.process)}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:this.state.urgent
            }
        }).then((data)=>{
            message.info(data.data.message);
            // this.props.fetch();
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }

    /**点击录检按钮 */
    recordChecking(){
        this.setState({
            visible:false
        })
    }
    /**数据太长，对数据进行处理
     * flag===1 表示对日期进行处理
     * 否则 对编号进行处理
    */
    headData(text,flag){
        if(text!==undefined){
            if(flag) return <span className='text-decoration' title={text}>{text.substring(0,10)} </span>;
            else {
                let te = text.split('-');
                return <span className='text-decoration' title={text}>{te[0]+'-'+te[1]+'-'+te[2]+'-'+te[3]}</span>;
            }
        }
    }

    /**修改和录检见面 footer不一样*/
    getFooter() {
        let title = this.props.title;
        if(title === '修改') {
            return [
                <CancleButton key='back' handleCancel={this.handleCancel}/>,
                <SaveButton key='save' handleSave={this.handleSave} />
            ]
        } else {
            return (
                [
                    <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    <SaveButton key='save' handleSave={this.handleSave} />,
                    <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange}
                            selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url}
                            process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}/>
                ]
            )
        }
    }
    render(){
        return (
            <span className={this.props.flag?'':'hide'}>
                <Divider type='vertical' />
                <span className={this.props.status===-1||this.props.status===3||this.props.status===12?'blue':'notClick'} onClick={this.handleClick}>{this.props.title}</span>
                <Modal title={this.props.title} visible={this.state.visible} style={{top:20}} closable={false}
                       maskClosable={false} centered={true}
                       footer={this.getFooter()}
                >
                <div style={{height:'500px'}}>
                    <div className="interDrSpanModalTop">
                        <table>
                            <thead>
                            <tr>
                                <th>物料编码</th>
                                <th>原材料</th>
                                <th>送样日期</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{this.state.topData?this.headData(this.state.topData.batchNumber):''}</td>
                                <td>{this.state.topData?this.state.topData.materialName:''}</td>
                                <td>{this.state.topData?this.headData(this.state.topData.b,1):''}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="interDrSpanModalMiddle">
                           <div>
                               样品名称：<span>{this.state.topData&&this.state.topData.materialName?this.state.topData.materialName+'样品':''}</span>
                           </div>
                    </div>
                    <div style={{height:'400px'}}>
                        <Table className='stock-out' rowKey={record=>record.testItemResultRecord.id} columns={this.columns} dataSource={this.state.detail}
                               pagination={false} size='small' bordered scroll={{y:345}} />
                    </div>
                </div>
                </Modal>
            </span>
        );
    }
}
export default RecordChecking;
