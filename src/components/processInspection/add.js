import React from 'react';
import axios from 'axios';
import {Modal,message,Select} from 'antd';
import Detail from './detail';
import ProcessTable from './table';
import Submit from '../BlockQuote/checkSubmit';
import NewButton from '../BlockQuote/newButton';
import SaveButton from '../BlockQuote/saveButton';
import CancleButton from '../BlockQuote/cancleButton';
const Option = Select.Option;
class Add extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            data : [],
            saveData:[],       //用来table新增的真实数据
            flag:this.props.flag,           //用来判断是迭代还是详情
         }
        this.judge = this.judge.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        // this.deleteRow = this.deleteRow.bind(this);
        // this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.sucessProcessing = this.sucessProcessing.bind(this);
        this.getAllTestItem = this.getAllTestItem.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.applyOut = this.applyOut.bind(this);
        this.getData = this.getData.bind(this);
        this.applyReview = this.applyReview.bind(this);
        this.judgeFooter = this.judgeFooter.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
        this.handleIteration = this.handleIteration.bind(this);
        this.getByBatchNumberId = this.getByBatchNumberId.bind(this);
        this.applySaveAndReview = this.applySaveAndReview.bind(this);
        this.getAllProductLine = this.getAllProductLine.bind(this);
    }
    /**判断是新增 编辑 还是详情 */
    judge(flag,title){
        switch(flag){
            case 1 : return title?'详情':<span className='blue' onClick={this.handleAdd} >详情</span>
            case 2 : return title?'编辑':<span className={this.props.status===-1?'blue':'notClick'} onClick={this.props.status===-1?this.handleAdd:null} >编辑</span>
            default: return title?'新增标准':<NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' />;
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
            <Submit key='submit' url={this.props.url}  applySaveAndReview={this.applySaveAndReview} 
            visible={this.state.visible1}/>
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
        else 
            this.setState({
                visible: true,
                data:[{id:1,mode:3}]
            });
      }
    /**通过id查询详情 */
    getByBatchNumberId(value,flag){
        axios.get(`${this.props.url.procedure.procedureTestRecord}/${value}`,{
            headers:{
                'Authorization':this.props.url.Authorization
            }
        }).then((data)=>{
            const details = data.data.data? data.data.data.details:[];
            // var iteration = 1;
            if(details){
             for(var i = 0; i < details.length; i++){
                 // console.log(details[i].commonBatchNumber.iteration)
                //  iteration = details[i].procedureTestRecord.isIteration;
                 details[i].id = i+1;
                 details[i].mode = 1;
                 details[i].procedureTestRecord.testItems = details[i].testItemString;
              }
              this.setState({
                 visible:flag?false:true,
                //  iteration:iteration,
                 data:details,
             })
            }
        })
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
            });
        }
        // this.handleCancelApply();
    }
    /**控制送审皮泡的visible */
    handleCancelApply(){
        this.setState({
            visible1:false
        })
    }
    /**点击保存 */
    handleSave(){
        this.dataProcessing(0);
    }
    /**对保存 送审数据进行判断和处理 */
    dataProcessing(status,process,urgent){
        const details = this.state.saveData;
        //console.log(details)
        for(var i = 0; i < details.length; i++){
            var e = details[i].procedureTestRecord;
            if(details[i].testItemIds===[]){
                message.info('请将数据填写完整，再新增！');
                return false;
            } 
            for(var j in e){
                if( e[j]==='' || e[j] === -1 || e[j] === []||e[j] === undefined){
                    message.info('新据不能为空，请填写完整！');
                    return
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
            // console.log(`status=${status?'送审':'保存'}`)
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
            this.props.fetch();
            this.getByBatchNumberId(this.props.value,1);
        }else{
            message.info(data.data.message);
        }
    }
    /**获取每个Tr的值 从组件ProcessTable中实时获取 */
    getData(data){
        this.state.saveData = data;
    }
    /**监控送审气泡的送审按钮 对应的事件 */
    applySaveAndReview(process,urgent){
        // console.log('送审')
        this.dataProcessing(1,process,urgent);
    }
    render() {
        const {flag} = this.state;
        return (
            <span>
                {/* <NewButton handleClick={this.handleAdd} name='新增' className='fa fa-plus' /> */}
                {this.judge(this.props.flag)}
                <Modal title={this.judge(this.props.flag,1)} visible={this.state.visible} closable={false} centered={true}
                    onCancel={this.handleCancel} maskClosable={false} className='modal-xxlg'
                    footer = {this.judgeFooter(flag,this.props.status)}
                    // footer={[
                    //     <CancleButton key='back' handleCancel={this.handleCancel}/>,
                    //     <SaveButton key='save' handleSave={this.handleSave} />,
                    //     <Submit key='submit' url={this.props.url}  applySaveAndReview={this.applySaveAndReview}/>
                    // ]}
                    >
                    {
                       flag===1?<Detail data={this.state.data} allProductLine={this.state.allProductLine}/>
                       :<ProcessTable url={this.props.url} getData={this.getData} data={this.state.data} 
                         flag={this.state.flag} allProductLine={this.state.allProductLine} allTestItem={this.state.allTestItem} />
                    }
                    
                </Modal>
            </span>
        );
    }
}
export default Add;
