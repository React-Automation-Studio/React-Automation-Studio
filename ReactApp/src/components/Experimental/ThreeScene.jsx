import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "@mui/material/styles";
import PV from "../SystemComponents/PV";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const DRAG_SENSITIVITY = 0.01; // rad per pixel

function Cube3d({ position, faceColors, hoverColor, pvs, macros }) {
  const [xRotationPv, setXRotationPv] = useState({ initialized: false });
  const [yRotationPv, setYRotationPv] = useState({ initialized: false });
  const [outputX, setOutputX] = useState(0);
  const [outputY, setOutputY] = useState(0);
  const [triggerX, setTriggerX] = useState(0);
  const [triggerY, setTriggerY] = useState(0);
  const meshRef = useRef();
  const dragRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const { gl } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    const xRaw = Number(xRotationPv.value);
    const yRaw = Number(yRotationPv.value);
    const x = xRotationPv.initialized && Number.isFinite(xRaw) ? xRaw : 0;
    const y = yRotationPv.initialized && Number.isFinite(yRaw) ? yRaw : 0;
    meshRef.current.rotation.x = x + 0.35;
    meshRef.current.rotation.y = y + 0.55;
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const baseX = Number.isFinite(Number(xRotationPv.value))
      ? Number(xRotationPv.value)
      : 0;
    const baseY = Number.isFinite(Number(yRotationPv.value))
      ? Number(yRotationPv.value)
      : 0;
    dragRef.current = { startX: e.clientX, startY: e.clientY, baseX, baseY };
    if (gl?.domElement) gl.domElement.style.cursor = "grabbing";

    const onMove = (ev) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = ev.clientX - d.startX;
      const dy = ev.clientY - d.startY;
      setOutputX(clamp(d.baseX + dy * DRAG_SENSITIVITY, -Math.PI, Math.PI));
      setOutputY(clamp(d.baseY + dx * DRAG_SENSITIVITY, -Math.PI, Math.PI));
      setTriggerX((t) => t + 1);
      setTriggerY((t) => t + 1);
    };
    const onUp = () => {
      dragRef.current = null;
      if (gl?.domElement) gl.domElement.style.cursor = "grab";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const handlePointerOver = () => {
    setHover(true);
    if (gl?.domElement && !dragRef.current) gl.domElement.style.cursor = "grab";
  };
  const handlePointerOut = () => {
    setHover(false);
    if (gl?.domElement && !dragRef.current) gl.domElement.style.cursor = "";
  };

  const faceColor = hovered ? hoverColor : undefined;
  return (
    <React.Fragment>
      <PV
        pv={pvs[0]}
        macros={macros}
        pvData={setXRotationPv}
        outputValue={outputX}
        newValueTrigger={triggerX}
      />
      <PV
        pv={pvs[1]}
        macros={macros}
        pvData={setYRotationPv}
        outputValue={outputY}
        newValueTrigger={triggerY}
      />
      <mesh
        position={position}
        ref={meshRef}
        castShadow
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
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
