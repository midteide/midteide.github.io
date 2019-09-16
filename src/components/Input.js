import React from "react"
import "./Input.css";

export const Input = props => {
    var lengthString = String(props.input)
    console.log(lengthString)
    let cssStyle = "inputLarge";
    if (lengthString.length > 20) cssStyle = "inputSmall"; 
    else if (lengthString.length > 13) cssStyle = "inputMedium"; 
    console.log(props.input.length)
    console.log(props.input)
    console.log(cssStyle)
    return (
        <div className={cssStyle}>{props.input}</div>
    )
}

/*

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

*/