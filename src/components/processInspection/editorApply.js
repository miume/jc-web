import React from 'react';
import { Button } from 'antd';
import Tr from './tr';
import WhiteSpace from '../BlockQuote/whiteSpace';
class EditorApply extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editorData : [],
            count: 0,
            addApplyData:[],
            flag:1,
        }
        this.addData = this.addData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.getData = this.getData.bind(this);
    }
     /**编辑中新增按钮 */
     addData() {
        var {count,editorData} = this.state;
        if(editorData.length===0 && this.state.flag){
            editorData = this.props.data;
            count = this.props.data.length;
        }
        editorData.push({
            id:count+1,
            procedureTestRecord:{}
        })
        this.setState({
            count: count+1,
            editorData: editorData
        })
    }
     /**删除一条 */
     deleteRow(value){
        var {editorData,addApplyData} = this.state;
        if(editorData.length === 0 && this.state.flag){
            editorData = this.props.data;
        }
        const flag = editorData.length === 1 ? 0 : 1;
        editorData = editorData.filter(d => parseInt(d.id) !== parseInt(value) );
        addApplyData = addApplyData.filter(d => parseInt(d.id) !== parseInt(value) );
        this.setState({
            addApplyData:addApplyData,
            editorData: editorData,
            flag:flag,
        })
    }
    /**获取每个Tr的值 */
    getData(data){
        //console.log(data)
        const {addApplyData} = this.state;
        if(addApplyData.length === 0) { addApplyData.push(data)};
        var flag = 0;
        for(var i = 0; i < addApplyData.length; i++){
            if(addApplyData[i].id === data.id){
                addApplyData[i] = data;
                flag = 1;
            }
        }
        if(!flag){
            addApplyData.push(data)
        }
        this.state.addApplyData = addApplyData;
    }
    render(){
        this.state.count = this.state.editorData.length>0 || !this.state.flag?this.state.editorData.length:this.props.data.length;
        this.props.getApplyData(this.state.addApplyData)
        return (
            <div>
                <p className='fr'>已录入{this.state.count}条数据</p>
                <table style={{width:'100%'}} id='process-table'>
                    <thead className='thead'>
                        <tr>
                            <td>产品线</td>
                            <td>工序</td>
                            <td>取样点</td>
                            <td>取样人</td>
                            <td>检测人</td>
                            <td style={{minWidth:'135px'}}>检测项目</td><td>频次</td>
                            <td>受检物料</td>
                            <td>备注</td><td>操作</td>
                        </tr>
                    </thead>
                    {
                        this.state.editorData.length>0 || !this.state.flag?
                            <tbody className='tbody'>
                            {
                            this.state.editorData.map((m) => { return <Tr key={m.id.toString()} url={this.props.url} deleteRow={this.deleteRow} id={m.id.toString()} value={m.procedureTestRecord} getData={this.getData} allTestItem={this.props.allTestItem}></Tr> })
                            }
                        </tbody>:
                        <tbody className='tbody'>
                        {
                            this.props.data.map((m) => { return <Tr key={m.id.toString()} url={this.props.url} deleteRow={this.deleteRow} id={m.id.toString()} value={m.procedureTestRecord} getData={this.getData} allTestItem={this.props.allTestItem}></Tr> })
                        }
                        </tbody>
                        }
                    </table>

                    <WhiteSpace />
                    <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.addData}/>
            </div>
        );
    }
}
export default EditorApply;
