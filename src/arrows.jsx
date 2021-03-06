import { Suspense, useRef, useState, useReducer, useContext } from "react"
import './arrows.css';
import { UIContext } from "./App";

function Arrows () {

    const {dispatch} = useContext(UIContext);
    // console.log(buttonColor)

    return (
    <>
        <div className="navGroup leftright">
            <button className="arrowalt"
                    onClick={ () => dispatch( {type: 'toLeft'} ) }>
                        <svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3577 5L6.17839 17.1977C4.54522 18.5101 4.54521 20.9966 6.17839 22.3089L21.3577 34.5066" stroke="#FFF" strokeWidth="9.83554" strokeLinecap="round"/>
</svg>

            </button>
            <button className="arrowalt"
                    onClick={ () => dispatch( {type: 'toRight'} ) }>
                        <svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.94403 5.72559L20.1234 17.9233C21.7565 19.2356 21.7565 21.7222 20.1234 23.0345L4.94403 35.2322" stroke="#FFF" strokeWidth="9.83554" strokeLinecap="round"/>
</svg>
            </button>
        </div>
        <div className="navGroup updown">
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toUp'} ) }>
                        <svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3577 5L6.17839 17.1977C4.54522 18.5101 4.54521 20.9966 6.17839 22.3089L21.3577 34.5066" stroke="#9045FA" strokeWidth="9.83554" strokeLinecap="round"/>
</svg>
            </button>
            <button className="arrow"
                    onClick={ () => dispatch( {type: 'toDown'} ) }>
                        <svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.94403 5.72559L20.1234 17.9233C21.7565 19.2356 21.7565 21.7222 20.1234 23.0345L4.94403 35.2322" stroke="#9045FA" strokeWidth="9.83554" strokeLinecap="round"/>
</svg>
            </button>
        </div>
    </>
    );
}

export default Arrows;