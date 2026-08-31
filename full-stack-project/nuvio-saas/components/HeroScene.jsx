"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { createContext, useContext, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const SceneVariantContext = createContext("home");
const SceneLayoutContext = createContext(null);

function getSceneLayout(width, height, variant) {
  const isAuth = variant === "auth";

  if (isAuth) {
    return {
      cameraZ: 5.6,
      cameraX: 0,
      lookAt: [0, 0.05, 0],
      fov: 42,
      globePosition: [0, 0.2, 0],
      globeScale: 0.92,
      pointSize: 0.018,
    };
  }

  if (width < 900) {
    const vmin = Math.min(width, height);
    const scale = Math.min(1.02, Math.max(0.82, vmin / 420));
    return {
      cameraZ: 7.4,
      cameraX: 0,
      lookAt: [0, 0, 0],
      fov: 50,
      globePosition: [0, 0, 0],
      globeScale: scale,
      pointSize: 0.016,
    };
  }

  const tall = height > width * 1.1;
  if (tall && width < 1200) {
    return {
      cameraZ: 6.2,
      cameraX: -0.35,
      lookAt: [1.1, 0, 0],
      fov: 42,
      globePosition: [1.55, -0.15, 0],
      globeScale: 0.88,
      pointSize: 0.017,
    };
  }

  return {
    cameraZ: 5.35,
    cameraX: -0.75,
    lookAt: [1.55, 0, 0],
    fov: 42,
    globePosition: [2.15, 0, 0],
    globeScale: 1.08,
    pointSize: 0.018,
  };
}

