import React, { Component } from 'react'
import { Card, Button , Row , Col} from 'reactstrap';
import styles from './CartItems.module.css';
import {connect} from 'react-redux';
import ShowMoreText from "react-show-more-text";
export class CartItems extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product : {},
             expand : false,
        }
    }
    
    componentDidMount(){
        if(this.props.product){
            this.setState({
                product : this.props.product,
            })
        }
    }

    onDelete = () => {
        console.log(this.state.product.productId)
        var data = {
            productId : {productId : this.state.product.productId,},
            userId : {
            userId : this.props.user.signInUserSession.idToken.jwtToken?this.props.user.signInUserSession.idToken.jwtToken:undefined,
            },
       }
       console.log(data);
       this.props.deleteCartItem(data);
    }

    onExpand = () => {
        this.setState({
            expand : !this.state.expand,
        })
    }

    render() {
        const { product , expand } = this.state;
        return (
            <div>
                <Card>
                <Row>
                        <Col md ={6}>
                            <img src={product.imageUrl} alt ="product images" className = {styles.productImage}/>
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
                                    <li><b>Price&emsp;&emsp;&emsp;&nbsp;:&nbsp;</b>{product.totalPrice}</li>
                                    <li>
                                        <Button 
                                            color = "primary"
                                            onClick={()=>{this.onDelete();}}
                                        >Delete Item</Button>
                                    </li>
                                </ul>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCartItem : (data) => dispatch({ type: "DELETE_CART_ITEM" , payload:data}),
    }
}

const mapStateToProps = (state) => {
    return {
        deleteCartItemData : state.reducer.deleteCartItemData,
        deleteCartItemDataErrors : state.reducer.deleteCartItemDataErrors,
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(CartItems);
