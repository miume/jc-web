import React from 'react';
import { Transfer,Modal } from 'antd';

class UserManagement1 extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
    visible: false
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  componentDidMount() {
    this.getMock();
  }
  
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  }

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  }

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  }
  
  render() {
    return (
        <span>
          <a onClick={this.showModal} value={this.state.value}>成员管理</a>
          <Modal title="设置角色" visible={this.state.visible}
            onOk={this.handleOk} onCancel={this.handleCancel}
            okText="确定" cancelText="取消">
            <Transfer
                dataSource={this.state.mockData}
                listStyle={{
                width: 300,
                height: 300,
                }}
                titles={['为分配角色', '已分配角色']}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={this.renderItem}
            />
            </Modal>
        </span>
      
    );
  }
}
export default UserManagement1;

