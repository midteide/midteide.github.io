import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'


export const Chessclock = () =>   {
    return (
        <div>
            <Container>
            <Col xs={12} md={8}>
            <h1>
                Chess Clock project:
            </h1>
            <p>This was a project I made as a birthday gift to my father, a Chess clock. 
				It will detect which side of the board the white/black player is located, and has the possibility for using Fischer-time (additional seconds added to remaining time per move).</p>
            <p>The code can be seen below the pictures.</p>
            <br/>
			<Carousel pauseOnHover="true" fade="true">
                
			<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/chessclock/1.jpg")}
                    alt=""
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                
				<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/chessclock/5.png")}
                    alt=""
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                
				<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/chessclock/3.jpg")}
                    alt=""
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                
				<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/chessclock/4.jpg")}
                    alt=""
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                
				<Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require("./assets/chessclock/2.png")}
                    alt=""
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                
                
            </Carousel>
            
			<h2>Source code:</h2>
            <SyntaxHighlighter language="c" style={docco}>
      {`
      
	  #define F_CPU 8000000UL
	  ////// FILE INCLUDES /////////
	  #include <stdio.h>
	  #include <avr/io.h>
	  
	  #include <util/delay.h>
	  #include <avr/interrupt.h>
	  #include <stdlib.h>
	  #include <avr/pgmspace.h>
	  #include "lcd.h"
	  #define NORMAL  2
	  
	  enum { P1=1,P2,STARTUP};
	  enum { BOOT=0,FISCHER,MODE,TIME,START,END, PAUSE};
	  
	  //////// DEFINES //////////
	  #define BLACK 10
	  #define WHITE 0
	  #define PUSHED 0
	  #define RELEASED 1
	  
	  #define LEFTUP (PINC & 8)
	  #define LEFTDOWN (PINC & 16)
	  #define RIGHTUP (PINC & 2)
	  #define RIGHTDOWN (PINC & 4)
	  #define OK (PINC & 32)
	  #define PLAYER2  (PIND & 4)
	  #define PLAYER1 (PIND & 8)
	  #define P2LEDON		PORTD |= (1<<0)
	  #define P2LEDOFF	PORTD &= ~(1<<0)
	  #define P2LEDTOGGLE	PORTD ^= (1<<0)
	  #define P1LEDON		PORTD |= (1<<1)
	  #define P1LEDOFF	PORTD &= ~(1<<1)
	  #define P1LEDTOGGLE	PORTD ^= (1<<1)
				  
	  
	  
	  //////////  TYPEDEFS  /////////////////////
	  typedef struct{
		  int s;
		  int ms;
		  int min;
	  } time;
	  
	  //////// GLOBAL VARIABLES  /////////////////
	  volatile time p1;
	  volatile time p2;
	  volatile time tikk;
	  volatile char turn = STARTUP;
	  volatile char started = 1;
	  volatile int test =0;
	  volatile char fischer=3;
	  volatile char mode=NORMAL;
	  volatile char white=0;
	  volatile int n = 30;
	  volatile int p1blink=0,p2blink=0;
	  volatile char start=BOOT;
	  volatile char rep=0;
	  
	  /////// FUNCTION PROTOTYPES ///////////////
	  void brdinit(void);
	  void lcd_putsxy(char x, char y, char *s);
	  void updatelcd();
	  
	  //////////  TIMER INTERRUPT ROUTINE  /////
	  ISR(TIMER1_COMPA_vect){	
		  p1blink++;
		  p2blink++;
		if (start == START){
		  switch (turn)
		  {
		  
			case P1:
			  if ((p1.s==0) && (p1.min >0)) {
				p1.min--;
				p1.s=59;
			  }
			  if (p1.ms ==0) {
				p1.ms=99;
				p1.s--;
				break;
			  }
			  else p1.ms--;
			  break;
		  
			  case P2:
			if ((p2.s==0) && (p2.min >0)) {
			  p2.min--;
			  p2.s=59;
			}
			if (p2.ms ==0) {
			  p2.ms=99;
			  p2.s--;
			  break;    //NEEDED????????
			 }
		   else p2.ms--;
		   break;
		  
		   case STARTUP:
		   case PAUSE:
			   tikk.ms++;
			  break;
		  }	// END SWITCH
		}
		if ((start == END) && ( rep < 10) ){
	  
		  if (test < n){
			  PORTD |= (1<<7);
		  }
		  else PORTD &= ~(1<<7);
		  if (test >= (n*2)){
			   test = 0;
		  }
		  else test++;
		}
	  
	  
	  }
	  
	  int main(){
		char buffer[20];
		char update=0;
		char p1first=1,p2first=1;
		char winner = 0;
		brdinit();
		// START MAIN LOOP
		lcd_clrscr();
		while(1)
		{
		  while (start == BOOT)
		  {
			lcd_putsxy(0,0,"  Sjakklokke  v2.0  ");
			 lcd_putsxy(0,1,"     laget av       ");
			  lcd_putsxy(0,2," Alexander Midteide ");  
			 lcd_putsxy(0,3,"     20 (C) 09      ");
			  _delay_ms(1000);  
			  lcd_clrscr();
			lcd_putsxy(0,0," Gratulerer med  ");
			 lcd_putsxy(0,1," dagen, pappa!:-)   ");
			  lcd_putsxy(0,2,"                    ");  
			 lcd_putsxy(0,3,"-Alex, 5. Juni 2009");
			  _delay_ms(2000);  
			  lcd_clrscr();
			start = MODE;
		  }
			
		  update =1;
		  while (start == MODE)
		  {
			if (update){
			  lcd_putsxy(0,0,"Choose mode:");
			   if (mode == FISCHER) {
				lcd_putsxy(0,2,"   Normal");
				  lcd_putsxy(0,3,"*  Fischer");
			  }
			  else {
				lcd_putsxy(0,2,"*  Normal");
				  lcd_putsxy(0,3,"   Fischer");
			  }
			  update = 0;
			}
	  
			if (LEFTDOWN == PUSHED ) 
			{
			  while (LEFTDOWN == PUSHED );
			  
			  
			  mode = NORMAL;
			  update=1;
			}
			if (LEFTUP == PUSHED ) 
			{
			  while(LEFTUP == PUSHED );
			  mode = FISCHER;
			  update=1;
			} // if
			if (OK == PUSHED){
			  _delay_ms(350);
			  while (OK == PUSHED);
			  if (mode == FISCHER) start = FISCHER;
			  else start = TIME;
			  lcd_clrscr();
			  while (OK == PUSHED);
			}
		  } // end while start
		  update =1;
		  while(start == PAUSE)
		  {
			lcd_putsxy(0,0,"********************");
			 lcd_putsxy(0,1,"*    GAME PAUSED   *");
			  if (((turn ==P2) && (white == P2)) || ((turn == P1) && (white == P1))) 
			  lcd_putsxy(0,2,"*   WHITE'S MOVE   *");
			else lcd_putsxy(0,2,"*   BLACK'S MOVE   *");  
			lcd_putsxy(0,3,"********************");
			if (OK == PUSHED) {
			  while (OK == PUSHED);
			  start = START;
			  lcd_clrscr();
			  _delay_ms(50);
			  while (OK == PUSHED);
			}
		  }
			
		  while(start == FISCHER)
		  {
			if (update){
				lcd_clrscr();
			  lcd_putsxy(0,0,"Enter amount of");
			  lcd_putsxy(0,1,"additional seconds");
			  lcd_putsxy(0,2,"per move:");
			  sprintf(buffer,"%d seconds",fischer);
			  lcd_putsxy(0,3,buffer);
			  //lcd_putsxy(15,3," OK");
			  update = 0;
			}
			if ( LEFTUP == PUSHED )  
			{
				while(LEFTUP == PUSHED);
			  _delay_ms(10);
				while(LEFTUP == PUSHED);
			  
			  if (fischer >0) fischer--;
			  update = 1;
			}
			if ( LEFTDOWN == PUSHED )  
			{
				while(LEFTDOWN == PUSHED);
			  _delay_ms(10);
				while(LEFTDOWN == PUSHED);
			  
			  if (fischer < 59) fischer++;
			  update = 1;
			}
	  
			if ( OK == PUSHED )  
			{
				while(OK == PUSHED);
			  _delay_ms(350);
				while(OK == PUSHED);
			  start = TIME;
			  lcd_clrscr();
			  while (OK == PUSHED);
			} // end if Btm
		  } // end while temp
	  
		  update = 1;
		  while (start == TIME)
		  {
			if (update){
			  lcd_putsxy(0,0,"Set up player times:");
				lcd_putsxy(0,2,"Player 1  Player 2");
				sprintf(buffer,"%dm,%d.%02d ",p1.min,p1.s,p1.ms);	 
			  lcd_putsxy(WHITE,3,buffer);	 
			  sprintf(buffer,"%dm,%d.%02d ",p2.min,p2.s,p2.ms);	 
			  lcd_putsxy(BLACK,3,buffer);	 
			  update = 0;
			}
	  
			 if (LEFTUP == PUSHED ) 
			{
			  while(LEFTUP == PUSHED );
			  _delay_ms(10);
			  while(LEFTUP == PUSHED );
			  if (p1.min > 1) p1.min--;
			  update =1;
			}  
			 if (LEFTDOWN == PUSHED ) 
			{
			  while(LEFTDOWN == PUSHED );
			  _delay_ms(10);
				while(LEFTDOWN == PUSHED);
			  if (p1.min < 60) p1.min++;
			  update =1;
			}  
			 if (RIGHTUP == PUSHED ) 
			{
			  while(RIGHTUP == PUSHED );
			  _delay_ms(10);
			  while(RIGHTUP == PUSHED );
			  if (p2.min > 1) p2.min--;
			  update =1;
			}  
			 if (RIGHTDOWN == PUSHED ) 
			{
			  while(RIGHTDOWN == PUSHED );
			  _delay_ms(10);
				while(RIGHTDOWN == PUSHED);
			  if (p2.min < 60) p2.min++;
			  update =1;
			}  
			if ( OK == PUSHED )  
			{
				while(OK == PUSHED);
			  _delay_ms(10);
				while(OK == PUSHED);
			  start = START;
			  lcd_clrscr();
				while(OK == PUSHED);
			} // end if Btm
		   }
	  
	  
		  while(start == START){
			if (white == 0){
			  lcd_putsxy(0,0,"BLACK STARTS GAME");
			  lcd_putsxy(0,1,"BY PUSHING TIME");
			  lcd_putsxy(0,2,"BUTTON.");
				while(PLAYER1 == PUSHED);
				while(PLAYER2 == PUSHED);
			  while (white ==0){
				if (PLAYER1 == PUSHED) {
				  white = P2;
				  turn = P2;
			  P1LEDOFF;
			  P2LEDON;
				}
				if (PLAYER2 == PUSHED){
				  white = P1;
				  turn = P1;
			  P1LEDON;
			  P2LEDOFF;
				}
			  }
			  lcd_clrscr();
			}
			  
			updatelcd();
			if (turn == P1){
			  if (update){
				  P1LEDON;
				  P2LEDOFF;
				if (white == P1) {
				  lcd_putsxy(0,3,"   WHITE TO MOVE! ");
				  }
				if (white == P2) {
				  lcd_putsxy(0,3,"   BLACK TO MOVE! ");
				  }
				update = 0;
			  }
			  if ( (p1.min == 0) && (p1.s > 29)) {
				if (p1blink > 100) {
				  P1LEDTOGGLE;
				  p1blink = 0;
				}
			  }
			  if ( (p1.min == 0) && (p1.s < 29) && (p1.s > 10)) {
				if (p1blink > 30) {
				  P1LEDTOGGLE;
				  p1blink = 0;
				}
			  }
			  if ( (p1.min == 0) && (p1.s <= 10) ) {
				if (p1blink > 10) {
				  P1LEDTOGGLE;
				  p1blink = 0;
				}
			  }
			}
		  
			  
			if (turn == P2){
			  if (update){
				  P1LEDOFF;
				  P2LEDON;
				if (white == P2) {
				  lcd_putsxy(0,3,"   WHITE TO MOVE! ");
				  }
				if (white == P1) {
				  lcd_putsxy(0,3,"   BLACK TO MOVE! ");
				  }
				update = 0;
			  }
			  if ( (p2.min == 0) && (p2.s > 29)) {
				if (p2blink > 100) {
				  P2LEDTOGGLE;
				  p2blink = 0;
				}
			  }
			  if ( (p2.min == 0) && (p2.s < 29) && (p2.s > 10)) {
				if (p2blink > 30) {
				  P2LEDTOGGLE;
				  p2blink = 0;
				}
			  }
			  if ( (p2.min == 0) && (p2.s <= 10) ) {
				if (p2blink > 10) {
				  P2LEDTOGGLE;
				  p2blink = 0;
				}
			  }
		   }   
			if ( OK == PUSHED )  
			{
				while(OK == PUSHED);
			  _delay_ms(10);
				while(OK == PUSHED);
			  start = PAUSE;
			  lcd_clrscr();
			  while (OK == PUSHED);
			} // end if Btm
		   if ( (PLAYER2 == PUSHED) && (turn != P1) ){
			 if ((mode == FISCHER) && (p1first == 0) ) {
			   if (white == P2) { 
				 p1.s += fischer;
				 if (p1.s > 59) {
				   p1.min++;
				   p1.s -= 60;
				   }
			   }
			   if (white == P1) { 
				 p2.s += fischer;
				 if (p2.s > 59) {
				   p2.min++;
				   p2.s -= 60;
				   }
			   }
			 }
			 turn = P1;
			 p1first =0;
			 update = 1;
		   }     
			 if ( (PLAYER1 == PUSHED) && (turn != P2) ){
			 if ((mode == FISCHER) && (p2first == 0) ) {
			   if (white == P1) { 
				 p1.s += fischer;
				 if (p1.s > 59) {
				   p1.min++;
				   p1.s -= 60;
				   }
			   }
			   if (white == P2) { 
				 p2.s += fischer;
				 if (p2.s > 59) {
				   p2.min++;
				   p2.s -= 60;
				   }
			   }
			 }
			 turn = P2;
			 p2first = 0;
			 update = 1;
			}   
			if ( (p1.s == 0) && (p1.min <= 0) && (p1.ms <= 0) ) {
			  winner = P2;
			  start = END;	  
			  P1LEDON;
			  P2LEDON;
			}
			if ( (p2.s == 0) && (p2.min <= 0) && (p2.ms <= 0) ) {
			  winner = P1;
			  start = END;	  
			  P1LEDON;
			  P2LEDON;
			}
	  
		   }
		  update = 1;
		  while(start == END){
			//////////// TEST IF ANY OF THE PLAYERS ARE OUT OF TIME ///////////////
			if (update){
			  TIMSK &= ~(1 << OCIE1A);				//Timer/Counter1, Output Compare A Match Interrupt Enable 0x10;
			  TCCR1B = (1 << CS11) | (1 << WGM12); 	//0x0C;     // 256 prescale
			  OCR1A = 1;       					// Gives frequency of ((8 MhZ)/256)/313) = 99.8Hz
			  update =0;
			  TIMSK = (1 << OCIE1A);				//Timer/Counter1, Output Compare A Match Interrupt Enable 0x10;
			}
			if ( (winner == P1) && (white == P1)){
			  updatelcd();
			  lcd_putsxy(0,3,"   WHITE WINS!   ");
			}
			if ( (winner == P2) && (white == P1)){
			  updatelcd();
			  lcd_putsxy(0,3,"   BLACK WINS!   ");
			}
			if ( (winner == P1) && (white == P2)){
			  updatelcd();
			  lcd_putsxy(0,3,"   BLACK WINS!   ");
			}
			if ( (winner == P2) && (white == P2)){
			  updatelcd();
			  lcd_putsxy(0,3,"   WHITE WINS!   ");
			}
	  
			if (p2blink > 1) {
			  P2LEDTOGGLE;
			  P1LEDTOGGLE;
			  p2blink = 0;
			}
			if (rep < 3) {
			  rep++;
			  for (int i=20;i<80;i++){
				n=i;
				_delay_us(500);
				   if ((LEFTUP == PUSHED) || (LEFTDOWN == PUSHED) || (RIGHTUP == PUSHED) || (RIGHTDOWN == PUSHED) || (OK == PUSHED) || (PLAYER1 == PUSHED) || (PLAYER2 == PUSHED) ) {
				  cli();
				  lcd_clrscr();
				  lcd_putsxy(0,0,"Restarting...");
				  _delay_ms(1000);
				  brdinit();
				  start = MODE;
				  lcd_clrscr();
				}//if
			  }//for
			}//if rep
			else if (rep < 50) rep++;
			   if ((LEFTUP == PUSHED) || (LEFTDOWN == PUSHED) || (RIGHTUP == PUSHED) || (RIGHTDOWN == PUSHED) || (OK == PUSHED) || (PLAYER1 == PUSHED) || (PLAYER2 == PUSHED) ) {
			  cli();
			  lcd_clrscr();
			  lcd_putsxy(0,0,"Restarting...");
			  _delay_ms(1000);
			  brdinit();
			  start = MODE;
			  lcd_clrscr();
	  
			}
	  
		  }// while END
		}// END MAIN LOOP
		
	  } // END MAIN
	  
	  void brdinit(void){
		
		// INITIALIZE LCD
		  
		// GPIO REGISTERS
		DDRD = 0x83;
		PORTD = 0xef;
		DDRC = 0x00;
		PORTC = 0xff;
		DDRB = 0xff;
		// TIMER INITIALIZATIONS 
		TIMSK = (1 << OCIE1A);				//Timer/Counter1, Output Compare A Match Interrupt Enable 0x10;
		TCCR1B = (1 << CS12) | (1 << WGM12); 	//0x0C;     // 256 prescale
		OCR1A = 313;       					// Gives frequency of ((8 MhZ)/256)/313) = 99.8Hz
		_delay_ms(100);
		P1LEDOFF;
		P2LEDOFF;
		lcd_init(LCD_DISP_ON);
		// SETTING DEFAULT PLAYING TIME FOR BOTH PLAYERS
		p1.min=5;
		p1.s=0;
		p1.ms=0;
		p2.min=5;
		p2.s=0;
		p2.ms=0;
		turn = STARTUP;
		started = 1;
		test =0;
		fischer=3;
		mode=NORMAL;
		white=0;
		n = 30;
		p1blink=0;
		p2blink=0;
		start=BOOT;
		tikk.ms=0;
		tikk.s=0;
		
		sei();  // GLOBAL INTERRUPT ENABLE
	  }
	  
	  
	  // USED FOR EASY PRINTING TO LCD DISPLAY
	  void lcd_putsxy(char x, char y, char *s){
		  lcd_gotoxy(x,y);
		  lcd_puts(s);
	  
	  }
	  void updatelcd(){
		char buffer[20];
			  if (white == P1){
				sprintf(buffer,"%dm,%d.%02d ",p1.min,p1.s,p1.ms);	 
				lcd_putsxy(0,1,buffer);	 
				sprintf(buffer,"%dm,%d.%02d ",p2.min,p2.s,p2.ms);	 
				lcd_putsxy(10,1,buffer);	 
				lcd_putsxy(WHITE,0,"WHITE");	 
				lcd_putsxy(BLACK,0,"BLACK");	 
			  }
			  if (white == P2){
				sprintf(buffer,"%dm,%d.%02d ",p1.min,p1.s,p1.ms);	 
				lcd_putsxy(0,1,buffer);	 
				sprintf(buffer,"%dm,%d.%02d ",p2.min,p2.s,p2.ms);	 
				lcd_putsxy(10,1,buffer);	 
				lcd_putsxy(BLACK,0,"WHITE");	 
				lcd_putsxy(WHITE,0,"BLACK");	 
			  }
	  }
	  
       
       

      `}
    </SyntaxHighlighter>
	</Col>
        </Container>
     </div>
    )
}



