import * as THREE from "three"
import { shaderMaterial } from '@react-three/drei'

const BackMaterial = shaderMaterial(
    {
      tMap: new THREE.Texture(), 
      uColor: new THREE.Color(), 
      uColor2: new THREE.Color(), 
      uColor3: new THREE.Color(), 
      uBrightness: 0.99
    },
    // vertex shader
    `
    attribute vec3 vdata;
  
    uniform vec3 uColor;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uBrightness;
    uniform bool uHighlighted;
  
    varying vec2 vUv;
    varying vec3 vVertexColor;
    varying vec3 vViewDir;
    varying vec3 vNormal;
  
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
      #define PI 3.1415926538
  
      float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
        vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
        return sub.x * sub.y / sub.z + newMin;
      }
      float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
          return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
      }
  
      vec2 rotateUVmatrix(vec2 uv, vec2 pivot, float rotation)
      {
          mat2 rotation_matrix=mat2(  vec2(sin(rotation),-cos(rotation)),
                                      vec2(cos(rotation),sin(rotation))
                                      );
          uv -= pivot;
          uv = uv*rotation_matrix;
          uv += pivot;
          return uv;
      }
  
      uniform sampler2D tMap;
      uniform vec3 uColor;
      uniform vec3 uFresnelColor;

      uniform float uBrightness;

      uniform vec3 uColorBackground;
      uniform float uBackground;
  
      varying vec2 vUv;
      varying vec3 vViewDir;
      varying vec3 vNormal;
      
      void main() {
          vec3 backgroundColor = vec3(0.545, 0.259, 0.976);
  
          gl_FragColor = vec4(backgroundColor, 1.0);
      }
    `
  )

export default BackMaterial;