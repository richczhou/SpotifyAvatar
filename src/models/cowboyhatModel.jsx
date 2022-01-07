/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { UIContext } from "../App"
import { useHueMat } from './hueMaterial'


const CowboyhatModel = forwardRef( (props, ref) => {
  const { currentShape, modelColor, currentCount } = useContext(UIContext);
  const { nodes, materials } = useGLTF('/geometry/site/cowboyhat.gltf');
  const tmap = useTexture('/images/lightbakes/cowboyhat.png');
  const matColor = new THREE.Color(modelColor.find(d => d.name == "hat").color);
  let visibility = currentShape.hat.models[currentShape.hat.curr] == "cowboyhat";
  let active = visibility && modelColor[currentCount].name == "hat";
  const mat = useHueMat(matColor, tmap, active);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        material={mat}
        visible={visibility}
        castShadow
        receiveShadow
        geometry={nodes.cowboyhat.geometry}
        // material={nodes.head.material}
        userData={{modelType: "chest"}}
      >
      </mesh>
    </group>
  )
})

useGLTF.preload('/geometry/site/cowboyhat.gltf')

export default CowboyhatModel;