function SceneLayoutProvider({ variant, children }) {
  const { size } = useThree();
  const layout = useMemo(
    () => getSceneLayout(size.width, size.height, variant),
    [size.width, size.height, variant]
  );

  return (
    <SceneLayoutContext.Provider value={layout}>
      {children}
    </SceneLayoutContext.Provider>
  );
}

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Detailed continent outlines [lon, lat] */
const CONTINENTS = [
  // North America
  [
    [-168, 65], [-166, 68], [-160, 70], [-150, 71], [-140, 70], [-130, 68],
    [-125, 60], [-130, 55], [-125, 50], [-123, 48], [-124, 42], [-122, 37],
    [-118, 33], [-114, 31], [-110, 25], [-105, 22], [-100, 18], [-95, 16],
    [-90, 15], [-87, 17], [-85, 22], [-82, 24], [-80, 27], [-76, 35],
    [-74, 40], [-70, 43], [-67, 45], [-65, 44], [-60, 47], [-56, 50],
    [-55, 55], [-60, 60], [-65, 66], [-75, 72], [-85, 74], [-95, 74],
    [-110, 73], [-125, 71], [-140, 69], [-155, 67], [-165, 64], [-168, 65],
  ],
  // Central America / Caribbean land
  [
    [-92, 18], [-88, 16], [-84, 10], [-80, 9], [-77, 8], [-80, 12],
    [-83, 15], [-88, 18], [-92, 18],
  ],
  // Greenland
  [
    [-73, 77], [-60, 83], [-40, 83], [-22, 80], [-15, 72], [-20, 68],
    [-30, 65], [-40, 62], [-45, 60], [-50, 63], [-55, 68], [-62, 72],
    [-70, 75], [-73, 77],
  ],
  // South America
  [
    [-81, 12], [-75, 11], [-70, 12], [-62, 10], [-55, 6], [-50, 2],
    [-48, -2], [-40, -5], [-35, -8], [-34, -15], [-38, -22], [-42, -28],
    [-48, -32], [-54, -36], [-58, -40], [-64, -44], [-68, -50], [-70, -54],
    [-68, -56], [-72, -52], [-74, -45], [-75, -35], [-74, -25], [-73, -15],
    [-76, -5], [-79, 2], [-81, 8], [-81, 12],
  ],
  // Europe
  [
    [-9, 37], [-9, 42], [-8, 44], [-5, 48], [-4, 51], [-5, 55], [-2, 58],
    [2, 60], [8, 63], [12, 65], [18, 69], [25, 71], [32, 70], [40, 68],
    [42, 62], [40, 56], [35, 52], [30, 48], [28, 44], [25, 40], [20, 38],
    [12, 38], [5, 37], [0, 36], [-5, 36], [-9, 37],
  ],
  // Scandinavia tip refinement covered above; UK / Ireland
  [
    [-10.5, 51.5], [-10, 54], [-8, 55], [-7, 58], [-5, 58.5], [-2, 57],
    [0, 55], [1.5, 52.5], [1, 51], [-2, 50.5], [-5, 50], [-6, 51],
    [-8, 51.5], [-10.5, 51.5],
  ],
  // Africa
  [
    [-17, 15], [-16, 20], [-14, 28], [-10, 32], [-5, 35], [0, 36],
    [5, 37], [12, 36], [20, 33], [25, 32], [32, 31], [36, 28], [40, 20],
    [43, 12], [48, 10], [51, 12], [48, 5], [43, 0], [42, -5], [40, -12],
    [38, -18], [35, -25], [30, -30], [26, -34], [20, -35], [15, -30],
    [12, -20], [11, -10], [10, 0], [5, 4], [0, 5], [-8, 6], [-14, 8],
    [-17, 12], [-17, 15],
  ],
  // Madagascar
  [
    [43, -12], [47, -12], [50, -14], [50, -20], [48, -25], [45, -25],
    [43, -20], [43, -12],
  ],
  // Middle East + Asia
  [
    [28, 42], [32, 45], [38, 45], [45, 42], [50, 40], [55, 38], [60, 35],
    [62, 30], [65, 28], [68, 25], [72, 22], [75, 18], [77, 12], [78, 8],
    [80, 12], [82, 18], [86, 22], [90, 24], [92, 22], [95, 18], [98, 12],
    [100, 8], [102, 5], [105, 8], [108, 14], [112, 18], [116, 22],
    [120, 25], [122, 30], [125, 35], [128, 40], [132, 45], [138, 48],
    [142, 50], [145, 52], [142, 58], [135, 65], [125, 70], [115, 72],
    [100, 73], [85, 72], [70, 68], [60, 62], [50, 58], [42, 52],
    [35, 48], [30, 45], [28, 42],
  ],
  // India peninsula emphasis
  [
    [68, 24], [72, 22], [76, 15], [78, 10], [80, 8], [82, 12], [85, 18],
    [88, 22], [82, 24], [75, 24], [68, 24],
  ],
  // Japan
  [
    [129, 33], [131, 34], [133, 36], [136, 37], [139, 38], [141, 41],
    [144, 43], [145, 44], [142, 45], [140, 42], [138, 38], [135, 35],
    [132, 34], [130, 33], [129, 33],
  ],
  // Korea / East China islands strip
  [
    [124, 34], [126, 36], [129, 37], [130, 35], [128, 33], [125, 33],
    [124, 34],
  ],
  // SE Asia / Indonesia / Philippines
  [
    [95, 6], [100, 5], [105, 2], [110, 0], [115, -2], [120, -4],
    [125, -2], [130, 0], [134, 3], [130, 6], [125, 10], [120, 12],
    [115, 10], [110, 8], [105, 6], [100, 5], [95, 6],
  ],
  [
    [118, 6], [122, 8], [126, 10], [126, 14], [122, 16], [120, 14],
    [118, 10], [118, 6],
  ],
  // Australia
  [
    [113, -22], [116, -18], [122, -14], [128, -12], [135, -12], [142, -12],
    [146, -16], [150, -20], [153, -25], [153, -32], [150, -36], [145, -39],
    [140, -38], [132, -34], [125, -33], [118, -34], [115, -32], [113, -26],
    [113, -22],
  ],
  // Tasmania
  [
    [145, -41], [148, -41], [148, -43.5], [145, -43.5], [145, -41],
  ],
  // New Zealand
  [
    [166, -34], [172, -34], [176, -37], [178, -39], [177, -42], [175, -46],
    [170, -46], [167, -44], [166, -40], [166, -34],
  ],
  // Antarctica
  [
    [-180, -68], [-150, -70], [-120, -72], [-90, -70], [-60, -68],
    [-30, -70], [0, -72], [30, -74], [60, -72], [90, -70], [120, -72],
    [150, -70], [180, -68], [180, -88], [-180, -88], [-180, -68],
  ],
];

