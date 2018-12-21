import React from 'react';
import NewButton from '../BlockQuote/newButton';
import Part from './part';
import Line from './line';
class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag:0,
        }
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.judgeFlag = this.judgeFlag.bind(this);
        this.handleMove = this.handleMove.bind(this);
    }
    moveLeft(){
        this.handleMove(-1);
        // console.log(this.props.data.id)
        // const moveItem = document.getElementById(this.props.data.id);
        // console.log(moveItem)
    }
    moveRight(){
        this.handleMove(1);
    }
    judgeFlag(value){
        this.state.flag = value;
    }
    handleMove(number) {
        // var middle  = document.getElementById(this.props.data.id);
        var middle  = document.getElementsByClassName('item2')[0];         
        // var middleItem = document.getElementsByClassName('part')[0];
        // let count = middleItem.offsetWidth * 7;
        let count = 830;
        let gap = (count / 100);
        gap = gap.toFixed(0);
        if(gap >= 1) {
            var interval = setInterval(function() {
                let pre = middle.scrollLeft;
                if(count < 5) {
                    count -= 1;
                    middle.scrollLeft += (number === 1 ? 1 : -1);
                    // tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                }
                else {
                    count -= gap;
                    middle.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
                    
                    // tbodyMiddleRef.scrollLeft += (number === 1 ? Number(gap) : -Number(gap));
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
                // tbodyMiddleRef.scrollLeft += (number === 1 ? 1 : -1);
                if(count <= 0|| pre === middle.scrollLeft) {
                    clearInterval(interval2);
                }
            },1)
        }
    }
    render(){
        const count = this.props.details?this.props.details.length:0;
        return (
            <div className='wholediv'>
            <div className='wholep'>
                <div className='wrap1'>
                    <span className='smallSize'>由您对</span>&nbsp;&nbsp;&nbsp;
                    <span className='bigSize'>{this.props.data.description?this.props.data.description:'无'+'   '+this.props.data.batchNumber}</span>
                </div>
                <div className='wrap2'>初步审核，检查标准是否判断正确</div>
                <div className='wrap3'>
                   <span className='time'>{this.props.data.createTime}</span>
                   <span className='smallSize'><span className={this.props.data.isUrgent?'':'urgent'}>{this.props.data.isUrgent?'正常':'紧急'}</span></span>
                </div>
            </div>
           <div className='demo'>
               <div className='item1' onClick={this.moveLeft}><i className='fa fa-2x fa-caret-left'></i></div>
               <div className='item2'>
                   <div className='item2Scroll' id={this.props.data.id}>
                   {
                       this.props.details.map((e,index)=>{
                           return (
                           <div key={e.userId} style={{display:'flex',textAlign:'center'}}>
                               <Part index={index+1} data={e} id={this.props.data.createPersonId} count={count} visible={e.visible} flag={this.state.flag} judgeFlag={this.judgeFlag} />
                               <Line index={index+1} count={count} flag={this.state.flag}/>
                           </div>)
                       })
                   }
                   </div>
               </div>
               <div className={`item3`} onClick={this.moveRight}><i className='fa fa-2x fa-caret-right'></i></div>
               <div className='item4'>
                   {/** style={{padding:'10% 0 0 70%'}} */}
                   <NewButton name='审核' className='fa fa-check'></NewButton>
               </div>
           </div>
        </div>
        );
    }
}
export default Todo;