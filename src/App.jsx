import * as THREE from "three"
import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial } from "@react-three/drei"

// extend({ OrbitControls })

const HueMaterial = shaderMaterial(
  { uColor: new THREE.Color("salmon") },

  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(uColor, 1.0);
    }
  `
)
extend({ HueMaterial })

// Declarative box component
function Avatar() {

  const headRef = useRef();
  const bodyRef = useRef();
  const shaderRef = useRef();
  const shaderRef1 = useRef();
  const [clicked, setClicked] = useState(1);

  let colors = [new THREE.Color("red"), new THREE.Color("green"), new THREE.Color("blue")];

  // Use hook to add things to render loop
  useFrame((state, delta) => {
    // console.log("This runs at 60fps")
    headRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.6;
    headRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 2 : 1, 0.2);

    bodyRef.current.position.y = 0.32* Math.sin(state.clock.elapsedTime * 3) - 0.4;
    bodyRef.current.position.z = THREE.MathUtils.lerp(bodyRef.current.position.z, clicked%2 ? 2 : 1, 0.2);

    // shaderRef.current.uColor = color1.lerp(color2, (state.mouse.x + 1)/2);
    shaderRef.current.color = 
    shaderRef1.current.color = colors[clicked % colors.length];
  })


  return (
    <group>
      <mesh ref={bodyRef} onClick={() => setClicked(clicked + 1)}>
        <cylinderGeometry />
        <meshLambertMaterial color="green" ref={shaderRef} />
        {/* <hueMaterial attach="material" ref={shaderRef} /> */}
      </mesh>
      <mesh ref={headRef} onClick={() => setClicked(clicked + 1)}>
        <sphereGeometry />
        <meshLambertMaterial color="green" ref={shaderRef1} />
        {/* <hueMaterial attach="material" ref={shaderRef} /> */}
      </mesh>
    </group>
  )
}

export default function App() {
  // everything goes within the Canvas
  return <Canvas>
    {/* Adds orbit controls */}
    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    <Avatar />
    
    <ambientLight intensity={0.3} />
    <spotLight position={[10, 10, 10]} intensity={1} />
    <Suspense fallback={null} >  
      <Environment preset="studio" />
    </Suspense>
    
  </Canvas>;
}
