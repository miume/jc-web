import React,{Component} from 'react'
import {Table} from 'antd'
import ReadRecipe from '../readRecipe'
import NewButton from '../../../../BlockQuote/newButton'
import SelectLine from '../selectProductline'
class SyntheticProcess extends Component{//合成工序
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
        this.columns=[{
            title:'序号',
            dataIndex:'id',
            key:'id'
        },{
            title:'合成槽号',
            dataIndex:'SyntheticNumber',
            key:'SyntheticNumber'
        },{
            title:'体积',
            dataIndex:'volume',
            key:'volume'
        },{
            title:'含固量(g/L)',
            dataIndex:'solidContent',
            key:'solidContent'
        },{
            title:'Ni(%)',
            dataIndex:'Ni',
            key:'Ni'
        },{
            title:'Co(%)',
            dataIndex:'Co',
            key:'Co'
        },{
            title:'Mn(%)',
            dataIndex:'Mn',
            key:'Mn'
        }];
        this.handleSelect1=this.handleSelect1.bind(this);
        this.handleSelect2=this.handleSelect2.bind(this);
        this.handleSelect3=this.handleSelect3.bind(this);
        this.handleSelect4=this.handleSelect4.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.showModal=this.showModal.bind(this);
    }
    handleSelect1(){
        
            }
    handleSelect2(){
        
    }
    handleSelect3(){
        
    }
    handleSelect4(){
        
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleOk(){
        this.setState({
            visible:false
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        return(
            <div>
                <NewButton name='上期浓度'/>
                <ReadRecipe handleCancel={this.handleCancel} handleOk={this.handleOk} showModal={this.showModal} visible={this.state.visible}/>
                <SelectLine handleSelect1={this.handleSelect1} handleSelect2={this.handleSelect2} handleSelect3={this.handleSelect3} handleSelect4={this.handleSelect4}/>
                <Table 
                rowKey={record=>record.id}
                columns={this.columns}
                size='small' 
                bordered/>
            </div>
        );
    }
}
export default SyntheticProcess