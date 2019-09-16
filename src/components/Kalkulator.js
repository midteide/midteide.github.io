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
        this.ClickHandler = this.ClickHandler.bind(this);
        //this.ClickHandler = this.ClickHandler.bind(this);
    }

    async ClickHandler(event){
        var inputNumber = event;
        //let disp=0;
        if (!isNaN(inputNumber)){
            if (this.state.newNumber)  await this.setState({display: `${inputNumber}`, newNumber: false}) 
            else if (this.state.display.length < 25) await this.setState({display: `${this.state.display}${inputNumber}`})
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
                    let disp = `${this.state.display}${"."}`
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
                            <KalkButton ClickHandler={this.ClickHandler}>AC</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>D</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>,</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>/</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton ClickHandler={this.ClickHandler}>7</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>8</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>9</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>x</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton ClickHandler={this.ClickHandler}>4</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>5</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>6</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>-</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton ClickHandler={this.ClickHandler}>1</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>2</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>3</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>+</KalkButton>
                        </div>
                        <div className="row">
                            <KalkButton ClickHandler={this.ClickHandler}>0</KalkButton>
                            <KalkButton ClickHandler={this.ClickHandler}>=</KalkButton>
                        
                        </div>
                    </div>
                    
                    
                        
                </div>
                
                
                
                
                <h1>Ans: {this.state.display} </h1>
                <br/>
                <div>
                    <ButtonGroup size="lg"> 
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler()} >1</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(2)} >2</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(3)} >3</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("+")} >+</Button>
                </ButtonGroup></div>
                <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(4)} >4</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(5)} >5</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(6)} >6</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("-")} >-</Button>
                </ButtonGroup></div>
                <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(7)} >7</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(8)} >8</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(9)} >9</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("x")} >x</Button>
                </ButtonGroup></div>
                <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(0)} >0</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("s")} >S</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(",")} >,</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("/")} >/</Button>
                </ButtonGroup>
            </div>
            <div>
                <ButtonGroup size="lg">
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("C")} >C</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("D")} >{`<-`}</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler(",")} >,</Button>
                    <Button variant="primary" name="getResult" onClick={() => this.ClickHandler("=")} >=</Button>
                </ButtonGroup></div>
            </div>
        )
    }
}

export default Kalkulator