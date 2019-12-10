import React from 'react';
import {Tabs} from "antd";
import ProcessParams from "./processParams";
import ExceptionHandling from "./exceptionHandling";
import IntermediateStandards from "./intermediateStandards";

class Synthesis extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {url,code,detail,data,mediateData,addDetail,inputChange,deleteItem,textAreaChange,addExceptionDisposes,deleteExceptionDisposes,mediateMemo,memo,
            addMediateItem,deleteMediateItem,memoChange,proAndLines,productClassChange,linesChange,productionData,productionLineData,choiceTemplate} = this.props;
        return (
            <div className={code === 49 ? '' : 'hide' }>
                <Tabs onChange={this.returnEquKey} >
                    <Tabs.TabPane key={1} tab={(<b>工艺参数</b>)}>
                        <ProcessParams detail={detail} proAndLines={proAndLines} memo={memo} addDetail={addDetail} inputChange={inputChange} linesChange={linesChange}
                                       memoChange={memoChange} url={url} deleteItem={deleteItem} productClassChange={productClassChange}
                                       productionData={productionData} productionLineData={productionLineData}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab={(<b>异常处理</b>)}>
                        <ExceptionHandling data={data} inputChange={textAreaChange} choiceTemplate={choiceTemplate} addExceptionDisposes={addExceptionDisposes} url={url} deleteExceptionDisposes={deleteExceptionDisposes}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={3} tab={(<b>中间品标准</b>)}>
                        <IntermediateStandards data={mediateData} memo={mediateMemo}  addMediateItem={addMediateItem} deleteMediateItem={deleteMediateItem} url={url}  inputChange={textAreaChange} memoChange={memoChange}/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState(() => null)
    }
}

export default Synthesis;
