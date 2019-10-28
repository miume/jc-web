import React from 'react';
import {Badge,Tooltip} from 'antd';
class TopIcon extends React.Component{
    render(){
        return (
            <div>
                <Tooltip placement="bottom" title="退出登陆" overlayClassName='toolTip'>
                    <div onClick={ this.props.exitEvent} className='iconHover' >
                        <i className="fa fa-sign-out" aria-hidden="true" style={{padding:'10px'}}></i>
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="查看消息" overlayClassName='toolTip'>
                    <div onClick={ this.props.drawerEvent} className='iconHover'>
                        <Badge count={this.props.count} offset={[0,10]}><i className="fa fa-bell-o" aria-hidden="true" style={{padding:'10px'}}></i></Badge>
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="使用手册" overlayClassName='toolTip'>
                    <div onClick={ this.props.userInstruction} className='iconHover'>
                        <i className="fa fa-info" aria-hidden="true" style={{padding:'10px'}}></i>
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="更新日志" overlayClassName='toolTip'>
                    <div onClick={ this.props.versionInstruction} className='iconHover'>
                        <i className="fa fa-code-fork" aria-hidden="true" style={{padding:'10px',color: 'black'}}></i>
                    </div>
                </Tooltip>
            </div>
        );
    }
}
export default TopIcon;
