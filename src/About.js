import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ImageZoom from 'react-medium-image-zoom'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//export const About = () =>   {
export class About extends Component {
        state = {
          numPages: null,
          pageNumber: 1,
        }
        onDocumentLoadSuccess = ({ numPages }) => {
            this.setState({ numPages });
          }
          render() {
            const { pageNumber, numPages } = this.state;
         
return (
        <div>
            <div className="container">
                <h3 className="mb-5">About me (CV can be seen below)</h3>
                <article className="row single-post mt-5 no-gutters">
                    <div className="image-wrapper float-left pr-3">
                        <Image className="img-thumbnail m-3" roundedCircle src={require("./assets/meg2.png")}/>
                    </div>
                    <div className="single-post-content-wrapper p-3">
                        <p>
                        Since I was a kid I have been interested in computers and electronics. 
                        We got a 386 computer when I was 7 and since then I developed a strong fascination for computers, 
                        only boosted further by the arrival of internet when I was 10. 
                        </p>
                        <p>
                            I was always interested in how computer networks work, both serial connection, parallel connection and eventually 
                            coax networks and ethernet. When I went to The Gathering '98 (age 13) I did so by myself just because I wanted to 
                            connect to a huge network (coax at that time).
                        </p>
                            
                        <figure className="figure image-wrapper float-right m-3 pl-3">
                            <ImageZoom
                                image={{
                                src: require("./assets/telefon.jpg"),
                                alt: 'Homemade phone',
                                className: 'img-thumbnail figure-img img-fluid rounded-circle',
                                style: { }
                                }}
                                zoomImage={{
                                src: require("./assets/large/telefon.jpg"),
                                alt: 'Homemade phone'
                                }}
                            />
                       <figcaption className="figure-caption">Homemade phone from when I was 10.</figcaption>
                        </figure>
                            
                            
                        <p>I started scripting and learned myself 
                        some C/C++, got into Linux and my dream was always to work as a programmer. I went on to study Cybernetics Engineering
                        and always excelled in the programming subjects. I loved (still do) programming microcontroller circuits and then program
                        a computer application for communicating with this circuit, controlling things (actuators, servos, relays) and 
                        reading back values (ADC values, temperatures, and all various types of instrumentation data).
                        </p>
                        <p>
                            My career led me into more project management type of roles which was what I wanted for a few years. 
                        Now however, I am very excited about being able to work as a SW developer full time.</p>
                    </div>
                    
                </article>
                <h3 className="mt-5" style={{'text-align': 'center'}}>CV:</h3>
                    <div className="CV mt-1">
                    <Document
                    file="./1.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                    <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>

                    <Document
                    file="./1.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                    <Page pageNumber={2} />
                    </Document>
                    <p>Page {2} of {numPages}</p>

                    <Document
                    file="./1.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                    <Page pageNumber={3} />
                    </Document>
                    <p>Page {3} of {numPages}</p>

                    <Document
                    file="./1.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                    <Page pageNumber={4} />
                    </Document>
                    <p>Page {4} of {numPages}</p>
               </div>


                </div>
            </div>
        // </div>
    )
}
}