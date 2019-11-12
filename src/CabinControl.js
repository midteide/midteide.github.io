import React, { Component, Fragment } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ImageZoom from "react-medium-image-zoom";
import Lightbox from "react-lightbox-component";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import "react-lightbox-component/build/css/index.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { render } from "react-dom";
import Gallery from "react-grid-gallery";
import PropTypes from "prop-types";

// https://github.com/benhowell/react-grid-gallery/blob/master/examples/demo6.js

export class CabinControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images,
            modalIsOpen: false,
            currentImage: 0
        };
    }

    render() {
        const { modalIsOpen } = this.state;
        const { photoIndex, isOpen } = this.state;
        return (
            <div className="container">
                <div className="row mb-4">
                    <h1>CabinControl project:</h1>
                    <br />
                </div>

                <div className="row">
                    <div className="col-6">
                        <p>This project consists of several parts:</p>
                        <ul>
                            <li>The microcontroller circuitboard design and layout</li>
                            <li>The microcontroller code</li>
                            <li>
                                A C# server application for communication with the
                                microcontroller through USB interface
                            </li>
                            <li>
                                A C# client application for users on any computer to connect
                                into the Server application to view webcamera live video, see
                                sensor data and graphs and set values (temperatures, control
                                camera position etc).
                            </li>
                        </ul>
                    </div>

                    <div className="col-6">
                        <div
                            style={{
                                display: "block",
                                minHeight: "1px",
                                width: "100%",
                                border: "1px solid #ddd",
                                overflow: "auto"
                            }}
                        >
                            <Gallery
                                images={this.state.images}
                                enableLightbox={true}
                                enableImageSelection={false}
                                backdropClosesModal={true}
                                enableKeyboardInput={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div
                            className="video m-5"
                            style={{
                                position: "relative",
                                paddingBottom: "56.25%" /* 16:9 */,
                                paddingTop: 25,
                                height: 0
                            }}
                        >
                            <iframe
                                title="."
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%"
                                }}
                                src={`https://www.youtube.com/embed/1KE7aq1AvCI`}
                                frameBorder="0"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h1 className="mt-5" style={{textAlign: "center"}}>Source code:</h1>
                        <SyntaxHighlighter language="c" style={docco}>
                            {`
        
        /*
        * CabinControl.c
        *
        * Created: 27.05.2011 20:50:28
        *  Author: Alexander
        */ 
        
        
        #define F_CPU 14745600L
        #include <stdio.h>
        #include <avr/io.h>
        #include <util/delay.h>
        #include <avr/interrupt.h>
        #include <stdlib.h>
        #include <avr/wdt.h>
        
        #define ENDCHAR 127
        #define VCC 5.00
        #define GAIN (1 + 33000/1000)
        #define SLEEP __asm volatile ("sleep")
        #define MIN 40
        #define MAX 180
        #define HORISONTAL 8
        #define VERTIKAL 5
        #define hitwd() wdt_reset()
        #define false 0
        #define true 1
        #define INSIDE 55
        #define OUTSIDE 33
        
        
        enum {GREEN =0, RED, BLUE};
        
        volatile int higherADCByte=0,lowerADCByte=0,vertikalServo=0,horisontalServo=0,pwmCount=0,tempInt=0;
        volatile char rx[40],rxn=0,receiving=0, receiveSuccess=0,buffer2[20],detection=false;;
        volatile int nSpeed=0,flagg=0,debug=0,vertikalAngle=30,horisontalAngle=30,tempChar=0;
        volatile int c=0,timeSinceLastMsg=0,testCounter=0;
        volatile int motion=0, snow=0, tempAdj=0, tempInside=0, tempOutside=0, LED=0,takePictureCmd=0,takePictureStatus=0;
        volatile int dager=0,minutter=0,timer=0,sekunder=0,hundredeler=0,test=0;
        volatile long int tempInneN=0, tempInneNminus1=0, tempPowerSupply=0, tempInneNminus2=0, tempInneNminus3=0;
        volatile long int tempUteN=0, tempUteNminus1=0, tempUteNminus2=0, tempUteNminus3=0,doMeasurementsTimer=0;
        
        
        double pt100Table[] = /*-50*/{80.31,80.7,81.1,81.5,81.9,82.29,82.69,83.08,83.48,83.88,
                            /*-40*/84.27,84.67,85.06,85.46,85.85,86.25,86.64,87.04,87.43,87.83,
                            /*-30*/88.22,88.62,89.01,89.4,89.8,90.19,90.59,90.98,91.37,91.77,
                            /*-20*/92.16,92.55,92.95,93.34,93.73,94.12,94.52,94.91,95.3,95.69,
                            /*-10*/96.09,96.48,96.87,97.26,97.65,98.04,98.44,98.83,99.22,99.61,
                            /*0*/100.0,100.39,100.78,101.17,101.56,101.95,102.34,102.73,103.12,103.51,
                            /*10*/103.9,104.29,104.68,105.07,105.46,105.85,106.24,106.63,107.02,107.4,
                            /*20*/107.79,108.18,108.57,108.96,109.34,109.73,110.12,110.51,110.9,111.28,
                            /*30*/111.67,112.06,112.45,112.83,113.22,113.61,113.99,114.38,114.77,115.15,
                            /*40*/115.54,115.92,116.31,116.7,117.08,117.47,117.85,118.24,118.62,119.01,
                            /*50*/119.4,119.78,120.16,120.55,120.93,121.32,121.7,122.09,122.47,122.86,
                            /*60*/123.24,123.62,124.01,124.39,124.77,125.16,125.54,125.92,126.31,126.69,
                            /*70*/127.07,127.45,127.84,128.22,128.6,128.98,129.36,129.75,130.13,130.51,
                            /*80*/130.89};
                            
        double ntc1kTable[] =	/*0*/{2961.0,2843.0,2725.0,2607.0,2489.0,2371.0,2253.0,2135.0,2017.0,1899.0,
                                /*10*/1781.0,1723.4,1665.8,1608.2,1550.6,1493.0,1435.4,1377.8,1320.2,1262.6,
                                /*20*/1205.0,1164.0,1123.0,1082.0,1041.0,1000.0,966.8,933.68,900.52,867.36,
                                /*30*/834.2,809.7,785.2,760.7,736.2,711.7,687.2,622.7,638.2,613.7,
                                /*40*/589.2,572.68,566.16,539.64,523.12,506.6,490.1,473.56,458.04,440.52,
                                /*50*/424.0,412.64,401.28,389.92,378.56,367.2,355.84,344.48,333.12,321.76,
                                /*60*/310.4,302.46,294.52,286.58,278.64,270.7,262.76,254.82,246.88,238.94,
                                /*70*/231.0,225.35,219.7,214.05,208.4,202.75,197.1,191.45,185.8,180.15,
                                /*80*/174.5};
            
        void brdInit();
        void SetServoPosition(char retning,int vinkel);
        long double doAdc(int channel,short nSamples);
        void InitUSART (int baud);
        void getTemp(char init);
        long int resLookup(long double res);
        void prints(char *string);
        void LEDColor(char colour);
        long double Abs(long double n){
        return ((n*n)/n);
        }
        
        ISR(TIMER1_COMPA_vect){				// Interrupt will occur at 1Hz frequency
        
        
        }
        ISR(TIMER0_COMP_vect){				// Interrupt will occur at 1Hz frequency
        c++;
        test++;
        doMeasurementsTimer++;
        if(test >9)
        {
            PORTD ^= (1<<3);
            test=0;
        }
        hundredeler++;
        if (hundredeler > 99) 
        {
            hundredeler=0;
            sekunder++;
        }	  
        if (sekunder > 59) 
        {
            sekunder=0;
            minutter++;
        }	  
        if (minutter > 59) 
        {
            minutter=0;
            timer++;
        }	  
        if (timer > 23) 
        {
            timer=0;
            dager++;
        }	  
        }
        
        ISR(TIMER1_OVF_vect){				// Interrupt will occur at 1Hz frequency
        
        }
        void TxByte (char data)
        {
        //  TXON;
        while ( !( UCSRA & (1<<UDRE)) ); 				// Wait for empty transmit buffer            
        UDR = data;  									// Putting data into the buffer, forces transmission                                 
        }
        
        
        // ADC Complete ISR
        // ADC Complete ISR
        ISR(ADC_vect){
        lowerADCByte = ADCL;		// Read lower ADC result from register
        higherADCByte = ADCH;		// Read higher ADC result from register
        MCUCR &= ~(1<<SE); 		// Clear enable sleep
        }
        
        
        ISR(USART_RXC_vect)		//UART RECIEVE INTERRUPT
        {
            char buffer3[20];
            //cli();
            debug = 1;
            while ( !(UCSRA & (1<<RXC)) );
            tempChar =UDR;
            if (tempChar == '$'){
            rxn=0;
            rx[rxn++] = tempChar;
            rx[rxn] = 0;
            receiving =1;
            }
            else if ((receiving) && (tempChar != ENDCHAR)) {
            rx[rxn++] = tempChar;
            rx[rxn] = 0;
            }
            else if ( (receiving) && (tempChar == ENDCHAR)){
            receiving =0;
            rxn=0;
            vertikalAngle = rx[1];
            horisontalAngle = rx[2];
            snow = rx[2];
            takePictureStatus = rx[3];
            tempAdj = rx[4];
            LED = rx[5];
            receiveSuccess =1;
            timeSinceLastMsg=0;
            }
            //sei();  
            
        //	else if ( (rx[rxn] != 10) && (rx[rxn] != 13) ) rxn++;
        }
        void sendSnapshotCommand(){
                TxByte('$');
            TxByte('S');
            TxByte('1');
            TxByte('2');
            TxByte('3');
            TxByte('#');
        }
        
        int main(){
        
        brdInit();
        char sek=0,detectionTimer=0, farge=0;
        int tempA=0,tempB=0;
        int intBuffer[150];
        char charBuffer[150];
        LEDColor(RED);
        while (1){
            hitwd()  ;
            if (receiveSuccess){
            receiveSuccess =0;
            //if 
        
            }
        /*    if (((PINC & 1) == 1) && (detectionTimer > 10) && (timeSinceLastMsg > 2)){
            _delay_ms(1000);
            if ((PINC & 1) == 1) {
                detectionTimer =0;
                tempA = vertikalAngle;
                tempB = horisontalAngle;
                vertikalAngle= 155;
                horisontalAngle = 165;
                if ((vertikalAngle > 0) && (vertikalAngle < 270)) SetServoPosition(VERTIKAL,vertikalAngle);
                if ((horisontalAngle > 0) && (horisontalAngle < 250)) SetServoPosition(HORISONTAL,horisontalAngle);
                    TxByte('$');
                TxByte('A');
                TxByte('A');
                TxByte('B');
                TxByte('A');
                TxByte('#');
                _delay_ms(1000);
                sendSnapshotCommand();
                vertikalAngle = tempA;
                horisontalAngle = tempB;
            }
            }
                
        */	
            if (LED) 
            {
                PORTC |= (1<<6);
            }
            else
            {
                PORTC &= ~(1<<6);
            }
            if ((vertikalAngle > 0) && (vertikalAngle < 125)) SetServoPosition(VERTIKAL,(vertikalAngle));
            if ((horisontalAngle > 0) && (horisontalAngle < 125)) SetServoPosition(HORISONTAL,(horisontalAngle));
            if (doMeasurementsTimer >999)
            {
                doMeasurementsTimer =0;
                getTemp(0);
                
            }
            if (c > 99) {
            c =0;
            sek++;//C:\Users\Alexander\Dropbox\AVR Studio 5 Prosjekter\CabinControl\CabinControl\CabinControl.c
            farge++;
            getTemp(0);
            //tempInside = ;
            if ((PINB & 1) == 0){
                motion = 0;
                LEDColor(BLUE);
        
            }
            else {
                motion = 1;
                LEDColor(RED);
            }
            tempInside = tempInneN;
            tempOutside = tempUteN;
            sprintf(charBuffer,"$D:%01d:%+05ld:%+05ld:%+05ld:%03d:%02d:%01d:%01d:%03d:%02d:%02d:%02d#"
            ,motion,tempPowerSupply,tempInneN,tempUteN,snow,tempAdj,LED,takePictureStatus,dager,timer,minutter,sekunder);
            
            //sprintf(charBuffer,"$D%01d%04d%+04d%+04d%03d%02d%01d%01d%03d:%02d:%02d:%02d#"
            //,motion,222,(int)tempInneN,(int)tempInneN,999,777,LED,takePictureStatus,dager,timer,minutter,sekunder);
            
            //sprintf(charBuffer,"$D%01d%04d%+04d%+04d%03d%02d%01d%01d#",0,1,2,3,4,5,6,7);
            //for (int i=0;i<23;i++)	TxByte(charBuffer[i]);
            prints(charBuffer);
            //sprintf(charBuffer,"%03d%02d%01d%01d#",snow,tempAdj,LED,takePictureStatus);
            PORTC ^= (1 << 2);
        
            //PORTC=~PORTC;
            if (detectionTimer < 100) detectionTimer++;
            if (timeSinceLastMsg < 100) 
                timeSinceLastMsg++;
            }
        }
        
        return 0;
        }
        
        void LEDColor(char colour)
        {
            if (colour == GREEN) {
            PORTC |= (1 << 1);
            PORTC |= (1 << 0);
            PORTD &= ~(1 << 6);
            }
            if (colour == RED) {
            PORTC |= (1 << 0);
            PORTD |= (1 << 6);
            PORTC &= ~(1 << 1);
            }
            if (colour == BLUE) {
            PORTD |= (1 << 6);
            PORTC |= (1 << 1);
            PORTC &= ~(1 << 0);
            }
            
        }
        
        void brdInit(){
        // TIMER INITIALIZATIONS 
        
        
        DDRA= 0;
        DDRB=0x00;
        DDRC = 0xff;
        PORTC = 0x00;
        
        DDRD = 0xff;
        PORTD=255;
        TCCR0 |= (1 << CS00) | (1 << CS02)  | (1 << WGM01) ; // 1024 prescaler
        TCCR1A|=(1<<COM1A1)|(1<<COM1B1)|(1<<WGM11);        //NON Inverted PWM
            TCCR1B|=(1<<WGM13)|(1<<WGM12)|(1<<CS11)|(1<<CS10); //PRESCALER=64 MODE 14(FAST PWM)
        TIMSK |= /*(1 << OCIE1A) |*/ (1 << OCIE0);
        ICR1=4602;  //fPWM=50Hz (Period = 20ms Standard).  
            OCR1B=111;
            OCR1A=111;
            
            //Timer0
            OCR0 = 143;
            
            //wdt_enable(WDTO_2S);					// Enable Watchdog timer, 500ms timeout
            InitUSART(23);		// Baud = 38400bps
            _delay_ms(10);
        sei();
        getTemp(true); 
        
        }
        
        /**
             Sets servo position.
            \param Angle in degrees from 0 to 179
        
            \note It may be necressery to adjust \a MinOCR and \a MaxOCR 
            (and \a Range) values if servo do not reach max/min position.
        */
        void SetServoPosition(char retning,int vinkel)
        {
        int temp=0;
        switch (retning){
            case VERTIKAL: temp = (150+(vinkel*3));
                            OCR1A = temp;
                break;
            case HORISONTAL: temp = (150+(vinkel*3));
                            OCR1B = temp;
                break;
        }
        }
        
        
        void InitUSART (int baud)
        {
            UBRRH = (char)(baud>>8); 					// Set Baud rate - Cast High byte
            UBRRL = (char)baud;      					// Set Baud rate - Cast Low byte                     
            UCSRB = (1<<RXEN)|(1<<TXEN);  				// Enable Receiver & Transmitter               
            UCSRC = (1<<URSEL)|(1<<UCSZ1)|(1<<UCSZ0);	// no parity, 1 stop bit, 8 data
            UCSRB |= (1 << RXCIE);  					// ENABLE RECEIVE INTERRUPT
        } 
        
        
        long double doAdc(int channel,short nSamples){		// "nSamples" value here is the number of measurments to average
        long double average=0;
        int result=0; 									// the averaged value (the return value)
        MCUCR = (1 << SM0);								// Set sleep mode to "ADC Noise Reduction Mode"
        ADCSRA = (1<<ADEN) | (1<<ADPS2) | (1<<ADPS1) | (1<<ADPS0) | (1<<ADIE); // ADC Enable, 128 prescaler, ADC Interrupt Enable
        ADMUX = channel;									// Set channel to measure
        ADMUX |= (1 << REFS0); 							// AVCC with external capacitor at AREF pin
        for (int j=0;j<nSamples;j++){
            wdt_reset();									// Reset watchdog
            MCUCR |= (1<<SE);  		 						// Set enable sleep
            ADCSRA |= (1<<ADSC); 							// Start converting
        // 	SLEEP; 											// go to sleep, will wake up on ADC Complete Interrupt
            MCUCR &= ~(1<<SE); 								// Clear enable sleep, prevent uC from randomly entering sleep mode
            result = (higherADCByte<<8);					// Left shift higher ADC byte 8 steps into 'result'
            result |= lowerADCByte;							// Logical OR lower ADC byte with 'result'
            if (j==0) average = result;						// First measurement will not get averaged
            else average = ((average + (double)result) / 2.0); // Add and average
        }
        MCUCR &= ~(1 << SM0);								// Set sleep mode to Idle Mode (but will not ENTER sleep mode)
        ADCSRA = 0;										// Disable ADC to reduce power consumption
        return (average);									// return average
        }
        
                            
        void getTemp(char init)
        {
        long double resistance=0.0, V_Pt100=0.0;	// V_Pt100 = Voltage measured over PT100 element (BEFORE amplification)
        long int avgTemp=0;					
        wdt_reset();										// Reset watchdog
        char charBuffer[100];
        
        
        
        //Inne
        V_Pt100 = ( doAdc(5,50) * 5.0) / (1023.0 * (double)GAIN) ;
        resistance =  -2.4 +((V_Pt100 * 5100.0) / (5.0 - V_Pt100));   
        int closest = 0;
        double current = pt100Table[0];
        double fine = 0.0;
        double diff = Abs(resistance - current);
        
        for (int i = 1; i < 131; i++)
        {
            if (abs(resistance - pt100Table[i]) < diff)
            {
            closest = i;
            diff = Abs(resistance - pt100Table[i]);
            current = pt100Table[i];
            }
        }
        
        for (int i = 1; i < 130; i++)
        {
            if ((resistance >= pt100Table[i]) && (resistance < pt100Table[i+1]) )
            {
            fine = (resistance - pt100Table[i]) / (pt100Table[i+1] - pt100Table[i]);
            avgTemp = -100+((-50 + closest)*100) + (int)(fine*100.0);
            break;
            }   
        }
        if (init == true){
            tempInneNminus3 = avgTemp;
            tempInneNminus2 = avgTemp;
            tempInneNminus1 = avgTemp;
            tempInneN = avgTemp;
        }		
        else {
            avgTemp = ((avgTemp + tempInneNminus1) / 2.0);
            avgTemp = ((avgTemp + tempInneNminus2) / 2.0);
            avgTemp = ((avgTemp + tempInneNminus3) / 2.0);
            tempInneNminus3 = tempInneNminus2;
            tempInneNminus2 = tempInneNminus1;
            tempInneNminus1 = tempInneN;
            tempInneN = avgTemp;
        }  
        
        //UTE
            resistance=0.0;
            V_Pt100=0.0;	// V_Pt100 = Voltage measured over PT100 element (BEFORE amplification)
            avgTemp=0;					
        wdt_reset();										// Reset watchdog
        V_Pt100 = ( doAdc(6,50) * 5.0) / (1023.0 * (double)GAIN) ;
        resistance =  /*-2.4 +*/((V_Pt100 * 5100.0) / (5.0 - V_Pt100));   
        closest = 0;
            current = pt100Table[0];
            fine = 0.0;
            diff = Abs(resistance - current);
        
        for (int i = 1; i < 131; i++)
        {
            if (abs(resistance - pt100Table[i]) < diff)
            {
            closest = i;
            diff = Abs(resistance - pt100Table[i]);
            current = pt100Table[i];
            }
        }
        
        for (int i = 1; i < 130; i++)
        {
            if ((resistance >= pt100Table[i]) && (resistance < pt100Table[i+1]) )
            {
            fine = (resistance - pt100Table[i]) / (pt100Table[i+1] - pt100Table[i]);
            avgTemp = -100+((-50 + closest)*100) + (int)(fine*100.0);
            break;
            }   
        }
        if (init == true){
            tempUteNminus3 = avgTemp;
            tempUteNminus2 = avgTemp;
            tempUteNminus1 = avgTemp;
            tempUteN = avgTemp;
        }		
        else {
            avgTemp = ((avgTemp + tempUteNminus1) / 2.0);
            avgTemp = ((avgTemp + tempUteNminus2) / 2.0);
            avgTemp = ((avgTemp + tempUteNminus3) / 2.0);
            tempUteNminus3 = tempUteNminus2;
            tempUteNminus2 = tempUteNminus1;
            tempUteNminus1 = tempUteN;
            tempUteN = avgTemp;
        }
      
            //sprintf(charBuffer,"$D%01d%04d%+04d%+04d%03d%02d%01d%01d#",0,1,2,3,4,5,6,7);
            //for (int i=0;i<23;i++)	TxByte(charBuffer[i]);
            //prints(charBuffer);
            
        //PowerSupplyTemp
        //V_Pt100 = ( doAdc(7,50) * 5.0) / (1023.0) ;
        //resistance =  ((V_Pt100 * 1000.0) / (5.0 - V_Pt100));   
        //tempPowerSupply = (int)resistance;
        
            resistance=0.0;
            V_Pt100=0.0;	// V_Pt100 = Voltage measured over PT100 element (BEFORE amplification)
            avgTemp=0;					
        wdt_reset();										// Reset watchdog
        V_Pt100 = ( doAdc(7,50) * 5.0) / (1023.0) ;
        resistance =  ((V_Pt100 * 1000.0) / (5.0 - V_Pt100));   
        
        closest = 0;
            current = ntc1kTable[0];
            fine = 0.0;
            diff = abs(resistance - current);
        
        for (int i = 1; i < 80; i++)
        {
            if (abs(resistance - ntc1kTable[i]) < diff)
            {
                
            closest = i;
            diff = abs(resistance - ntc1kTable[i]);
            current = ntc1kTable[i];
            }
        }
                avgTemp = ((closest)*100) + (int)(fine*100.0);
        
        for (int i = 1; i < 79; i++)
        {
            if ((resistance <= ntc1kTable[i]) && (resistance > ntc1kTable[i+1]) )
            {
            fine = (resistance - ntc1kTable[i]) / (ntc1kTable[i+1] - ntc1kTable[i]);
            avgTemp = ((closest)*100) + (int)(fine*100.0);
            break;
            }   
        }
        tempPowerSupply = avgTemp;
            
        
        }  
        
        /*
        long double getTemp(char sensor)
        {
        
        long double resistance=0.0, V_Pt100Inside=0.0, V_Pt100Outside=0.0;	// V_Pt100 = Voltage measured over PT100 element (BEFORE amplification)
        long int avgTemp=0;					
        wdt_reset();										// Reset watchdog
        V_Pt100Inside = ( doAdc(5,5) * VCC) / (1024.0 * (double)GAIN) ;
        V_Pt100Outside = ( doAdc(6,5) * VCC) / (1024.0 * (double)GAIN) ;
        
        
        resistance = ((V_Pt100Inside * 5100.0) / (VCC - V_Pt100Inside));    
        int closest = 0;
        double current = pt100Table[0];
        double fine = 0.0;
        double diff = Abs(resistance - current);
        
        for (int i = 1; i < 131; i++)
        {
            if (Abs(resistance - pt100Table[i]) < diff)
            {
            closest = i;
            diff = Abs(resistance - pt100Table[i]);
            current = pt100Table[i];
            }
        }
        
        for (int i = 1; i < 130; i++)
        {
            if ((resistance >= pt100Table[i]) && (resistance < pt100Table[i+1]) )
            {
            fine = (resistance - pt100Table[i]) / (pt100Table[i+1] - pt100Table[i]);
            avgTemp = ((-50 + closest)*100) + (int)(fine*100.0);
            break;
            }   
        }
            avgTemp = ((avgTemp + tempInneNminus1) / 2.0);
            avgTemp = ((avgTemp + tempInneNminus2) / 2.0);
            avgTemp = ((avgTemp + tempInneNminus3) / 2.0);
            tempInneNminus3 = tempInneNminus2;
            tempInneNminus2 = tempInneNminus1;
            tempInneNminus1 = tempInneN;
            tempInneN = avgTemp;
            
            
        resistance = ((V_Pt100Outside * 5100.0) / (VCC - V_Pt100Outside));    
        closest = 0;
            
        for (int i = 1; i < 131; i++)
        {
            if (Abs(resistance - pt100Table[i]) < diff)
            {
            closest = i;
            diff = Abs(resistance - pt100Table[i]);
            current = pt100Table[i];
            }
        }
        
        for (int i = 1; i < 130; i++)
        {
            if ((resistance >= pt100Table[i]) && (resistance < pt100Table[i+1]) )
            {
            fine = (resistance - pt100Table[i]) / (pt100Table[i+1] - pt100Table[i]);
            avgTemp = ((-50 + closest)*100) + (int)(fine*100.0);
            break;
            }   
        }
        
            avgTemp = ((avgTemp + tempUteNminus1) / 2.0);
            avgTemp = ((avgTemp + tempUteNminus2) / 2.0);
            avgTemp = ((avgTemp + tempUteNminus3) / 2.0);
            tempUteNminus3 = tempUteNminus2;
            tempUteNminus2 = tempUteNminus1;
            tempUteNminus1 = tempUteN;
            tempUteN = avgTemp;
        
        return resistance;
        }
        */
        
        
        
        
        // PRINT STRING FUNCTION
        //-----------------------------------------------------------------------------
        void prints(char *string)
        {
        int count =0;
        while ((string[count]) != '\0')				// Wait for null termination character
        {
            while ( !( UCSRA & (1<<UDRE)) );  			// Wait for empty transmit buffer
            UDR = (char)string[count++];				// Putting data into the buffer, forces transmission  
        }	
        }
        

        
        `}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        );
    }
}

CabinControl.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.string,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

CabinControl.defaultProps = {
    images: [
        {
            src: require("./assets/cabincontrol/large/1.jpg"),
            thumbnail: require("./assets/cabincontrol/1.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/2.jpg"),
            thumbnail: require("./assets/cabincontrol/2.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/3.jpg"),
            thumbnail: require("./assets/cabincontrol/3.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },

        {
            src: require("./assets/cabincontrol/large/4.png"),
            thumbnail: require("./assets/cabincontrol/4.png"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/5.jpg"),
            thumbnail: require("./assets/cabincontrol/5.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/6.png"),
            thumbnail: require("./assets/cabincontrol/6.png"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/7.jpg"),
            thumbnail: require("./assets/cabincontrol/7.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/8.jpg"),
            thumbnail: require("./assets/cabincontrol/8.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        },
        {
            src: require("./assets/cabincontrol/large/9.jpg"),
            thumbnail: require("./assets/cabincontrol/9.jpg"),

            thumbnailWidth: 1200,
            thumbnailHeight: 1200,
            caption: ""
        }
    ]
};
