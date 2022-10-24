import React,{Component} from "react";
import {connect} from "react-redux"

import StreamForm from "./StreamForm";
import { createStream } from "../../actions";

class StreamCreate extends Component{
    renderError({touched,error}){
        if(touched&&error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }
    
    
    onSubmit=(values)=>{
        this.props.createStream(values)
       
    }
    render(){
        return (
            <div>
                <h3>Create A Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
       
         )}
}



export default connect(null,{createStream})(StreamCreate)