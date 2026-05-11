import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "@mui/material/styles";
import PV from "../SystemComponents/PV";

function Cube3d({ position, faceColors, hoverColor, pvs, macros }) {
  const [xRotationPv, setXRotaionPv] = useState({ initialized: false });
  const [yRotationPv, setYRotaionPv] = useState({ initialized: false });
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    if (!meshRef.current) return;
    const xRaw = Number(xRotationPv.value);
    const yRaw = Number(yRotationPv.value);
    const x = xRotationPv.initialized && Number.isFinite(xRaw) ? xRaw : 0;
    const y = yRotationPv.initialized && Number.isFinite(yRaw) ? yRaw : 0;
    meshRef.current.rotation.x = x + 0.35;
    meshRef.current.rotation.y = y + 0.55;
  });
  const pvConnections = () =>
    pvs.map((item, index) => (
      <PV
        key={index.toString()}
        pv={item}
        macros={macros}
        pvData={(pvData) => {
          if (index === 0) setXRotaionPv(pvData);
          else if (index === 1) setYRotaionPv(pvData);
        }}
      />
    ));
  const faceColor = hovered ? hoverColor : undefined;
  return (
    <React.Fragment>
      {pvConnections()}
      <mesh
        position={position}
        ref={meshRef}
        scale={active ? 1.4 : 1}
        castShadow
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        {faceColors.map((c, i) => (
          <meshPhysicalMaterial
            key={i}
            attach={`material-${i}`}
            color={faceColor ?? c}
            metalness={0.65}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.03}
            reflectivity={0.8}
          />
        ))}
      </mesh>
    </React.Fragment>
  );
}

// Polished-silver cube — independent of theme palette. Reads as
// machined metal in both light and dark modes; rotation still shows
// because the directional + point lights pick out each face differently.
const SILVER = "#E3E6EA";
const HOVER_COLOR = "#FFEE58";
const faceColors = [SILVER, SILVER, SILVER, SILVER, SILVER, SILVER];

const ThreeScene = ({ height = "55vh" } = {}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  // Stage palette flips between modes — dark mode keeps the Blender-style
  // dark viewport; light mode uses a soft blue-grey (not pure white) so
  // the grid stays visible.
  const STAGE_BG = isDark ? "#1A1F26" : "#D9DEE5";
  const STAGE_FLOOR = isDark ? "#252B33" : "#C5CBD3";
  const STAGE_GRID = isDark ? "#3A4248" : "#8E97A2";
  return (
    <div style={{ height, width: "100%" }}>
      <Canvas
        shadows
        camera={{ position: [4, 3.5, 6], fov: 42 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[STAGE_BG]} />
        <fog attach="fog" args={[STAGE_BG, 7, 16]} />

        <ambientLight intensity={0.35} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={3}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
        />
        <pointLight position={[-5, 2, -4]} intensity={0.55} color="#9575CD" />
        <pointLight position={[5, 1, 4]} intensity={0.35} color="#4FC3F7" />

        <Cube3d
          position={[0, 0, 0]}
          faceColors={faceColors}
          hoverColor={HOVER_COLOR}
          pvs={["testIOC:Cube1:xRotation", "testIOC:Cube1:yRotation"]}
        />

        {/* Floor */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial
            color={STAGE_FLOOR}
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
        <gridHelper
          args={[40, 40, STAGE_GRID, STAGE_GRID]}
          position={[0, -1.49, 0]}
        />
      </Canvas>
    </div>
  );
};
export default ThreeScene;
