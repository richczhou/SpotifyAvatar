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

const Mouth3Model = forwardRef( (props, ref) => {
  const { currentShape, modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('../geometry/site/mouth3.gltf');
  const tmap = useTexture('../images/lightbakes/mouth3.png');
  const matColor = new THREE.Color(modelColor.find(d => d.name == "mouth").color);
  let visibility = currentShape.mouth.models[currentShape.mouth.curr] == "mouth3";

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        visible={visibility}
        castShadow
        receiveShadow
        geometry={nodes.mouth3.geometry}
        // material={nodes.head.material}
        userData={{modelType: "mouth3"}}
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

useGLTF.preload('../geometry/site/mouth3.gltf')

export default Mouth3Model;