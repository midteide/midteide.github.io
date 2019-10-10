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



import './index.css'


export const Home = () =>   {
    return (
        
        <div>
            <Container className="mb-5">
                <Col xs={12}>
                    <h1>A few of my projects</h1>
                    <p>I have made this website (with React) in order to showcase some of what I have made in the past:</p>
                </Col>
            </Container>
                    
                    <Container>
                <Col xs={12}>
                    <CardDeck>
                    <Card>
                            <Card.Img variant="top" src={require("./assets/cabincontrol/1.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>CabinControl</h3></Card.Title>
                                <Card.Text>
                                    <h5>C/C# project for controlling webcam via servos, getting sensor data (temperatures/snow depth/light levels etc.) and setting target temp inside.</h5>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img variant="top" src={require("./assets/moisturesensor/1.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>Soil moisture sensor</h3></Card.Title>
                                <Card.Text>
                                    <h5>uC circuit used by Norges Vassdrags og Energidirektorat across Norway for early detection of floods.</h5>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img variant="top" src={require("./assets/chessclock/1.jpg")}  />
                            <Card.Body>
                                <Card.Title><h3>Chessclock</h3></Card.Title>
                                <Card.Text>
                                    <h5>
                                        I have made too many electrical circuits with microcontrollers to list them all here, but here is one of them: A Chess Clock
                                    </h5>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                </Col>
            </Container >

            <Container >
            <Col xs={12} md={8}>
            <h1>A few of my projects</h1>
            <p>I have made this website (with React) in order to showcase some of what I have made in the past.</p>
            <Carousel keyboard="true" interval="8000" pauseOnHover="true" fade="true" id="bildekarusell">
            
                <Carousel.Item onClick={ () => window.location = "/cabincontrol"}>
                    <Image 
                    className="d-block w-100"
                    src={require("./assets/cabincontrol/1.jpg")}
                    
                    alt="CabinControl" roundedCircle fluid
                    />
                    
                    {/* <span><h3>CabinControl</h3> */}
                    <Carousel.Caption>
                    <p>C/C# project for controlling webcam via servos, getting sensor data (temperatures/snow depth/light levels etc.) and setting target temp inside.</p>
                    </Carousel.Caption>
                    
                    {/* </span> */}
                    
                </Carousel.Item>
                
                <Carousel.Item onClick={ () => window.location = "/moisturesensor"}>
                <Image
                    className="d-block w-100"
                    src={require("./assets/moisturesensor/1.jpg")}
                    alt="Moisture Sensor"
                    roundedCircle fluid
                    />

                    <Carousel.Caption>
                    {/* <h3><span>Soil moisture sensor</span></h3> */}
                    <p>uC circuit used by Norges Vassdrags og Energidirektorat across Norway for early detection of floods.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item onClick={ () => window.location = "/chessclock"}>
                <Image
                    className="d-block w-100"
                    src={require("./assets/chessclock/1.jpg")}
                    alt="Other projects"
                    roundedCircle fluid
                    />

                    <Carousel.Caption>
                    {/* <h3><span>Chess Clock</span></h3> */}
                    <p>I have made too many things to list them all here, but here is one of them: A Chess Clock</p>
                    
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </Col>
        </Container>
        <br></br>
        </div>
    )
}
