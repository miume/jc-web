import React,{Component} from 'react'
import {Select, Table, Checkbox,Upload,Icon,Button,message} from "antd";
import './acq.css'
import axios from 'axios'
const {Group}=Checkbox
const {Option}=Select
class ImportModal extends Component{
    constructor(props){
        super(props)
        this.state={
            processCode:undefined,
            modelCode:undefined,
            fileList: [],
            testItem:[]
        }
        this.selectChange=this.selectChange.bind(this);
        this.getAllByProcessByProdut=this.getAllByProcessByProdut.bind(this);
        this.checkChange=this.checkChange.bind(this)
        this.import=this.import.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.setState = () => {
            return;
        }
    }
    selectChange(value, name) {
        let {processCode,modelCode}=this.state
        name=name.props.name
        this.setState({
            [name]:value
        })
        if(name==='processCode'&&modelCode){
          let params={
            processCode:value,
            productCode:modelCode
          }
          this.getAllByProcessByProdut(params)
        }
        if(name==='modelCode'&&processCode){
            let params={
                processCode:processCode,
                productCode:value
              }
            this.getAllByProcessByProdut(params)
        }
    }
    getAllByProcessByProdut(params){
        axios({
            url:`${this.props.url.fireMageTestItems}/getAllByProcessByProdut`,
            method:'get',
            headers:{
                'Authorizaion':this.props.url.Authorizaion
            },
            params
        }).then(data=>{
            let res=data.data.data
            this.setState({
                testItemData:res
            })
        })
    }
    checkChange(value){
        this.setState({
            testItem:value
        })
    }
 
    /**选择检验项目和文件，以导入文件*/
    import() {
        const { fileList,testItem } = this.state;
        if ( testItem.length === 0) {
            message.error('信息选择不完整!')
            return
        }
        if(fileList.length===0){
            message.error('请上传一个文件!')
            return
        }
        if(fileList.length>1){
            message.error('只能上传一个文件!')
            return
        }
        const formData = new FormData();// 将文件变成键值的形式，可以方便的处理各类的文件
        fileList.forEach(file => {
          formData.append('excelFile', file);
        });
       
        if(formData.get('excelFile').name.split('.')[1]!=='xls'){
            message.error("上传文件格式为'xls'!")
            return
        }
      
        axios({
            url: `${this.props.url.dateConllection.import}?items=${testItem}`,
            method: 'post',
            headers: {
                'Authorizaion': this.props.url.Authorizaion
            },
            data:formData
        }).then(data => {
            let res = data.data.data
            if (res) {
               message.info(data.data.message)
            }
            this.cancel()
            this.props.handleVisible(false)
        })
    }
    cancel(){
        this.props.handleVisible(false)
        this.setState({
            fileList:[],
            testItem:[],
            processCode:undefined,
            modelCode:undefined,
            testItemData:[]
        })
    }
    render(){
        let {processData,modelData}=this.props,{testItemData, fileList ,processCode,modelCode}=this.state
        const props = {
          onRemove: file => {
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          },
          beforeUpload: file => {
            this.setState(state => ({
              fileList: [...state.fileList, file],
            }));
            return false;
          },
          fileList,
        };
        return(
            <div >
                <div className={'fire-ins-data-acq'}>
                    <span>工序 ：</span>
                    <Select onChange={this.selectChange} value={processCode} style={{width:'160px',marginRight:'15px'}} placeholder={'请选择工序'}>
                        {
                            processData?processData.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name='processCode'>{item.value}</Option>
                                )
                            }):null
                        }
                    </Select>
                    <span>产品型号 ：</span>
                    <Select onChange={this.selectChange} value={modelCode} style={{width:'160px'}} placeholder={'请选择产品型号'}>
                        {
                            modelData?modelData.map(item=>{
                                return(
                                    <Option key={item.code} value={item.code} name='modelCode'>{item.value}</Option>
                                )
                            }):null
                        }
                    </Select>
                </div>
                <div className={'fire-ins-data-acq'}>请选择绑定检验项目 : </div>
                <div className={'fireQua-add-check-group fireIns-add-check-group-scroll fire-ins-data-acq'} style={{padding:'10px'}}>
                    <Group onChange={this.checkChange}  value={this.state.testItem} style={{width:'100%'}}>
                        {
                            this.state.testItemData?this.state.testItemData.map((item,index)=>{
                                return(
                                    <span className='fireIns-add-check-group-span1' key={index}> <Checkbox value={item.code}>{item.name}</Checkbox></span>
                                )
                            }):null
                        }
                    </Group>
                </div>
                <div>
                    <span>导入文件 ：</span>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 选择文件
                        </Button>
                    </Upload>
                </div>
                            {/* <Button onClick={this.cancel}>点击</Button> */}
            </div>
        )
    }
}
export  default ImportModal