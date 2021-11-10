import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, createContext } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useContextBridge } from "@react-three/drei"
import Avatar from "./Avatar"
import ColorPicker from "./colorPicker"


function reducer (state, action) {
  switch (action.type) {
    case "toGreen":
      // console.log("green");
      return {buttonColor: "green"};
    case "toRed":
      // console.log("red");
      return {buttonColor: "red"};
    case "toBlue":
      // console.log("blue");
      return {buttonColor: "blue"};
    case "toYellow":
      // console.log("yellow");
      return {buttonColor: "yellow"};
    case "toOrange":
      // console.log("orange");
      return {buttonColor: "orange"};
    case "toPink":
      // console.log("pink");
      return {buttonColor: "pink"};
    case "toPurple":
      // console.log("purple");
      return {buttonColor: "purple"};
    case "toTeal":
      // console.log("teal");
      return {buttonColor: "teal"};
    default:
      return state;
  } 
}

export const UIContext = createContext("green");

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
  const [{ buttonColor }, dispatch] = useReducer(reducer, { buttonColor: "green" })
  // move inside the provider within a shell function?
  // everything goes within the Canvas
  return (
  <div>
    <UIContext.Provider value={{ buttonColor, dispatch }}>
      
      <UseContextBridgeWrapper />

      <ColorPicker />
    </UIContext.Provider>
  </div>
  );
}
