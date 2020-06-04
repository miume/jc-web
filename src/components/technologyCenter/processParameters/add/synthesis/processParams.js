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
            productClassChange,linesChange,productionData,productionLineData} = this.props;
        return (
            <div>
                <NewButton handleClick={addDetail} name='新增' className='fa fa-plus'/>
                {
                    detail ? detail.map((e,index) => {
                        e['index'] = index;
                        return (
                            <ProcessParamsPart key={index} index={index} url={url} detail={[e]} inputChange={inputChange} linesChange={linesChange}
                                               deleteItem={deleteItem} proAndLines={proAndLines[index]}
                                               productClassChange={productClassChange} productionData={productionData} productionLineData={productionLineData}/>
                        )
                    }) : null
                }
                <div style={{marginTop:5}}>
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
