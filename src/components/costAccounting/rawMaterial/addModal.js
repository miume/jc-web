import React from 'react';
import NewButton from "../../BlockQuote/newButton";

class AddModal extends React.Component {
    componentWillUnmount() {
        this.setState(() => {
            return;
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        return (
            <span className={this.props.flag? '' : 'hide'}>
                <NewButton name={'新增'} className={'fa fa-plus'}/>
            </span>
        )
    }
}

export default AddModal
