import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, forwardRef } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"

// god this is fucking bloated
import Backplane from './models/backplane'

import Note1Model from "./models/note1Model"
import Note2Model from "./models/note2Model"
import Note3Model from "./models/note3Model"
import Note4Model from "./models/note4Model"
import Note5Model from "./models/note5Model"

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
function Home() {
  
    // am i stupid
    const groupRef = useRef();

    const [clicked, setClicked] = useState(1);
    // console.log(headShape);

  
    // Use hook to add things to render loop
    useFrame((state, delta) => {
      // console.log("This runs at 60fps")
      // groupRef.current.position.y = 0.1 * Math.sin(state.clock.elapsedTime * 2);
      // groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

      // shaderRef.current.uColor = color1.lerp(color2, (state.mouse.x + 1)/2);
      // shaderRef.current.color = matColor;
      // console.log(headRef.current.children[0].material)
      // shaderRef1.current.color = matColor;

      // console.log(headRef.current.material.uniforms)
    })
  
  
    return (
      <group position={[-0.2, 0, 20]} ref={groupRef}>

        <Note1Model
          onClick={() => setClicked(clicked + 1)}
        />

        <Note2Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <Note3Model
          onClick={() => setClicked(clicked + 1)}
        />

        <Note4Model 
          onClick={() => setClicked(clicked + 1)}
        />

        <Note5Model
          onClick={() => setClicked(clicked + 1)}
        />

        <Backplane 
          onClick={() => setClicked(clicked + 1)}
        />

        
      </group>
    )
}

export default Home;