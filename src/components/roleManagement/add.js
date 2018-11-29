import React from 'react';
class Add extends React.Component{
    render() {
        return (
            <div>
                <Button type="primary" size="small" style={{marginRight:'15px'}}  onClick={() => this.handleAdd()} >新增</Button>
                <Modal title="新增" visible={this.state.visible}
                    onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={() => this.handleOk()}>确 定</Button>,
                        <Button key="back" type="ghost" size="large" onClick={() => this.handleCancel()}>返 回</Button>]}>
                        <RoleModal wrappedComponentRef={(form) => this.formRef = form}></RoleModal>
                </Modal>
            </div>
        );
    }
}
export default Add;