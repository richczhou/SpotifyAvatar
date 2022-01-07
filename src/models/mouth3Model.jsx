/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { UIContext } from "../App"
import { useHueMat } from "./hueMaterial";


const Mouth3Model = forwardRef( (props, ref) => {
  const { currentShape, modelColor, currentCount } = useContext(UIContext);
  const { nodes, materials } = useGLTF('/geometry/site/mouth3.gltf');
  const tmap = useTexture('/images/lightbakes/mouth3.png');
  const matColor = new THREE.Color(modelColor.find(d => d.name == "mouth").color);
  let visibility = currentShape.mouth.models[currentShape.mouth.curr] == "mouth3";
  let active = visibility && modelColor[currentCount].name == "mouth";
  const mat = useHueMat(matColor, tmap, active);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        material={mat}
        visible={visibility}
        castShadow
        receiveShadow
        geometry={nodes.mouth3.geometry}
        // material={nodes.head.material}
        userData={{modelType: "mouth3"}}
      >
      </mesh>
    </group>
  )
})

useGLTF.preload('/geometry/site/mouth3.gltf')

export default Mouth3Model;