import React from 'react';
import {Avatar} from 'antd';
class Part extends React.Component{
    constructor(props){
        super(props);
        this.checkUser = this.checkUser.bind(this);
    }
    /**判断当前用户之前的用户，以及之后的用户
     * flag = 0 表示 当前登陆用户之前的用户
     * flag = 1 表示当前登陆用户之后的用户
    */
    checkUser(flag,userId,curId){
        /**之前 */
        if(flag === 0 && userId !== curId ){
            return <div className='circle'><i className="fa fa-check"></i></div>
        }else if(userId === curId && this.props.data.visible){
            this.props.judgeFlag(1);
            return <Avatar style={{backgroundColor:'#0079fe'}}><span style={{fontWeight:'bolder'}}>{this.props.index}</span></Avatar>
        }
        else{
            return <div className='circle1'>{this.props.index}</div>
        }
    }
    render(){
        const flag = this.props.flag;
        const userId = this.props.data.userId;
        const curId = this.props.id;
        // console.log(`flag=${flag},this.props.style=${this.props.style},this.props.style1=${this.props.style1}`)
        return (
            <div className='part'>
                <span style={{padding:'5 10px'}}>{this.checkUser(flag,this.props.data.userId,this.props.id)}</span>
                <div style={{minWidth:80,paddingTop:'5px'}}>
                    <p className={!flag||userId===curId?'darkBlue':'partSpan'}>{this.props.data.userId === this.props.id?'由您进行':this.props.data.personName}</p>
                    <p className={!flag||userId===curId?'darkBlue1':'partSpan1'}>{this.props.data.responsibility}</p>
                </div>
                {/* <span className={this.judge(this.props.index,this.props.count)}></span> */}
            </div>
        );
    }
}
export default Part;
