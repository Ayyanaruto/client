import React from "react";
import {connect} from "react-redux"
import flv from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends React.Component{
    constructor(props){
        super(props)
        this.videoRef=React.createRef()
    }
    componentDidMount(){
        const {id}=this.props.match.params
        this.props.fetchStream(id)
        this.buitldPlayer()
        
    }
    componentDidUpdate(){
        this.buitldPlayer()
    }
    componentWillUnmount(){
        console.log("destroyed")
        this.player.destroy()
    }
    buitldPlayer=()=>{
        const {id}=this.props.match.params
        const url=(`http://rtmp-server-ayyan.herokuapp.com/live/${id}.flv`||`http://localhost:8000/live/${id}.flv`)
        if(this.player||!this.props.stream){
            return
        }
        this.player=flv.createPlayer({
            type:'flv',
            url:url
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    render(){
       if(!this.props.stream){
    return "Loading...."
       }else{
    return (
        <div>
        <video ref={this.videoRef} style={{width:"100%"}} controls/>
          <h1>{this.props.stream.title}</h1>
          <h5>{this.props.stream.description}</h5>
        </div>
    )}}
}
const mapStateToProps=(state,ownProps)=>{
    return{
        stream:state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps,{fetchStream})(StreamShow)