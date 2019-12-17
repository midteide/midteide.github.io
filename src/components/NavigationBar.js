import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Styles = styled.div`
    .navbar {
        background-color: #222;
        
        opacity: 0%;
        animation-fill-mode: forwards;
        animation-name: navAnimation;
        animation-duration: 3s;
        animation-delay: 4s;
        transition-timing-function: linear;

    }


    }
    @keyframes navAnimation {
        0% {opacity: 0%; transform: translateY(-50px)}
        100% {opacity: 100%; transform: translateY(0)}
    }
    
      .navbar-toggle.collapsed {
        background-color: #fff !important;
    }
    .navbar-brand, .navbar-nav {
        color: #ddd;
        &:hover {
            color: white;
        }
    }
    .nav-link {
        color: #ddd!important;
        border-radius: 0.3rem;

        
    }
    .nav-link:hover {
        //margin: 5px;
        cursor: pointer;
        background-color: #ddd;
        font-size: 0.8rem;
        color: black!important;
        border-radius: 3rem;
        font-weight: bold;

        
      }
      
    .nav-link {
    transition-property: border-radius, background-color, color;
    transition-duration: 4000ms, 200ms, 200ms;
    transition-delay: 800ms, 0, 200ms;
    transition-timing-function: ease-in-out;
    
    }
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar className="navFont" fixed="top" collapseOnSelect expand="lg" bg="dark"  >
            <Navbar.Brand className="brand-font" href="/"><i className="fas fa-code"></i> www.midteide.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                        <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/calculator">React: Calculator</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/memepage">React: MemeGenerator</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/moisturesensor">C: Moisture Sensor</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/cabincontrol">C/C#: CabinControl</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/chessclock">C: Chess Clock</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)