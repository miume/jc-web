import React from 'react';
import {Tabs} from "antd";
import ExceptionHandling from "./exceptionHandling";
import ProductStandard from "./productStandard";
import ProcessParaMeter from './processParameters';
const {TabPane} = Tabs;

class ProcessParams extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        let {hc} = this.props,{gy, exceptionDisposes, zjp} = hc;
        return (
            <div style={{height: 425}}>
                <Tabs defaultActiveKey={'1'}>
                    <TabPane tab={'工艺参数'} key={'1'}>
                        <ProcessParaMeter data={gy['details']} proAndLines={gy['proAndLines']} memo={gy['memo']}/>
                    </TabPane>
                    <TabPane tab={'异常处置'} key={'2'}>
                        <ExceptionHandling data={exceptionDisposes} />
                    </TabPane>
                    <TabPane tab={'中间品标准'} key={'3'}>
                        <ProductStandard data={zjp['mediate']} memo={zjp['memo']}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default ProcessParams;
