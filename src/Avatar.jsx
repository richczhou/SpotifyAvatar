import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, forwardRef } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useTexture, useGLTF } from "@react-three/drei"
import { UIContext } from "./App"

// god this is fucking bloated
import HeadModel from '../geometry/site/headModel'
import HatModel from '../geometry/site/hatModel'
import TophatModel from '../geometry/site/tophatModel'
import BackingModel from '../geometry/site/backingModel'
import EyesModel from '../geometry/site/eyesModel'
import Eyes2Model from '../geometry/site/eyes2Model'
import Eyes3Model from '../geometry/site/eyes3Model'
import Eyes4Model from '../geometry/site/eyes4Model'
import GlassesModel from '../geometry/site/glassesModel'
import HeartglassesModel from '../geometry/site/heartglassesModel'
import MouthModel from '../geometry/site/mouthModel'
import Mouth2Model from '../geometry/site/mouth2Model'
import Mouth3Model from '../geometry/site/mouth3Model'
import Mouth4Model from '../geometry/site/mouth4Model'
import HoodieModel from '../geometry/site/hoodieModel'
import ParkaModel from '../geometry/site/parkaModel'
import ShirtModel from '../geometry/site/shirtModel'
import SkinModel from '../geometry/site/skinModel'
import TurtleneckModel from '../geometry/site/turtleneckModel'
import CowboyhatModel from "../geometry/site/cowboyhatModel"

import Note1Model from "../geometry/site/notes/note1Model"
import Note2Model from "../geometry/site/notes/note2Model"
import Note3Model from "../geometry/site/notes/note3Model"
import Note4Model from "../geometry/site/notes/note4Model"
import Note5Model from "../geometry/site/notes/note5Model"

/*
const HeadModel = forwardRef((props, ref) => {
  const tmap = useTexture('./images/lightbakes/glasses.png');

  const {scene} = useGLTF('./geometry/site/head.gltf')
  console.log(scene)
  console.log(scene.children[0].material)
  return <primitive object={scene} {...props} ref={ref}/>
})  
*/
  
// Declarative homie component
function Avatar() {
  
    // am i stupid
    const groupRef = useRef();

    const [clicked, setClicked] = useState(1);
    const {buttonColor, headShape, modelColor, dispatch} = useContext(UIContext);
    // console.log(headShape);

    const material = new THREE.MeshLambertMaterial({ color: "green" });
    const headGeos = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry( 0.5 ),
      new THREE.CylinderGeometry( 0.5, 0.5, 1 )
    ]

    // console.log(buttonColor)
    const matColor = new THREE.Color(buttonColor);
  
    // Use hook to add things to render loop
    useFrame((state, delta) => {
      // console.log("This runs at 60fps")
      groupRef.current.position.y = 0.1 * Math.sin(state.clock.elapsedTime * 3) - 0.1;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      // shaderRef.current.uColor = color1.lerp(color2, (state.mouse.x + 1)/2);
      // shaderRef.current.color = matColor;
      // console.log(headRef.current.children[0].material)
      // shaderRef1.current.color = matColor;

      // console.log(headRef.current.material.uniforms)
    })
  
  
    return (
      <group position={[-0.2, 0, 0]} ref={groupRef}>

        <HeadModel
          onClick={() => setClicked(clicked + 1)}
        />

        <HatModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <TophatModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <CowboyhatModel 
          onClick={() => setClicked(clicked + 1)}
        />
        
        <BackingModel 
        />

        <EyesModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <Eyes2Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <Eyes3Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <Eyes4Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <GlassesModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <HeartglassesModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <MouthModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <Mouth2Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <Mouth3Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <Mouth4Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <HoodieModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <ParkaModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <ShirtModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <TurtleneckModel 
          onClick={() => setClicked(clicked + 1)}
        />

        <SkinModel 
          onClick={() => setClicked(clicked + 1)}
        />
        
      </group>
    )
}

export default Avatar;