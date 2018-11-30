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
            // 宽度
            theadMiddleWidth: 0,
            middleTheadIdWidth: 0,
            // 用来存储已经变红的标签id--转换成这一行
            radioDataArr: [],  //id , purchaseStatus 构成数组 传给后台
            radioTrueArr: [],   //合格的数组--
            purchaseStatus: '待定', //显示判定，合格，不合格
            radioTrueNum: 0,
            radioFalseNum: 0,
            colorStatueId: [], //用来存储已经变红的标签id--转换成这一行
        }
    }
    render() {
        var lineNum = -1;
        return(
            <div id="modalTable">
                <div>
                    <div id="theadLeft">
                        <div className="leftThead">序号</div>
                        <div className="leftThead">批号</div>
                    </div>
                    <div id="theadMiddle" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                        <div id="leftOnclick" onClick={this.handleLeftOnclick}>
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
                        <div id="rightOnclick" onClick={this.handleRightOnclick}>
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
                            lineNum = lineNum + 1;
                            // console.log(lineNum);
                            return(
                                <div key={'tbody'+index}>
                                    <div id="tbodyLeft">
                                        <div className="leftTbody" key={item.id}>{item.index}</div>
                                        <div className="leftTbody" key={'a'}>{item.a}</div>
                                    </div>
                                    <div id="tbodyMiddle">
                                        <div className="middleTbody" id="middleTbodyId">
                                            {
                                                item.dynData.map((item,index) => {
                                                    if(index===0){
                                                        return(
                                                            <div className="middleTbodyDiv firstMiddleDiv" key={index}>
                                                                <div onClick={this.handleCellOnclick} id={`${lineNum}${index}`}>{item}</div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className="middleTbodyDiv" key={index}>
                                                                <div onClick={this.handleCellOnclick} id={`${lineNum}${index}`}>{item}</div>
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
    /**表格单元格按钮点击事件*/
    handleCellOnclick = (e) => {
        const id = e.target.id;
        console.log(e.target.id)
        var flag = -1;
        var tdId = document.getElementById(id);
        var colorStatueId = this.state.colorStatueId;
        for(var i=0; i<colorStatueId.length; i++) {
            if(id===colorStatueId[i]){
                flag = i;
            }
        }
        if(flag>=0){
            tdId.style.background = 'white';
            colorStatueId.splice(flag,1);
            console.log('---',colorStatueId)
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '待定'
            })
        }else{
            tdId.style.background = 'red';
            console.log('++++',colorStatueId)
            colorStatueId.push(id);
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '不合格'
            })
        }
    };
    /**---------------------- */
    /**获取鼠标移进移出数据*/
    handleMouseOver = (e) => {
        this.setState({
            detailShow: 'block',
            x: e.pageX, //pageX是以html左上角为原点，相应的clientX是以浏览器左上角为原点
            y: e.pageY,
        });
        const leftOnclick = document.getElementById("leftOnclick");
        const rightOnclick = document.getElementById("rightOnclick");
        leftOnclick.style.display = "block";
        rightOnclick.style.display = "block";
    };
    handleMouseOut = () =>{
        this.setState({
            detailShow: 'none',
            x: 0,
            y: 0
        });
        const leftOnclick = document.getElementById("leftOnclick");
        const rightOnclick = document.getElementById("rightOnclick");
        leftOnclick.style.display = "none";
        rightOnclick.style.display = "none";
    };
    /**---------------------- */
    /**获取表头左右图标点击效果*/
    handleLeftOnclick = () => {
        var theadMiddle = document.getElementById("theadMiddle");
        var middleTheadId = document.getElementById("middleTheadId");
        var theadMiddleWidth = theadMiddle.offsetWidth;
        var middleTheadIdWidth = middleTheadId.offsetWidth;
        this.setState({
            theadMiddleWidth: theadMiddleWidth,
            middleTheadIdWidth: middleTheadIdWidth
        })
        console.log(this.state.theadMiddleWidth);
        console.log(this.state.middleTheadIdWidth);
    };
    handleRightOnclick = () => {
        var theadMiddle = document.getElementById("theadMiddle");
        var middleTheadId = document.getElementById("middleTheadId");
        var theadMiddleWidth = theadMiddle.offsetWidth;
        var middleTheadIdWidth = middleTheadId.offsetWidth;
        this.setState({
            theadMiddleWidth: theadMiddleWidth,
            middleTheadIdWidth: middleTheadIdWidth
        })
        console.log(this.state.theadMiddleWidth);
        console.log(this.state.middleTheadIdWidth);
    };

    /**---------------------- */
    /**获取表头数据*/
    /**---------------------- */
}

export default PurchaseModalTable;