function pointInPolygon(lon, lat, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function getBounds(polygon) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (const [lon, lat] of polygon) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return { minLon, maxLon, minLat, maxLat };
}

const CONTINENT_BOUNDS = CONTINENTS.map(getBounds);

function isLand(lat, lon) {
  let L = lon;
  while (L < -180) L += 360;
  while (L >= 180) L -= 360;

  for (let i = 0; i < CONTINENTS.length; i += 1) {
    const b = CONTINENT_BOUNDS[i];
    if (L < b.minLon || L > b.maxLon || lat < b.minLat || lat > b.maxLat) {
      continue;
    }
    if (pointInPolygon(L, lat, CONTINENTS[i])) return true;
  }
  return false;
}

/** Build once and reuse — avoids heavy work on every mount */
function buildLandPositions(radius, latStep = 1.15, lonStep = 1.15) {
  const coords = [];

  for (let lat = -84; lat <= 84; lat += latStep) {
    const lonScale = Math.max(0.35, Math.cos((lat * Math.PI) / 180));
    for (let lon = -180; lon < 180; lon += lonStep / lonScale) {
      if (!isLand(lat, lon)) continue;
      coords.push(lat, lon);
    }
  }

  const arr = new Float32Array((coords.length / 2) * 3);
  for (let i = 0, p = 0; i < coords.length; i += 2, p += 3) {
    const v = latLonToVec3(coords[i], coords[i + 1], radius);
    arr[p] = v.x;
    arr[p + 1] = v.y;
    arr[p + 2] = v.z;
  }
  return arr;
}

const CACHED_LAND = buildLandPositions(1.65);

