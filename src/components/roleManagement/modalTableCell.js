import React from 'react';

class EditableCell extends React.Component {
    state = {
        editing: false,
    };
    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        <td style={{bgcolor:'red',color:'white'}}>
            {title}
        </td>
    }
}

export default EditableCell