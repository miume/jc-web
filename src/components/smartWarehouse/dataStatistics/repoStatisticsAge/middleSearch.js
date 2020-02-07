import React, { Component } from 'react'
import {Input,Button,message} from 'antd'
import axios from 'axios'
class MiddleSearch extends Component{
    constructor(props){
        super(props)
        this.inputChange=this.inputChange.bind(this)
        this.searchBottom=this.searchBottom.bind(this)
    }
    render(){
        return(
            <div className={'repoStatisticsAge-age-div'}>
                <div>
                    <div style={{textAlign:'center'}}>库龄区间1</div>
                    <div>
                        <Input style={{width:'60px'}} name={'agingRange1a'} onChange={this.inputChange}/>
                        ~
                        <Input style={{width:'60px'}} name={'agingRange1b'} onChange={this.inputChange}/>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center'}}>库龄区间2</div>
                    <div>
                        <Input style={{width:'60px'}} name={'agingRange2a'} onChange={this.inputChange}/>
                        ~
                        <Input style={{width:'60px'}} name={'agingRange2b'} onChange={this.inputChange}/>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center'}}>库龄区间3</div>
                    <div>
                        <Input style={{width:'60px'}} name={'agingRange3a'} onChange={this.inputChange}/>
                        ~
                        <Input style={{width:'60px'}} name={'agingRange3b'} onChange={this.inputChange}/>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center'}}>库龄区间4</div>
                    <div>
                        <Input style={{width:'60px'}} name={'agingRange4a'} onChange={this.inputChange}/>
                        ~
                        <Input style={{width:'60px'}} name={'agingRange4b'} onChange={this.inputChange}/>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center'}}>库龄区间5</div>
                    <div>
                        <Input style={{width:'60px'}} name={'agingRange5a'} onChange={this.inputChange}/>
                        ~
                        <Input style={{width:'60px'}} name={'agingRange5b'} onChange={this.inputChange}/>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center'}}>截止库龄> </div>
                    <div>
                        <Input style={{width:'100px'}} name={'agingEnd'} onChange={this.inputChange}/>
                    </div>
                </div>
                <div>
                    <div style={{textAlign:'center'}}>单位：天 </div>
                    <Button type='primary' onClick={this.searchBottom}><i className={'fa fa-search'}></i>&nbsp;查询</Button>
                </div>
            </div>
        )
    }
    inputChange(e){
        let name=e.target.name,value=e.target.value
        this.setState({
            [name]:value
        })
    }
    /**根据库龄区间查询*/
    searchBottom(){
        let {agingEnd,agingRange1a,agingRange1b,agingRange2a,agingRange2b,
        agingRange3a,agingRange3b,agingRange4a,agingRange4b,agingRange5a,agingRange5b}=this.state,
        range={
            agingEnd:agingEnd,
            agingRange1a:agingRange1a,
            agingRange1b:agingRange1b,
            agingRange2a:agingRange2a,
            agingRange2b:agingRange2b,
            agingRange3a:agingRange3a,
            agingRange3b:agingRange3b,
            agingRange4a:agingRange4a,
            agingRange4b:agingRange4b,
            agingRange5a:agingRange5a,
            agingRange5b:agingRange5b
        }
        this.props.loadingParent()
        axios({
            url: `${this.props.url.swmsStockAgeStatistic.distribution}`,
            method: 'post',
            headers: {
                'Authorization': this.props.url.Authorization
            },
            data: range
        }).then(data => {
            let res = data.data.data;
            if(res) {
                this.props.getData(res)
            }
        }).catch(()=>{
            message.info('操作失败，请联系管理员!')
        })
    }
}
export default MiddleSearch