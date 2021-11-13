import { Suspense, useRef, useState, useReducer, useContext } from "react"
import './arrows.css';
import { UIContext } from "./App";

function Arrows () {

    const {buttonColor, dispatch} = useContext(UIContext);
    // console.log(buttonColor)

    return (
        <div className="navGroup">
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toLeft'} ) }>
            </button>
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toRight'} ) }>
            </button>
        </div>
    );
}

export default Arrows;