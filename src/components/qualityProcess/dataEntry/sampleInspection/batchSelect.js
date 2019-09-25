import React from "react";
import {Modal,Button,Select,Table} from "antd";
import axios from "axios";
import CancleButton from "../../../BlockQuote/cancleButton";
import AddButton from '../../../BlockQuote/newButton';

class BatchSelect extends React.Component{
    url
    constructor(props){
        super(props);
        this.state = {
            year:[],
            productType:[],
            month:[],
            serialNum:[],
            productNum:[],
            productLine:[],
            materialType:[],
            process:[],
            slot:[],
            slotNum:[],
            visible:false,
            dataSource:[],
            ruyear:undefined,
            rupro:undefined,
            rumon:undefined,
            ruser:undefined,
            ruproNum:undefined,
            ruproLin:undefined,
            rumaterial:undefined,
            ruprocess:undefined,
            ruslot:undefined,
            ruslotNum:undefined,
            batchRule:""
        }
    }
    batchClick = ()=>{
        this.fetch();
        this.setState({
            visible:true
        })
    }
    fetch = () =>{
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:1}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                year:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:2}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                productType:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:3}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                month:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:4}
        }).then((data)=>{
            const res = data.data.data;
            res.sort(function(a,b){
                return a.ruleValue-b.ruleValue
            })
            this.setState({
                serialNum:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:5}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                productNum:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:6}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                productLine:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:7}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                materialType:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:8}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                process:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:9}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                slot:res
            })
        });
        axios({
            url:`${this.url.productionBatchRule.getDetail}`,
            method:"get",
            params:{code:10}
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                slotNum:res
            })
        });
    }
    onCancel = ()=>{
        this.setState({
            visible:false,
            ruyear:undefined,
            rupro:undefined,
            rumon:undefined,
            ruser:undefined,
            ruproNum:undefined,
            ruproLin:undefined,
            rumaterial:undefined,
            ruprocess:undefined,
            ruslot:undefined,
            ruslotNum:undefined,
            batchRule:""
        })
    }
    onCenter = ()=>{
        let batchRule = this.state.ruyear+""+this.state.rupro+""+this.state.rumon+""+this.state.ruser+""+this.state.ruproNum+""+this.state.ruproLin+
        ""+this.state.rumaterial+""+this.state.ruprocess+""+this.state.ruslot+""+this.state.ruslotNum;
        this.props.onBatchCenter(batchRule);
        this.setState({
            visible:false,
            ruyear:undefined,
            rupro:undefined,
            rumon:undefined,
            ruser:undefined,
            ruproNum:undefined,
            ruproLin:undefined,
            rumaterial:undefined,
            ruprocess:undefined,
            ruslot:undefined,
            ruslotNum:undefined,
            batchRule:batchRule
        })
    }
    changeYear = (e) =>{
        this.setState({
            ruyear:e
        })
    }
    changeType = (e) =>{
        this.setState({
            rupro:e
        })
    }
    changeMonth = (e) =>{
        this.setState({
            rumon:e
        })
    }
    changeSerial = (e) =>{
        this.setState({
            ruser:e
        })
    }
    changeProduct = (e) =>{
        this.setState({
            ruproNum:e
        })
    }
    changeLine = (e) =>{
        this.setState({
            ruproLin:e
        })
    }
    changeMatrial = (e) =>{
        this.setState({
            rumaterial:e
        })
    }
    changeProcess = (e) =>{
        this.setState({
            ruprocess:e
        })
    }
    changeSlot = (e) =>{
        this.setState({
            ruslot:e
        })
    }
    changeSlotNum = (e) =>{
        this.setState({
            ruslotNum:e
        })
    }
    render(){
        this.url = JSON.parse(localStorage.getItem('url'));
        return(
            <div style={{zIndex:"999"}}>
                <Button onClick={this.batchClick} style={{width:"100%"}}>{this.props.batchRule==""?"批次规则":this.props.batchRule}</Button>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    title="批次规则"
                    width="1000px"
                    footer={[
                        <CancleButton key='back' handleCancel={this.onCancel}/>,
                        <AddButton key="submit" handleClick={this.onCenter} name='确定' className='fa fa-check' />
                    ]}
                >
                    <table className="batchTable">
                        <thead className="bactchHead">
                            <tr>
                                <th>年份</th>
                                <th>产品类型</th>
                                <th>月份</th>
                                <th>流水号</th>
                                <th>产品型号</th>
                                <th>生产线</th>
                                <th>原材料类型</th>
                                <th>工序</th>
                                <th>槽次</th>
                                <th>槽号</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Select value={this.state.ruyear} onChange={this.changeYear} style={{width:"100%"}}>
                                    {this.state.year.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.rupro} onChange={this.changeType} style={{width:"100%"}}>
                                    {this.state.productType.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.rumon} onChange={this.changeMonth} style={{width:"100%"}}>
                                    {this.state.month.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.ruser} onChange={this.changeSerial} style={{width:"100%"}}>
                                    {this.state.serialNum.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.ruproNum} onChange={this.changeProduct} style={{width:"100%"}}>
                                    {this.state.productNum.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.ruproLin} onChange={this.changeLine} style={{width:"100%"}}>
                                    {this.state.productLine.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.rumaterial} onChange={this.changeMatrial} style={{width:"100%"}}>
                                    {this.state.materialType.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.ruprocess} onChange={this.changeProcess} style={{width:"100%"}}>
                                    {this.state.process.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.ruslot} onChange={this.changeSlot} style={{width:"100%"}}>
                                    {this.state.slot.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                                <td><Select value={this.state.ruslotNum} onChange={this.changeSlotNum} style={{width:"100%"}}>
                                    {this.state.slotNum.map((value,item)=>{
                                        return <Select.Option key={item} value={value.ruleValue}>{value.ruleValue}</Select.Option>
                                    })}
                                    </Select></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            </div>
        )
    }
}

export default BatchSelect
