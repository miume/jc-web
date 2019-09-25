import React from 'react';
import { Button, Popover,Input } from 'antd';

class PopRefuse extends React.Component{
    state = {
        clicked: false,
    }
    handleClickChange = (visible) => {
        this.setState({
          clicked: visible,
        });
      }
    handleClick = () => {
        this.setState({
            clicked: false,
        });
    }
    render(){
        return(
            <Popover 
                content={(<div>
                    <Input onChange={this.props.contentChange}/>
                    <Button type="primary" style={{marginTop:"5px"}} size="small" onClick={()=>this.props.handleRefuse(this.props.id)}>确定</Button>
                    <Button size="small" onClick={this.handleClick}>取消</Button>
                    </div>)}
                title="请填写拒绝原因"
                trigger="click"
                placement="leftTop"
                visible={this.state.clicked}
                onVisibleChange={this.handleClickChange}>
                <span className={this.props.flag?'blue':'hide'}>拒绝</span>
            </Popover>
        )
    }
}

export default PopRefuse