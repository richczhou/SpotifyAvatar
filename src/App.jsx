import { Suspense, useReducer, createContext } from "react"
import { Canvas } from "@react-three/fiber"
import { useContextBridge } from "@react-three/drei"

import Avatar from "./Avatar"
import ColorPicker from "./colorPicker"
import Arrows from "./arrows"
import Navbar from "./Navbar"
import Loading from "./Loading"

function reducer (state, action) {
  let temp = {...state};
  switch (action.type) {
    case "toGreen":
      temp.modelColor[temp.currentCount].color = "#90B078";
      return temp;
    case "toRed":
      // console.log("red");
      temp.modelColor[temp.currentCount].color = "#995454";
      return temp;
    case "toBlue":
      // this might memory leak lmfao
      temp.modelColor[temp.currentCount].color = "#6F8D9C";
      return temp;
    case "toYellow":
      // console.log("yellow");
      temp.modelColor[temp.currentCount].color = "#9C976F";
      return temp;
    case "toOrange":
      // console.log("orange");
      temp.modelColor[temp.currentCount].color = "#EDDFCD";
      return temp;
    case "toPink":
      // console.log("pink");
      temp.modelColor[temp.currentCount].color = "#C6BAA2";
      return temp;
    case "toPurple":
      // console.log("purple");
      temp.modelColor[temp.currentCount].color = "#797979";
      return temp;
    case "toTeal":
      // console.log("teal");
      temp.modelColor[temp.currentCount].color = "#202020";
      return temp;
    case "toLeft":
      // console.log("left");
      // console.log("left", temp.currentShape[temp.modelColor[temp.currentCount].name].curr)
      // console.log("left", temp.currentShape["hat"].models.length)
      if(temp.currentShape[temp.modelColor[temp.currentCount].name].models.length > 1) {
        temp.currentShape[temp.modelColor[temp.currentCount].name].curr += 1;
        temp.currentShape[temp.modelColor[temp.currentCount].name].curr %= 4;
      }
      // console.log("left2", temp.currentShape[temp.modelColor[temp.currentCount].name].curr)
      return temp;
    case "toRight":
      // console.log("right", temp.currentShape["chest"])
      // console.log("2", temp.currentShape[temp.modelColor[temp.currentCount].name].curr)
      // console.log("len", temp.currentShape[temp.modelColor[temp.currentCount].name].models.length)
      if(temp.currentShape[temp.modelColor[temp.currentCount].name].models.length > 1) {
        temp.currentShape[temp.modelColor[temp.currentCount].name].curr = (temp.currentShape[temp.modelColor[temp.currentCount].name].curr + 3) % 4
      }
      return temp;
    case "toUp":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        // console.log("up", state.modelColor[(state.currentCount + 5) % 6].name)
        return {...state, currentCount: (state.currentCount + 5) % 6}
    case "toDown":
      // backing, eyes, glasses, hat, head, chest, skin, mouth
        // console.log("down", state.modelColor[(state.currentCount + 1) % 6].name)
        return {...state, currentCount: (state.currentCount + 1) % 6}
    default:
      return state;
  } 
}

export const UIContext = createContext();

function UseContextBridgeWrapper () {

  const ContextBridge = useContextBridge(UIContext);

  return (
    <Suspense fallback={<Loading/>} >  
      {/* -0.5, 1.5, 5.5 */}
      <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 7.5]}} > 
        <ContextBridge>
            
          {/* Controls */}
          {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
          
          {/* Components */}
          <Avatar />

        </ContextBridge>
      </Canvas>
      <Navbar />
      <ColorPicker />
      <Arrows />
    </Suspense>
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
        {name: "eyes", color: "white"},
        {name: "glasses", color: "#202020"},
        {name: "hat", color: "#202020"},
        {name: "chest", color: "#995454"},
        {name: "mouth", color: "#C6BAA2"},
        {name: "skin", color: "#EDDFCD"},
        {name: "head", color: "#EDDFCD"},
        {name: "backing", color: "#9C6F6F"}
      ]
    })
  // const [buttonState, dispatch] = useReducer(reducer, { buttonColor: "green", headShape: 100 })
  // move inside the provider within a shell function?
  // everything goes within the Canvas
  return (
  <div>
    <UIContext.Provider value={{ buttonColor, currentCount, currentShape, modelColor, dispatch }}>
      <UseContextBridgeWrapper />
    </UIContext.Provider>
  </div>
  );
}
