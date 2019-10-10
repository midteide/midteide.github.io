import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Styles = styled.div`
    .navbar {
        background-color: #222;
        
    }
    .navbar-toggle.collapsed {
        background-color: #fff !important;
    }
    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;
        &:hover {
            color: white;
        }
    }
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar className="navFont" fixed="top" collapseOnSelect expand="lg" bg="dark"  >
            <Navbar.Brand href="/"><i class="fas fa-code"></i> www.midteide.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
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