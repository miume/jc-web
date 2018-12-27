import React from 'react';
import {Input, Select} from "antd";
import './unqualifiedTrack.css';

const topData = {
    materialName: '镍矿石',
    time: '2018年11月11日',
    materialer: '张小伟',
};
const middleData = {
    unTrackReason: '因为Ca含量超标，所以不合格',
    handleMethod: '该批次退货，联系厂家退款，并降低该厂家评级',
};
const Option = Select.Option;
class EdSpanModal extends React.Component {
    componentDidMount(){
        this.getAllProcedure();

    }
    constructor(props){
        super(props);
        this.state = {
            topData : topData,      //表头数据
            allProcedure: [], //获取所有发生工艺
            status : '', //0不合格，1合格
            procedure: '工艺1',
            middleData: middleData
        };
        this.procedureChange = this.procedureChange.bind(this);
    }
    render() {
        const { TextArea } = Input;

        return(
            <div >
                <div className="unTrackEditModalTop">
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
                            {this.props.spanState?(
                                <td className="unTrackTopSelect">
                                    <Select defaultValue={this.state.procedure} className="unTrackSelect" placeholder='请选择发生工序' onChange={this.procedureChange}>
                                        {this.state.allProcedure}
                                    </Select>
                                </td>
                            ):(
                                <td>{this.state.procedure}</td>
                            )}
                            <td>{this.state.topData.time}</td>
                            <td>{this.state.topData.materialer}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="unTrackEditModalMiddle">
                    <table>
                        <tbody>
                            <tr>
                                <td>不合格原因</td>
                                {this.props.spanState?(
                                    <td>
                                        <TextArea row={6} />
                                    </td>
                                ):(
                                    <td><div>{this.state.middleData.unTrackReason}</div></td>
                                )}
                            </tr>
                            <tr>
                                <td>处理方案</td>
                                {this.props.spanState?(
                                    <td>
                                        <TextArea row={6} />
                                    </td>
                                ):(
                                    <td><div>{this.state.middleData.handleMethod}</div></td>
                                )}
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
        // const {detail} = this.state;
        // detail.procedureTestRecord.deliveryFactoryId = value
        // this.setState({
        //     detail:detail
        // })
    }
}

export default EdSpanModal;