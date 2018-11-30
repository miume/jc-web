import React from 'react';
import './purchaseModalTable.css';

const headData =[];
for (let i = 0; i < 10; i++) {
    headData.push({
        index: i,
        id:i,
        testItem: `C${i}`,
        itemUnit: '%',
        testResult: '20.00',
    });
}
const tbodyData = [];
for(let i=0; i<20; i++){
    var dynData = [];
    for(let j=0; j<headData.length; j++){
        dynData.push(`C${j}`)
    }
    tbodyData.push({
        index: i,
        id:i,
        a: 'ECT/12372',
        b: '启动',
        dynData:dynData,
    })
}

class PurchaseModalTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            headColumns: headData ,
            tbodyStaticData: tbodyStaticData,
            tbodyDynData: tbodyDynData,
        }
    }
    render() {
        return(
            <div id="modalTable">
                <div>
                    <div id="theadLeft">
                        <div className="leftThead">序号</div>
                        <div className="leftThead">批号</div>
                    </div>
                    <div id="theadMiddle">
                        <div id="leftOnclick">
                            左
                        </div>
                        <div className="middleThead" id="middleTheadId">
                            {
                                this.state.headColumns.map((item,index) => {
                                    if(index===0){
                                        return(
                                            <div className="middleTheadDiv firstMiddleDiv" key={item.id}>
                                                <div>{item.testItem}</div>
                                                <div>{item.itemUnit}</div>
                                                <div>{item.testResult}</div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="middleTheadDiv" key={item.id}>
                                                <div>{item.testItem}</div>
                                                <div>{item.itemUnit}</div>
                                                <div>{item.testResult}</div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            <div style={{clear: 'both'}}></div>
                        </div>
                        <div id="rightOnclick">
                            右
                        </div>
                    </div>
                    <div id="theadRight">
                        <div className="rightThead">
                            判定
                        </div>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
                <div>
                    {
                        this.state.
                    }
                    <div id="tbodyLeft">
                        <div className="leftTbody">序号</div>
                        <div className="leftTbody">批号</div>
                    </div>
                    <div id="tbodyMiddle">
                        <div className="middleTbody" id="middleTbodyId">
                            {
                                this.state.headColumns.map((item,index) => {
                                    if(index===0){
                                        return(
                                            <div className="middleTbodyDiv firstMiddleDiv" key={item.id}>
                                                <div>{item.testItem}</div>
                                                <div>{item.itemUnit}</div>
                                                <div>{item.testResult}</div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="middleTbodyDiv" key={item.id}>
                                                <div>{item.testItem}</div>
                                                <div>{item.itemUnit}</div>
                                                <div>{item.testResult}</div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            <div style={{clear: 'both'}}></div>
                        </div>
                    </div>
                    <div id="tbodyRight">
                        <div className="rightTbody">
                            判定
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**获取表头数据*/


    /**---------------------- */
    /**获取表头数据*/


    /**---------------------- */
    /**获取表头数据*/


    /**---------------------- */
}

export default PurchaseModalTable;