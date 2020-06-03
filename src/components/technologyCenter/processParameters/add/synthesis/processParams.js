import React from 'react';
import NewButton from "../../../../BlockQuote/newButton";
import ProcessParamsPart from "./processParamsPart";
import {Input} from 'antd';
const {TextArea} = Input;

class ProcessParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: []
        };
    }
    render() {
        let {detail,url,inputChange,addDetail,deleteItem,memoChange,proAndLines,memo,
            productClassChange,linesChange,productionData,productionLineData,niConcentration,coConcentration,mnConcentration} = this.props;
        return (
            <div>
                <NewButton handleClick={addDetail} name='新增' className='fa fa-plus'/>
                {
                    detail ? detail.map((e,index) => {
                        e['index'] = index + 1;
                        return (
                            <ProcessParamsPart key={index} index={index} url={url} detail={[e]} inputChange={inputChange} linesChange={linesChange}
                                               deleteItem={deleteItem} proAndLines={proAndLines[index]}
                                               productClassChange={productClassChange} productionData={productionData} productionLineData={productionLineData}/>
                        )
                    }) : null
                }
                <div style={{marginTop:5}}>
                <div className={'process-material-add-footer'}>
                    <div>
                        <label>镍(g/L)：</label>
                        <Input placeholder='请输入' value={niConcentration} name='niConcentration' style={{width: 150,marginRight:20}} onChange={this.props.inputChange}/>
                    </div>
                    <div>
                        <label>钴(g/L)：</label>
                        <Input placeholder='请输入' value={coConcentration} name='coConcentration' style={{width: 150,marginRight:20}} onChange={this.props.inputChange}/>
                    </div>
                    <div>
                        <label>锰(g/L)：</label>
                        <Input placeholder='请输入' value={mnConcentration} name='mnConcentration' style={{width: 150}} onChange={this.props.inputChange}/>
                    </div>
                </div>
                    <TextArea rows={2} value={memo} name={`processParamsMemo`} placeholder={'请输入备注'} onChange={memoChange}/>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }
}

export default ProcessParams;
