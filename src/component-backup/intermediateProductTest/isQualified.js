import React from 'react';

class IsQualified extends React.Component {
    render() {
        switch(this.props.status) {
            case 0:
                return(

                    <div style={{border:'3px solid #FF3B30',width:'200px',float:'right'}}>
                        <span style={{display:'block',textAlign:'center',height:'50px',border:'1px solid #FF3B30',color:'#FF3B30',margin:'2px',fontSize:'30px'}}>不合格</span>
                    </div>
                )
                break;
            case 1:
                return(
                    <div style={{border:'3px solid #4BD863',width:'200px',float:'right'}}>
                        <span style={{display:'block',textAlign:'center',height:'50px',border:'1px solid #4BD863',color:'#4BD863',margin:'2px',fontSize:'30px'}}>合格</span>
                    </div>
                )
                break;
        }
    }
}

export default IsQualified