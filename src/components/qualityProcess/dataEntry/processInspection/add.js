import React from 'react';
import axios from 'axios';
import {Modal,message,Select} from 'antd';
import Detail from './detail';
import ProcessTable from './table';
import Submit from '../../../BlockQuote/checkSubmit';
import NewButton from '../../../BlockQuote/newButton';
import SaveButton from '../../../BlockQuote/saveButton';
import CancleButton from '../../../BlockQuote/cancleButton';
const Option = Select.Option;
const rowData = {
    procedureTestRecord:{
        comment:'',
        procedureId:'',
        deliveryFactoryId:'',
        samplePointName:'',
        sampler:'',
        testFrequency:'',
        serialNumberId:'',
        tester:'',
    },
    detail:{
        deliveryFactory:'',
        productionProcess:'',
        sampler:'',
        tester:'',
        testItems:'',
        testMaterialName:'',
    },
    testItemIds:[]
}
class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:1,
            maxCount:1,
            visible : false,
            data : [],
            flag:this.props.flag,           //用来判断是迭代还是详情
         }
        this.judge = this.judge.bind(this);
        this.clearData = this.clearData.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.itemsToIds = this.itemsToIds.bind(this);
        this.detailDataProcessing = this.detailDataProcessing.bind(this);
        this.sucessProcessing = this.sucessProcessing.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.judgeFooter = this.judgeFooter.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
        this.getByBatchNumberId = this.getByBatchNumberId.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
        this.getAllProductLine = this.getAllProductLine.bind(this);
        this.editorRow = this.editorRow.bind(this);
        this.addData = this.addData.bind(this);
        this.getData = this.getData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.checkAddRowData = this.checkAddRowData.bind(this);
    }
    /**判断是新增 编辑 还是详情 */
    judge(flag,title){
        switch(flag){
            case 1 : return title?'详情':<span className='blue' onClick={this.handleAdd} >详情</span>
            case 2 : return title?'编辑':<span className={this.props.status===-1?'blue':'notClick'} onClick={this.props.status===-1?this.handleAdd:null} >编辑</span>
            default: return title?'新增标准':<NewButton handleClick={this.handleAdd} name='新增' className={this.props.addFlag?'fa fa-plus':'hide'} />;
        }
    }
    /**判断弹出框 footer 对应的按钮组合 只有status===2才可以迭代*/
    judgeFooter(flag,status){
        const detail = status===2?[
            <CancleButton key='back' handleCancel={this.handleCancel} flag={1} />,
            <NewButton key='submit' handleClick={this.handleIteration} name={'迭代'} className='fa fa-level-up'/>
           ]:
           [<CancleButton key='back' handleCancel={this.handleCancel} flag={1} />,
        ];
        const iteration = [
            <CancleButton key='back' handleCancel={this.handleCancel}/>,
            <SaveButton key='save' handleSave={this.handleSave} />,
            <Submit key='submit' url={this.props.url}  applySaveAndReview={this.applySaveAndReview}/>
        ]
        switch(flag){
            case 1 : return detail;
            case 2 : return iteration;
            default: return iteration;
        }
    }
    /**处理新增一条记录 flag存在表示编辑或详情 不存在表示新增 */
    handleAdd(){
        const {flag,value} = this.props;
        this.getAllTestItem();
        this.getAllProductLine();
        if(flag) this.getByBatchNumberId(value);
        else {
            var data = [{
                id:1,
                mode:3,
                detail:rowData.detail,
                testItemIds:rowData.testItemIds,
                procedureTestRecord:rowData.procedureTestRecord,
            }]
            this.setState({
                visible: true,
                data:data,
                maxCount:1,
                count:1
            });
        }
      }
    /**通过id查询详情 */
    getByBatchNumberId(value,flag){
        axios.get(`${this.props.url.procedure.procedureTestRecord}/${value}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const details = data.data.data? data.data.data.details:[];
            if(details.length>0){
               this.detailDataProcessing(details,flag);
            }
        })
     }
    /**对详情和编辑的数据进行处理 */
    detailDataProcessing(details,flag){
        var length = details.length;
        var data = [];
        for(var i = 0; i < details.length; i++){
            var e = details[i];
            // e.procedureTestRecord.testItems = e.testItemString;
            const items = e.testItemString.split(',');
            data.push({
                id:i+1,
                mode:1,
                procedureTestRecord:e.procedureTestRecord,
                detail:{
                    deliveryFactory:e.deliveryFactory?e.deliveryFactory.name:'',
                    productionProcess:e.productionProcess?e.productionProcess.name:'',
                    sampler:e.sampler?e.sampler:'',
                    tester:e.tester?e.tester:'',
                    testItems:e.testItemString,
                    testMaterialName:e.testMaterialName?e.testMaterialName:'',
                },
                testItemIds:this.itemsToIds(items)
            })
        }
        this.setState({
            visible:flag?false:true,
            data:data,
            count:length,
            maxCount:length,
        })
    }
    /**将查到的testItems字符串转换为id数组 */
    itemsToIds(items){
        var testItemIds = [];
        const {allTestItem} = this.state;
        if(allTestItem && allTestItem.length){
            for(var i = 0; i < allTestItem.length; i++){
                for(var j = 0; j < items.length; j++){
                    if(items[j] === allTestItem[i].name ){
                        testItemIds.push(allTestItem[i].id)
                    }
                }
            }
        }
        return testItemIds;
    }
     /**获取所有送样工厂 */
    getAllProductLine(){
        axios({
          url:`${this.props.url.deliveryFactory.deliveryFactory}`,
          method:'get',
          headers:{
            'Authorization':this.props.url.Authorization
          }
        }).then(data=>{
          const res = data.data.data;
          const children = res.map(e=>{
              return <Option key={e.id} value={e.id}>{e.name}</Option>
          })
          this.setState({
              allProductLine : children
          })
      })
    }
     /**获取所有检测项目 */
     getAllTestItem(){
        axios({
          url:`${this.props.url.testItems.testItems}`,
          method:'get',
          headers:{
            'Authorization':this.props.url.Authorization
          }
        }).then(data=>{
          const res = data.data.data;
          this.setState({
            allTestItem : res
        })
      })
      }
    /**点击迭代 */
    handleIteration(){
        this.setState({
          flag:2
      });
      }
    /** */
    handleOk() {
        this.setState({
            visible: false
        });
    }
    /**点击取消按钮 以及保存或送审确定按钮 */
    handleCancel() {
        /**新增的取消和编辑以及详情的取消有些许不一样 */
        if(this.props.flag){
            this.setState({
                visible: false,
                flag : this.props.flag
            });
        }
        else{
            this.setState({
                count:1,
                visible: false,
                data : [{id:1,mode:3}],
                maxCount:1,
            });
        }
    }
    /**点击保存 */
    handleSave(){
        this.dataProcessing(0);
    }
    /**对保存 送审数据进行判断和处理 */
    dataProcessing(status,process,urgent){
        const details = this.state.data;
        if(details.length===0) {
            message.info('必须新增一条数据！');
            return false;
        }
        for(var i = 0; i < details.length; i++){
            var e = details[i].procedureTestRecord;
            if(details[i].testItemIds===[]){
                message.info('请将数据填写完整，再新增！');
                return false;
            }
            for(var j in e){
                if(j !== 'testFrequency' && j!== 'comment' && j!== 'samplePointName'){
                    if( e[j]==='' || e[j] === -1 || e[j] === []||e[j] === undefined){
                        message.info('请将数据填写完整，再新增！');
                        return
                    }
                }
            }
        }
        this.handleCancel(); //取消弹出框
        this.applyOut(status,details,process,urgent);
    }
    /**对数据进行保存操作 不管是编辑、新增还是迭代数据格式按照编辑的数据格式，因为多传参数不影响后台的处理
     * 但是少传参数有影响 所以按参数最多的传
     * 只有审核通过的数据可以迭代 即status===2
    */
    applyOut(status,details,process,urgent){
        const createPersonId = JSON.parse(localStorage.getItem('menuList')).userId;
        const commonBatchNumber = {
            memo:'',
            id:this.props.value,
            createPersonId:createPersonId,
        }
        const url = this.props.status===2?`${this.props.url.procedure.procedureTestRecord}/iteration`:this.props.url.procedure.procedureTestRecord;
        /**flag存在则是编辑 请求方法为put 若不存在则是新增或迭代 请求方法为post */
        axios({
            type:'json',
            method:!this.state.flag||this.props.status===2?'post':'put',
            url:url,
            headers:{
                'Authorization':this.props.url.Authorization
            },
            data:{
                commonBatchNumber:commonBatchNumber,
                details:details
            }
        }).then((data)=>{
            /**status===1代表送审 若保存成功 则进行送审操作 */
            if(status){
                const dataId = data.data.data?data.data.data.commonBatchNumber.id:null;
                this.applyReview(dataId,process,urgent);
            }
            /**否则进行保存后续操作 */
            else this.sucessProcessing(data);
        }).catch(()=>{
            message.info('操作失败，请联系管理员！')
        })
    }
    /**保存后送审 */
    applyReview(dataId,process,urgent){
        axios.post(`${this.props.url.toDoList}/${parseInt(process)}`,{},{
            headers:{
                'Authorization':this.props.url.Authorization
            },
            params:{
                dataId:dataId,
                isUrgent:urgent
            }
        }).then((data)=>{
            this.sucessProcessing(data);
        }).catch(()=>{
            message.info('审核失败，请联系管理员！')
        })
    }
    /**保存以及送审成功后进行的操作判断 */
    sucessProcessing(data){
        if(data.data.code===0){
            message.info('保存成功');
            this.clearData();
            this.props.fetch();
            if(this.state.flag)
                this.getByBatchNumberId(this.props.value,1);
        }else{
            message.info(data.data.message);
        }
    }

    /**监控送审气泡的送审按钮 对应的事件 */
    applySaveAndReview(process,urgent){
        this.dataProcessing(1,process,urgent);
    }

     /**编辑数据 */
     editorRow(value){
        var {data} = this.state;
        for(var i = 0; i < data.length; i++){
            if(data[i].id===value)
                data[i].mode = 2;
        }
        this.setState({
            data:data,
        })
    }
    /**新增一条数据 */
    addData() {
        const {count,data,maxCount} = this.state;
        /**点击新增 前面已知数据全部变成不可编辑 */
            data.push({
                mode:3,
                id:maxCount+1,
                testItemIds:[],
                procedureTestRecord:{
                    procedureId:'',
                    deliveryFactoryId:'',
                    samplePointName:'',
                    sampler:'',
                    testFrequency:'',
                    serialNumberId:'',
                    tester:'',
                    comment:'',
                },
                detail:{
                    deliveryFactory:'',
                    productionProcess:'',
                    sampler:'',
                    tester:'',
                    testItems:'',
                    testMaterialName:'',
                }
            })
            this.setState({
                data: data,
                count: count+1,
                maxCount:maxCount+1
            })
    }
    /**新增前对前面数据进行判断 必须填写完整才能新增下一条数据 */
    checkAddRowData(data){
        var e = data.procedureTestRecord;
        if(e==={}||e===undefined){
            message.info('请将数据填写完整，再新增！');
                    return false;
        }else{
            for(var j in e){
                if( e[j]==='' || e[j] === -1 || e[j] === []||e[j] === undefined){
                    message.info('请将数据填写完整，再新增！');
                    return false;
                }
            }
            return true;
        }
    }
    /**删除一条数据 不仅要删除渲染table的数据，还要删除实时存取table数据的数组中对应数据*/
    deleteRow(value){
        var {count,data} = this.state;
        data = data.filter(e=>parseInt(e.id) !== parseInt(value));
        if(data.length > 0) data[data.length-1].mode=2;
        this.setState({
            count:count-1,
            data:data,
        })
    }
    /**获取每个Tr的值 */
    getData(detail){
        const {data} = this.state;
        if(data.length === 0) { data.push(detail)};
        var flag = 0;
        for(var i = 0; i < data.length; i++){
            if(data[i].id === detail.id && data[i].mode!==1){
                data[i] = detail;
                flag = 1;
            }
        }
        if(!flag){
            data.push(detail)
        }
        this.setState({
            data:data,
        })
    }
    //保存或送审成功之后，清空data
    clearData(){
        this.setState({
            data : []
        })
    }
    render() {
        const {flag} = this.state;
        return (
            <span>
                {this.judge(this.props.flag)}
                <Modal title={this.judge(this.props.flag,1)} visible={this.state.visible} closable={false} centered={true}
                    onCancel={this.handleCancel} maskClosable={false} className='modal-xxlg'
                    footer = {this.judgeFooter(flag,this.props.status)}
                    >
                    {
                       flag===1?<Detail data={this.state.data} allProductLine={this.state.allProductLine}/>
                       :<ProcessTable url={this.props.url} getData={this.getData} data={this.state.data}
                         flag={this.state.flag} allProductLine={this.state.allProductLine} allTestItem={this.state.allTestItem}
                         editorRow={this.editorRow} deleteRow={this.deleteRow} addData={this.addData} count={this.state.count} />
                    }

                </Modal>
            </span>
        );
    }
}
export default Add;
