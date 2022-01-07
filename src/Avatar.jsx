import * as THREE from "three"
import { useRef, useState, useContext } from "react"
import { useFrame } from "@react-three/fiber"
import { UIContext } from "./App"

// god this is fucking bloated
import HeadModel from './models/headModel'
import HatModel from './models/hatModel'
import TophatModel from './models/tophatModel'
import EyesModel from './models/eyesModel'
import Eyes2Model from './models/eyes2Model'
import Eyes3Model from './models/eyes3Model'
import Eyes4Model from './models/eyes4Model'
import GlassesModel from './models/glassesModel'
import HeartglassesModel from './models/heartglassesModel'
import MouthModel from './models/mouthModel'
import Mouth2Model from './models/mouth2Model'
import Mouth3Model from './models/mouth3Model'
import Mouth4Model from './models/mouth4Model'
import HoodieModel from './models/hoodieModel'
import ParkaModel from './models/parkaModel'
import ShirtModel from './models/shirtModel'
import SkinModel from './models/skinModel'
import TurtleneckModel from './models/turtleneckModel'
import CowboyhatModel from "./models/cowboyhatModel"

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
    const hatRef = useRef();

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
      groupRef.current.rotation.z = 0.024 * Math.sin(state.clock.elapsedTime * 0.6);
      groupRef.current.position.y = 0.05 * Math.sin(state.clock.elapsedTime * 1.5) - 0.05;
      // groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, clicked%1.1 ? 1 : 0, 0.2);
      
      // console.log(headRef.current.material.uniforms)
    })
  
  
    return (
      <>
      <group position={[-0.2, 0, 0]} ref={groupRef}>

        <HeadModel
        />

        <HatModel 
          ref={hatRef}
        />

        <TophatModel 
        />

        <CowboyhatModel 
        />
        
        {/* <BackingModel 
        /> */}

        <EyesModel 
        />

        <Eyes2Model 
        />

        <Eyes3Model 
        />

        <Eyes4Model 
        />

        <GlassesModel 
        />

        <HeartglassesModel 
        />

        <MouthModel 
        />

        <Mouth2Model 
        />

        <Mouth3Model 
        />

        <Mouth4Model 
        />

        <HoodieModel 
        />

        <ParkaModel 
        />

        <ShirtModel 
        />

        <TurtleneckModel 
        />

        <SkinModel 
        />
        
      </group>
      </>
    )
}

export default Avatar;