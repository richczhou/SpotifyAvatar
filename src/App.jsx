import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, createContext } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useContextBridge } from "@react-three/drei"
import Avatar from "./Avatar"
import ColorPicker from "./colorPicker"
import Arrows from "./Arrows"


function reducer (state, action) {
  let temp = {...state};
  switch (action.type) {
    case "toGreen":
      temp.modelColor[temp.currentCount].color = "green";
      return temp;
    case "toRed":
      // console.log("red");
      temp.modelColor[temp.currentCount].color = "red";
      return temp;
    case "toBlue":
      // this might memory leak lmfao
      temp.modelColor[temp.currentCount].color = "blue";
      return temp;
    case "toYellow":
      // console.log("yellow");
      temp.modelColor[temp.currentCount].color = "yellow";
      return temp;
    case "toOrange":
      // console.log("orange");
      temp.modelColor[temp.currentCount].color = "orange";
      return temp;
    case "toPink":
      // console.log("pink");
      temp.modelColor[temp.currentCount].color = "pink";
      return temp;
    case "toPurple":
      // console.log("purple");
      temp.modelColor[temp.currentCount].color = "purple";
      return temp;
    case "toTeal":
      // console.log("teal");
      temp.modelColor[temp.currentCount].color = "teal";
      return temp;
    case "toLeft":
        console.log("left");
        return {...state, currentCategory: state.currentCategory - 1};
    case "toRight":
        console.log("right");
        return {...state, currentCategory: state.currentCategory + 1};
    case "toUp":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        console.log("up", state.currentCount)
        return {...state, currentCount: (state.currentCount + 7) % 8}
    case "toDown":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        console.log("down", state.currentCount)
        return {...state, currentCount: (state.currentCount + 1) % 8}
    default:
      return state;
  } 
}

export const UIContext = createContext();

function UseContextBridgeWrapper () {
  const ContextBridge = useContextBridge(UIContext);
  return (
    <Canvas className="main-canvas" camera={{fov: 75, position:[-0.5, 1, 5.5]}} >
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
  const [{ buttonColor, modelColor, currentShape, currentCount }, dispatch] = useReducer(reducer, 
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
      currentCount: 1,
      modelColor: [
        {name: "backing", color: "red"},
        {name: "eyes", color: "white"},
        {name: "glasses", color: "pink"},
        {name: "hat", color: "blue"},
        {name: "head", color: "orange"},
        {name: "chest", color: "green"},
        {name: "skin", color: "orange"},
        {name: "mouth", color: "red"}
      ]
    })
  // const [buttonState, dispatch] = useReducer(reducer, { buttonColor: "green", headShape: 100 })
  // move inside the provider within a shell function?
  // everything goes within the Canvas
  return (
  <div>
    <UIContext.Provider value={{ buttonColor, currentCount, currentShape, modelColor, dispatch }}>
      
      <UseContextBridgeWrapper />

      <ColorPicker />
      <Arrows />
    </UIContext.Provider>
  </div>
  );
}
