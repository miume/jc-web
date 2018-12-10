import React from 'react';
import NewButton from '../BlockQuote/newButton';
import Part from './part';
class Todo extends React.Component{
    constructor(props){
        super(props);
        this.moveLeft = this.moveLeft.bind(this);
    }
    moveLeft(){
        console.log(this.props.data.id)
        const moveItem = document.getElementById(this.props.data.id);
        console.log(moveItem)
    }
    render(){
        return (
            // <div className='wholediv'>
            //     <div className='wholep'>
            //         <span className='smallSize'>由您对</span>
            //         <span className='bigSize'>{this.props.data.description+' '+this.props.data.batchNumber}</span>
            //         <span className='smaSize'>初步审核</span>
            //         <span className='rightSpan'>
            //         <span className='time'>{this.props.data.createTime}</span>
                    
            //     <div className='item item3'><i className='fa fa-2x fa-caret-right'></i></div>
            //     <div className='item item4'>
            //         <div style={{padding:'10% 0 0 70%'}}><NewButton name='审核' className='fa fa-check'></NewButton></div>
            //     </div>
            // </div>
            // </div>
            <div className='wholediv'>
            <div className='wholep'>
                <span className='smallSize'>由您对</span>
                <span className='bigSize'>{this.props.data.description+' '+this.props.data.batchNumber}</span>
                <span className='smaSize'>初步审核，检查标准是否判断正确</span>
                <span className='rightSpan'>
                   <span className='time'>{this.props.data.createTime}</span>
                   <span className='smallSize'><span className={this.props.data.isUrgent?'':'urgent'}>{this.props.data.isUrgent?'正常':'紧急'}</span></span>
                </span>
            </div>
           <div className='demo'>
               <div className='item item1' onClick={this.moveLeft}><i className='fa fa-2x fa-caret-left'></i></div>
               <div className='item item2'>
                   <div className='item2Scroll' id={this.props.data.id}>
                   {
                       this.props.details.map((e,index)=>
                           <Part key={e.userId} index={index+1} data={e} id={this.props.data.createPersonId} />
                       )
                   }
                   </div>
               </div>
               <div className='item item3'><i className='fa fa-2x fa-caret-right'></i></div>
               <div className='item item4'>
                   <div style={{padding:'10% 0 0 70%'}}><NewButton name='审核' className='fa fa-check'></NewButton></div>
               </div>
           </div>
        </div>
        );
    }
}
export default Todo;