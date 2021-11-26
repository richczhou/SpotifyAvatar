import { Suspense, useRef, useState, useReducer, useContext } from "react"
import './arrows.css';
import { UIContext } from "./App";

function Arrows () {

    const {dispatch} = useContext(UIContext);
    // console.log(buttonColor)

    return (
    <>
        <div className="navGroup leftright">
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toLeft'} ) }>
            </button>
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toRight'} ) }>
            </button>
        </div>
        <div className="navGroup updown">
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toUp'} ) }>
            </button>
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toDown'} ) }>
            </button>
        </div>
    </>
    );
}

export default Arrows;