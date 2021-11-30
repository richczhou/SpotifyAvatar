/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { extend } from "@react-three/fiber"
import { useGLTF, useTexture } from '@react-three/drei'
import HueMaterial from "../hueMaterial"

extend({ HueMaterial })

const Note4Model = forwardRef( (props, ref) => {
  const { nodes, materials } = useGLTF('./geometry/site/notes/note4.gltf');
  const tmap = useTexture('./images/lightbakes/note4_AO.png');

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.note4.geometry}
        // material={nodes.head.material}
        userData={{modelType: "note4"}}
      >
        <hueMaterial 
          tMap={ tmap }
          uColor={ new THREE.Color("#1e1e1e") } 
          uColor2={ new THREE.Color("green") }
          uColor3={ new THREE.Color("red") }
          uBrightnss={ 0.1 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('./geometry/site/notes/note4.gltf')

export default Note4Model;