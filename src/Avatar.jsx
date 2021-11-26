import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, forwardRef } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useTexture, useGLTF } from "@react-three/drei"
import { UIContext } from "./App"

import HeadModel from '../geometry/site/headModel'
import HatModel from '../geometry/site/hatModel'
import BackingModel from '../geometry/site/backingModel'
import EyesModel from '../geometry/site/eyesModel'
import GlassesModel from '../geometry/site/glassesModel'
import MouthModel from '../geometry/site/mouthModel'
import HoodieModel from '../geometry/site/hoodieModel'
import ParkaModel from '../geometry/site/parkaModel'
import ShirtModel from '../geometry/site/shirtModel'
import SkinModel from '../geometry/site/skinModel'
import TurtleneckModel from '../geometry/site/turtleneckModel'

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
  
    const headRef = useRef();
    const hatRef = useRef();
    const backingRef = useRef();
    const eyesRef = useRef();
    const glassesRef = useRef();
    const mouthRef = useRef();
    const hoodieRef = useRef();
    const parkaRef = useRef();
    const shirtRef = useRef();
    const skinRef = useRef();
    const turtleneckRef = useRef();
    // const bodyRef = useRef();
    // const shaderRef = useRef();
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
      hatRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      hatRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      eyesRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      eyesRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      glassesRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      glassesRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      mouthRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      mouthRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 0 : -1, 0.2);

      hoodieRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      hoodieRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      parkaRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      parkaRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      shirtRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      shirtRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      turtleneckRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      turtleneckRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      skinRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      skinRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      headRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
      headRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      // shaderRef.current.uColor = color1.lerp(color2, (state.mouse.x + 1)/2);
      // shaderRef.current.color = matColor;
      // console.log(headRef.current.children[0].material)
      // shaderRef1.current.color = matColor;

      // console.log(headRef.current.material.uniforms)
    })
  
  
    return (
      <group>
        {/* <mesh ref={bodyRef} onClick={() => setClicked(clicked + 1)}>
          <cylinderGeometry />
          <meshLambertMaterial ref={shaderRef} />
        </mesh> */}

        {/* head changes with arrows */}
        {/* <mesh ref={headRef} args={[headGeos[ headShape%3 ], null]} onClick={() => setClicked(clicked + 1)}>
          <meshLambertMaterial ref={shaderRef1} />
        </mesh> */}

        <HeadModel
          ref={headRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <HatModel 
          ref={hatRef}
          onClick={() => setClicked(clicked + 1)}
        />
        
        <BackingModel 
          ref={backingRef}
        />

        <EyesModel 
          ref={eyesRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <GlassesModel 
          ref={glassesRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <MouthModel 
          ref={mouthRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <HoodieModel 
          ref={hoodieRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <ParkaModel 
          ref={parkaRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <ShirtModel 
          ref={shirtRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <TurtleneckModel 
          ref={turtleneckRef}
          onClick={() => setClicked(clicked + 1)}
        />

        <SkinModel 
          ref={skinRef}
          onClick={() => setClicked(clicked + 1)}
        />
        
      </group>
    )
}

export default Avatar;