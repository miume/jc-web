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
        dynData.push(`C${j}11`)
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
            tbodyData: tbodyData,
            // 用于鼠标移进移出
            detailShow: 'none',
            x: 0,
            y: 0,
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
                            <i className="fa fa-chevron-left fa-2x"></i>
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
                            <i className="fa fa-chevron-right fa-2x"></i>
                        </div>
                    </div>
                    <div id="theadRight">
                        <div className="rightThead">
                            判定
                        </div>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
                <div id="tbody">
                    {
                        this.state.tbodyData.map((item,index) => {
                            console.log('item',item.dynData);
                            return(
                                <div>
                                    <div id="tbodyLeft">
                                        <div className="leftTbody" key={item.id}>{item.index}</div>
                                        <div className="leftTbody" key={'a'}>{item.a}</div>
                                    </div>
                                    <div id="tbodyMiddle">
                                        <div className="middleTbody" id="middleTbodyId">
                                            {

                                                item.dynData.map((item,index) => {
                                                    console.log('dynData',item)
                                                    if(index===0){
                                                        return(
                                                            <div className="middleTbodyDiv firstMiddleDiv" key={index}>
                                                                <div>{item}</div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className="middleTbodyDiv" key={index}>
                                                                <div>{item}</div>
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
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    /**获取鼠标移进移出数据*/
    handleMouseOver = (e) => {
        this.setState({
            detailShow: 'block',
            x: e.pageX, //pageX是以html左上角为原点，相应的clientX是以浏览器左上角为原点
            y: e.pageY,
        })
    };
    handleMouseOut = () =>{
        this.setState({
            detailShow: 'none',
            x: 0,
            y: 0
        })
    }

    /**---------------------- */
    /**获取表头数据*/


    /**---------------------- */
    /**获取表头数据*/


    /**---------------------- */
}

export default PurchaseModalTable;