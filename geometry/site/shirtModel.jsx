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

const ShirtModel = forwardRef( (props, ref) => {
  const { modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('./geometry/site/shirt.gltf');
  const tmap = useTexture('./images/lightbakes/shirt.png');
  const matColor = new THREE.Color(modelColor.chest);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.shirt.geometry}
        // material={nodes.head.material}
        userData={{modelType: "chest"}}
      >
        <hueMaterial 
          tMap={ tmap }
          uColor={ matColor } 
          uColor2={ matColor }
          uColor3={ matColor }
          uBrightess={ 0.1 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('./geometry/site/shirt.gltf')

export default ShirtModel;