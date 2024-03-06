import React, { Component } from 'react'
import styles from './Cart.module.css';
import {connect} from 'react-redux';
import { Header } from '../index';
import _ from 'lodash';
import {CartItems} from './CartItems';
import { Button } from 'react-bootstrap';
import loadingGif from './832.gif';
export class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products : [],
             loading : true,
             user:{},
             authState : "",
        }
    }

    componentDidMount(){
        if( this.props.history.location&&
            this.props.history.location.state&&
            this.props.history.location.state.user){
            // console.log(this.props.history.location.state.user);
            let jwtToken = {
                userId : this.props.history.location.state.user.signInUserSession.idToken.jwtToken
            }
            this.setState({
                user : this.props.history.location.state.user,
                authState : "signedin",
            })
            // console.log(jwtToken)
            this.props.getCartItems(jwtToken);
        }
    }

    componentDidUpdate(prevProps){
        if((_.isEmpty(this.state.products)&&!_.isEmpty(this.props.getCartItemData))||prevProps.getCartItemData!== this.props.getCartItemData){
            console.log(this.props.getCartItemData);
            this.setState({
                products : this.props.getCartItemData,
                loading : false,
            })
            // if(this.props.getCartItemData.length===0){
        //     alert("There are no products go and add some products..");
        //     this.props.getCartItemData=undefined;
        // }
        }
        if(this.props.deleteCartItemData&&this.props.deleteCartItemData.status&&this.props.deleteCartItemData.status ===200){
            console.log(this.props.deleteCartItemData.data);
        }
        // if(this.props.getCartItemData.length===0){
        //     alert("There are no products go and add some products..");
        //     this.props.getCartItemData=undefined;
        // }
    }

    onDelete = (productId) => {
        var data = {
            productId : productId,
            userId : this.state.user.signInUserSession.idToken.jwtToken,
        }
        this.props.deleteCartItem(data);
    }
    
    onCheckOut = () => {
        this.props.history.push({
            pathname: '/checkOut',
            state:{
                user : this.state.user,
                products : this.state.products,
            }
        })
    }

    onDeleteCart = () => {
        var data = {
            userId : this.state.user.signInUserSession.idToken.jwtToken,
        }
        this.props.deleteCartItem(data);
    }

    goHome = () =>{
        if(this.state.user){
        this.props.history.push({
            pathname : '/user',
            state:{
                          showProducts:false,
                          user : this.state.user,
                          authState : this.state.authState,
                    }
        })
        }
    }

    render() {
        const { products , user , authState} = this.state;
        return (
            <div>
                <Header 
                    user = {user}
                    authState = {authState}
                    />
                    {products&&products.length===0?(
                    <div>There are no products in your cart want to
                         <button 
                         className={styles.home} 
                         onClick = { ()=> { this.goHome(); } }
                         >add some?</button>
                    </div>
                ):(
                    <>
                    {products&&products.length?(
                    products.map((product,index)=>
                   (
                       <CartItems 
                       product = {product}
                       key = {index}
                       user = {user}
                       />
                 ))):(<div>loading</div>)}
                 {products&&products.length?(<ul className={styles.ul}>
                        <li className = {styles.li}>
                            <Button 
                                variant = "success"
                                onClick = { ()=> { this.onCheckOut(); } }
                                className = {styles.checkOut}
                            >Check Out</Button>
                        </li>
                        <li className = {styles.li}>
                            <Button
                                variant = "danger"
                                onClick = { ()=> { this.onDeleteCart(); } }
                                className = {styles.deleteCart}
                            >Delete Cart</Button>
                        </li>
                    </ul>):(
                     <div><img src={loadingGif} alt="loader"/></div>
                    )}
                    </>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCartItems : (userId) => dispatch({ type:"GET_CART_ITEMS" , payload:userId }),
        deleteCartItem : (data) => dispatch({ type: "DELETE_CART_ITEM" , payload:data}),
    }
}

const mapStateToProps = (state) => {
    return {
        getCartItemData : state.reducer.getCartItemData,
        deleteCartItemData : state.reducer.deleteCartItemData,
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Cart);
