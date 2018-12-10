import React from 'react';
import axios from 'axios';
import Part from './part';
import './todolist.css';
class TodoProcessed extends React.Component{
    server
    Authorization
    componentDidMount(){
        this.fetch();
    }
    componentWillUnmount(){
        this.setState=()=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            data:[],
            createPersonId:-1
        }
        this.fetch = this.fetch.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
    }
    /**根据当前登陆用户id获取待办事项 */
    fetch(){
        const id = localStorage.getItem('menuList')?JSON.parse(localStorage.getItem('menuList')).userId:-1;
        axios.get(`${this.server}/jc/common/toDoList/${id}`,{
            headers:{
                'Authorization':this.Authorization
            }
        }).then((data)=>{
            const res = data.data.data;
            this.setState({
                createPersonId:res?res[0].commonBatchNumber.createPersonId:-1,
                data:res[0].details
            })
        })
    }
    moveLeft(){
        const moveItem = document.getElementsByClassName('item2Scroll');
        
    }
    render(){
        this.server = localStorage.getItem('remote');
        this.Authorization = localStorage.getItem('Authorization');
        return (
            <div style={{padding:'15px'}}>
                 <div className='wholediv'>
                     <div className='wholep'>
                         <span className='smallSize'>由您对</span>
                         <span className='bigSize'>进货检验 ECT/213213</span>
                         <span className='smaSize'>初步审核，检查标准是否判断正确</span>
                         <span className='rightSpan'>
                            <span className='time'>2018-10-10</span>
                            <span className='smallSize'>正常</span>
                         </span>
                     </div>
                    <div className='demo'>
                        <div className='item item1' onClick={this.moveLeft}><i className='fa fa-2x fa-caret-left'></i></div>
                        <div className='item item2'>
                            <div className='item2Scroll'>
                            {
                                this.state.data.map(e=>
                                    <Part key={e.id}/>
                                )
                            }
                            </div>
                            {/* <div className='part'>
                                <span style={{padding:'0 10px'}}><Avatar style={{backgroundColor:'#0079fe'}}><span style={{fontWeight:'bolder'}}>1</span></Avatar></span>
                                <div>
                                    <p className='partSpan'>有您进行</p>
                                    <p className='partSpan1'>核对基本信息</p>
                                </div>
                                <span style={{width:'100px',height:'1.5px', padding:'5px',borderBottom:'1px solid grey'}}></span>
                            </div> */}
                        </div>
                        <div className='item item3'><i className='fa fa-2x fa-caret-right'></i></div>
                        <div className='item item4'></div>
                    </div>
                 </div>
            </div>
        );
    }
}
export default TodoProcessed;