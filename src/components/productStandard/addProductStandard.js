import React from 'react';
class AddProductStandard extends React.Component{
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOkApply = this.handleOkApply.bind(this);
        this.handleCancelApply = this.handleCancelApply.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.urgentChange = this.urgentChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.dataProcessing = this.dataProcessing.bind(this);
    }
     /**对数据进行处理 */
     dataProcessing(data){
        for(var i = 0; i < data.length; i++){
            data[i].unit = 'kg';
            data[i]['index']=`${i+1}`;
            data[i]['testResult']=''
        }
        this.setState({
            allTestItem:data
        })
    }
    /**监控新增标准 生效时间的选取 */
    dateChange(value){
        console.log(value);
        this.setState({
            date:value
        })
    }
    render(){
        return (
            <Modal title='新增标准' visible={this.state.visible} closable={false}
                maskClosable={false} 
                footer={[
                <CancleButton key='back' handleCancel={this.handleCancel}/>,
                <SaveButton key='save' handleSave={this.handleSave} />,
                <Submit key='submit' visible={this.state.visible1} handleVisibleChange={this.handleVisibleChange} selectChange={this.selectChange} urgentChange={this.urgentChange} url={this.props.url} process={this.state.process} handleCancel={this.handleCancelApply} handleOk={this.handleOkApply}/> 
            ]}>
                <div>
                    <div>
                        <div>{`产品`}</div>
                        <div>{`型号`}</div>
                    </div>
                <div style={{height:'350px'}}>
                        <Table className='stock-out' rowKey={record=>record.id} columns={this.columns} dataSource={this.state.allTestItem} pagination={false} size='small' bordered scroll={{y:216}}></Table>
                </div>
                <DatePicker placeholder='请选择生效日期' onChange={this.dateChange}/>
                </div>
                    
                </Modal>
        )
    }
}
export default AddProductStandard;