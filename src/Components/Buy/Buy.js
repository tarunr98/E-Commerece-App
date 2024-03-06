import React, { Component } from 'react';
import styles from './Buy.module.css';
import { Field, reduxForm } from 'redux-form';
import { required , maxLength50 , maxLength25 , maxLength6 , maxLength20 , text , phoneNumber } from '../Validations';
import { Row , Col , Button , Modal , ModalHeader, ModalBody, Card } from 'reactstrap';
import { renderField } from '../RenderFormComponents/RenderFormComponents';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Header } from '../index';
import moment from 'moment';
export class Buy extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             products : [],
             showModal : false,
             user : {},
             authState : "",
             userAddresses : [],
             loading : true,
             delivery : false,
             deliveryAddress : null,
        }
    }
    
    componentDidMount(){
        if(this.props.history&&
            this.props.history.location&&
            this.props.history.location.state&&
            this.props.history.location.state.user){
                console.log(this.props.history.location.state.user.signInUserSession);
                let jwtToken = {
                    userId : { userId : this.props.history.location.state.user.signInUserSession.idToken.jwtToken},
                }
                this.setState({
                    user : this.props.history.location.state.user,
                    authState : "signedin",
                    products : this.props.history.location.state.products,
                })
                this.props.getUserAddress(jwtToken);
            }
    }

    componentDidUpdate(prevProps){
        if((_.isEmpty(this.state.userAddresses)&&!_.isEmpty(this.props.getUserAddressData))||prevProps.getUserAddressData!== this.props.getUserAddressData){
            console.log(this.props.getUserAddressData);
            this.setState({
                userAddresses : this.props.getUserAddressData,
                loading : false,
            })
        }
        if(this.props.getUserAddressData&&this.props.getUserAddressData.length===0){
            this.toggleModal();
        }
        if(this.props.postUserOrderData){
            console.log("Here");
            console.log(this.props.postUserAddressData.data);
        }
        // if(this.props.getUserAddressDataErrors){
        //     alert(this.props.getUserAddressDataErrors);
        //     this.props.getUserAddressDataErrors = null;
        // }
        // if(this.props.postUserAddressDataErrors){
        //     alert(this.props.postUserAddressDataErrors);
        //     this.props.postUserAddressDataErrors = null;
        // }
    }

    checkOut = () => {
        if(this.state.deliveryAddress&&this.props.getUserAddressData[this.state.deliveryAddress-1]){
        this.setState({
            delivery : true,
        })
        console.log(moment().format());
        let data = {
            data :{
                orderStatus : "Ordered",
                addressId : this.state.deliveryAddress,
                orderDate : moment().format(),
            },
            userId : {
                userId : this.state.user.signInUserSession.idToken.jwtToken,
            },
        }
        console.log(data);
        this.props.postUserOrder(data);
    }
    else {
        alert("please select a delivery address");
    }
    }

    toggleModal = e => {
        this.setState({
          showModal:!this.state.showModal
        })
    }

    handleChange = (e) => {
        console.log("triggered");
        console.log(e.target.value)
        this.setState({
            deliveryAddress : e.target.value,
        })
      }

      submitAddress = (values) => {
          console.log(values);
          let data = {
              deliveryAddress : values,
              userId : { userId : this.props.history.location.state.user.signInUserSession.idToken.jwtToken},
          }
          console.log(data);
          this.props.postUserAddress(data);
      }

    render() {
        const { userAddresses , products , delivery , user , authState } = this.state;
        return (
            <>
            <Header 
                    user = {user}
                    authState = {authState}
                    />
            {delivery?(
                <div>
                    Your Order is successful and will be delivered within 3 days..!
                    Please keep the required change at the time of delivery,
                </div>
            ):(
            <div className = {styles.outer} >
                <div className={styles.productsDiv}>
                <Card className={styles.productsCard}>
                {products.map(function(prod , idx){
                    return (
                        <ul className = {styles.products} key = {idx} >
                            <li>{prod.productName}</li>
                        </ul>
                    )
                })}
                </Card>
                </div>
                <div className={styles.address}>
                <Card className={styles.card}>
                 <div onChange={this.handleChange}>
                     {userAddresses.length>0?(
                         userAddresses.map(function(add, idx){
                        return (<ul className={styles.ul} key={idx} >
                        <li><input type =  "radio" value = {add.addressId} name = "deliveryAddress" /><b>{add.name}</b> {add.address1}&nbsp;{add.state}</li>
                        </ul>
                        )
                    })
                    ):(
                        <div>Please add an address to continue</div>
                    )}
                    
                  </div>
                </Card>
                    <ul className={styles.ul1}>
                        <li>
                        <Button
                            onClick = {this.checkOut}
                            color = "success"
                        >Check Out</Button>
                        </li>
                        <li>
                        <Button 
                            onClick = {this.toggleModal}
                            color = "primary"
                        >Add address</Button>
                        </li>
                        
                    </ul>
                </div>
                
                <div className = {styles.inner} >
                <Modal isOpen = {this.state.showModal} toggle = {()=>{this.toggleModal()}}>
                    <ModalHeader>Enter Address details</ModalHeader>
                    <ModalBody>
                        <form onSubmit = {this.props.handleSubmit(this.submitAddress)} className={styles.form}>
                        <Row className={styles.row} >
                            <Col md={6} >
                                <Field 
                                    name = "name"
                                    label = "Your Name:"
                                    value = {this.state.name}
                                    component = {renderField}
                                    validate = {[ required , maxLength20 ]}
                                    type = "text"
                                    placeholder = "Recepients Name"
                                />
                            </Col> 
                            <Col md={6} >
                                <Field 
                                    name = "phone"
                                    label = "Mobile Number:"
                                    value = {this.state.phone}
                                    component = {renderField}
                                    validate = {[ required , phoneNumber ]}
                                    type = "text"
                                    placeholder = "10 digit phone number"
                                /> 
                            </Col>
                        </Row>
                        <Row className={styles.row} >
                            <Col md={6} >
                                <Field 
                                    name = "address1"
                                    label = "D.No/Flat No:"
                                    value = {this.state.address1}
                                    component = {renderField}
                                    validate = {[ required , maxLength50 ]}
                                    type = "text"
                                    placeholder = "Dalal street/Ocena view apartment..."
                                />
                            </Col> 
                            <Col md={6} >
                                <Field 
                                    name = "address2"
                                    label = "Land Mark/Street:"
                                    value = {this.state.address2}
                                    component = {renderField}
                                    validate = {[ required , maxLength50 ]}
                                    type = "text"
                                    placeholder = "Xyz Hotel , Beside Abc showroom...."
                                /> 
                            </Col>
                        </Row>
                        <Row className={styles.row} >
                            <Col md={6} >
                                <Field 
                                    name = "state"
                                    label = "State:"
                                    value = {this.state.state}
                                    component = {renderField}
                                    validate = {[ required , maxLength25 , text ]}
                                    type = "text"
                                    placeholder = "State Name"
                                /> 
                            </Col> 
                            <Col md={6} >
                                <Field 
                                    name = "city"
                                    label = "City Name"
                                    value = {this.state.city}
                                    component = {renderField}
                                    validate = {[ required , maxLength50 , text ]}
                                    type = "text"
                                    placeholder = "City Name"
                                /> 
                            </Col>
                        </Row>
                        <Row className={styles.row} >
                            <Col md={6} >
                                <Field 
                                    name = "pinCode"
                                    label = "PIN Code"
                                    value = {this.state.address1}
                                    component = {renderField}
                                    validate = {[ required , maxLength6 ]}
                                    type = "number"
                                /> 
                            </Col>
                        </Row>
                        <Button
                            type="submit" 
                            className={styles.button}
                            color = "primary"
                            >Save</Button>
                    </form>
                    </ModalBody>
                </Modal>
                </div>
            </div>
            )}</>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserAddress : (data) => dispatch({ type : "GET_USER_ADDRESS" , payload : data }),
        postUserAddress : (data) => dispatch({ type : "POST_USER_ADDRESS" , payload : data }),
        postUserOrder : (data) => dispatch({ type : "POST_USER_ORDER" , payload : data }),
    }
}

const mapStateToProps = (state) => {
    return {
        getUserAddressData : state.reducer.getUserAddressData,
        getUserAddressDataErrors : state.reducer.getUserAddressDataErrors,
        postUserAddressData : state.reducer.postUserAddressData,
        postUserAddressDataErrors : state.reducer.postUserAddressDataErrors,
        postUserOrderData : state.reducer.postUserOrderData,
        postUserOrderDataErrors : state.reducer.postUserOrderDataErrors,
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(reduxForm({
    form : 'address'
})(Buy))
