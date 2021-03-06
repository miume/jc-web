import React from 'react';
import {Select,Input,Popover,Button,Checkbox,Col, Divider} from 'antd';
import './editor.css';
class Tr1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            hovered: false,
            testItems: ''          //存取检测项目
        }
        this.hide = this.hide.bind(this);
        this.judgeText = this.judgeText.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.productLineChange = this.productLineChange.bind(this);
        this.productionProcessChange = this.productionProcessChange.bind(this);
        this.samplePointName = this.samplePointName.bind(this);
        this.sampler = this.sampler.bind(this);
        this.tester = this.tester.bind(this);
        this.testFrequency = this.testFrequency.bind(this);
        this.serialNumberId = this.serialNumberId.bind(this);
        this.comment = this.comment.bind(this);
        this.getTrData = this.getTrData.bind(this);
        this.testItemsProcessing = this.testItemsProcessing.bind(this);
    }
    hide(){
        this.setState({
            clicked:false
        })
    }
    handleClickChange(visible){
        this.setState({clicked:visible})
    }
    /**下拉面板checkbox的变化 */
    onChange(checkedValues){
        const {detail} = this.props;
        const {allTestItem} = this.props;
        var testItems = '';
        /**将受检物料的id数组转化为name数组 */
        for(var j = 0; j < checkedValues.length; j++){
            //根据物料id删选出对应的一个数据，然后取name属性
            var name = allTestItem.filter(e=>e.id===checkedValues[j])[0].name;
            if(j < checkedValues.length-1)
                testItems += name + ',';
            else{
                testItems += name
            }
        }
        var testItem = testItems.split(',');
        /**如果检测项目超过两个，则只显示两个检测项目，其他的隐藏 */
        const length = testItem.length;
        if(length>4){
            testItems = testItem[0]+','+testItem[1]+','+testItem[2]+','+testItem[3]+'...';
        }
        detail.testItemIds = checkedValues;
        detail.detail.testItems = testItems;
        this.props.getData(detail)
        this.setState({
            testItems:testItems
        })
    }
    /**监控产品线下拉框的变化 */
    productLineChange(value){
        const {detail} = this.props;
        const {allProductLine} = this.props;
        detail.procedureTestRecord.deliveryFactoryId = value;
        detail.detail.deliveryFactory = allProductLine.filter(e=>e.props.value===value)[0].props.children;
        this.props.getData(detail)
    }
    /**监控工序下拉框的变化 */
    productionProcessChange(value){
        const {detail} = this.props;
        const {allProductionProcess} = this.props;
        detail.procedureTestRecord.procedureId = value;
        detail.detail.productionProcess = allProductionProcess.filter(e=>e.props.value===value)[0].props.children;
        this.props.getData(detail)
    }
    /**监控取样点输入框的变化 */
    samplePointName(e){
        const value = e.target.value;
        const {detail} = this.props;
        detail.procedureTestRecord.samplePointName = value;
        this.props.getData(detail)
    }
    /**监控下拉框取样人的变化 */
    sampler(value){
        const {detail} = this.props;
        const {allUser} = this.props;
        detail.procedureTestRecord.sampler = value;
        detail.detail.sampler = allUser.filter(e=>e.props.value===value)[0].props.children;
        this.props.getData(detail)
    }
    /**监控检测人下拉框的变化 */
    tester(value){
        const {detail} = this.props;
        const {allUser} = this.props;
        detail.procedureTestRecord.tester = value;
        detail.detail.tester = allUser.filter(e=>e.props.value===value)[0].props.children;
        this.props.getData(detail)
    }
    /**监控频次的变化 */
    testFrequency(e){
        const value = e.target.value;
        const {detail} = this.props;
        detail.procedureTestRecord.testFrequency = value;
        this.props.getData(detail)
    }
    /**监控受检物料下拉框的变化 */
    serialNumberId(value){
        const {detail} = this.props;
        const {allTestMaterial} = this.props;
        detail.procedureTestRecord.serialNumberId = value;
        detail.detail.testMaterialName = allTestMaterial.filter(e=>e.props.value===value)[0].props.children;
        this.props.getData(detail)
    }
    /**监控备注的变化 */
    comment(e){
        const value = e.target.value;
        const {detail} = this.props;
        detail.procedureTestRecord.comment = value;
        this.props.getData(detail)
        // this.setState({
        //     detail:detail
        // })
    }
    /**实时监控每行数据的变化 若是编辑或者详情迭代 则先保存已知数据*/
    getTrData(){
        var {detail} = this.props;
        this.props.getData(detail)
    }
    /**处理检测项目数量过多 */
    testItemsProcessing(text){
        if(text){
            const items = text.split(',');
            var testItems = '';
            if(items.length>2){
                testItems = items[0]+','+items[1]+'...';
                return <span className='text-decoration' title={text}>{testItems.length > 10 ? items[0]+'...' : testItems }</span>;
            }else{
            testItems = text;
            return text;
            }
        }
    }
    //判断长度
   judgeText(text){
    if(text&&text.length>8){
        return <span className='text-decoration' title={text}>{text.substring(0,8)}</span>
    }else{
        return text
    }
   }
    render() {
        const details = this.props.detail;
        const detail = details.detail?details.detail:{};
        const d = details.procedureTestRecord?details.procedureTestRecord:{};
        const testItemIds = details.testItemIds;
        // const testItems = detail.testItems;
        // const allTestItem = this.props.allTestItem?this.props.allTestItem:[];
        /**mode===1表示不可编辑显示行
         * mode====2表示编辑时的可编辑行
         * mode===3表示新增时新增一行
         */
        switch(this.props.mode){
            case 1 : return (
                        <tr id={this.props.id} className='detail-text'>
                            <td>{detail.deliveryFactory}</td>
                            <td>{detail.productionProcess}</td>
                            <td>{this.judgeText(d.samplePointName)}</td>
                            <td>{detail.sampler}</td>
                            <td>{detail.tester}</td>
                            <td>{this.testItemsProcessing(detail.testItems)}</td>
                            <td>{this.judgeText(d.testFrequency)}</td>
                            <td>{this.judgeText(detail.testMaterialName)}</td>
                            <td>{this.judgeText(d.comment)}</td>
                            <td>
                                <span className='blue' onClick={()=>this.props.editorRow(this.props.id)} value={this.props.value}>编辑</span>
                                <Divider type='vertical' />
                                <span className='blue' onClick={()=>this.props.deleteRow(this.props.id)} value={this.props.value}>删除</span>
                            </td>
                        </tr>
                       );
            case 2 :
            return (
                <tr id={this.props.id}>
                    <td><Select style={{width:'100%'}} placeholder='请选择产品线' onChange={this.productLineChange} defaultValue={d.deliveryFactoryId===''?undefined:d.deliveryFactoryId}>{this.props.allProductLine}</Select></td>
                    <td><Select style={{width:'100%'}} placeholder='请选择工序' onChange={this.productionProcessChange} defaultValue={d.procedureId===''?undefined:d.procedureId}>{this.props.allProductionProcess}</Select></td>
                    <td><Input style={{width:'100%'}} placeholder='请输入取样点' style={{border:'none',textAlign:'left'}} onChange={this.samplePointName} defaultValue={d.samplePointName?d.samplePointName:''}/></td>
                    <td><Select style={{width:'100%'}} placeholder='请选择取样人' onChange={this.sampler} defaultValue={d.sampler===''?undefined:d.sampler}>{this.props.allUser}</Select></td>
                    <td><Select style={{width:'100%'}} placeholder='请选择检测人' onChange={this.tester} defaultValue={d.tester===''?undefined:d.tester}>{this.props.allUser}</Select></td>
                    <td><Popover
                        content={(
                            <div style={{ width : '350px',height : '150px',overflow:'auto' }} >
                             <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} defaultValue={testItemIds}>
                             {
                                this.props.allTestItem?this.props.allTestItem.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>):''
                             }
                            </Checkbox.Group>
                            </div>
                        )}
                        title="检测项目"
                        trigger="click"
                        width={170}
                        height={170}
                        visible={this.state.clicked}
                        onVisibleChange={this.handleClickChange}>
                        {
                            detail.testItems?<Button>{this.testItemsProcessing(detail.testItems)}</Button>:<Button className='PI-popover-placeholder'>请选择检测项目</Button>
                        }
                        </Popover></td>

                    <td><Input placeholder='请输入频次' style={{border:'none',textAlign:'left',width:'100%'}} onChange={this.testFrequency} defaultValue={d.testFrequency?d.testFrequency:''}/></td>
                    <td><Select style={{width:'100%',border:'none'}} placeholder='受检物料' onChange={this.serialNumberId} defaultValue={d.serialNumberId===''?undefined:d.serialNumberId}>{this.props.allTestMaterial}</Select></td>
                    <td><Input placeholder='请输入备注' style={{border:'none',textAlign:'left',width:'100%'}} onChange={this.comment} defaultValue={d.comment?d.comment:''}/></td>
                    <td>
                        <span className='blue' onClick={()=>this.props.editorRow(this.props.id)} value={this.props.value}>编辑</span>
                        <Divider type='vertical' />
                        <span className='blue' onClick={()=>this.props.deleteRow(this.props.id)} value={this.props.value}>删除</span>
                    </td>
                </tr>)
        default : return (
                    <tr id={this.props.id}>
                        <td><Select style={{width:'100%'}} placeholder='请选择产品线' onChange={this.productLineChange}>{this.props.allProductLine}</Select></td>
                        <td><Select style={{width:'100%'}} placeholder='请选择工序' onChange={this.productionProcessChange}>{this.props.allProductionProcess}</Select></td>
                        <td><Input style={{width:'100%'}} placeholder='请输入取样点' style={{border:'none',textAlign:'left'}} onChange={this.samplePointName} /></td>
                        <td><Select style={{width:'100%'}} placeholder='请选择取样人' onChange={this.sampler}>{this.props.allUser}</Select></td>
                        <td><Select style={{width:'100%'}} placeholder='请选择检测人' onChange={this.tester}>{this.props.allUser}</Select></td>
                        <td><Popover
                            content={(
                                <div style={{ width : '350px',height : '150px',overflow:'auto' }} >
                                <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange} >
                                {
                                    this.props.allTestItem?this.props.allTestItem.map(p=> <Col key={p.id} span={8}><Checkbox value={p.id}>{p.name}</Checkbox></Col>):''
                                }
                                </Checkbox.Group>
                                </div>
                            )}
                            title="检测项目"
                            trigger="click"
                            width={170}
                            height={170}
                            visible={this.state.clicked}
                            onVisibleChange={this.handleClickChange}>
                            {
                                detail.testItems?<Button>{this.testItemsProcessing(detail.testItems)}</Button>:<Button className='PI-popover-placeholder'>请选择检测项目</Button>
                            }
                            </Popover></td>

                        <td><Input placeholder='请输入频次' style={{border:'none',textAlign:'left',width:'100%'}} onChange={this.testFrequency} /></td>
                        <td><Select style={{width:'100%',border:'none'}} placeholder='受检物料' onChange={this.serialNumberId}>{this.props.allTestMaterial}</Select></td>
                        <td><Input placeholder='请输入备注' style={{border:'none',textAlign:'left',width:'100%'}} onChange={this.comment}/></td>
                        <td>
                            <span className='blue' onClick={()=>this.props.editorRow(this.props.id)} value={this.props.value}>编辑</span>
                            <Divider type='vertical' />
                            <span className='blue' onClick={()=>this.props.deleteRow(this.props.id)} value={this.props.value}>删除</span>
                        </td>
                    </tr>)
        }
    }
}
export default Tr1;
