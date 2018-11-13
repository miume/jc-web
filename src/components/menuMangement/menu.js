import React from 'react';
import { Table,Input,Icon,Button,InputNumber,Form,Popconfirm,Divider,Modal } from 'antd';
import '../Home/page.css';
import WhiteSpace from '../BlockQuote/whiteSpace';
import DeleteByIds from './deleteByIds';
import BlockQuote from '../BlockQuote/blockquote';
import RoleModal from './roleModal';
import Selected from './select';

const data = [];
const FormItem = Form.Item;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'type') {
      return <Selected />;
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {
          (form) => {
          this.form = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {
                    form.getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })
                  (this.getInput())
                  }
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }
        }
      </EditableContext.Consumer>
    );
  }
}

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
for (let i = 0; i < 46; i++) {
    data.push({
      key: i.toString(),
      sequence:i,
      name: `管理员${i}`,
      type:`Lucy`,
      Fmenu:`New York No. ${i} Lake Park`
    });
}

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
            dataSource : data,
            count : 2,
            searchText: '',
            editingKey: '',
            visible: false,
            roleDescription: '',
            roleName: '',
            selectedRowKeys: [],
    }
      this.columns = [{
        title: '序号',
        dataIndex: 'sequence',
        sorter: (a, b) => a.key - b.key,
        key: 'sequence',
        align:'center',
        width: '20%',
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align:'center',
        editable: 1,
        width: '20%',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="角色名称"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>搜索</Button>
              <Button onClick={this.handleReset(clearFilters)}>重置</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa',fontSize:'18px' }} />,
          onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          render: (text) => {
            const { searchText } = this.state;
            return searchText ? (
              <span>
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                  fragment.toLowerCase() === searchText.toLowerCase()
                    ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                ))}
              </span>
            ) : text;
          },
      },{
        title: '类型',
        dataIndex:'type',
        key: 'type',
        align:'center',
        editable: 1,
        width: '20%',
      },{
        title: '父菜单',
        dataIndex: 'Fmenu',
        key: 'Fmenu',
        align:'center',
        editable: 1,
        width: '20%',
      },{
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align:'center',
        width: '20%',
        render : (text, record) =>  {
          const editable = this.isEditing(record);
            return (
                <span>
                    <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)} okText="确定" cancelText="取消" >
                    <a href="#">删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <span>
                    {editable ? (
                      <span>
                        <EditableContext.Consumer>
                          {form => (
                            <a
                              href="javascript:;"
                              onClick={() => this.save(form, record.key)}
                              style={{ marginRight: 8 }}>保存</a>
                          )}
                        </EditableContext.Consumer>
                        <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}  okText="确定" cancelText="取消" >
                          <a>取消</a>
                        </Popconfirm>
                      </span>
                    ) : (
                      <a onClick={() => this.edit(record.key)}>编辑</a>
                    )}
                  </span>
                </span>
            );
          }
      },];
  }
  rowSelected(selectedRowKeys){
    this.setState({
      selectedIds: selectedRowKeys
    });
  }
  /**实现全选 */
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys:selectedRowKeys }); 
}
  /**处理删除 */
  handleDelete = (key) => {
    const dataSource = this.state.dataSource;
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  /**处理新增一条记录 */
  handleAdd = () => {
    this.setState({
      visible: true
    });
  }
  handleOk() {
    console.log(this.formRef.getItemsValue());
    this.setState({
      visible: false
    });
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = this.state.dataSource;
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ dataSource: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };
       /**实现字段搜索功能 */
        handleSearch = (selectedKeys, confirm) => () => {
          confirm();
          this.setState({ searchText: selectedKeys[0] });
      }
        handleReset = clearFilters => () => {
          clearFilters();
          this.setState({ searchText: '' });
      }
    render() {
      const rowSelection = {
        onChange: this.onSelectChange,
        onSelect() {
            // console.log(record, selected, selectedRows);
        },
        onSelectAll() {
            // console.log(selected, selectedRows, changeRows);
        },
      };
      const pagination = {
        total: data.length,
        showSizeChanger: true,
        onShowSizeChange(current, pageSize) {
          console.log('Current: ', current, '; PageSize: ', pageSize);
        },
        onChange(current) {
          console.log('Current: ', current);
        }
      };
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const tabs = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'type' ? 'type' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
        return (
            <div>
              <BlockQuote name="菜单管理"></BlockQuote>
                <div className="fl">
                <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={() => this.handleAdd()} >新增</Button>
                    <Modal title="新增" visible={this.state.visible}
                          onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                          footer={[
                            <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                            <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>
                          ]}>
                          <RoleModal wrappedComponentRef={(form) => this.formRef = form}></RoleModal>
                    </Modal>
                    <DeleteByIds selectedRowKeys={this.state.selectedRowKeys} />
                </div>
                <WhiteSpace></WhiteSpace>
                
                <Table rowSelection={rowSelection} columns={tabs} pagination={pagination} dataSource={this.state.dataSource} components={components} scroll={{ y: 400 }} size="small" bordered />
            </div>

        );
    }
}
export default Menu;