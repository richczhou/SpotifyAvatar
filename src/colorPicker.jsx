import { Suspense, useRef, useState, useReducer, useContext } from "react"
import './colorPicker.css';
import { UIContext } from "./App";

function ColorPicker () {

    const {buttonColor, dispatch} = useContext(UIContext);
    // console.log(buttonColor)

    return (
        <div className="palette">
            <button onClick={ () => dispatch( {type: 'toBlue'} ) }>Blue</button>
            <button onClick={ () => dispatch( {type: 'toRed'} ) }>Red</button>
            <button onClick={ () => dispatch( {type: 'toGreen'} ) }>Green</button>
            <button onClick={ () => dispatch( {type: 'toYellow'} ) }>Yellow</button>
        </div>
    );
}

export default ColorPicker;