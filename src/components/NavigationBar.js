import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .navbar {
        background-color: #222;
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
        <Navbar expand="lg">
            <Navbar.Brand href="/">www.midteide.com</Navbar.Brand>
            <Navbar.Toggle area-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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