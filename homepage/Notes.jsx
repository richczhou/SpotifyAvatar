import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, createContext } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useContextBridge } from "@react-three/drei"
import Home from "../src/Home"
import './style.css'

export default function Notes() {
  // everything goes within the Canvas
  return (
  <div>
    <Canvas className="main-canvas" camera={{fov: 50, position:[-1.5, 1.5, 32]}} >
      <Suspense fallback={null}>
        <Home />
        {/* <OrbitControls /> */}
      </Suspense>
    </Canvas>
    <div className="content">
      <h1><span style={{fontFamily: 'GoshaSans-Regular'}}>Person-ify</span> your music</h1>
      <h2>What would your alter ego’s<br/> playlist look like?</h2>
      <a href="../src/character.html">
        <button className="btn default">BEGIN</button>
      </a>
      <a href="../library/library.html">
        <button className="pastplaylists">Look at past playlists {">"}</button>
      </a>
    </div>
  </div>
  );
}