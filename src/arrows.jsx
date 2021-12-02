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
                        <svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3577 5L6.17839 17.1977C4.54522 18.5101 4.54521 20.9966 6.17839 22.3089L21.3577 34.5066" stroke="black" stroke-width="9.83554" stroke-linecap="round"/>
</svg>

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