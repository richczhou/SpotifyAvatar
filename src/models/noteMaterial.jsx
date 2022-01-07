import * as THREE from "three"
import { shaderMaterial } from '@react-three/drei'

const NoteMaterial = shaderMaterial(
    {
      tMap: new THREE.Texture(), 
      uColor: new THREE.Color(), 
      uColor2: new THREE.Color(), 
      uColor3: new THREE.Color(), 
      uBrightness: 0.99,
      uTIme: 0.0,
    },
    // vertex shader
    `
  
    uniform sampler2D tMap;
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
  
      float getFresnel(vec3 normal, vec3 viewDir, float power) {
          float d = dot(normalize(normal), normalize(viewDir));
          return 1.0 - pow(abs(d), power);
      }
  
      float getFresnel(float inIOR, float outIOR, vec3 normal, vec3 viewDir) {
          float ro = (inIOR - outIOR) / (inIOR + outIOR);
          float d = dot(normalize(normal), normalize(viewDir));
          return ro + (1. - ro) * pow((1. - d), 5.);
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
          // rotate that shit idk why
          vec2 uv = rotateUVmatrix(vec2(1.-vUv.x, vUv.y), vec2(0.5), -PI/2.);
      
          vec3 color = vec3(0.06);
  
          float fresnel = getFresnel(vNormal, vViewDir, 1.0) * 1.0;
          color = mix(color, mix(backgroundColor, vec3(0.6), 0.4), fresnel*0.7);

          clamp(color, vec3(0), vec3(1));
  
          gl_FragColor = vec4(color, 1.0);
      }
    `
  )

export default NoteMaterial;