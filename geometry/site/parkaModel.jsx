/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { extend } from "@react-three/fiber"
import { useGLTF, useTexture } from '@react-three/drei'
import { UIContext } from "../../src/App"
import HueMaterial from "./hueMaterial"

extend({ HueMaterial })

const ParkaModel = forwardRef( (props, ref) => {
  const { modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('./geometry/site/parka.gltf');
  const tmap = useTexture('./images/lightbakes/parka.png');
  const matColor = new THREE.Color(modelColor.chest);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.parka.geometry}
        // material={nodes.head.material}
        userData={{modelType: "chest"}}
      >
        <hueMaterial 
          tMap={ tmap }
          uColor={ matColor } 
          uColor2={ new THREE.Color("pink") }
          uColor3={ new THREE.Color("pink") }
          uBrightess={ 0.1 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('./geometry/site/parka.gltf')

export default ParkaModel;