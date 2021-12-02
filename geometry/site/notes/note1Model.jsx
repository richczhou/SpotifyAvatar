/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import React, { forwardRef, useRef, useContext } from 'react'
import { extend, useFrame } from "@react-three/fiber"
import { useGLTF, useTexture } from '@react-three/drei'
import NoteMaterial from "../noteMaterial"

extend({ NoteMaterial })

const Note1Model = forwardRef( (props, ref) => {
  const { nodes, materials } = useGLTF('./geometry/site/notes/note1.gltf');
  const tmap = useTexture('./images/lightbakes/note1_AO.png');
  const noteRef = useRef();

  useFrame((state) => {
    // fuck with the numbers here
    noteRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 1.2) + 2.68;
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={noteRef}
        position={[-6.8, 2.68, 1.98]}
        rotation={[0.6, 1.0,-0.5]}
        castShadow
        receiveShadow
        geometry={nodes.note1.geometry}
        // material={nodes.head.material}
        userData={{modelType: "note1"}}
      >
        <noteMaterial 
          tMap={ tmap }
          uColor={ new THREE.Color("#1e1e1e") } 
          uColor2={ new THREE.Color("green") }
          uColor3={ new THREE.Color("red") }
          uColorBackground={ new THREE.Color("#8b42f9") }
          uBackground={ 0.0 }
          uBrightnss={ 0.1 }
          attach="material" />
      </mesh>
    </group>
  )
})

useGLTF.preload('./geometry/site/notes/note1.gltf')

export default Note1Model;