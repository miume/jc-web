import React from 'react';
import './rawAdd.css';
import {Table,Form,Input} from 'antd';
const data = [];
for(var i = 1; i<=20; i++){
    data.push({
        id:`${i}`,
        materialName:'钴锰矿',
        materialClass:'钴锰矿一号',
        batchNumberId:'ECT/314314',
        quantity:'122',
        weight:'22' ,
        outQuantity:'',
        outWeight:'' 
    })
}
const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
const EditableFormRow = Form.create()(EditableRow);
class RawAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:data
        }
        this.columns = [{
            title:'序号',
            dataIndex:'id',
            key:'id',
            sorter:(a,b)=>a.id-b.id,
            align:'center',
            width:'9%'
        },{
            title:'货物名称',
            dataIndex:'materialName',
            key:'materialName',
            align:'center',
            width:'12%'
        },,{
            title:'货物类型',
            dataIndex:'materialClass',
            key:'materialClass',
            align:'center',
            width:'13%'
        },,{
            title:'批号',
            dataIndex:'batchNumberId',
            key:'batchNumberId',
            align:'center',
            width:'15%'
        },{
            title:'库存数量',
            dataIndex:'quantity',
            key:'quantity',
            align:'center',
            width:'10%'
        },{
            title:'库存重量',
            dataIndex:'weight',
            key:'weight',
            align:'center',
            width:'10%'
        },{
            title:'出库数量',
            dataIndex:'outQuantity',
            key:'outQuantity',
            align:'center',
            width:'15%',
            render:(text,record)=>{return <input defaultValue={text} style={{border:'none',width:'100%',height:'38px'}} placeholder='请输入出库数量' />},
            className:'tdStyle'
            // editable: true
        },{
            title:'出库重量',
            dataIndex:'outWeight',
            key:'outWeight',
            align:'center',
            width:'15%',
            render:(text,record)=>{return <input defaultValue={text} style={{border:'none',width:'100%',height:'38px'}} placeholder='请输入出库重量' />},
            // editable: true,
            className:'tdStyle'

        }]
    }
    /**保存行记录 */
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
      }
    render(){
        const components = {
            body: {
            row: EditableFormRow,
            cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
            return col;
            }
            return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
            }),
            };
        });
 
        return (
            <div style={{height:'400px'}}>
                <Table rowKey={record=>record.id} components={components} columns={columns} dataSource={this.state.dataSource} bordered size='small' scroll={{y:330}} pagination={false} rowClassName={() => 'editable-row'}></Table>
            </div>
        );
    }
}
export default RawAdd;


class EditableCell extends React.Component {
    state = {
      editing: false,
    }
  
    componentDidMount() {
      if (this.props.editable) {
        document.addEventListener('click', this.handleClickOutside, true);
      }
    }
  
    componentWillUnmount() {
      if (this.props.editable) {
        document.removeEventListener('click', this.handleClickOutside, true);
      }
    }
  
    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    }
  
    handleClickOutside = (e) => {
      const { editing } = this.state;
      if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
        this.save();
      }
    }
  
    save = () => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  
    render() {
      const { editing } = this.state;
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        ...restProps
      } = this.props;
      return (
        <td ref={node => (this.cell = node)} {...restProps}>
          {editable ? (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        // rules: [{
                        //   required: true,
                        //   message: `${title} is required.`,
                        // }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                          placeholder={`请输入${title}`}
                        />
                      )}
                    </FormItem>
                  ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
                );
              }}
            </EditableContext.Consumer>
          ) : restProps.children}
        </td>
      );
    }
  }