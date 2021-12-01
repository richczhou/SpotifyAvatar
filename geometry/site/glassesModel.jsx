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

const GlassesModel = forwardRef( (props, ref) => {
  const {  currentShape, modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('./geometry/site/glasses.gltf');
  const tmap = useTexture('./images/lightbakes/glasses.png');
  const matColor = new THREE.Color(modelColor.find(d => d.name == "glasses").color);
  let visibility = currentShape.glasses.models[currentShape.glasses.curr] == "glasses";

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        visible={visibility}
        castShadow
        receiveShadow
        geometry={nodes.glasses.geometry}
        // material={nodes.head.material}
        userData={{modelType: "glasses"}}
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

useGLTF.preload('./geometry/site/glasses.gltf')

export default GlassesModel;