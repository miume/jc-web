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
        let {url,code,detail,data,mediateData,addDetail,inputChange,deleteItem,textAreaChange,addExceptionDisposes,deleteExceptionDisposes,
            addMediateItem,deleteMediateItem,memoChange} = this.props;
        return (
            <div className={code === 49 ? '' : 'hide' }>
                <Tabs onChange={this.returnEquKey} >
                    <Tabs.TabPane key={1} tab={(<b>工艺参数</b>)}>
                        <ProcessParams detail={detail} addDetail={addDetail} inputChange={inputChange} memoChange={memoChange} url={url} deleteItem={deleteItem} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab={(<b>异常处理</b>)}>
                        <ExceptionHandling data={data} inputChange={textAreaChange} addExceptionDisposes={addExceptionDisposes} url={url} deleteExceptionDisposes={deleteExceptionDisposes}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={3} tab={(<b>中间品标准</b>)}>
                        <IntermediateStandards data={mediateData} addMediateItem={addMediateItem} deleteMediateItem={deleteMediateItem} url={url}  inputChange={textAreaChange} memoChange={memoChange}/>
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
