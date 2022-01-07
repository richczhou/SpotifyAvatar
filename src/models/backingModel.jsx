/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { extend } from "@react-three/fiber"
import { useGLTF, useTexture } from '@react-three/drei'
import { UIContext } from "../App"
import BackdropMaterial from "./backdropMaterial"

extend({ BackdropMaterial })

const BackingModel = forwardRef( (props, ref) => {
  const { modelColor } = useContext(UIContext);
  const { nodes, materials } = useGLTF('/geometry/site/backing.gltf')
  const tmap = useTexture('/images/lightbakes/backing.png');
  const matColor = new THREE.Color(modelColor.find(d => d.name == "backing").color);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        scale={2}
        castShadow
        receiveShadow
        geometry={nodes.backing.geometry}
        // material={nodes.backing.material}
        userData={{modelType: "backing"}}
      >
        <backdropMaterial 
          tMap={ tmap }
          uColor={ new THREE.Color("#FFFFFF") } 
          uColor2={ new THREE.Color("green") }
          uColor3={ new THREE.Color("red") }
          uBrightness={ 0.9 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('/geometry/site/backing.gltf')

export default BackingModel;