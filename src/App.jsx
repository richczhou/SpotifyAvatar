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
        return {...state, currentCategory: state.currentCategory - 1};
    case "toRight":
        console.log("right");
        return {...state, currentCategory: state.currentCategory + 1};
    case "toUp":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        console.log("up")
        return {...state, currentCategory: state.currentCategory - 1}
    case "toDown":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        console.log("down")
        return {...state, currentCategory: state.currentCategory + 1}
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
        
        {/* LIGHTS! */}
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null} >  
          <Environment preset="studio" />
          <Avatar />
        </Suspense>

      </ContextBridge>
    </Canvas>
  );
}

export default function App() {
  const [{ buttonColor, modelColor, currentCategory }, dispatch] = useReducer(reducer, 
    { buttonColor: "green", 
      currentShape: {
        backing: "backing",
        eyes: "eyes",
        glasses: "glasses",
        hat: "hat",
        head: "head",
        chest: "hoodie",
        skin: "skin",
        mouth: "mouth"
      },
      currentCategory: 100,
      modelColor: {
        backing: "red",
        eyes: "white",
        glasses: "brown",
        hat: "blue",
        head: "orange",
        chest: "green",
        skin: "orange",
        mouth: "red"
      }
    })
  // const [buttonState, dispatch] = useReducer(reducer, { buttonColor: "green", headShape: 100 })
  // move inside the provider within a shell function?
  // everything goes within the Canvas
  return (
  <div>
    <UIContext.Provider value={{ buttonColor, currentCategory, modelColor, dispatch }}>
      
      <UseContextBridgeWrapper />

      <ColorPicker />
      <Arrows />
    </UIContext.Provider>
  </div>
  );
}
