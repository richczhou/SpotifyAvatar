import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, createContext } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useContextBridge } from "@react-three/drei"
import Home from "../src/Home"

export default function Notes() {
  // everything goes within the Canvas
  return (
  <div>
    <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 35]}} >
      <Suspense fallback={null}>
        <Home />
        <OrbitControls />
      </Suspense>
    </Canvas>
    <div className="content">
      <h1>Person-ify your music</h1>
      <h2>What would your alter ego’s<br/> playlist look like?</h2>
      <a href="character.html">
        <button className="btn default">BEGIN</button>
      </a>
      <button className="pastplaylists">Look at past playlists</button>
    </div>
  </div>
  );
}
