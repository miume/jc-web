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
    checkUser(){
        const flag = this.props.flag;
        // console.log(typeof flag)
        // const userId = this.props.data.userId;
        // const curId = this.props.id;
        if(this.props.data.visible){
            // console.log(`flag=${flag},userId=${userId},curId=${curId},visible=${this.props.visible}`)
            return <Avatar style={{backgroundColor:'#0079fe'}}><span style={{fontWeight:'bolder'}}>{this.props.index}</span></Avatar>
        }
        return flag === 1 ? <div className='circle1'>{this.props.index}</div> : <div className='circle'><i className="fa fa-check"></i></div>;
       
    }
    render(){
        return (
            <div className='part'>
                <span style={{padding:'5 10px'}}>{this.checkUser()}</span>
                <div style={{minWidth:80,paddingTop:'5px'}}>
                    <p className={!this.props.flag||this.props.visible?'darkBlue':'partSpan'}>{this.props.data.userId === this.props.id?'有您进行':this.props.data.personName}</p>
                    <p className={!this.props.flag||this.props.visible?'darkBlue1':'partSpan1'}>{this.props.data.responsibility}</p>
                    {/* <p className={!flag||userId===curId?'darkBlue':'partSpan'}>{this.props.data.userId === this.props.id?'由您进行':this.props.data.personName}</p>
                    <p className={!flag||userId===curId?'darkBlue1':'partSpan1'}>{this.props.data.responsibility}</p> */}
                </div>
                {/* <span className={this.judge(this.props.index,this.props.count)}></span> */}
            </div>
        );
    }
}
export default Part;
