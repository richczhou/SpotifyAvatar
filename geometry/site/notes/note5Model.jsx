/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { extend } from "@react-three/fiber"
import { useGLTF, useTexture } from '@react-three/drei'
import NoteMaterial from "../noteMaterial"

extend({ NoteMaterial })

const Note5Model = forwardRef( (props, ref) => {
  const { nodes, materials } = useGLTF('./geometry/site/notes/note5.gltf');
  const tmap = useTexture('./images/lightbakes/note5_AO.png');

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        position={[-1.8, 4.95, -2.1]}
        rotation={[0.4, -0.4,-0.12]}
        castShadow
        receiveShadow
        geometry={nodes.note5.geometry}
        // material={nodes.head.material}
        userData={{modelType: "note5"}}
      >
        <noteMaterial 
          tMap={ tmap }
          uColor={ new THREE.Color("#1e1e1e") } 
          uColor2={ new THREE.Color("green") }
          uColor3={ new THREE.Color("red") }
          uColorBackground={ new THREE.Color("#8b42f9") }
          uBackground={ 1.0 }
          uBrightnss={ 0.1 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('./geometry/site/notes/note5.gltf')

export default Note5Model;