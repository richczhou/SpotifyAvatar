import { Suspense, useRef, useState, useReducer, useContext } from "react"
import './colorPicker.css';
import { UIContext } from "./App";

function ColorPicker () {

    const { dispatch } = useContext(UIContext);
    // console.log(buttonColor)

    return (
        <div className="palette">
            <button className="button" 
                    style={{backgroundColor: "blue"}} 
                    onClick={ () => dispatch( {type: 'toBlue'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "red"}} 
                    onClick={ () => dispatch( {type: 'toRed'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "green"}} 
                    onClick={ () => dispatch( {type: 'toGreen'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "yellow"}} 
                    onClick={ () => dispatch( {type: 'toYellow'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "orange"}} 
                    onClick={ () => dispatch( {type: 'toOrange'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "pink"}} 
                    onClick={ () => dispatch( {type: 'toPink'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "purple"}} 
                    onClick={ () => dispatch( {type: 'toPurple'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "teal"}} 
                    onClick={ () => dispatch( {type: 'toTeal'} ) }>        
            </button>
        </div>
    );
}

export default ColorPicker;