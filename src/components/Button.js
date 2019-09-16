import React from 'react';
import './Button.css'

const isOperator = val => {
    return !isNaN(val) || val === ","  || val === "AC"  || val === "D" || val === "=";
};

export const Button2 = props => (
    //console.table(props.children)
    <div
    className={`button-wrapper ${
        isOperator(props.children) ? null : "operator"
    }`}
    
    >
       {props.children}
    
    </div>
)


//const getName = person=>person.name;

//const getName = function (person) {return person.name}

//const getName = person=>{return person.name}



export const KalkButton = (props) => {
    let cssStyle = `button-wrapper ${isOperator(props.children) ? null : "operator"}`
    if ((props.children === "0" ) || (props.children === "=" ) ) cssStyle = `clear-btn`;
    //console.log(`${cssStyle} clear-btn`)
    //((props.children === "0" ) || (props.children || "=" ) ) ? cssStyle = `${cssStyle} clear-btn` : console.log("Hei");
    return (
    
        <button className={cssStyle} onKeyDown={(event) => props.ClickHandler(event.key)} onClick={(event) => props.ClickHandler(event.currentTarget.innerText
        )} >{props.children}</button>
                            
    )
    }