function PointGlobe() {
  const layout = useContext(SceneLayoutContext);
  const pointSize = layout?.pointSize ?? 0.018;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[CACHED_LAND, 3]}
          count={CACHED_LAND.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pointSize}
        color="#f0f6ff"
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Atmosphere({ radius = 1.72 }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color="#3aa0ff"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function AtmosphereRim({ radius = 1.68 }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color="#6ec8ff"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function ConnectionArc({ start, end, color, speed = 1 }) {
  const ref = useRef(null);
  const { geometry } = useMemo(() => {
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(2.35);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(32);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return { geometry };
  }, [start, end]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (Math.sin(state.clock.elapsedTime * speed) + 1) / 2;
    ref.current.material.opacity = 0.25 + t * 0.55;
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </line>
  );
}

function Arcs({ radius = 1.66 }) {
  const arcs = useMemo(() => {
    const pairs = [
      [[40, -74], [51, 0], "#ff7a2f"],
      [[35, 139], [-33, 151], "#5ec8ff"],
      [[28, 77], [48, 2], "#ff9a5c"],
      [[37, -122], [55, 37], "#7ad0ff"],
      [[-23, -46], [1, 103], "#ffb347"],
      [[19, 72], [31, 121], "#6ec8ff"],
      [[-34, 18], [35, 139], "#ff8a3d"],
      [[55, -3], [-33, -70], "#6ec8ff"],
    ];

    return pairs.map(([a, b, color], i) => ({
      id: i,
      start: latLonToVec3(a[0], a[1], radius),
      end: latLonToVec3(b[0], b[1], radius),
      color,
      speed: 0.7 + i * 0.12,
    }));
  }, [radius]);

  return (
    <group>
      {arcs.map((arc) => (
        <ConnectionArc
          key={arc.id}
          start={arc.start}
          end={arc.end}
          color={arc.color}
          speed={arc.speed}
        />
      ))}
    </group>
  );
}

function ResponsiveCamera() {
  const { camera } = useThree();
  const layout = useContext(SceneLayoutContext);

  useFrame(() => {
    if (!layout) return;

    const { cameraZ, cameraX, lookAt: look, fov } = layout;

    if ("fov" in camera && camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, 0.08);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, look[1], 0.08);
    camera.lookAt(look[0], look[1], look[2]);
  });

  return null;
}

function GlobeGroup() {
  const group = useRef(null);
  const { gl } = useThree();
  const layout = useContext(SceneLayoutContext);
  const drag = useRef({
    active: false,
    prevX: 0,
    prevY: 0,
    velX: 0,
    velY: 0,
    rotX: 0.12,
    rotY: 0.4,
  });

  useEffect(() => {
    const el = gl.domElement;
    el.style.cursor = "grab";
    el.style.touchAction = "none";

    function onPointerDown(e) {
      drag.current.active = true;
      drag.current.prevX = e.clientX;
      drag.current.prevY = e.clientY;
      drag.current.velX = 0;
      drag.current.velY = 0;
      el.style.cursor = "grabbing";
      el.setPointerCapture?.(e.pointerId);
    }

    function onPointerMove(e) {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.prevX;
      const dy = e.clientY - drag.current.prevY;
      drag.current.prevX = e.clientX;
      drag.current.prevY = e.clientY;
      drag.current.rotY += dx * 0.005;
      drag.current.rotX += dy * 0.004;
      drag.current.rotX = Math.max(-0.9, Math.min(0.9, drag.current.rotX));
      drag.current.velX = dx * 0.005;
      drag.current.velY = dy * 0.004;
    }

    function onPointerUp(e) {
      drag.current.active = false;
      el.style.cursor = "grab";
      el.releasePointerCapture?.(e.pointerId);
    }

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = drag.current;

    if (!d.active) {
      d.rotY -= 0.12 * delta + d.velX;
      d.rotX += d.velY;
      d.velX *= 0.94;
      d.velY *= 0.94;
      d.rotX = Math.max(-0.9, Math.min(0.9, d.rotX));
    }

    group.current.rotation.y = d.rotY;
    group.current.rotation.x = d.rotX;
  });

  const position = layout?.globePosition ?? [2.15, 0, 0];
  const scale = layout?.globeScale ?? 1.08;

  return (
    <group ref={group} position={position} scale={scale}>
      <PointGlobe />
      <Atmosphere />
      <AtmosphereRim />
      <Arcs />
    </group>
  );
}

export default function HeroScene({ variant = "home" }) {
  const initialLayout = getSceneLayout(
    typeof window !== "undefined" ? window.innerWidth : 1200,
    typeof window !== "undefined" ? window.innerHeight : 800,
    variant
  );

  return (
    <Canvas
      camera={{
        position: [0, 0.15, initialLayout.cameraZ],
        fov: initialLayout.fov,
      }}
      dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1.25)]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      className="hero-scene-canvas"
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
    >
      <SceneVariantContext.Provider value={variant}>
        <SceneLayoutProvider variant={variant}>
          <color attach="background" args={["#040912"]} />
          <fog attach="fog" args={["#040912", 6, 14]} />
          <ambientLight intensity={0.45} />
          <pointLight position={[4, 2, 3]} intensity={1.0} color="#4da3ff" />
          <Stars
            radius={40}
            depth={20}
            count={variant === "auth" ? 350 : 500}
            factor={2.5}
            saturation={0}
            fade
            speed={0.3}
          />
          <ResponsiveCamera />
          <GlobeGroup />
        </SceneLayoutProvider>
      </SceneVariantContext.Provider>
    </Canvas>
  );
}
