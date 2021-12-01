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
      // console.log("left");
      console.log("left", temp.currentShape[temp.modelColor[temp.currentCount].name].curr)
      // console.log("left", temp.currentShape["hat"].models.length)
      if(temp.currentShape[temp.modelColor[temp.currentCount].name].models.length > 1) {
        temp.currentShape[temp.modelColor[temp.currentCount].name].curr += 0.5;
        temp.currentShape[temp.modelColor[temp.currentCount].name].curr %= 4;
      }
      console.log("left2", temp.currentShape[temp.modelColor[temp.currentCount].name].curr)
      return temp;
    case "toRight":
      console.log("right", temp.currentShape["chest"])
      console.log("2", temp.currentShape[temp.modelColor[temp.currentCount].name].curr)
      console.log("len", temp.currentShape[temp.modelColor[temp.currentCount].name].models.length)
      if(temp.currentShape[temp.modelColor[temp.currentCount].name].models.length > 1) {
        temp.currentShape[temp.modelColor[temp.currentCount].name].curr = (temp.currentShape[temp.modelColor[temp.currentCount].name].curr + 1.5) % 4
      }
      return temp;
    case "toUp":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        console.log("up", state.modelColor[(state.currentCount + 5) % 6].name)
        return {...state, currentCount: (state.currentCount + 5) % 6}
    case "toDown":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        console.log("down", state.modelColor[(state.currentCount + 1) % 5].name)
        return {...state, currentCount: (state.currentCount + 1) % 6}
    default:
      return state;
  } 
}

export const UIContext = createContext();

function UseContextBridgeWrapper () {
  const ContextBridge = useContextBridge(UIContext);
  return (
    <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 5.5]}} >
      <ContextBridge>
          
        {/* Components */}
        {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
        
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
        backing: {curr: 0, models: ["backing"]},
        eyes: {curr: 0, models: ["eyes", "eyes2", "eyes3", "eyes4"]},
        glasses: {curr: 2, models: ["glasses", "heartglasses", "glasses", "heartglasses"]},
        hat: {curr: 0, models: ["hat", "cowboyhat", "tophat"]},
        head: {curr: 0, models: ["head"]},
        chest: {curr: 0, models: ["hoodie", "parka", "shirt", "turtleneck"]},
        skin: {curr: 0, models: ["skin"]},
        mouth: {curr: 0, models: ["mouth", "mouth2", "mouth3", "mouth4"]}
      },
      currentCount: 1,
      modelColor: [
        {name: "eyes", color: "blue"},
        {name: "glasses", color: "pink"},
        {name: "hat", color: "blue"},
        {name: "chest", color: "green"},
        {name: "mouth", color: "red"},
        {name: "skin", color: "orange"},
        {name: "head", color: "orange"},
        {name: "backing", color: "red"}
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
