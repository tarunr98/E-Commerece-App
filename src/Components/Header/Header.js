import React, { Component } from 'react'
import styles from './Header.module.css';
import { Switch, Navigate } from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
export class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
             redirectCart:false,
             home:false,
             user:{},
             authState:"",
             logOut:false,
        }
    }


    componentDidMount(){
      if(this.props.user){
        this.setState({
          user:this.props.user,
          authState : this.props.authState,
        })
      }
      console.log(this.props.user);
    }

    componentDidUpdate(){
      if(this.props.user&&
        this.props.user.signInUserSession&&!_.isEmpty(this.state.user)){
        this.setState({
          user:this.props.user,
        })
      }
    }

    homeComponent = () =>{
        this.setState({
          home: true,
        });
      }

      redirectHomeComponent = () =>{
        if(this.state.home){
          return <Navigate to ={{
            pathname:'/user',
            state:{
                  showProducts:false,
                  user : this.props.user,
                  authState : this.props.authState,
            }
          }}/>
        }
      }

      cartComponent = () =>{
        this.setState({
          redirectCart:true,
        });
      }

    redirectCartComponent = () =>{
      if(this.state.redirectCart){
        return <Navigate to ={{
          pathname:'/cart',
          state:{
            user : this.props.user,
            authState : this.props.authState,
          }
        }}/>
      }
    }

    renderLogOut = () => {
      this.setState({
        logOut : true,
      })
    }
    renderRedirect = () => {
      if (this.state.logOut) {
        localStorage.clear();
        this.props.cleardata();
        return <Navigate to='/' />
      }
    }
    render() {
        return (
            <div className  = {styles.container}>
            <ul className = {styles.unorderedlist}>
              {this.renderRedirect()}
              <li className = {styles.logOut}><button onClick={this.renderLogOut}>Logout</button></li>  
              {this.redirectCartComponent()}
              <li className = {styles.cartComponent}><button onClick={this.cartComponent}>View Cart</button></li>
              <li className = {styles.listitem}><p>{this.props.user&&this.props.user.username?this.props.user.username:undefined} &emsp; </p></li>
              {this.redirectHomeComponent()}
              <li className = {styles.homeComponent}><button onClick={this.homeComponent}>Home</button></li>
            </ul>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      cleardata:()=> dispatch({type:"CLEAR_DATA"}),
    }
  }
  

export default connect(null, mapDispatchToProps)(Header)