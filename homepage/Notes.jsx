import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Link } from "react-router-dom";
import Home from "../src/Home"
import './style.css'

export default function Notes() {
  // everything goes within the Canvas
  return (
  <div>
    <Canvas className="main-canvas" camera={{fov: 50, position:[-3, 1.5, 32]}} >
      <Suspense fallback={null}>
        <Home />
        {/* <OrbitControls /> */}
      </Suspense>
    </Canvas>
    <div className="content">
      <h1><span style={{fontFamily: 'GoshaSans-Regular'}}>Person-ify</span> your music</h1>
      <h2 className="subhead">What would your alter ego’s<br/> playlist look like?</h2>
      <Link to="/create">
        <button className="btn default">BEGIN</button>
      </Link>
    </div>
  </div>
  );
}