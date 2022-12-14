import React,{Component} from "react";
import {connect} from 'react-redux';
import {signIn,signOut} from "../actions"

class GoogleAuth extends Component{

componentDidMount(){
    window.gapi.load('client:auth2',()=>{
        window.gapi.client.init(
            {
                        clientId:"1038664385023-gg7fgghkhlfhk72s3ccd6sgg7rlr9g8s.apps.googleusercontent.com",
                        scope:'email',
                        plugin_name:"streamy",
                    }
                        ).then(()=>{
                            this.auth=window.gapi.auth2.getAuthInstance()
                            this.onAuthChange(this.auth.isSignedIn.get())
                            this.auth.isSignedIn.listen(this.onAuthChange)
                         
                           
                        })
    })
}
onAuthChange=(isSignedIn)=>{
    if(isSignedIn){
        this.props.signIn(this.auth.currentUser.get().getId())
    }else{
        this.props.signOut()
    }
}

renderButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  onSignInClick=()=>{
    this.auth.signIn()

}
onSignOutClick=()=>{
    this.auth.signOut()
}

render(){
    return(
        <div >{this.renderButton()}</div>
    )
}
}
const mapStateToProps=(state)=>{

    return{
        isSignedIn:state.auth.isSignedIn
    }
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth) 