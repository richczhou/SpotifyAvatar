import * as THREE from "three"
import { Suspense, useRef, useState, useReducer, useContext, forwardRef } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, shaderMaterial, useTexture, useGLTF } from "@react-three/drei"
import { UIContext } from "./App"

// import HeadModel from '../geometry/site/headModel'

const HueMaterial = shaderMaterial(
    {
      tMap: new THREE.Texture(), 
      uColor: new THREE.Color("pink"), 
      uColor2: new THREE.Color(), 
      uColor3: new THREE.Color(), 
      uBrightess: 0.5, 
    },
    // vertex shader
    `
    #!ATTRIBUTES
    attribute vec3 vdata;

    #!UNIFORMS
    uniform sampler2D tMap;
    uniform vec3 uColor;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uBrightness;

    #!VARYINGS
    varying vec2 vUv;
    varying vec3 vVertexColor;
    varying vec3 vViewDir;
    varying vec3 vNormal;

    #!SHADER: Vertex
    #require(range.glsl)

    void main() {
        vUv = uv;
        vVertexColor = vdata;
        vec3 pos = position;
        
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vec4 modelViewPos = modelViewMatrix * vec4(pos, 1.0);
        vViewDir = -modelViewPos.xyz;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewPos;
    }

    `,
    // frag shader
    `
      #!ATTRIBUTES
      attribute vec3 vdata;

      #!UNIFORMS
      uniform sampler2D tMap;
      uniform vec3 uColor;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uBrightness;

      #!VARYINGS
      varying vec2 vUv;
      varying vec3 vVertexColor;
      varying vec3 vViewDir;
      varying vec3 vNormal;

      float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
        vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
        return sub.x * sub.y / sub.z + newMin;
      }
      float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
          return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
      }
      
      float getFresnel(vec3 normal, vec3 viewDir, float power) {
          float d = dot(normalize(normal), normalize(viewDir));
          return 1.0 - pow(abs(d), power);
      }
      
      float getFresnel(float inIOR, float outIOR, vec3 normal, vec3 viewDir) {
          float ro = (inIOR - outIOR) / (inIOR + outIOR);
          float d = dot(normalize(normal), normalize(viewDir));
          return ro + (1. - ro) * pow((1. - d), 5.);
      }
      
      //viewDir = -vec3(modelViewMatrix * vec4(position, 1.0));
      
      void main() {
          vec2 uv = vUv;
      
          vec3 color = texture2D(tMap, vUv).rgb;
      
          //r altcolor1
          if (vVertexColor.r > 0.1) {
              color *= uColor2;
          }
          ////g altcolor1
          else if (vVertexColor.g > 0.1) {
              color *= uColor3;
          }
          //normal color
          else {
              color *= uColor;
          }
      
          float fresnel = getFresnel(vNormal, vViewDir, 1.0) * 1.0;
          float clampedFresnel = crange(fresnel, 0.0, 1.0, 0.0, 1.0);
      
          //not sure how to blend the fresnel but fuck it I guess we got some options
          color = mix(color, color * 1.2 + 0.2, clampedFresnel);
          //color *= clampedFresnel;
      
          color *= uBrightness;
      
          gl_FragColor = vec4(color, 1.0);
      }
    `
)

extend({ HueMaterial })

const HeadModel = forwardRef((props, ref) => {
  const {scene} = useGLTF('./geometry/site/head.gltf')
  return <primitive object={scene} {...props} ref={ref}/>
})  
  
// Declarative homie component
function Avatar() {
  
    const headRef = useRef();
    const bodyRef = useRef();
    const shaderRef = useRef();
    const [clicked, setClicked] = useState(1);
    const {buttonColor, headShape, dispatch} = useContext(UIContext);
    // console.log(headShape);

    const material = new THREE.MeshLambertMaterial({ color: "green" });
    const headGeos = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry( 0.5 ),
      new THREE.CylinderGeometry( 0.5, 0.5, 1 )
    ]

    // console.log(buttonColor)
    const matColor = new THREE.Color(buttonColor);
    const tmap = useTexture('./images/lightbakes/glasses.png');
  
    // Use hook to add things to render loop
    useFrame((state, delta) => {
      // console.log("This runs at 60fps")
        
        headRef.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 3) + 0.2;
        headRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

        bodyRef.current.position.y = 0.32* Math.sin(state.clock.elapsedTime * 3) - 0.4;
        bodyRef.current.position.z = THREE.MathUtils.lerp(bodyRef.current.position.z, clicked%2 ? 1 : 0, 0.2);

        // shaderRef.current.uColor = color1.lerp(color2, (state.mouse.x + 1)/2);
        shaderRef.current.color = matColor;
        // console.log(headRef.current.children[0].material)
        // shaderRef1.current.color = matColor;
        headRef.current.children[0].material.color = matColor
    })
  
  
    return (
      <group>
        <mesh ref={bodyRef} onClick={() => setClicked(clicked + 1)}>
          <cylinderGeometry />
          <meshLambertMaterial ref={shaderRef} />
        </mesh>

        {/* head changes with arrows */}
        {/* <mesh ref={headRef} args={[headGeos[ headShape%3 ], null]} onClick={() => setClicked(clicked + 1)}>
          <meshLambertMaterial ref={shaderRef1} />
        </mesh> */}

        <HeadModel ref={headRef}/>
        
        {/* <HeadModel props={{ref: headRef}} onClick={() => setClicked(clicked + 1)}>
          <HueMaterial
            // tMap={tmap}
            uColor={new THREE.Color("pink")}
            attach="material"
          />
        </HeadModel> */}
      </group>
    )
}

export default Avatar;