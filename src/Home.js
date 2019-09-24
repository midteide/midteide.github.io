import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'



export const Home = () =>   {
    return (
        
        <div>
            <Container>
            <Col xs={12} md={8}>
            <h1>A few of my projects</h1>
            <p>I have made this website (with React) in order to showcase some of my projects.</p>
            <Carousel pauseOnHover="true" fade="true">
                
                <Carousel.Item onClick={ () => window.location = "/cabincontrol"}>
                    <img
                    className="d-block w-100"
                    src={require("./assets/cabincontrol/1.jpg")}
                    
                    alt="CabinControl"
                    />
                    <Carousel.Caption>
                    <h3>CabinControl project</h3>
                    <p>C/C# project for controlling webcamera via servos, and getting sensor data regarding temperatures/snow depth/light levels etc. and setting target temperature inside the cabin.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item onClick={ () => window.location = "/moisturesensor"}>
                <img
                    className="d-block w-100"
                    src={require("./assets/moisturesensor/1.jpg")}
                    alt="Moisture Sensor"
                    />

                    <Carousel.Caption>
                    <h3>Soil moisture sensor</h3>
                    <p>Currently used by Norges Vassdrags og Energidirektorat all over Norway for early detection of floods.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item onClick={ () => window.location = "/chessclock"}>
                <img
                    className="d-block w-100"
                    src={require("./assets/chessclock/1.jpg")}
                    alt="Other projects"
                    />

                    <Carousel.Caption>
                    <h3>A Chess Clock</h3>
                    <p>I have made too many things to list them all here, but here is one of them: A Chess Clock</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </Col>
        </Container>
        </div>
    )
}
