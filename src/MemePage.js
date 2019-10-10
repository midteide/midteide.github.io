import React from 'react'
import MemeGenerator from './components/MemeGenerator'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const MemePage = () =>   {
    return (
        <div>
            <h1>
                Random meme generator
            </h1>
            <MemeGenerator />
            <h1>Source code:</h1>
        <pre><SyntaxHighlighter language="react" style={docco}>
            {`
            import React, {Component} from "react"
            //import { tsConstructorType } from "@babel/types";
            import "./style.css"
            
            class MemeGenerator extends React.Component{
                
                constructor() {
                    super();
                    this.state = {
                        topText: "",
                        bottomText: "",
                        imageLink: "http://i.imgflip.com/1bij.jpg",
                        allMemeImages: [],
                        isLoading: true,
                        temp: "",
                        nummer: 0
                        
                    }
                    this.handleChange = this.handleChange.bind(this)
                    this.handleClick = this.handleClick.bind(this)
                }
                
                componentDidMount() {
                    console.log("componentDidMount start")
                    fetch("https://api.imgflip.com/get_memes")
                        .then(response => response.json())
                        .then (response => {
                            const {memes} = response.data
                            
                            this.setState({allMemeImages: memes})
                            console.log(this.state.allMemeImages[2].url)
                            this.setState({temp: this.state.allMemeImages[2].url})
                            console.log(this.state.allMemeImages[3])
                            this.setState({isLoading: false})
                            console.log("componentDidMount stop 2")
                        })
                        console.log("componentDidMount stop")
                        
            
                }
                handleChange(event) {
                    console.log("handleChange start")
                    const {name, value, type} = event.target
                    this.setState({
                        [name]: value
                    })
                    console.log("handleChange stop")
                    /*this.setState(prevState => {
                        
                        console.log(this.state.nummer)
                        return {
                            nummer: prevState.nummer + 1
                        }
                    })
                    this.setState({temp: this.state.allMemeImages[this.state.nummer].url})
                    */        
            
                }
            
                handleClick(){
                    console.log("handleClick")
                    let randomNumber = 0;
                    let tall = 0;
                    let nyAddresse=""
                    try{ 
                        this.state.allMemeImages.forEach(meme => {
                            tall++
                            console.log(tall)
                        })
                    }
                    catch (error) {
                        console.log(error)
                    }
                    randomNumber = Math.random() * tall;
                    const randomInt = randomNumber.toFixed(0)
                    console.log(randomInt)
                    nyAddresse = this.state.allMemeImages[randomInt].url
                    console.log(nyAddresse)
                    this.setState({imageLink: nyAddresse})
                }
            
                render() {
                    console.log("render")
                    return (
                        <div>
                            <form className="meme-form">
                            <input 
                                        type="text"
                                        value={this.state.topText} 
                                        name="topText" 
                                        placeholder="Top Text" 
                                        onChange={this.handleChange} 
                                    />
                                    <br />
                                    <input 
                                        type="text"
                                        value={this.state.bottomText} 
                                        name="bottomText" 
                                        placeholder="Bottom Text" 
                                        onChange={this.handleChange} 
                                    />
                                    <br />
                                <button type="button" onClick={this.handleClick}>Change image</button>
                                <br />
                                
                            </form>
                            <div className="meme">
                                <img src={this.state.imageLink} alt="" />
                                <h2 className="top">{this.state.topText} </h2>
                                <h2 className="bottom">{this.state.bottomText} </h2>
                            </div>
                        </div>
                    )
                }
            }
            
            export default MemeGenerator
            `}
        </SyntaxHighlighter></pre>
        </div>
    )
}
