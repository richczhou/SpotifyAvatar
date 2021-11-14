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

#!SHADER: Fragment
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