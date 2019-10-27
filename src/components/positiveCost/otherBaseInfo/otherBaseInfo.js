import React,{Component} from 'react'
import Blockquote from '../../BlockQuote/blockquote'
import ShowInfo from './showInfo'
class OtherBaseInfo extends Component{
    constructor(props){
        super(props);
        this.columns=[{
            title:'序号',
            dataIndex:'index',
            key:'id',
            width:'10%',
            align:'center'
        },{
            title:'周期名称',
            dataIndex:'cycleName',
            key:'cycleName',
            width:'18%',
            align:'center'
        },{
            title:'默认时长(天)',
            dataIndex:'defaultDuration',
            key:'defaultDuration',
            width:'18%',
            align:'center'
        },{
            title:'开始时刻',
            dataIndex:'startTime',
            key:'startTime',
            width:'18%',
            align:'center'
        },{
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width:'18%',
            align:'center',
        }]
        this.returnBaseInfoPositive=this.returnBaseInfoPositive.bind(this);
    }
    //返回正极成本的基础数据部分
    returnBaseInfoPositive(){
        this.props.history.push({pathname:'/baseDataPositiveCost'});
    }
    render(){
        const current=JSON.parse(localStorage.getItem('current'));
        return(
            <div>
                <Blockquote menu={current.menuParent} name='其他基本信息' menu2='返回' returnDataEntry={this.returnBaseInfoPositive} flag={1}/>
                <ShowInfo/>
            </div>
        );
    }
}
export default OtherBaseInfo;