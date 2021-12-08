import { Suspense, useRef, useState, useReducer, useContext } from "react"
import './colorPicker.css';
import { UIContext } from "./App";

function ColorPicker () {

    const { currentCategory, dispatch } = useContext(UIContext);
    // console.log(buttonColor)

    return (
        <>
        <div className="palette">
            <button className="button" 
                    style={{backgroundColor: "#5397B0"}} 
                    onClick={ () => dispatch( {obj: "backing", type: 'toBlue'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#9C6F6F"}} 
                    onClick={ () => dispatch( {type: 'toRed'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#90B078"}} 
                    onClick={ () => dispatch( {type: 'toGreen'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#9C976F"}} 
                    onClick={ () => dispatch( {type: 'toYellow'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#EDDFCD"}} 
                    onClick={ () => dispatch( {type: 'toOrange'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#C6BAA2"}} 
                    onClick={ () => dispatch( {type: 'toPink'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#797979"}} 
                    onClick={ () => dispatch( {type: 'toPurple'} ) }>
            </button>
            <button className="button" 
                    style={{backgroundColor: "#202020"}} 
                    onClick={ () => dispatch( {type: 'toTeal'} ) }>        
            </button>

            <a href='../playlist-created/playlist-created.html'>{"Done  >"}</a>
        </div>
        </>
    );
}

export default ColorPicker;