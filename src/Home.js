import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import ImageZoom from 'react-medium-image-zoom'



import './index.css'



export const Home = () =>   {
    return (
        
        <div>
            <Container className="mb-5">
                <Col xs={12}>
                
                
      
                    <h1>A few of my projects</h1>
                    <p>I have made this website (with React) in order to showcase some of what I have made in the past,
                        both with React.js, JavaScript, HTML/CSS/Bootstrap and also low-level C programming, C++ and C# .Net. I also have
                        experience with Java programming.
                    </p>
                </Col>
            </Container>
                    
                    <Container>
                    <CardDeck>
                    <Col xs={12} md={6} lg={4}>
                    <Card onClick={ () => window.location = "/cabincontrol"}>
                            <Card.Img variant="top" src={require("./assets/cabincontrol/1.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>CabinControl</h3></Card.Title>
                                <Card.Text>
                                    <h5>C/C# project for controlling webcam via servos, getting sensor data (temperatures/snow depth/light levels etc.) and setting target temp inside.</h5>
                                </Card.Text>
                            </Card.Body>
                            
                        </Card></Col>

                        <Col xs={12} md={6} lg={4}>
                        <Card onClick={ () => window.location = "/moisturesensor"}>
                            <Card.Img variant="top" src={require("./assets/moisturesensor/1.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>Soil moisture sensor</h3></Card.Title>
                                <Card.Text>
                                    <h5>uC circuit used by Norges Vassdrags og Energidirektorat across Norway for early detection of floods.</h5>
                                </Card.Text>
                            </Card.Body>
                            
                        </Card></Col>

                        <Col xs={12} md={6} lg={4}>
                        <Card onClick={ () => window.location = "/chessclock"}>
                            <Card.Img variant="top" src={require("./assets/chessclock/6.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>Chessclock</h3></Card.Title>
                                <Card.Text>
                                    <h5>
                                        I have made too many electrical circuits with microcontrollers to list them all here, but here is one of them: A Chess Clock
                                    </h5>
                                </Card.Text>
                            </Card.Body>
                            
                        </Card></Col>

                        <Col xs={12} md={6} lg={4}>
                        <Card onClick={ () => window.location = "/calculator"}>
                            <Card.Img variant="top" src={require("./assets/calc.png")}  />
                            <Card.Body>
                                <Card.Title><h3>React: Calculator</h3></Card.Title>
                                <Card.Text>
                                    <h5>
                                        In the process of learning React I made this calculator, I will add more React projects involving database and other backend aspects soon.
                                    </h5>
                                </Card.Text>
                            </Card.Body>
                            
                        </Card></Col>

                        <Col xs={12} md={6} lg={4}>
                        <Card onClick={ () => window.location = "/about"}>
                            <Card.Img variant="top d-flex" src={require("./assets/meg.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>Who am I?</h3></Card.Title>
                                <Card.Text>
                                    <h5>
                                    Click here to read more about me.
                                    </h5>
                                </Card.Text>
                            </Card.Body>
                            
                        </Card></Col>


                    </CardDeck>
                
            </Container >

        </div>
    )
}