import React from 'react';
import axios from 'axios';
import './userManagement.css';
import {Modal,Button,message} from 'antd';
import NewButton from '../../BlockQuote/newButton';
import CancleButton from '../../BlockQuote/cancleButton';
/**测试假数据 */
// const assignedRole : [
//     {id:3, name : '张一'},
//     {id:2, name : '张二'},
//     {id:1, name : '张三'},
//     {id:4, name : '张四'},
//     {id:5, name : '张五'},
//     {id:6, name : '张六'},
//     {id:7, name : '张七'},
//     {id:8, name : '张八'},
//     {id:9, name : '张九'}
// ],
// const unsignedRole : [
//     {id:10, name : '李一'},
//     {id:11, name : '李二'},
//     {id:12, name : '李三'},
// ]
class UserManagement extends React.Component {
    constructor(props){
        super(props);
        this.getAssignedUsersByRoleId = this.getAssignedUsersByRoleId.bind(this);
        this.handleUnsignedInputChange = this.handleUnsignedInputChange.bind(this);
        this.handleAssignedInputChange = this.handleAssignedInputChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.state = {
            visible: false,
            value: this.props.value,
            checked: false,
            assignedCheckIds : [],
            unsignedCheckIds : [],
            assignedRole:[],
            unsignedRole:[],
        }
    }
    /**通过角色id查询已分配和未分配的用户 */
    getAssignedUsersByRoleId(){
        let url=`${this.props.url.role.getUsersOfRole}?id=${this.props.value}`
        axios({
            url:url,
            method:'get',
            headers:{
                'Authorization': this.props.Authorization
            }
        }).then((data)=>{
            let res = data.data.data;
            this.setState({
                assignedRole : res?res.assigned:[],
                unsignedRole : res?res.notAssigned:[]
            })
        }).catch(()=>{
            message.info('查询失败，请联系管理员！')
        })
    }
    showModal() {
      this.setState({
        visible: true
      });
      this.getAssignedUsersByRoleId();
    }
    /**确定给选中用户分配当前角色 */
    handleOk() {
      this.setState({
        visible: false
      });
      let assignedIds = [];
      let unsignedIds = [];
      this.state.assignedRole.forEach(e => assignedIds.push(e.id) );
      this.state.unsignedRole.forEach(e => unsignedIds.push(e.id) );
      const url = `${this.props.url.role.assignRoleToUser}?roleId=${this.props.value}`;
      axios({
          url:url,
          method:'post',
          params: {
            userIds:assignedIds.toString()
          },
          headers:{
            'Authorization': this.props.Authorization
          }
      }).then(data=>{
          message.info(data.data.message)
      })
    }
    handleCancel() {
      this.setState({
        visible: false
      });
    }
    handleUnsignedInputChange(event){
        const target = event.target;
        const value =  target.value;
        if(target.checked === true )
            this.state.unsignedCheckIds.push(parseInt(value));
        else
            this.state.unsignedCheckIds.splice(this.state.unsignedCheckIds.findIndex(v => v=value),1);
    }
    handleAssignedInputChange(event){
        const target = event.target;
        const value =  target.value;
        if(target.checked === true )
            this.state.assignedCheckIds.push(parseInt(value));
        else
            this.state.assignedCheckIds.splice(this.state.assignedCheckIds.findIndex(v => v=value),1);
    }
    /** 右移按钮 未分配到已分配*/
    moveRight(){
        if(this.state.unsignedCheckIds.length === 0) {
            message.info('您还没选择未被分配的用户！',1);
        }
        else{
            let newState = {...this.state};
            let ids = newState.unsignedCheckIds;
            ids.forEach(value => {
                let changeRoles = newState.unsignedRole.find(v => v.id === value );
                newState.assignedRole.splice(0,0,changeRoles)
                newState.unsignedRole.splice(newState.unsignedRole.findIndex(v => v.id === changeRoles.id), 1)
            })
            newState.unsignedCheckIds.splice(0,ids.length); //右移以后，将未分配id清空
            this.setState(newState)
        }
    }
    /** 左移按钮 已分配到未分配*/
    moveLeft(){
        if(this.state.assignedCheckIds.length === 0) {
            message.info('您还没选择已被分配的用户！',1);
        }
        else{
            let newState = {...this.state};
            let ids = newState.assignedCheckIds;
            ids.forEach(value => {
                let changeRoles = newState.assignedRole.find(v => v.id === value );
                //每次将移动的元素都放在第一个显示
                newState.unsignedRole.splice(0,0,changeRoles)
                newState.assignedRole.splice(newState.assignedRole.findIndex(v => v.id === changeRoles.id), 1)
            })
            newState.assignedCheckIds.splice(0,ids.length); //左移以后 将已分配的ids清空
            this.setState(newState)
        }
    }
    render() {
      return (
        <span>
          <span  className='blue' onClick={this.showModal} value={this.state.value}>分配角色</span>
          <Modal title="分配角色" visible={this.state.visible}
            closable={false} maskClosable={false} centered={true}
            className='.modal-md'
            footer={[
                <CancleButton key='back' handleCancel={this.handleCancel}/>,
                <NewButton key="submit" handleClick={this.handleOk} name='确定' className='fa fa-check' />
              ]}
              >
            <div>
                <header style={{width:"40%",marginRight:'19%'}}>
                    <li className="theHead">未被分配用户</li>
                </header>
                <header style={{width:"40%"}}>
                    <li className="theHead">已被分配用户</li>
                </header>

                <div className="contents" style={{width:"40%"}}>

                    {
                        this.state.unsignedRole.map((unsigned) => {
                            return (
                                <li key={unsigned.id}><label className='check-label'>{unsigned.name}</label><input type='checkbox' value={unsigned.id} style={{marginLeft:'10px'}}
                                onChange={this.handleUnsignedInputChange} /></li>
                            )
                        })
                    }

                </div>

                <div className="middle" style={{width:"19%"}}>
                    <div >
                        <Button className='moddal-button-arrow' type="default" onClick={this.moveRight}><strong><i className='fa fa-chevron-right'></i></strong></Button>
                        <Button className='moddal-button-arrow' type="default" onClick={this.moveLeft}><strong><i className='fa fa-chevron-left'></i></strong></Button>
                    </div>
                </div>

                <div className="contents" style={{width:"40%"}}>
                    {
                        this.state.assignedRole.map((assigned) => {
                            return (
                                <li key={assigned.id}><label className='check-label'>{assigned.name}</label><input type='checkbox' value={assigned.id}
                                style={{marginLeft:'10px'}}
                                onChange={this.handleAssignedInputChange}/></li>
                            )
                        })
                    }
                </div>

                <div className="clear"></div>
            </div>
          </Modal>
        </span>
      );
    }
  }
  export default UserManagement;
