"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
   A living topographic surface.
   A high-resolution plane is displaced by animated 3D simplex noise in the
   vertex shader; the fragment shader draws glowing contour lines + a faint
   city-grid, tinted amber -> coral -> magenta by elevation. The whole field
   drifts toward the viewer and tilts gently with the cursor.
--------------------------------------------------------------------------- */

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;

  //  Simplex 3D noise (Ashima / Stefan Gustavson, public domain)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    //  scroll the noise toward the viewer over time
    float t = uTime * 0.12;
    float e = 0.0;
    e += snoise(vec3(pos.x * 0.18, pos.y * 0.18 + t, 0.0)) * 1.0;
    e += snoise(vec3(pos.x * 0.45, pos.y * 0.45 + t * 1.6, 1.7)) * 0.4;
    e += snoise(vec3(pos.x * 1.1, pos.y * 1.1 + t * 2.2, 4.0)) * 0.12;

    //  flatten toward the far edge so the horizon stays calm
    float fade = smoothstep(0.0, 14.0, abs(pos.y));
    e *= mix(1.0, 0.35, fade);

    vElevation = e;
    pos.z += e; // plane is rotated flat, so z becomes height

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    //  contour lines from elevation
    float bands = vElevation * 6.0;
    float line = abs(fract(bands - 0.5) - 0.5) / fwidth(bands);
    float contour = 1.0 - min(line, 1.0);

    //  faint city grid from uv
    vec2 grid = abs(fract(vUv * 60.0 - 0.5) - 0.5) / fwidth(vUv * 60.0);
    float g = 1.0 - min(min(grid.x, grid.y), 1.0);
    g *= 0.18;

    //  warm-dusk gradient by elevation
    vec3 low  = vec3(1.0, 0.35, 0.54);  // magenta
    vec3 mid  = vec3(1.0, 0.42, 0.37);  // coral
    vec3 high = vec3(1.0, 0.70, 0.30);  // amber
    float h = clamp(vElevation * 0.6 + 0.5, 0.0, 1.0);
    vec3 col = mix(low, mid, smoothstep(0.0, 0.55, h));
    col = mix(col, high, smoothstep(0.45, 1.0, h));

    //  radial fade from center so edges dissolve into the dark page
    float vign = smoothstep(0.95, 0.35, length(vUv - 0.5));

    float intensity = (contour + g) * vign;
    vec3 finalCol = col * intensity;

    //  small ambient floor so the field reads as a surface, not just lines
    finalCol += col * 0.025 * vign;

    gl_FragColor = vec4(finalCol, intensity * 0.95 + 0.02);
  }
`;

function Terrain({ pointer }) {
  const matRef = useRef();
  const groupRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    if (groupRef.current) {
      //  gentle parallax tilt toward the cursor
      const tx = pointer.current.x;
      const ty = pointer.current.y;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tx * 0.12, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -Math.PI / 2.35 + ty * 0.08,
        0.04
      );
    }
  });

  // smaller grid on small screens for performance
  const seg = size.width < 768 ? 120 : 200;

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.6, 0]}>
      <mesh>
        <planeGeometry args={[34, 34, seg, seg]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const pointer = useRef({ x: 0, y: 0 });

  const onMove = (e) => {
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <div className="hero-canvas" onMouseMove={onMove}>
      <Canvas
        camera={{ position: [0, 2.4, 6.5], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.8]}
      >
        <color attach="background" args={["#0a0a0f"]} />
        <fog attach="fog" args={["#0a0a0f", 7, 17]} />
        <Terrain pointer={pointer} />
      </Canvas>
    </div>
  );
}
