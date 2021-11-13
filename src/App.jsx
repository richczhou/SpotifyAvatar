import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, createContext } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useContextBridge } from "@react-three/drei"
import Avatar from "./Avatar"
import ColorPicker from "./colorPicker"
import Arrows from "./Arrows"


function reducer (state, action) {
  switch (action.type) {
    case "toGreen":
      // console.log("green");
      return {...state, buttonColor: "green"};
    case "toRed":
      // console.log("red");
      return {...state, buttonColor: "red"};
    case "toBlue":
      // console.log("blue");
      return {...state, buttonColor: "blue"};
    case "toYellow":
      // console.log("yellow");
      return {...state, buttonColor: "yellow"};
    case "toOrange":
      // console.log("orange");
      return {...state, buttonColor: "orange"};
    case "toPink":
      // console.log("pink");
      return {...state, buttonColor: "pink"};
    case "toPurple":
      // console.log("purple");
      return {...state, buttonColor: "purple"};
    case "toTeal":
      // console.log("teal");
      return {...state, buttonColor: "teal"};
    case "toLeft":
        console.log("left");
        return {...state, headShape: state.headShape - 1};
    case "toRight":
        console.log("right");
        return {...state, headShape: state.headShape + 1};
    default:
      return state;
  } 
}

export const UIContext = createContext();

function UseContextBridgeWrapper () {
  const ContextBridge = useContextBridge(UIContext);
  return (
    <Canvas className="main-canvas">
      <ContextBridge>
          
        {/* Components */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Avatar />
        
        {/* LIGHTS! */}
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null} >  
          <Environment preset="studio" />
        </Suspense>

      </ContextBridge>
    </Canvas>
  );
}

export default function App() {
  const [{ buttonColor, headShape }, dispatch] = useReducer(reducer, { buttonColor: "green", headShape: 100 })
  // const [buttonState, dispatch] = useReducer(reducer, { buttonColor: "green", headShape: 100 })
  // move inside the provider within a shell function?
  // everything goes within the Canvas
  return (
  <div>
    <UIContext.Provider value={{ buttonColor, headShape, dispatch }}>
      
      <UseContextBridgeWrapper />

      <ColorPicker />
      <Arrows />
    </UIContext.Provider>
  </div>
  );
}
