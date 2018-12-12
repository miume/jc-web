import React from 'react';
import NewButton from '../BlockQuote/newButton';
import Part from './part';
class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag:0,
        }
        this.moveLeft = this.moveLeft.bind(this);
        this.judgeFlag = this.judgeFlag.bind(this);
        // this.judgeStyle = this.judgeStyle.bind(this);
    }
    moveLeft(){
        console.log(this.props.data.id)
        const moveItem = document.getElementById(this.props.data.id);
        console.log(moveItem)
    }
    judgeFlag(value){
        this.state.flag = value;
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
                   <span className='smallSize'><span className={this.props.data.isUrgent?'':'urgent'}>{this.props.data.isUrgent?'正常':'紧急'}</span></span>
                </div>
            </div>
           <div className='demo'>
               <div className='item1' onClick={this.moveLeft}><i className='fa fa-2x fa-caret-left'></i></div>
               <div className='item2'>
                   <div className='item2Scroll' id={this.props.data.id}>
                   {
                       this.props.details.map((e,index)=>{
                           return <Part key={e.userId} index={index+1} data={e} id={this.props.data.createPersonId} count={count} flag={this.state.flag} judgeFlag={this.judgeFlag} />
                       }
                       )
                   }
                   </div>
               </div>
               <div className='item3'><i className='fa fa-2x fa-caret-right'></i></div>
               <div className='item4'>
                   <div style={{padding:'10% 0 0 70%'}}><NewButton name='审核' className='fa fa-check'></NewButton></div>
               </div>
           </div>
        </div>
        );
    }
}
export default Todo;