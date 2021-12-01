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

const HoodieModel = forwardRef( (props, ref) => {
  const { currentShape, modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('./geometry/site/hoodie.gltf');
  const tmap = useTexture('./images/lightbakes/hoodie.png');
  const matColor = new THREE.Color(modelColor.find(d => d.name == "chest").color);
  let visibility = currentShape.chest.models[currentShape.chest.curr] == "hoodie";

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        visible={visibility}
        castShadow
        receiveShadow
        geometry={nodes.hoodie.geometry}
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

useGLTF.preload('./geometry/site/hoodie.gltf')

export default HoodieModel;