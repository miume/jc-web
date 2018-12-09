import React from 'react';
import { Button } from 'antd';
import Tr from './tr';
import WhiteSpace from '../BlockQuote/whiteSpace';
class EditorApply extends React.Component{
    render(){
        return (
            <div>
                <p className='fr'>已录入{this.props.count}条数据</p>
                         <table style={{width:'100%'}}>
                             <thead className='thead'>
                                 <tr>
                                     <td>产品线</td>
                                     <td>工序</td>
                                     <td>取样点</td>
                                     <td>取样人</td>
                                     <td>检测人</td>
                                     <td>检测项目</td><td>频次</td>
                                     <td>受检物料</td>
                                     <td>备注</td><td>操作</td>
                                 </tr>
                             </thead>
                             {
                                this.props.editorData?
                                 <tbody>
                                    {
                                    this.props.editorData.map((m) => { return <Tr key={m.id.toString()} deleteRow={this.props.deleteRow} id={m.id.toString()} value={m.procedureTestRecord} getData={this.props.getData} allTestItem={this.props.allTestItem}></Tr> })
                                    }
                             </tbody>:
                             <tbody></tbody>
                             }
                             
                         </table>

                         <WhiteSpace />
                         <Button type="primary" icon="plus" size='large' style={{width:'100%',fontSize:'15px'}} onClick={this.props.addData}/>
            </div>
        );
    }
}
export default EditorApply;