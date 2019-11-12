import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'


export const MoistureSensor = () =>   {
    return (
        <div>
            <Container id="fukt">
            <Col xs={12}>
            <h1>
                Moisturesensor project:
            </h1>
            <p>This project I did for a large company in order to measure from 8 sensors in the ground. 
              There were tight restrictions with regards to power consumption, a proprietary communications 
              protocol and the sensors needed to be subjected to both positive and negative voltages to 
              prevent corrosion.</p>
            <p>The code can be seen below the pictures.</p>
            <br/>
			<Carousel pauseOnHover="true" fade="true">
                
			<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/moisturesensor/1.jpg")}
                    alt=""
                    />
                    <Carousel.Caption>
                    <h3>Filefjell, one of many sensor stations using this circuit.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                     
			<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/moisturesensor/2.jpg")}
                    alt=""
                    />
                    <Carousel.Caption>
                    <h3>Inside cabinet</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                
                
                
            </Carousel>
            <div id="plass"></div>
            <h2 className="mt-5" style={{textAlign: "center"}}>Source code:</h2>
            </Col>
    </Container>
            <div id="fukt">
		        <SyntaxHighlighter language="c" style={docco}>
      {`
      
      /*********************************************************
       *                     INCLUDES                           *
       *********************************************************/
       #define F_CPU 1843200L 			// Clock frequenzy, Needed for delay.h
       //#define F_CPU 1000000L 			// Clock frequenzy, Needed for delay.h
       
       
       #include <stdio.h>
       #include <avr/io.h>
       #include <util/delay.h>
       #include <avr/interrupt.h>
       #include <stdlib.h>
       #include <avr/wdt.h>
       #include <avr/eeprom.h>
       
       
       /*********************************************************
       *                    DEFINES                             *
       *********************************************************/
       
       #define hitwd() wdt_reset()
       #define R0ON PORTB |= (1<<7)
       #define R0OFF PORTB &= ~(1<<7)
       #define R1ON PORTB |= (1<<6)
       #define R1OFF PORTB &= ~(1<<6)
       #define R2ON PORTB |= (1<<5)
       #define R2OFF PORTB &= ~(1<<5)
       #define R3ON PORTB |= (1<<4)
       #define R3OFF PORTB &= ~(1<<4)
       #define R4ON PORTB |= (1<<3)
       #define R4OFF PORTB &= ~(1<<3)
       #define R5ON PORTB |= (1<<2)
       #define R5OFF PORTB &= ~(1<<2)
       #define R6ON PORTB |= (1<<1)
       #define R6OFF PORTB &= ~(1<<1)
       #define R7ON PORTB |= (1<<0)
       #define R7OFF PORTB &= ~(1<<0)
       #define RPON PORTD |= (1<<4)
       #define RPOFF PORTD &= ~(1<<4)
       #define TXON ton()
       #define TXOFF toff()
       #define IR 16.8
       #define IRP 21.6
       #define SLEEP __asm volatile ("sleep")
       #define ENTER 13
       #define MEASURETIME 10
       #define SPACE 32
       #define CR 13
       #define LF 10
       
       enum {RESLOWREF=1,RESHIGHREF,SENSORS,ADDRESS,NSAMPLES,SDELAY,SN};
       
       
       /*********************************************************
       *                 FUNCTION PROTOTYPES                    *
       *********************************************************/
       void wait(int ms);
       void ton();
       void toff();
       void brdInit();
       void doMeasure();
       void brdinit(void);
       long double getRes();
       void TxByte (char data);
       void InitUSART (int baud);
       void prints(char *string);
       uint16_t ReadFromEEPROM(short value);
       double doAdc(int channel,short nSamples);
       void WriteToEEPROM(short value,uint16_t n);
       
       
       /*********************************************************
       *            VARIABLES STORED IN EEPROM                  *
       *********************************************************/
       uint16_t EEMEM Sensors;
       uint16_t EEMEM Address;
       uint16_t EEMEM Samples;
       uint16_t EEMEM ResLowRef;
       uint16_t EEMEM ResHighRef;
       uint16_t EEMEM DelayBetweenMeasurement;
       uint16_t EEMEM Sn;
       
       
       
       // Initial EEPROM values ( WILL ONLY BE INITIALIZED WHEN MANUALLY PROGRAMMING EEPROM )
       uint16_t EEMEM Sensors = 1;
       uint16_t EEMEM Samples = 50;
       uint16_t EEMEM Address = '2';
       uint16_t EEMEM ResLowRef= 511;
       uint16_t EEMEM ResHighRef = 5110;
       uint16_t EEMEM DelayBetweenMeasurement = 50;
       uint16_t EEMEM Sn = 00002;
       
       /*********************************************************
       *                 GLOBAL VARIABLES                       *
       *********************************************************/
       char CRLF[] = {CR,LF,'\0'};
       volatile double RP = 0.0;
       volatile char txen=1;
       volatile long int data[8];
       char ID[] = "11ALMIAGGJMOD001100";
       volatile char rx[100], posFlag=0, rxFlag=0;
       volatile int n=0,rxn=0,higherADCByte=0,lowerADCByte=0;
       volatile unsigned long int receiveDeadline = 0;
       
       volatile int rxtemp=0,temp=0;
       volatile char rxbuffer[50];
       
       
       /*********************************************************
       *             INTERRUPT SERVICE ROUTINES                 *
       *********************************************************/
       
       // ADC Complete ISR
       ISR(ADC_vect){
                 lowerADCByte = ADCL;
                 higherADCByte = ADCH;
                 MCUCR &= ~(1<<SE); //Clear enable sleep
       }
       
       // RX Receive ISR
       ISR(USART_RXC_vect)		//UART RECIEVE INTERRUPT
       {
           wdt_reset();		// Hit watchdog
           receiveDeadline=0;
           while ( !(UCSRA & (1<<RXC)) );
           rx[rxn] = UDR;			// Saves all characters written
           if (rx[rxn] == '!'){
                 UCSRB &= ~(1 << RXCIE);  					// ENABLE RECEIVE INTERRUPT
       
             rxFlag = 1;
             rx[rxn+1] = '\0';								// Null terminate command
           }
           else if ( (rx[rxn] != CR) && (rx[rxn] != LF)  && (rx[rxn] != SPACE) && (rx[rxn] <91) && (rx[rxn] > 32)) rxn++;
           if (rx[rxn]==SPACE) rxn=0;
       }
       
       // Timer 1 Compare ISR
       ISR(TIMER1_COMPA_vect){	
           wdt_reset();		// Hit watchdog
         if (n==1) {
           PORTC &= ~(1<<6);
           PORTC |= (1<<7);
           posFlag = 1;
         }
         else{
           posFlag = 0;
           PORTC &= ~(1<<7);
           PORTC |= (1<<6);
         }
         if (n==1) n=0;
         else n++;
       }
           
       
       ISR(INT1_vect){	
             MCUCR &= ~(1<<SE);	 					// Clear enable sleep, preventing uC to randomly enter sleep mode
       }
           
       
       
       
       /*********************************************************
       *                     MAIN PROGRAM                       *
       *********************************************************/
       int main(){
         char valid=0;
         char buffer[100];
         brdInit();
       
       
         wdt_enable(WDTO_500MS);							// Enable Watchdog timer, 500ms timeout
         sei(); 											// Set Global Interrupt Enable
         
         while(1){	
           wdt_reset();									// Reset watchdog timer
           receiveDeadline++;								// Increment timeout timer
           
           if (rxFlag) {									// Complete command received, now processing it
             rxFlag=0;														// Clear command received flag
             wdt_reset();									// Reset watchdog timer
             if (rx[0] == ReadFromEEPROM(ADDRESS)){		// Is command meant for this uC?
               TXON;										// Enable TX
                if ( (rx[1] == 'A') && (rx[3] == '!') ){ 	// Change address command received, check if right syntax is used
                 if ( (rx[3] > ' ') && (rx[3] < 127) ) WriteToEEPROM(ADDRESS,rx[2]);		 		// Store address in EEPROM
                 TxByte(ReadFromEEPROM(ADDRESS));			// Send address
                 prints(CRLF);							 	// Send CR and LF
               }
               if ( (rx[1] == 'I') && (rx[2] == '!') ){ 	// Send ID command received, check if right syntax is used
                 sprintf(buffer,"%c%s%05d",ReadFromEEPROM(ADDRESS),ID,ReadFromEEPROM(SN));	 // Format string and save in 'buffer'
                 prints(buffer);						 	// Send string
                 prints(CRLF);							 	// Send CR and LF
               }
               if (rx[1] == '!'){					 	// Acknowledge Active command received, check if right syntax is used
                 sprintf(buffer,"%c",ReadFromEEPROM(ADDRESS)); // Format address, measure time and number of sensors, store in 'buffer'
                 prints(buffer);														  // Send string
                 prints(CRLF);							 	// Send CR and LF
               }
               if ( (rx[1] == 'M') && (rx[2] == '!') ){ 	// Start Measurement command received, check if right syntax is used
                 sprintf(buffer,"%c%03d%d",ReadFromEEPROM(ADDRESS),MEASURETIME,ReadFromEEPROM(SENSORS)); // Format address, measure time and number of sensors, store in 'buffer'
                 prints(buffer);														  // Send string
                 prints(CRLF);	
                 doMeasure(ReadFromEEPROM(SENSORS)); 									  // Call function for doing the measurments
                 TxByte(ReadFromEEPROM(ADDRESS));										  // When finished, send Service Request to let logger know data are ready
                 prints(CRLF);															  // Send CR and LF
               }
               if ( (rx[1] == 'D') && (rx[2] == '0') && (rx[3] == '!') ){				  // Send Data command received, check if right syntax is used
                 sprintf(buffer,"%c+%07ld+%07ld+%07ld+%07ld",ReadFromEEPROM(ADDRESS),data[0],data[1],data[2],data[3]); // Format the 4 first sensor values into string, save in 'buffer'
                 prints(buffer);														  // Send string
                 prints(CRLF);															  // Send CR and LF
               }
               if ( (rx[1] == 'D') && (rx[2] == '1') && (rx[3] == '!') ){                //Send Data command received, check if right syntax is used 
                 sprintf(buffer,"%c+%07ld+%07ld+%07ld+%07ld",ReadFromEEPROM(ADDRESS),data[4],data[5],data[6],data[7]); // Format the 4 last sensor values into string, save in 'buffer'
                 prints(buffer);														  // Send string
                 prints(CRLF);															  // Send CR and LF
               }
               if ( (rx[1] == 'X') && (rx[2] == 'A') && (rx[6] == '!') ){	// Set Average command received, check if right syntax is used
                 valid = 1;
                 for(int i=3;i < 6;i++){									// Store the next three characters in command to 'buffer'
                   if ( (rx[i] < '0') || (rx[i] > '9') ) valid = 0;
                   buffer[i-3] = rx[i];									
                   buffer[i-2] = '\0';										// Make sure string always is null terminated
                 }
                 if (valid){
                   WriteToEEPROM(NSAMPLES,atoi(buffer));						// Convert string to integer and store in EEPROM
                 }
                 sprintf(buffer,"%c%03d",ReadFromEEPROM(ADDRESS),ReadFromEEPROM(NSAMPLES));	// Format string of address and new value into 'buffer'
                 prints(buffer);											// Send string
                 prints(CRLF);												// Send CR and LF
               }
               if ( (rx[1] == 'X') && (rx[2] == 'D') && (rx[6] == '!') ){	// Set Delay command received, check if right syntax is used
                 valid = 1;
                 for(int i=3;i < 6;i++){									// Store the next three characters in command to 'buffer'
                   if ( (rx[i] < '0') || (rx[i] > '9') ) valid = 0;
                   buffer[i-3] = rx[i];									
                   buffer[i-2] = '\0';										// Make sure string always is null terminated
                 }
                 if (valid){
                   WriteToEEPROM(SDELAY,atoi(buffer));						// Convert string to integer and store in EEPROM
                 }
                 sprintf(buffer,"%c%03d",ReadFromEEPROM(ADDRESS),ReadFromEEPROM(SDELAY));	// Format string of address and new value into 'buffer'
                 prints(buffer);											// Send string
                 prints(CRLF);												// Send CR and LF
               }
               if ( (rx[1] == 'X') && (rx[2] == 'R') && (rx[3] == 'L') && (rx[8] == '!') ){ // Set ResLowRef command received, check if right syntax is used
                 valid = 1;
                 for(int i=4;i < 8;i++){									// Store the next five characters in command to 'buffer'
                   if ( (rx[i] < '0') || (rx[i] > '9') ) valid = 0;
                   buffer[i-4] = rx[i];
                   buffer[i-3] = '\0';										// Make sure string always is null terminated
                 }
                 if (valid) {
                   WriteToEEPROM(RESLOWREF,atoi(buffer));					// Convert string to integer and store in EEPROM
                 }
                 sprintf(buffer,"%c%04d",ReadFromEEPROM(ADDRESS),ReadFromEEPROM(RESLOWREF));// Format string of address and new value into 'buffer'
                 prints(buffer);											// Send string
                 prints(CRLF);												// Sent CR and LF
               }
               if ( (rx[1] == 'X') && (rx[2] == 'R') && (rx[3] == 'H') && (rx[8] == '!') ){ // Set ResHighRef command received, check if right syntax is used
                 valid = 1;
                 for(int i=4;i < 8;i++){									// Store the next five characters in command to 'buffer'
                   if ( (rx[i] < '0') || (rx[i] > '9') ) valid = 0;
                   buffer[i-4] = rx[i];
                   buffer[i-3] = '\0';										// Make sure string always is null terminated
                 }
                 if (valid) {
                   WriteToEEPROM(RESHIGHREF,atoi(buffer));					// Convert string to integer and store in EEPROM
                 }
                 sprintf(buffer,"%c%04d",ReadFromEEPROM(ADDRESS),ReadFromEEPROM(RESHIGHREF));// Format string of address and new value into 'buffer'
                 prints(buffer);												// Send string
                 prints(CRLF);												// Sent CR and LF
               }
               if ( (rx[1] == 'X') && (rx[2] == 'S') && (rx[3] == 'N') && (rx[9] == '!') ){ // Set ResHighRef command received, check if right syntax is used
                 valid = 1;
                 for(int i=4;i < 9;i++){													// Store the next five characters in command to 'buffer'
                   if ( (rx[i] < '0') || (rx[i] > '9') ) valid = 0;	
                   buffer[i-4] = rx[i];
                   buffer[i-3] = '\0';														// Make sure string always is null terminated
                 }
                 if (valid) {
                   WriteToEEPROM(SN,atoi(buffer));											// Convert string to integer and store in EEPROM
                 }
                 sprintf(buffer,"%c%05d",ReadFromEEPROM(ADDRESS),ReadFromEEPROM(SN));		// Format string of address and new value into 'buffer'
                 prints(buffer);															// Send string
                 prints(CRLF);															// Sent CR and LF
               }
                 if ((rx[2] == 'N') && (rx[4] == '!') ){										// Set Number of Sensors command received, check if right syntax is used
                 if ( (rx[3] > '0') && (rx[3] < '9') ){
                   WriteToEEPROM(SENSORS,(rx[3] - '0'));									// Convert to integer and store in EEPROM
                 }
                 sprintf(buffer,"%c%d",ReadFromEEPROM(ADDRESS),ReadFromEEPROM(SENSORS));	// Format string of address and new value into 'buffer'
                 prints(buffer);															// Send string
                 prints(CRLF);												// Send CR and LF
               }
             } //end if rx[0] == ReadFromEEPROM(ADDRESS);
             if ( (rx[0] == '?') && (rx[1] == '!') ) {						// Acknowledge Active command received, check if right syntax is used			
               TxByte(ReadFromEEPROM(ADDRESS));							// Read address from EEPROM and send
               prints(CRLF);												// Sent CR and LF
             }	    	  
             rxn=0;
             rxFlag=0;														// Clear character count
             TXOFF;														// Disable TX
           } // end if rxFlag
       
       
           if (receiveDeadline > 4201){			// Gives about a 6 second timeout, will be reduced for final build
             receiveDeadline = 0;						// Reset timout counter
             rxn=0;									// Discard bad/incomplete command
             rxFlag=0;									// Discard bad/incomplete command
             MCUCR = (1<<SE) | (1<<SM1);// | (1<<SM0);						// Set enable sleep, IDLE mode
             MCUCR &= ~(1<<SM0) ;
             wdt_reset();								// Hit watchdog
             MCUCR &= ~(1<<SM2) ;
             wdt_disable();							// Disable Watchdog timer (WD timer continues to run in Idle Sleep mode)
             GICR |= (1<<INT1);
             ADCSRA = 0;	
             SLEEP; 									// go to sleep
             GICR &= ~(1<<INT1);
             wdt_enable(WDTO_500MS); 					// Enable Watchdog timer when uC wakes up
             MCUCR &= ~(1<<ISC10);
             MCUCR &= ~(1<<ISC11);
             MCUCR &= ~(1<<SE);	 					// Clear enable sleep, preventing uC to randomly enter sleep mode
             wdt_reset();			 					// Hit watchdog
           }
       
         } // end while(1)
       
         return 0;
       } // end main
       
       void brdInit(){
         // Calculate Parallell value of ResHighRef and ResLowRef
         RP = ((double)ReadFromEEPROM(RESLOWREF)*(double)ReadFromEEPROM(RESHIGHREF)/((double)ReadFromEEPROM(RESLOWREF)+(double)ReadFromEEPROM(RESHIGHREF)));
         for (int i=0;i<8;i++) data[i] = 0; 		// initialize sensor data to 0
         // I/O INITIALIZATIONS
         DDRA = 0xff;								// Set PORTA to OUT
         DDRB = 0xff;								// Set PORTB to OUT
         DDRD = 0xff;								// Set PORTC to OUT
         DDRC = 0xff;								// Set PORTD to OUT
         PORTA = 0;								// Initialize all PORTA pins to zero
         PORTB = 0;								// Initialize all PORTB pins to zero
         PORTC = 0;								// Initialize all PORTC pins to zero
         PORTD = 0;								// Initialize all PORTD pins to zero
       
         PORTD |= (1<<6);				
       
         // TIMER INITIALIZATIONS 
         TCCR1B = (1 << CS12) | (1 << WGM12); 		// 256 prescale
         OCR1A = 39;       						// Gives frequency of ((1 MhZ)/256)/39) = 100Hz
       
         // UART INITIALIZATIONS
         InitUSART((F_CPU/(1200*16))-1);			// (ClockFreq/(BAUD*16)-1)
       //  InitUSART(95);							// (ClockFreq/(BAUD*16)-1)
         TXOFF;									// Disable TX
         DDRD &= ~(1<<3);									
         DDRD &= ~(1<<0);									
         DDRD &= ~(1<<1);									
         PORTD |= (1<<0);									
         PORTD |= (1<<1);									
         PORTD |= (1<<3);									
       
       }
       
       
       /********************************************************
       *                   FUNCTIONS                           *
       ********************************************************/
       
       double doAdc(int channel,short nSamples){		// "nSamples" value here is the number of measurments to average
         long double average=0;
         int result=0; 								// the averaged value (the return value)
         MCUCR = (1 << SM0);							// Set sleep mode to "ADC Noise Reduction Mode"
         DDRA = 0b11111100;							// Set Pin 0 and 1 on PORTA to input (for ADC measurements)
         ADCSRA = (1<<ADEN) | (1<<ADPS2)/* | (1<<ADPS1) | (1<<ADPS0)*/ | (1<<ADIE); // ADC Enable, 16 prescaler, ADC Interrupt Enable
         while(posFlag);								// Wait for positive flank to end
         while(!posFlag);								// Wait for next positive flank (to get measurments starting on the start of a new positive flank)
         wait(1);									// Give the flank time to rise completely
         ADMUX = channel;								// Set channel to measure
         ADMUX |= (1 << REFS0); 						// AVCC with external capacitor at AREF pin
         for (int j=0;j<nSamples;j++){
           wdt_reset();								// Reset watchdog
           while(!posFlag);							// Make sure measurement is done at positive flank
           MCUCR |= (1<<SE);  		 					// Set enable sleep
           ADCSRA |= (1<<ADSC); 						// Start converting
            SLEEP; 										// go to sleep, will wake up on ADC Complete Interrupt
           MCUCR &= ~(1<<SE); 							// Clear enable sleep, prevent uC from randomly entering sleep mode
           result = (higherADCByte<<8);				// Left shift higher ADC byte 8 steps into 'result'
           result |= lowerADCByte;						// Locical OR lower ADC byte with 'result'
           if (j==0) average = result;					// First measurement will not get averaged
           else average = ((average + (double)result) / 2); // Add and average
         }
         MCUCR &= ~(1 << SM0);							// Set sleep mode to Idle Mode (but will not ENTER sleep mode)
         ADCSRA = 0;									// Disable ADC to reduce power consumption
         DDRA = 0xff;									// Set PORTA to output to prevent floating inputs
         return (double)(average);						// return average
       }
       
       long double getRes()
       {
         double ans=0.0,Vtot=0.0,ansTot=0.0,Vres=0.0;	// Initializing values to zero
         long double resValue=0.0;						// Using long double in order to return values higher than 33.000
       
         ans = doAdc(0,ReadFromEEPROM(NSAMPLES));		
         ansTot = doAdc(1,ReadFromEEPROM(NSAMPLES));
         Vtot = ansTot*5.0/1023.0;						// Calculating total voltage across the two resistors
         Vres = ans*Vtot/ansTot;						// Calculating voltage across the resistor
         resValue = ((Vres*(double)ReadFromEEPROM(RESHIGHREF)) / ( Vtot - Vres))-IR; // Using the known resistor value to calculate sensor value
         if (resValue < 2000 ){						// If sensor value is found to be less than 2k, connect the parallel resistor
           RPON;										// Connecting the parallel resistor
           wait(ReadFromEEPROM(SDELAY));			// Wait some ms to give the relay time to switch on, and transients to go away
           ans = doAdc(0,ReadFromEEPROM(NSAMPLES));	
           ansTot = doAdc(1,ReadFromEEPROM(NSAMPLES));
           Vtot = ansTot*5.0/1023.0;					// Calculating total voltage across the two resistors
           Vres = ans*Vtot/ansTot;						// Calculating voltage across the resistor
           resValue = ((Vres*RP) / ( Vtot - Vres))-IRP;// Using the known resistor value to calculate sensor value
           RPOFF;										// Disconnecting the parallel resistor
         }
         if (resValue >= 10000000L) resValue = 9999999L;
         return resValue;
       }
       
       
       void doMeasure(){
         TIMSK = (1 << OCIE1A);				// Start running AC Volage through resistors (Timer/Counter1, Output Compare A Match Interrupt Enable 0x10)
       
         // Calculate Paralell resistor value
         RP = ((double)ReadFromEEPROM(RESLOWREF)*(double)ReadFromEEPROM(RESHIGHREF)/((double)ReadFromEEPROM(RESLOWREF)+(double)ReadFromEEPROM(RESHIGHREF)));
         for (int i=0;i<ReadFromEEPROM(SENSORS);i++)
         {
           switch (i)
           {
             case 0:
                     R0ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R0OFF;
                     break;
             case 1:
                     R1ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R1OFF;
                     break;
       
             case 2:
                     R2ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R2OFF;
                     break;
             case 3:
                     R3ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R3OFF;
                     break;
             case 4:
                     R4ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R4OFF;
                     break;
             case 5:
                     R5ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R5OFF;
                     break;
             case 6:
                     R6ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R6OFF;
                     break;
             case 7:
                     R7ON;
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     data[i] = (long int)getRes();
                     wait(ReadFromEEPROM(SDELAY));
                     hitwd();
                     R7OFF;
                     break;
             } // switch
           } //for
         TIMSK &= ~(1 << OCIE1A);				// Stop running AC Volage through resistors 
         PORTC = 0;							// Prevent current to run through sensor when in Idle mode, also limiting power consumption
       }
       
       
       
       // INITIALIZE USART
       //-----------------------------------------------------------------------------
       void InitUSART (int baud)
       {
           UBRRH = (char)(baud>>8); 					// Set Baud rate - Cast High byte
           UBRRL = (char)baud;      					// Set Baud rate - Cast Low byte                     
           UCSRB = (1<<RXEN)|(1<<TXEN);  				// Enable Receiver & Transmitter               
           UCSRC = (1<<URSEL)|(1<<UCSZ1)|(1<<UPM1); 	// even parity, 1 stop bit  ,7data
           UCSRB |= (1 << RXCIE);  					// ENABLE RECEIVE INTERRUPT
       } 
       
       
       // SEND BYTE
       //-----------------------------------------------------------------------------
       void TxByte (char data)
       {
         while ( !( UCSRA & (1<<UDRE)) ); 				// Wait for empty transmit buffer            
         UDR = data;  									// Putting data into the buffer, forces transmission                                 
       }
       
       
       // PRINT STRING FUNCTION
       //-----------------------------------------------------------------------------
       void prints(char *string)
       {
         int count =0;
         while ((string[count]) != '\0')
           TxByte((char)string[count++]);				// Putting data into the buffer, forces transmission  
       }
       
       
       
       void WriteToEEPROM(short value,uint16_t n){
           uint16_t eepromnum = n; 
           switch(value)
           {
             case RESLOWREF:
               eeprom_write_word (&ResLowRef, eepromnum);
               break;
             case RESHIGHREF:
               eeprom_write_word (&ResHighRef, eepromnum);
               break;
             case SENSORS:
               eeprom_write_word (&Sensors, eepromnum);
               break;
             case ADDRESS:
               eeprom_write_word (&Address, eepromnum);
               break;
             case NSAMPLES:
               eeprom_write_word (&Samples, eepromnum);
               break;
             case SDELAY:
               eeprom_write_word (&DelayBetweenMeasurement, eepromnum);
               break;
             case SN:
               eeprom_write_word (&Sn, eepromnum);
               break;
           }
       }
       
       uint16_t ReadFromEEPROM(short value){
         uint16_t ByteOfData=0; 
           switch(value)
           {
             case RESLOWREF:
                 ByteOfData = eeprom_read_word(&ResLowRef);	
               break;
             case RESHIGHREF:
                 ByteOfData = eeprom_read_word(&ResHighRef);	
               break;
             case SENSORS:
                 ByteOfData = eeprom_read_word(&Sensors);	
               break;
             case ADDRESS:
                 ByteOfData = eeprom_read_word(&Address);
               break;
             case NSAMPLES:
                 ByteOfData = eeprom_read_word(&Samples);	
               break;
             case SDELAY:
                 ByteOfData = eeprom_read_word(&DelayBetweenMeasurement);
               break;
             case SN:
                 ByteOfData = eeprom_read_word(&Sn);
               break;
           }
         return ByteOfData;
       }
       
       void ton(){
         _delay_us(8680);
         UCSRB &= ~(1 << RXCIE);  					// DISABLE RECEIVE INTERRUPT
         PORTD &= ~(1<<6);
         txen = 1;
       }
       
       void toff(){
         rxn=0;
         txen=0;
         wait(25);														  // Send CR and LF
         UCSRB |= (1 << RXCIE);  					// ENABLE RECEIVE INTERRUPT
         PORTD |= (1<<6);
       }
       
       void wait(int ms){
         for (int i=0;i<ms;i++)_delay_ms(1);
       }
       
       
       

      `}
    </SyntaxHighlighter>
    </div>
    
        </div>
    )
}
