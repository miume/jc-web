import React from 'react';
// const examineData = [{
//     name:'王大大',
//     detail:{
//         id: 100,
//         handler: 1,
//         handleTime: "2018-12-20 09:34:23",
//         handleReply: "我没意见我没意见我没意见",
//     }
// },{
//     name:'兰亚戈',
//     detail:{
//         id: 101,
//         handler: 2,
//         handleTime: "2018-12-23 09:34:23",
//         handleReply: "同意",
//     }
// },{
//     name:'方乐',
//     detail:{
//         id: 103,
//         handler: 3,
//         handleTime: "2018-12-23 09:34:23",
//         handleReply: "可以",
//     }
// },{
//     name:'兰亚戈',
//     detail:{
//         id: 106,
//         handler: 4,
//         handleTime: "2018-12-24 09:34:23",
//         handleReply: "good",
//     }
// },]
class AllTester extends React.Component{
    constructor(props){
        super(props);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }
    moveLeft(){
        this.handleMove(-1);
    }
    moveRight(){
        this.handleMove(1);
    }
    handleMove(number) {
        /**滚动区域范围 */
        var middle = document.getElementById(`check-detail-div`+this.props.dataId);    
        /**每次滚动的长度 */
        let count = this.props.hide?380.5:364.5;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                }
                if(count <= 0 || pre === middle.scrollLeft) {
                    clearInterval(interval);
                }
            },1)
        }else if(gap > 0){
            var interval2 = setInterval(function() {
                let pre = middle.scrollLeft;
                count -= 1;
                middle.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    }
    render(){
        const examineData = this.props.examineData;
        const count = examineData?examineData.length:0;
        return (
            <div className={examineData?'check-detail':'hide'}>
                <div className={this.props.hide?'check-detail-div1':'check-detail-div'} id={`check-detail-div`+this.props.dataId}>
                    <div className='check-detail-div-hidden'>
                    {
                        examineData?
                        examineData.map((e,index)=>(
                            <div className={this.props.hide?'check-detail-div-hidden-part1':'check-detail-div-hidden-part'} key={index}>
                                <div className={this.props.hide?'part-demo1':'part-demo'} >
                                    <div><span>审核人：<span>{e.name?e.name:''}</span></span></div>
                                    <div><span>审核日期：<span>{e.detail?e.detail.handleTime:''}</span></span></div>
                                    <div><span>审核意见：<span>{e.detail?e.detail.handleReply:''}</span></span></div>
                                </div>
                                <div className={index===count-1 || this.props.hide ?'hide':'line-part'}>
                                </div>
                            </div>
                        )):null
                    }
                    </div>
                </div>
                <div className='check-detail-i' ><i className='fa fa-2x fa-caret-left' onClick={this.moveLeft}></i><i className='fa fa-2x fa-caret-right' onClick={this.moveRight}></i></div>
        </div>
        );
    }
}
export default AllTester;