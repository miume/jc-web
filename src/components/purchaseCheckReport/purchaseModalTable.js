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
    tbodyData.push({
        index: i,
        id:i,
        a: 'ECT/12372',
        b: '启动',
        C0: '0',
        C1: '1',
        C2: '2',
        C3: '3',
        C4: '4',
        C5: '5',
        C6: '6',
        C7: '7',
        C8: '8',
        C9: '9',
        C10: '10',
        C11: '11',
        C12: '12',
        C13: '13',
        C14: '14',
        C15: '15',
        C16: '16',
        C17: '17',
        C18: '18',
        C19: '19',
    })
}

class PurchaseModalTable extends React.Component {
    Authorization;
    server;
    constructor(props){
        super(props);
        this.state = {
            //
            //数据
            headColumns: headData ,
            tbodyData: tbodyData,
            // 用于鼠标移进移出
            hover: false,
            visible:'',
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
        const handleRightClick = () => this.handleClick(1)
        const handleLeftClick = () => this.handleClick(-1)
        return(
            <div id="modalTable" className={this.state.visible}>
                <div id="thead">
                    <div id="theadLeft">
                        <div>
                            <div className="leftThead">序号</div>
                            <div className="leftThead">批号</div>
                        </div>
                    </div>
                    <div id="theadMiddle" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                        <div className={(this.state.hover? 'leftOnclick':'')} onClick={handleLeftClick}>
                            <i className="fa fa-chevron-left fa-2x"></i>
                        </div>
                        <div className="middleThead" ref={(ref) => this.middleTheadRef = ref}>
                            {
                                this.state.headColumns.map((item,index) => {
                                    return (
                                        <div className="middleTheadDiv" ref={(ref) => this.middleTheadDivRef = ref} key={item.id}>
                                            <div>{item.testItem}</div>
                                            <div>{item.itemUnit}</div>
                                            <div>{item.testResult}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={(this.state.hover? 'rightOnclick':'')} onClick={handleRightClick}>
                            <i className="fa fa-chevron-right fa-2x"></i>
                        </div>
                    </div>
                    <div id="theadRight">
                        判定
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
                <div id="tbody">
                    <div id="tbodyLeft">
                        {
                            this.state.tbodyData.map((item,index) => {
                                return(
                                    <div key={'tbody'+index}>
                                        <div className="leftTbody" key={item.id}>{item.index}</div>
                                        <div className="leftTbody" key={'a'}>{item.a}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div id="tbodyArea" className={this.state.className}>
                        <div className="tbodyMiddle" ref={(ref) => this.tbodyMiddleRef = ref}>
                            {
                                this.state.tbodyData.map((item,index) => {
                                    const data = item;
                                    const tbodyRow = index;
                                    return(
                                        <div className="middleTbody"   key={'tbodyData'+index}>
                                            {
                                                this.state.headColumns.map((item,index) => {
                                                    return(
                                                        <div className='middleTbodyDiv' ref={`${tbodyRow}${index}`}  id={`${tbodyRow}${index}`} key={index} onClick={this.handleCellOnclick.bind(this)}>
                                                            {data[item.testItem]}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div id="tbodyRight">
                        {
                            this.state.tbodyData.map((item,index) => {
                                return(
                                    <div key={`right${index}`}>
                                        <div id={`pass${index}`}>合格</div>
                                        <div id={`nopass${index}`}>不合格</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    /**表格单元格按钮点击事件*/
    handleCellOnclick = (e) => {
        const id = e.target.id;
        //可以通过这种方式操作真实dom,但是要保证唯一
        // var backgroundColor = this.refs[id].style.background;
        // if(backgroundColor==='red'){
        //     this.refs[id].style.background = 'white';
        // }else{
        //     this.refs[id].style.background = 'red';
        // }
        // this.refs[id].style.background='red';
        console.log(this.refs[id].style.background)
        var flag = -1;
        var colorStatueId = this.props.colorStatueId;
        for(var i=0; i<colorStatueId.length; i++) {
            if(id===colorStatueId[i]){
                flag = i;
            }
        }
        if(flag >= 0) {
            this.refs[id].style.background = 'white';
            colorStatueId.splice(flag,1);
            this.props.modifyColorStatueId(colorStatueId)
            // this.setState({
            //     colorStatueId:colorStatueId,
            //     purchaseStatus: '待定'
            // })
        }else{
            this.refs[id].style.background = 'red';
            colorStatueId.push(id);
            this.props.modifyColorStatueId(colorStatueId)
            // this.setState({
            //     colorStatueId:colorStatueId,
            //     purchaseStatus: '不合格'
            // })
        }
    };
    /**---------------------- */
    /**获取鼠标移进移出数据*/
    handleMouseOver = () => {
        this.setState({
            hover: true,
        })

    };
    handleMouseOut = () =>{
        this.setState({
            hover: false,
        })
    };
    /**---------------------- */
    /**获取表头左右图标点击效果*/
    handleClick(number) {
        if(number === 1) {
            console.log('>>>>>>>>>')
        }else {
            console.log('<<<<<<<<<')
        }

        var middle  = this.middleTheadRef;
        var middleItem = this.middleTheadDivRef;
        var tbodyMiddleRef = this.tbodyMiddleRef;
        let count = middleItem.offsetWidth * 7;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                    tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                    tbodyMiddleRef.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                }
                if(count <= 0 || pre === middle.scrollLeft) {
                    // console.log('clear')
                    clearInterval(interval);
                }
            },1)
        }else if(gap > 0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                count -= 1;
                middle.scrollLeft += (number === 1 ? 1 : -1);
                tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    // console.log('clear')
                    clearInterval(interval2);
                }
            },1)
        }
    }

    /**---------------------- */
    /**获取表头数据*/
    /**---------------------- */
}

export default PurchaseModalTable;