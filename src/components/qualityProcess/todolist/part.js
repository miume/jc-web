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
    checkUser(flag,visible,index){
        // console.log(`flag=${flag},userId=${userId},curId=${curId},visible=${this.props.visible}`)
        if(visible === 1){
            return <Avatar style={{backgroundColor:'#0079fe'}}><span style={{fontWeight:'bolder'}}>{index}</span></Avatar>
        }
        else if(visible === -1){
            return <div className='redCircle'><i className="fa fa-close"></i></div>
        }
        else{
            return flag === 1 ? <div className='circle1'>{index}</div> : <div className='circle'><i className="fa fa-check"></i></div>;
        } 
    }
    render(){
        const flag = this.props.flag;
        const index = this.props.index;
        const visible = this.props.visible;
        return (
            <div className='part'>
                <span style={{padding:'5 10px'}}>{this.checkUser(flag,visible,index)}</span>
                {
                    visible === -1 ? 
                        <div style={{minWidth:80,paddingTop:'5px'}}>
                            <p className='red-font'>{this.props.data.userId === this.props.id?'由您进行':this.props.data.personName}</p>
                            <p className='red-font1'>{this.props.data.responsibility}</p>
                        </div>:
                        <div style={{minWidth:80,paddingTop:'5px'}}>
                            <p className={!this.props.flag||this.props.visible===1?'darkBlue':'partSpan'}>{this.props.data.userId === this.props.id?'由您进行':this.props.data.personName}</p>
                            <p className={!this.props.flag||this.props.visible===1?'darkBlue1':'partSpan1'}>{this.props.data.responsibility}</p>
                       </div>
                }
            </div>
        );
    }
}
export default Part;
