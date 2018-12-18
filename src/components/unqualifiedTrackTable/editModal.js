import React from 'react';
import {Button, Input, Table, Select} from "antd";
import CheckQualifiedModal from "../BlockQuote/checkQualifiedModal";

const topData = {
    materialName: '镍矿石',
    time: '2018年11月11日',
    materialer: '张张',
};
const Option = Select.Option;
class EditModal extends React.Component {
    componentDidMount(){
        this.getAllProcedure();

    }
    constructor(props){
        super(props);
        this.state = {
            topData : topData,      //表头数据
            allProcedure: [], //获取所有发生工艺
            status : '', //0不合格，1合格
        };
        this.procedureChange = this.procedureChange.bind(this);
    }
    columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'id',
        align:'center',
        width: '20%',
    },{
        title: '检测项目',
        dataIndex: 'testItem',
        key: 'testItem',
        align:'center',
        width: '25%',
    },{
        title: '检测结果',
        dataIndex: 'testResult',
        key: 'testResult',
        align:'center',
        width: '30%',
        render: (text,record) => {
            return(
                <Input
                    placeholder='输入检测结果'
                    style={{border:'0',paddingLeft:'10px'}}
                />
            )
        }
    },{
        title: '计量单位',
        dataIndex: 'itemUnit',
        key: 'itemUnit',
        align:'center',
        width: '25%',
    }];
    render() {
        const { TextArea } = Input;

        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: record => ({
                    record,
                }),
            };
        });
        return(
            <div >
                <div className="unTrackEditkModalTop">
                    <table>
                        <thead>
                        <tr>
                            <th>样品名称</th>
                            <th>发生工序</th>
                            <th>发生时间</th>
                            <th>处理负责人</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.topData.materialName}</td>
                            <td className="unTrackTopSelect">
                                <Select defaultValue="lucy" className="unTrackSelect" placeholder='请选择发生工序' onChange={this.procedureChange}>
                                    {this.state.allProcedure}
                                </Select>
                            </td>
                            <td>{this.state.topData.time}</td>
                            <td>{this.state.topData.materialer}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="unTrackEditkModalMiddle">
                    <table>
                        <tbody>
                            <tr>
                                <td>不合格原因</td>
                                <td><TextArea row={6}/></td>
                            </tr>
                            <tr>
                                <td>处理方案</td>
                                <td><TextArea row={6}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    /**获取所有发生工艺 */
    getAllProcedure = () => {
        const allProcedure = [];
        for (let i = 0; i < 5; i++) {
            allProcedure.push({
                id: i,
                name: `工序${i}`
            });
        }
        const children = allProcedure.map(e => {
            return <Option key={e.id} value={e.id}>{e.name}</Option>
        });
        this.setState({
            allProcedure:children
        })

    };
    /**监控发生工艺下拉框的变化 */
    procedureChange = (value) => {
        console.log(value);
        // const {detail} = this.state;
        // detail.procedureTestRecord.deliveryFactoryId = value
        // this.setState({
        //     detail:detail
        // })
    }
}

export default EditModal;