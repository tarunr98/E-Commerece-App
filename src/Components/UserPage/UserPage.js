import React, { Component } from 'react'
import {Card , Button, Row, Col } from 'react-bootstrap';
import styles from './UserPage.module.css';
import {ProductItem , Header} from '../index';
import {connect} from 'react-redux';
import _ from 'lodash';
import loadingGif from '../832.gif';
export class UserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
             showProducts:false,
             products:[],
             user : {},
             loading : true,
             flag : 1,  
        }
    }
    
    componentDidMount(){
        if(this.props.history&&
            this.props.history.location&&
            this.props.history.location.state.user
            ){
                this.setState({
                    user : this.props.history.location.state.user,
                    authState : this.props.history.location.state.authState,
                    loading : false,
                })
            }
        if(this.props.history&&
            this.props.history.location&&
            this.props.history.location.state&&
            this.props.history.location.state.showProducts){
                this.setState({
                    showProducts : this.props.history.location.state.showProducts,
                })
            }
    }

    componentDidUpdate(prevProps){
        if((_.isEmpty(this.state.products)&&!_.isEmpty(this.props.productsData))||prevProps.productsData!== this.props.productsData){
            this.setState({
                products : this.props.productsData,
                loading : false,
                showProducts : true,
                flag : 1,
            })
        }
        if(this.props.history&&
            this.props.history.location&&
            this.props.history.location.state&&
            this.props.history.location.state.showProducts){
                this.setState({
                    showProducts : this.props.history.location.state.showProducts,
                })
            }
        if(this.props.productsDataErrors && this.state.flag===1){
            alert("There is some error at the time ... sorry for inconvience");
            this.setState({
                loading : false,
                flag : 2,
            })
        }
    }

onExplore = (category) =>{
 
    var data ={
        category : category,
        jwtToken : this.state.user.signInUserSession.idToken.jwtToken,
        authState : this.state.authState,
    }
    console.log(data);
    this.props.getProductsData(data);
    this.setState({
        loading : true,
    })
}

    render() {

        const {products , showProducts , user , authState , loading } = this.state;

        return (
            <div className={styles.outer}>
                <Header 
                    user={user}
                    authState = {authState}
                    />
                {loading?(
                    <div><img src={loadingGif} alt="loader"/></div>
                ):(
                <div>
                   {showProducts&&products&&products.length
                   ?(products.map((product,index)=>
                   (<ProductItem
                   product = {product}
                   key = {index}
                   user = {user}
                   />)))
                   :(<div>
                   <Row className={styles.row}>
                    <Col sm="6">
                        <Card className={styles.card}>
                            <Card.Img variant="top" width="20%" src="https://www.polytechnichub.com/wp-content/uploads/2017/04/Electronic.jpg" alt="Electronics" />
                            <Card.Body>
                            <Card.Title tag="h5">Electronics</Card.Title>
                            <Card.Subtitle tag="h6" className="mb-2 text-muted">Phones, Tablets , Laptops</Card.Subtitle>
                            <Card.Text>You can buy all Electronics here</Card.Text>
                            <Button variant = "primary"
                                onClick={ () => {this.onExplore("Electronics");}}>Explore
                            </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card className={styles.card}>
                            <Card.Img width="20%" src="https://cdn.home-designing.com/wp-content/uploads/2019/03/wooden-wall-decor.jpg" alt="Home Accessories" />
                            <Card.Body>
                            <Card.Title tag="h5">Home Accessories</Card.Title>
                            <Card.Subtitle tag="h6" className="mb-2 text-muted">Furniture, Appliances , utilities</Card.Subtitle>
                            <Card.Text>You can buy all Home Appliances & Accessories here</Card.Text>
                            <Button
                                onClick={ () => {this.onExplore("HomeAppliances");}}>Explore
                            </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    <Row className={styles.row}>
                    <Col sm="6">
                        <Card className={styles.card}>
                            <Card.Img width="20%" src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://vivecosmetic.com/wp-content/uploads/2019/12/Baby-Care-Products-Manufacturers.jpg" alt="Baby Care" />
                            <Card.Body>
                            <Card.Title tag="h5">Baby Care</Card.Title>
                            <Card.Subtitle tag="h6" className="mb-2 text-muted">Toys, Diapers , Lotions</Card.Subtitle>
                            <Card.Text>You can buy all Baby care items here</Card.Text>
                            <Button
                                onClick={ () => {this.onExplore("Babycare");}}>Explore
                            </Button>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col sm="6">
                        <Card className={styles.card}>
                            <Card.Img width="20%" src="https://media.istockphoto.com/photos/set-of-hand-various-work-tools-on-grey-background-picture-id596042932?k=6&m=596042932&s=612x612&w=0&h=OGlk6A1nPVliPA8um5gESqXO1K7LWW1_cmKvLLOi0c0=" alt="Fashion" />
                            <Card.Body>
                            <Card.Title tag="h5">Tools</Card.Title>
                            <Card.Subtitle tag="h6" className="mb-2 text-muted">Jeans, Linen , Cotton</Card.Subtitle>
                            <Card.Text>You can buy all tools required for your daily life here</Card.Text>
                            <Button 
                                onClick={ () => {this.onExplore("Tools");}}>Explore
                            </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    </div>
                    )}
                 </div>
                 )}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getProductsData:(data) => dispatch({type: "GET_PRODUCTS_DATA" , payload: data }),
    }
}

const mapStateToProps = (state) => {
    return {
        productsData : state.reducer.productsData,
        productsDataErrors : state.reducer.productsDataErrors,
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (UserPage);
