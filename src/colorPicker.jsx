import { Suspense, useRef, useState } from "react"
import './colorPicker.css';

function ColorPicker () {

    function handleClick (color) {
        console.log(color);
    }

    return (
        <div class="palette">
            <button onClick={ () => handleClick("blue") }>Blue</button>
            <button onClick={ () => handleClick("red") }>Red</button>
            <button onClick={ () => handleClick("green") }>Green</button>
            <button onClick={ () => handleClick("yellow") }>Yellow</button>
        </div>
    );
}

export default ColorPicker;