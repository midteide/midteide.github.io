import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap'
import styled from 'styled-components'
import backgroundImg from '../assets/alps.jpg'
import "../index.css"

const Styles = styled.div`
    .jumbo {
        background: url(${backgroundImg})  center center / cover no-repeat ;
        // background-size: cover;
        
        color: #fff;
        height: 200px;
        position: relative;
        z-index: -2;
    }
    .overlay {
        background-color: #000;
        color: #fff;
        opacity: 0.3;
        position: absolute;
        padding: 70px 50px 50px 50px;
        
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        
    }
    
    #tekst {
        color: white;
    }
    @media screen and (max-width: 760px) {
        .overlay {
            padding: 50px 20px ;
              
        }
      }
      
`;

/*


    @media screen and (max-width: 479px) {
        .jumbo {
          background-size: 230%;
              
        }
      }

*/    

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay">
                <Container className="tekst">
                    <h4>Alexander Midteide's portfolio</h4>
                    <p>Here you can see some of my work...</p>
                </Container>
            </div>
        </Jumbo>
    </Styles>
)