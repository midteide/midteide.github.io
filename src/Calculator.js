import React from 'react'
import Kalkulator from './components/Kalkulator'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Calculator = () =>   {
    return (
        <div className="row">
            <div className="col-12">
            <h1 style={{'text-align': 'center'}}>
                Calculator project:
            </h1>
            <Kalkulator />
            <br/>
            <h2>Source code:</h2>
            <SyntaxHighlighter language="react" style={docco}>
      {`
      
import React from "react"
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { KalkButton } from './Button'
import './Kalkulator.css'
import {Input} from './Input'


class Kalkulator extends React.Component {
    constructor() {
        super();
        this.state = {
            answer: 0,
            display: "0",
            firstCalc: true,
            newNumber: true,
            operator: ""
        }
        this.clickHandler = this.clickHandler.bind(this);
        //this.clickHandler = this.clickHandler.bind(this);
    }

    async clickHandler(event){
        var inputNumber = event;
        //let disp=0;
        if (!isNaN(inputNumber)){
            if (this.state.newNumber)  await this.setState({display: {inputNumber}, newNumber: false}) 
            else if (this.state.display.length < 24) await this.setState({display: {this.state.display}{inputNumber}})
        }
        if ((inputNumber === "+") || (inputNumber === "-") || (inputNumber === "/") || (inputNumber === "x")|| (inputNumber === "=")) {
            if (this.state.firstCalc) await this.setState({answer: this.state.display, firstCalc: false, operator: inputNumber})
            else if (this.state.newNumber === false){
                switch (this.state.operator) {
                    case "+": await this.setState((prevState) => ({answer: Number(prevState.answer) + Number(this.state.display)})); break;
                    case "-": await this.setState((prevState) => ({answer: Number(prevState.answer) - Number(this.state.display)})); break;
                    case "/": await this.setState((prevState) => ({answer: Number(prevState.answer) / Number(this.state.display)})); break;
                    case "x": await this.setState((prevState) => ({answer: Number(prevState.answer) * Number(this.state.display)})); break;
                    default: console.log("Case Default")
                }
            }
            await this.setState({operator: inputNumber})
            await this.setState({newNumber: true, display: this.state.answer})
        }
        
        else if ((inputNumber === "AC") || (inputNumber === "Escape") ) {
            await this.setState({answer: 0,
                display: 0,
                firstCalc: true,
                newNumber: true,
                operator: ""})
            console.log("Clear ble trykket")
        }
        else if ((inputNumber === ",") ){
            try {
                if (this.state.newNumber) {
                    this.setState({display: "0."})
                }
                else if (this.state.display.indexOf('.') === -1) {
                    let disp = {this.state.display}{"."}
                    await this.setState({display: disp})
                }
                await this.setState({newNumber: false})
            }
            catch (e) { console.log(e) }
        }
        else if (inputNumber === "D"){
            if (!this.state.readyForNewInput){
                let disp = 0;
                if (this.state.display.length > 1) {
                    disp = this.state.display.slice(0,this.state.display.length-1)
                    await this.setState({display: disp})
                }
            }
        }
        //else if (inputNumber === "=") console.log("=+, answer1: ",this.state.answer);
        if (this.state.inputOk) await this.setState({readyForNewInput: true, inputOk: false})    
        console.log(this.state.display.length)
        
    }

    

    render() {
        //await this.setState({answer: inputNumber})
        
        return (
            
            <div>
                <div className="kalkulator">
                    <div className="calc-wrapper">
                        
                        <Input input={this.state.display}/>
                        
                        <div className="row">
                            <KalkButton clickHandler={this.clickHandler}>AC</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>D</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>,</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>/</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton clickHandler={this.clickHandler}>7</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>8</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>9</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>x</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton clickHandler={this.clickHandler}>4</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>5</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>6</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>-</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton clickHandler={this.clickHandler}>1</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>2</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>3</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>+</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton clickHandler={this.clickHandler}>0</KalkButton>
                            <KalkButton clickHandler={this.clickHandler}>=</KalkButton>
                        
                        </div>
                    </div>
                    
                    
                        
                </div>
                
                
                
                
                <h1>Ans: {this.state.display} </h1>
                <br/>
                <div>
                    <ButtonGroup size="lg"> 
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler()} >1</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(2)} >2</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(3)} >3</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("+")} >+</Button>
                </ButtonGroup></div>
                <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(4)} >4</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(5)} >5</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(6)} >6</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("-")} >-</Button>
                </ButtonGroup></div>
                <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(7)} >7</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(8)} >8</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(9)} >9</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("x")} >x</Button>
                </ButtonGroup></div>
                <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(0)} >0</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("s")} >S</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(",")} >,</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("/")} >/</Button>
                </ButtonGroup>
            </div>
            <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("C")} >C</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("D")} >s</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler(",")} >,</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.clickHandler("=")} >=</Button>
                </ButtonGroup></div>
            </div>
        )
    }
}

export default Kalkulator
      
      `}
    </SyntaxHighlighter>
        </div>
    </div>
    )
}
