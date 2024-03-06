import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {Row, Col} from "reactstrap";
import styles from './LoginPage.module.css';
// import AuthStateApp from './JWT'; 
import {Navigate} from 'react-router-dom';
import Marquee from 'react-double-marquee';
export class LoginPage extends Component {

    redirectUser = () => {
        return <Navigate to = {{
            pathname : '/user',
            state : {
                user : this.props.user,
                authState : this.props.authState,
            }
        }} />
    }

    render() {
        if(this.props.user&&
            this.props.user.signInUserSession&&
            this.props.user.signInUserSession.idToken){
                return(<div>
                {this.redirectUser()}
                </div>)
                }
        else{
        return (
            <div >
                <div className={styles.mainContainer}>
                <div className = {styles.marquee}>
                    <Marquee
                        direction="left"
                        
                        >
                        Dont missout Exciting offers on our Great Big Billion Festival !!! Login/Register to avail Amazing offers 
                    </Marquee>
                </div>
                </div>
                <Row className={styles.table}>
                    <Col>
                    <div>
                <Carousel className={styles.carousel}>
                        <Carousel.Item interval={1000}>
                        <img alt="" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/special-sale-social-media-post-template-design-9cad5e7ba8cb34be83768eb53870cc80.jpg?ts=1584372080" />
                        </Carousel.Item >
                        <Carousel.Item interval={1000}>
                        <img alt="" src="https://thumbs.dreamstime.com/z/diwali-sale-poster-banner-bumper-offer-biggest-flyer-bumper-dhamaka-discount-upto-off-vector-illustration-creative-lit-76361555.jpg" />
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                        <img alt="" src="https://img.freepik.com/free-vector/sale-banner-template-design_74379-121.jpg?size=626&ext=jpg" />
                        </Carousel.Item>
                </Carousel>
                </div>
                </Col>
                {/* <Col>
                    <AuthStateApp/>
                    </Col> */}
                </Row>
            </div>
        )
}
    }
}
export default LoginPage;
