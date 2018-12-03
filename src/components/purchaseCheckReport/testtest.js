import React from 'react';
import './purchaseModalTable.css';

const headData =[];
for (let i = 0; i < 20; i++) {
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
    Authorization;
    server;
    constructor(props){
        super(props);
        this.state = {
            //
            flag: false,
            //
            headColumns: headData ,
            tbodyData: tbodyData,
            // 用于鼠标移进移出
            hover: false,
            // 宽度
            theadMiddleWidth: 0, //表头动态宽度
            middleTheadIdWidth: 0, //表头动态含滚动的宽度
            leftDistance: 0, //移动的距离
            movieLeftDistance: 0,
            // 用来存储已经变红的标签id--转换成这一行
            radioDataArr: [],  //id , purchaseStatus 构成数组 传给后台
            radioTrueArr: [],   //合格的数组--
            purchaseStatus: '待定', //显示判定，合格，不合格
            radioTrueNum: 0,
            radioFalseNum: 0,
            colorStatueId: [], //用来存储已经变红的标签id--转换成这一行
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    render() {
        /**这是个令牌，每次调用接口都将其放在header里 */
        this.Authorization = localStorage.getItem('Authorization');
        /**这是服务器网址及端口 */
        this.server = localStorage.getItem('remote');
        var lineNum = -1;
        return(
            <div id="modalTable">
                <div>
                    <div id="theadLeft">
                        <div className="leftThead">序号</div>
                        <div className="leftThead">批号</div>
                    </div>
                    <div id="theadMiddle"  onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                        <div className={(this.state.hover? 'leftOnclick':'')} onClick={this.handleLeftOnclick}>
                            <i className="fa fa-chevron-left fa-2x"></i>
                        </div>
                        <div className="middleThead" ref={(ref) => this.middleTheadRef = ref} style={{left:this.state.movieLeftDistance+'px'}}>
                            {
                                this.state.headColumns.map((item,index) => {
                                    if(index===0){
                                        return(
                                            <div className="middleTheadDiv firstMiddleDiv" ref={(ref) => this.middleTheadDivRef = ref}   key={item.id}>
                                                <div>{item.testItem}</div>
                                                <div>{item.itemUnit}</div>
                                                <div>{item.testResult}</div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div className="middleTheadDiv" ref={(ref) => this.middleTheadDivRef = ref} key={item.id}>
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
                        <div className={(this.state.hover? 'rightOnclick':'')} onClick={this.handleRightOnclick}>
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
                            return(
                                <div key={'tbody'+index}>
                                    <div id="tbodyLeft">
                                        <div className="leftTbody" key={item.id}>{item.index}</div>
                                        <div className="leftTbody" key={'a'}>{item.a}</div>
                                    </div>
                                    <div id="tbodyMiddle">
                                        <div className="middleTbody" ref={(ref) => this.middleTbodyRef = ref}>
                                            {
                                                item.dynData.map((item,index) => {
                                                    if(index===0){
                                                        return(
                                                            <div className="middleTbodyDiv firstMiddleDiv" ref={(ref) => this.middleTbodyDivRef = ref} key={index}>
                                                                <div onClick={this.handleCellOnclick} id={`${lineNum}${index}`}>{item}</div>
                                                            </div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className="middleTbodyDiv" ref={(ref) => this.middleTbodyDivRef = ref} key={index}>
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
                                            合格
                                        </div>
                                        <div className="rightTbody">
                                            不合格
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
            // tdId.style.border = '1px solid #CCCCCC';
            colorStatueId.splice(flag,1);
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '待定'
            })
        }else{
            tdId.style.background = 'red';
            colorStatueId.push(id);
            this.setState({
                colorStatueId:colorStatueId,
                purchaseStatus: '不合格'
            })
        }
    };
    /**---------------------- */
    /**获取鼠标移进移出数据*/
    handleMouseOver = () => {
        this.setState({
            hover: true,
            flag: true,
        })

    };
    handleMouseOut = () =>{
        this.setState({
            hover: false,
        })
    };
    /**---------------------- */
    /**获取表头左右图标点击效果*/
    handleLeftOnclick = () => {
        var middle  = this.middleTheadRef;
        var middleItem = this.middleTheadDivRef;
        var middleTbodyRef = this.middleTbodyRef;
        var middleTbodyDivRef = this.middleTbodyDivRef;
        let count = middleItem.offsetWidth * 7;
        let countTbody = middleTbodyDivRef.offsetWidth * 7;
        let gap = (count / 100);
        let gapTbody = (countTbody / 100);
        gap = gap.toFixed(0);
        gapTbody = gapTbody.toFixed(0);
        if(gap >= 1&&gapTbody >= 1){
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                let preTbody = middleTbodyRef.scrollLeft;
                if(count < 5&&countTbody<5) {
                    count -= 1;
                    countTbody -= 1;
                    middle.scrollLeft += 1;
                    middleTbodyRef.scrollLeft += 1;
                }else {
                    count -= gap;
                    countTbody -= gapTbody
                    middle.scrollLeft += Number(gap);
                    middleTbodyRef.scrollLeft += Number(gap);
                }
                if(count <= 0&&countTbody <=0 || pre === middle.scrollLeft&&preTbody === middleTbodyRef.scrollLeft) {
                    clearInterval(interval);
                }
            },1)
        }else if(gap >0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                let preTbody = middleTbodyRef.scrollLeft;
                count -= 1;
                countTbody -= 1;
                middle.scrollLeft += 1;
                if(count <= 0&&countTbody <=0 || pre === middle.scrollLeft&&preTbody === middleTbodyRef.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    };
    handleRightOnclick = () => {
        var middle  = this.middleTheadRef;
        var middleItem = this.middleTheadDivRef;
        let count = middleItem.offsetWidth * 1;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft -= 1;
                }
                else {
                    count -= gap;
                    middle.scrollLeft -= Number(gap);
                }
                if(count <= 0 || pre === middle.scrollLeft) {
                    clearInterval(interval);
                }
            },1)
        }else if(gap > 0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                count -= 1;
                middle.scrollLeft -= 1;
                if(count <= 0|| pre === middle.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    };

    /**---------------------- */
    /**获取表头数据*/
    /**---------------------- */
}

export default PurchaseModalTable;