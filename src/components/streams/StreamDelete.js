import React from "react";
import {connect} from "react-redux"


import Modal from "../Modal"
import history from "../../history";
import {fetchStream,deleteStream} from "../../actions"
import { Link } from "react-router-dom";

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }
   actions=()=>{
    const {id}=this.props.match.params
        return(
            <React.Fragment>
                <button onClick={()=>{this.props.deleteStream(id)}}className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }
    renderContent=()=>{
        if(!this.props.stream){
            return 'Are you Sure, You want to delete this stream'
        }else{
            return `Are you Sure? , You want to delete this stream with title:${this.props.stream.title}`
        }
    }
    render(){
    return (
        <div>StreamDelete
        <Modal
            header="Delete Stream"
            content={this.renderContent()} 
            onDismiss={()=>{history.push("/")}}
            actions={this.actions}
        />

        </div>
       
    )}
}
const mapStateToProps=(state,ownProps)=>{
    return {
        stream:state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete)