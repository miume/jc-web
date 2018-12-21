import React from 'react';
import Part from './part';
import Line from './line';
import CheckModal from './checkModal';
class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag:0,
        }
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
        var middle = document.getElementById(`item2-${this.props.data.id}`)        
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
                    <span className='bigSize'>{this.props.data.description+'   '+this.props.data.batchNumber}</span>
                </div>
                <div className='wrap2'>初步审核，检查标准是否判断正确</div>
                <div className='wrap3'>
                   <span className='time'>{this.props.data.createTime}</span>
                   <span className='smallSize'><span className={this.props.data.isUrgent?'urgent':''}>{this.props.data.isUrgent?'紧急':'正常'}</span></span>
                </div>
            </div>
           <div className='demo'>
               <div className='item1' onClick={this.moveLeft}><i className='fa fa-2x fa-caret-left'></i></div>
               <div className='item2' id={`item2-${this.props.data.id}`}>
                   <div className='item2Scroll' id={this.props.data.id}>
                   {
                       this.props.details.map((e,index)=>{
                           if(e.visible) this.state.flag=1;
                           return (
                           <div key={e.userId} style={{display:'flex',textAlign:'center'}}>
                               <Part index={index+1} data={e} id={this.props.curId} count={count} visible={e.visible} flag={e.flag}/>
                               <Line index={index+1} count={count} flag={this.state.flag} visible={e.visible}/>
                           </div>)
                       })
                   }
                   </div>
               </div>
               <div className={`item3`} onClick={this.moveRight}><i className='fa fa-2x fa-caret-right'></i></div>
               <div className='item4'>
                   <CheckModal dataId={this.props.data.id} url={this.props.url} fetch={this.props.fetch} />
               </div>
           </div>
        </div>
        );
    }
}
export default Todo;