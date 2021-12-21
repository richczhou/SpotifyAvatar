import * as THREE from "three"
import { useRef, useState, useContext } from "react"
import { useFrame } from "@react-three/fiber"
import { Outline, EffectComposer, HueSaturation, BrightnessContrast } from "@react-three/postprocessing"
import { UIContext } from "./App"

// god this is fucking bloated
import HeadModel from '../geometry/site/headModel'
import HatModel from '../geometry/site/hatModel'
import TophatModel from '../geometry/site/tophatModel'
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
    const [active, setActive] = useState(null);
    const selected = active ? [active] : undefined;

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

      setActive(hatRef);
      // console.log(active)
      // console.log(headRef.current.material.uniforms)
    })
  
  
    return (
      <>
      <group position={[-0.2, 0, 0]} ref={groupRef}>

        <HeadModel
          setActive={setActive}
        />

        <HatModel 
          setActive={setActive}
          ref={hatRef}
        />

        <TophatModel 
          setActive={setActive}
        />

        <CowboyhatModel 
          setActive={setActive}
        />
        
        {/* <BackingModel 
        /> */}

        <EyesModel 
          setActive={setActive}
        />

        <Eyes2Model 
          setActive={setActive}
        />

        <Eyes3Model 
          setActive={setActive}
        />

        <Eyes4Model 
          setActive={setActive}
        />

        <GlassesModel 
          setActive={setActive}
        />

        <HeartglassesModel 
          setActive={setActive}
        />

        <MouthModel 
          setActive={setActive}
        />

        <Mouth2Model 
          setActive={setActive}
        />

        <Mouth3Model 
          setActive={setActive}
        />

        <Mouth4Model 
          setActive={setActive}
        />

        <HoodieModel 
          setActive={setActive}
        />

        <ParkaModel 
          setActive={setActive}
        />

        <ShirtModel 
          setActive={setActive}
        />

        <TurtleneckModel 
          setActive={setActive}
        />

        <SkinModel 
          setActive={setActive}
        />
        
      </group>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline 
          selection={selected}
          visibleEdgeColor="white"
          blur
          pulseSpeed={.4}
          xray={true}
          hiddenEdgeColor="black"
          edgeStrength={10} 
          width={400}/>
        <HueSaturation saturation={.22} />
        <BrightnessContrast brightness={-.15} />
      </EffectComposer>
      </>
    )
}

export default Avatar;