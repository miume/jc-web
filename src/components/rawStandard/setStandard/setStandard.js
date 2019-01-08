//当没有设置标准时，会显示这个界面
import React, { Component } from 'react';
import {Modal} from 'antd';
import SearchCell from '../../BlockQuote/search';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
import SaveButton from '../../BlockQuote/saveButton';
import Submit from '../../BlockQuote/submit';
import '../block.css';
import SetStandardModal from './setSandardModal';

class SetStandard extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            popVisible:false,//送审气泡是否弹出
        }
        this.showModal=this.showModal.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleVisibleChange=this.handleVisibleChange.bind(this);
        this.handleSongShenOk=this.handleSongShenOk.bind(this);
        this.handleHide=this.handleHide.bind(this);
    }
    showModal(){
        this.setState({
            visible:true
        });
    }
    handleSave(){//点击保存

    }
    handleCancel(){//点击新增的取消
        this.setState({
            visible:false
        });
    }
    handleSongShenOk(){//点击送审的确定

    }
    handleHide(){//点击送审的取消

    }
    handleVisibleChange=(visible)=>{
        this.setState({
          popVisible:visible
        })
    }
    render(){
        this.url=JSON.parse(localStorage.getItem('url'));
        return(
            <div>
                <div style={{padding:'15px'}}>
                     &nbsp;<h2 style={{display:'inline-block'}}>请设置标准</h2>
                     <span className='fr'>
                      <SearchCell name='请输入搜索内容'
                        
                      />
                     </span>
                </div>
                <div className='rawStandardImageDiv'>
                   <img src={require(`../standard.png`)} alt='图片加载失败' className='rawStandardImage'  />
                </div>
                <div className='rawStandardFontUp' >
                       <p>您还没建立任何标准</p>
                </div>
                <div className='rawStandardFontDown'>
                      <p>需要建立一套标准后才能执行相关操作</p>
                </div>
                <div style={{textAlign:'center'}}>
                    <NewButton  handleClick={this.showModal}  className='fa fa-plus' name='建立标准'/>
                    <Modal
                        title='设置标准'
                        visible={this.state.visible}
                        closable={false}
                        maskClosable={false}
                        footer={[
                            <CancleButton key='cancel' handleCancel={this.handleCancel}/>,
                            <SaveButton key='save' handleSave={this.handleSave}/>,
                            <Submit  key='submit' visible={this.state.popVisible} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange}  handleCancel={this.hide} handleOk={this.handleSongShenOk} process={this.state.checkSelectData} defaultChecked={false} url={this.url} urgentChange={this.urgentChange}/> 
                        ]}
                    >
                            <SetStandardModal raw={this.props.raw} factory={this.props.factory} handleSave={this.handleSave}/>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default SetStandard;
