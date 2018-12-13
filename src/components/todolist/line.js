import React from 'react';
class Line extends React.Component{
    constructor(props){
        super(props);
        this.judge = this.judge.bind(this);
    }
    /**判断line是否显示 */
    judge(index,last){
        if(index===last) return false;
        else return true
    }
    /**判断当前用户之前的用户，以及之后的用户 
     * flag = 0 表示 当前登陆用户之前的用户
     * flag = 1 表示当前登陆用户之后的用户
    */
    render(){
        return (
            <div className='part'>
            {
                this.judge(this.props.index,this.props.count)?
                <span className={this.props.flag?'line1':'line'}></span>:null
            }
            </div>
        );
    }
}
export default Line;