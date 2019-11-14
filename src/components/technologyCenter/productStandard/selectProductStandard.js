import React from 'react';
import AddProductStandard from './addProductStandard';
import axios from "axios";
class SelectProductStandard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            option: [],
            allTestItem: [],

        }
    }
    componentDidMount(){
        this.getAllTestItem()

    }
    getAllTestItem = () => {
        axios({
            url: `${this.props.url.testItems.testItems}`,
            method: 'get',
            headers: {
                'Authorization': this.props.url.Authorization
            }
        }).then(data => {
            const res = data.data.data;
            if (res) {
                this.dataProcessing(res);
            }
        })
    }

    /**对数据进行处理 */
    dataProcessing = (data) => {
        var option = []
        for (var i = 0; i < data.length; i++) {
            data[i]['value'] = '';
            data[i]['form'] = data[i].id + '-' + data[i].name + '-' + data[i].unit + '-' + data[i].value
            data[i]['check'] = true
            option.push(data[i]['form'])
        }
        this.setState({
            option: option,
            allTestItem: data,
        })
    }


    render(){
        var height1 = document.body.clientHeight-350;
        return (
            <div className='product-standrad-bottom' style={{height:height1}}>
            {
                <div className='product-standrad-img'>
                     <img src={require(`./standard.png`)} alt='图片加载失败'/>
                     <div className='product-standrad-img-p'>您还没建立任何标准</div>
                     <div className='product-standrad-img-p1'>
                         需要建立一套标准后才能执行相关操作
                    </div>
                    <span className={this.props.addFlag?'':'hide'}>
                        <AddProductStandard option={this.state.option} selItemsFlag={this.props.selItemsFlag} allTestItem={this.state.allTestItem} data={this.props.data} url={this.props.url} getAllProductStandard={this.props.getAllProductStandard}/>
                    </span>
                </div>
            }
            </div>
        )
    }
}
export default SelectProductStandard;
