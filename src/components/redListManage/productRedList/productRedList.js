import React,{Component} from 'react';
import {Form,Table} from 'antd';


const data=[];
for(let i=0;i<20;i++){
  data.push({
      index:i,
      id:i+1,//序号
      lotNumber:'EcT/300',//批号
      name:'钴锰矿',//货品名称
      model:'钴锰矿一号',//货品型号
      number:'5袋',//损失数量
      weight:'10千克',//损失重量
      person:'周月',//申请人
      date:'2018年11月29日',//申请日期
      status:'已通过',//审核状态
  });
}

class ProductRedList extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:data,
        };
        this.columns=[{
          title:'序号',
          dataIndex:'id',
          sorter:(a,b)=>a.id-b.id,
          align:'center',
          width:'6%'
        }];

        
    }
    render(){
        return(
            <div>

            </div>
        );
    }
}
export default ProductRedList;