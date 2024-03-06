import React, { Component } from 'react'
import {  Card, Button , Row, Col} from 'react-bootstrap';
import styles from './ProductItem.module.css';
import cartLogo from './trolleyCart.png';
import {connect} from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import loadingGif from '../832.gif';
import ShowMoreText from "react-show-more-text";
export class ProductItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:{},
             user:{},
             loading : false,
             flag : 1,
             expand : false,
        }
    }
    
    componentDidMount(){
        if(this.props.product)
        {
            this.setState({
                product:this.props.product
            })
        }
    }

    componentDidUpdate(){
        if(this.props.addCartItemDataErrors){
            // alert(this.props.addCartItemDataErrors.data);
            console.log(this.props.addCartItemDataErrors);
        }
        if(this.props.addCartItemData && this.state.flag===1){
            alert(this.props.addCartItemData);
            this.setState({
                flag : 2,
                loading : false,
            })
        }
    }

    onBuy = () => {
        console.log("Buy clicked"+this.state.product.productId);
        let products = [this.state.product]
        if(products){
            console.log(this.props.user);
        this.props.history.push({
                pathname : '/checkOut',
                state:{
                        user : this.props.user,
                          products : products
                        }
            })
        }
        }

    onAddToCart = () => {
        var data = {
            productId : {productId : this.state.product.productId,},
            userId : {
            userId : this.props.user.signInUserSession.idToken.jwtToken?this.props.user.signInUserSession.idToken.jwtToken:undefined,
            },
        }
        console.log(data)
        this.props.addCartItem(data);
        this.setState({
            loading : true,
        })
    }

    onExpand = () => {
        this.setState({
            expand : !this.state.expand,
        })
    }
    render() {
        const {product , expand , loading }=this.state;
        return (<>
            {loading?(
                <div><img src={loadingGif} alt="loader"/></div>
            ):( 
            <div className={styles.outer}>
                <div className={styles.inner}>
                    <Card className={styles.card}>
                    <Card.Body>
                        <Row className={styles.row}>
                        <Col md ={6}>
                            <img src={product.imageUrl} alt ="product images" className={styles.productImage}/>
                        </Col>
                        <Col md ={6}>
                        <ul className={styles.ul}>
                            <li><b>Name&emsp;&emsp;&ensp;&nbsp;:&nbsp;</b>{product.productName}</li>
                            <li><b>Description:&nbsp;</b><ShowMoreText
                                    lines={3}
                                    more={"Show More"}
                                    less={"Show Less"}
                                    onClick={()=>{this.onExpand();}}
                                    expanded={expand}
                                >{product.description}
                                </ShowMoreText>
                            </li>
                            <li><b>Price&emsp;&emsp;&emsp;&nbsp;:&nbsp;</b>{product.priceValue}</li>
                            <li>
                                <Button className={styles.buy}
                                    onClick={ () => {this.onBuy();}}>Buy</Button>&emsp;
                                <button className={styles.cart} onClick={()=>{this.onAddToCart();}}>
                                <img src={cartLogo}
                                    alt="cart"
                                /></button>
                            </li>
                        </ul>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </div>
            </div>)}
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCartItem:(data) => dispatch({type: "ADD_CART_ITEM" ,payload:data }),
    }
}

const mapStateToProps = (state) => {
    return {
        addCartItemData : state.reducer.addCartItemData,
        addCartItemDataErrors : state.reducer.addCartItemDataErrors,
    }
}
export default connect(mapStateToProps , mapDispatchToProps)((ProductItem));
