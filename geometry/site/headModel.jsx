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

const HeadModel = forwardRef( (props, ref) => {
  const { modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('./geometry/site/head.gltf')
  const tmap = useTexture('./images/lightbakes/head.png');
  const matColor = new THREE.Color(modelColor.head);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.head.geometry}
        // material={nodes.head.material}
        userData={{modelType: "head"}}
      >
        <hueMaterial 
          tMap={ tmap }
          uColor={ matColor } 
          uColor2={ new THREE.Color("green") }
          uColor3={ new THREE.Color("red") }
          uBrightess={ 0.1 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('./geometry/site/head.gltf')

export default HeadModel;