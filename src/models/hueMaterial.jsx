import * as THREE from 'three'
import { ShaderMaterial, Uniform } from 'three'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useHueMat = (color, tmap, active) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(tmap),
          uColor: new Uniform(color),
          uBrightness: new Uniform(0.99),
          uTime: new Uniform(0),
          uActive: new Uniform(active)
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [color, tmap, active]
  )

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.getElapsedTime()
  })

  return mat
}

// vertex shader
const vert = `
    attribute vec3 vdata;
  
    uniform bool uActive;
    uniform float uTime;
  
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
  `

// frag shader
const frag = `
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

    vec3 saturation(vec3 rgb, float adjustment) {
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      vec3 intensity = vec3(dot(rgb, W));
      return mix(intensity, rgb, adjustment);
    }

    uniform sampler2D tMap;
    uniform vec3 uColor;
    uniform float uBrightness;
    uniform bool uActive;
    uniform float uTime;

    varying vec2 vUv;
    varying vec3 vVertexColor;
    varying vec3 vViewDir;
    varying vec3 vNormal;
    
    void main() {
        // rotate that shit idk why
        vec2 uv = rotateUVmatrix(vec2(1.-vUv.x, vUv.y), vec2(0.5), -PI/2.);
      
        vec3 backgroundColor = vec3(0.545, 0.259, 0.976);
        vec3 color = texture2D(tMap, uv).rgb;
        color.r = crange(color.r, 0.0, 1.0, 0.16, 1.0);
        color.g = crange(color.g, 0.0, 1.0, 0.1, 1.0);
        color.b = crange(color.b, 0.0, 1.0, 0.26, 1.0);

        color *= uColor;

        float avgColor = (color.r + color.g + color.b) / 3.0;
        float fresnel = getFresnel(vNormal, vViewDir, 1.0);
        float clampedFresnel = crange(fresnel, 0.0, 1.0, 0.0, avgColor * 2.5);
        
        vec3 fresnelColor = saturation(color, 2.0);
        fresnelColor = mix(fresnelColor, vec3(1.0), 0.4);
        color = mix(color, fresnelColor, clampedFresnel);

        color *= uBrightness;
        color = saturation(color, 2.0);

        clamp(color, vec3(0), vec3(0.7));

        // glowing pulse on hover
        if (uActive) {
          color = clamp(color += pow((0.3*sin(uTime * 3.0)+0.3), 3.0), 0.0, 1.0);
        }

        // color += crange(sin(time + uv.y * 14.5), -1.0, 1.0, 0.0, fresnel * 0.44);

        gl_FragColor = vec4(color, 1.0);
    }
    `