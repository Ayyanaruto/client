import React,{Component} from "react";
import {Field,reduxForm} from 'redux-form'





class StreamForm extends Component{
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
    
    renderInput=({input,label,meta})=>{
        const className=`field ${meta.error&&meta.touched ? 'error':''}`
        return(
            <div className={className}>
                {label}
                <input {...input} />
                {this.renderError(meta)}
            </div>
            
        )
    }
    onSubmit=(values)=>{
        this.props.onSubmit(values)
       
    }

    render(){
        return (
       
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="title" component={this.renderInput} label="Enter the Title"/>
            <Field name="description" component={this.renderInput} label="Enter the description"/>
            <button className="ui primary button">Submit</button>
        </form>
        
         )}
}
const validate=(formValues)=>{
const error={}
if(!formValues.title){
    error.title="Please add a Title"
} 
if(!formValues.description){
    error.description="Please add a Description"
}
return error
}
export default reduxForm({
    form:'streamCreate',
    validate
}
)(StreamForm)
